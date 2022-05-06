import { ReactElement } from "react";
import { SpaceProps } from "styled-system";
export declare const scales: {
    readonly SM: "sm";
    readonly MD: "md";
    readonly LG: "lg";
};
export declare type Scales = typeof scales[keyof typeof scales];
export interface TextareaProps extends SpaceProps {
    scale?: Scales;
    isSuccess?: boolean;
    isWarning?: boolean;
}
export interface TextareaGroupProps extends SpaceProps {
    scale?: Scales;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    children: JSX.Element;
}
