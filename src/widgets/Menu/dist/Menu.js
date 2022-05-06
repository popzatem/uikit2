"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var throttle_1 = require("lodash/throttle");
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var BottomNav_1 = require("../../components/BottomNav");
var Box_1 = require("../../components/Box");
var Flex_1 = require("../../components/Box/Flex");
var Footer_1 = require("../../components/Footer");
var MenuItems_1 = require("../../components/MenuItems/MenuItems");
var SubMenuItems_1 = require("../../components/SubMenuItems");
var hooks_1 = require("../../hooks");
var Logo_1 = require("./components/Logo");
var config_1 = require("./config");
var context_1 = require("./context");
var Wrapper = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: relative;\n  width: 100%;\n"], ["\n  position: relative;\n  width: 100%;\n"])));
var StyledNav = styled_components_1["default"].nav(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  width: 100%;\n  height: ", "px;\n  background-color: ", ";\n  border-bottom: 1px solid ", ";\n  transform: translate3d(0, 0, 0);\n\n  padding-left: 16px;\n  padding-right: 16px;\n"], ["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  width: 100%;\n  height: ", "px;\n  background-color: ", ";\n  border-bottom: 1px solid ", ";\n  transform: translate3d(0, 0, 0);\n\n  padding-left: 16px;\n  padding-right: 16px;\n"])), config_1.MENU_HEIGHT, function (_a) {
    var theme = _a.theme;
    return theme.nav.background;
}, function (_a) {
    var theme = _a.theme;
    return theme.colors.cardBorder;
});
var FixedContainer = styled_components_1["default"].div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  position: fixed;\n  top: ", ";\n  left: 0;\n  transition: top 0.2s;\n  height: ", ";\n  width: 100%;\n  z-index: 20;\n"], ["\n  position: fixed;\n  top: ", ";\n  left: 0;\n  transition: top 0.2s;\n  height: ", ";\n  width: 100%;\n  z-index: 20;\n"])), function (_a) {
    var showMenu = _a.showMenu, height = _a.height;
    return (showMenu ? 0 : "-" + height + "px");
}, function (_a) {
    var height = _a.height;
    return height + "px";
});
var TopBannerContainer = styled_components_1["default"].div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  height: ", ";\n  min-height: ", ";\n  max-height: ", ";\n  width: 100%;\n"], ["\n  height: ", ";\n  min-height: ", ";\n  max-height: ", ";\n  width: 100%;\n"])), function (_a) {
    var height = _a.height;
    return height + "px";
}, function (_a) {
    var height = _a.height;
    return height + "px";
}, function (_a) {
    var height = _a.height;
    return height + "px";
});
var BodyWrapper = styled_components_1["default"](Box_1.Box)(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  position: relative;\n  display: flex;\n"], ["\n  position: relative;\n  display: flex;\n"])));
var Inner = styled_components_1["default"].div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  flex-grow: 1;\n  transition: margin-top 0.2s, margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  transform: translate3d(0, 0, 0);\n  max-width: 100%;\n"], ["\n  flex-grow: 1;\n  transition: margin-top 0.2s, margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  transform: translate3d(0, 0, 0);\n  max-width: 100%;\n"])));
var Menu = function (_a) {
    var _b;
    var _c = _a.linkComponent, linkComponent = _c === void 0 ? "a" : _c, userMenu = _a.userMenu, banner = _a.banner, globalMenu = _a.globalMenu, isAuth = _a.isAuth, isDark = _a.isDark, toggleTheme = _a.toggleTheme, currentLang = _a.currentLang, setLang = _a.setLang, cakePriceUsd = _a.cakePriceUsd, links = _a.links, subLinks = _a.subLinks, footerLinks = _a.footerLinks, activeItem = _a.activeItem, activeSubItem = _a.activeSubItem, langs = _a.langs, buyCakeLabel = _a.buyCakeLabel, children = _a.children;
    var isMobile = hooks_1.useMatchBreakpoints().isMobile;
    var _d = react_1.useState(true), showMenu = _d[0], setShowMenu = _d[1];
    var refPrevOffset = react_1.useRef(typeof window === "undefined" ? 0 : window.pageYOffset);
    var topBannerHeight = isMobile ? config_1.TOP_BANNER_HEIGHT_MOBILE : config_1.TOP_BANNER_HEIGHT;
    var totalTopMenuHeight = banner ? config_1.MENU_HEIGHT + topBannerHeight : config_1.MENU_HEIGHT;
    react_1.useEffect(function () {
        var handleScroll = function () {
            var currentOffset = window.pageYOffset;
            var isBottomOfPage = window.document.body.clientHeight === currentOffset + window.innerHeight;
            var isTopOfPage = currentOffset === 0;
            // Always show the menu when user reach the top
            if (isTopOfPage) {
                setShowMenu(true);
            }
            // Avoid triggering anything at the bottom because of layout shift
            else if (!isBottomOfPage) {
                if (currentOffset < refPrevOffset.current || currentOffset <= totalTopMenuHeight) {
                    // Has scroll up
                    setShowMenu(true);
                }
                else {
                    // Has scroll down
                    setShowMenu(false);
                }
            }
            refPrevOffset.current = currentOffset;
        };
        var throttledHandleScroll = throttle_1["default"](handleScroll, 200);
        window.addEventListener("scroll", throttledHandleScroll);
        return function () {
            window.removeEventListener("scroll", throttledHandleScroll);
        };
    }, [totalTopMenuHeight]);
    // Find the home link if provided
    var homeLink = links.find(function (link) { return link.label === "Home"; });
    var subLinksWithoutMobile = subLinks === null || subLinks === void 0 ? void 0 : subLinks.filter(function (subLink) { return !subLink.isMobileOnly; });
    var subLinksMobileOnly = subLinks === null || subLinks === void 0 ? void 0 : subLinks.filter(function (subLink) { return subLink.isMobileOnly; });
    return (react_1["default"].createElement(context_1.MenuContext.Provider, { value: { linkComponent: linkComponent } },
        react_1["default"].createElement(Wrapper, null,
            react_1["default"].createElement(FixedContainer, { showMenu: showMenu, height: totalTopMenuHeight },
                banner && react_1["default"].createElement(TopBannerContainer, { height: topBannerHeight }, banner),
                react_1["default"].createElement(StyledNav, null,
                    react_1["default"].createElement(Flex_1["default"], null,
                        react_1["default"].createElement(Logo_1["default"], { isDark: isDark, href: (_b = homeLink === null || homeLink === void 0 ? void 0 : homeLink.href) !== null && _b !== void 0 ? _b : "/" }),
                        !isMobile && react_1["default"].createElement(MenuItems_1["default"], { items: links, activeItem: activeItem, activeSubItem: activeSubItem, ml: "24px" })),
                    react_1["default"].createElement(Flex_1["default"], { alignItems: "center", height: "100%" },
                        globalMenu,
                        " ",
                        userMenu))),
            subLinks && (react_1["default"].createElement(Flex_1["default"], { justifyContent: "space-around" },
                react_1["default"].createElement(SubMenuItems_1.SubMenuItems, { items: subLinksWithoutMobile, mt: totalTopMenuHeight + 1 + "px", activeItem: activeSubItem }),
                (subLinksMobileOnly === null || subLinksMobileOnly === void 0 ? void 0 : subLinksMobileOnly.length) > 0 && (react_1["default"].createElement(SubMenuItems_1.SubMenuItems, { items: subLinksMobileOnly, mt: totalTopMenuHeight + 1 + "px", activeItem: activeSubItem, isMobileOnly: true })))),
            react_1["default"].createElement(BodyWrapper, { mt: !subLinks ? totalTopMenuHeight + 1 + "px" : "0" },
                react_1["default"].createElement(Inner, { isPushed: false, showMenu: showMenu },
                    children,
                    react_1["default"].createElement(Footer_1["default"], { items: footerLinks, isDark: isDark, toggleTheme: toggleTheme, langs: langs, setLang: setLang, currentLang: currentLang, cakePriceUsd: cakePriceUsd, buyCakeLabel: buyCakeLabel, mb: [config_1.MOBILE_MENU_HEIGHT + "px", null, "0px"] }))),
            isMobile && react_1["default"].createElement(BottomNav_1["default"], { items: links, activeItem: activeItem, activeSubItem: activeSubItem }))));
};
exports["default"] = Menu;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
