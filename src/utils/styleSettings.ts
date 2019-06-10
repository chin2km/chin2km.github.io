import { css } from "styled-components";

export const onScreenTiny = (style: any) => css`
    @media only screen and (max-width: 479px) {
        ${style}
    }
`;

export const onScreenMedium = (style: any) => css`
    @media only screen and (min-width: 480px) {
        ${style}
    }
`;

export const onScreenLarge = (style: any) => css`
    @media only screen and (min-width: 768px) {
        ${style}
    }
`;

export const onScreenXtraLarge = (style: any) => css`
    @media only screen and (min-width: 992px) {
        ${style}
    }
`;
