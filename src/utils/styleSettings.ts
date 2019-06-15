import { css } from "styled-components";

export const onScreenTiny = (style: any) => css`
    @media only screen and (max-width: 599px) {
        ${style}
    }
`;

export const onScreenMedium = (style: any) => css`
    @media only screen and (min-width: 600px) {
        ${style}
    }
`;

export const onScreenLarge = (style: any) => css`
    @media only screen and (min-width: 1200px) {
        ${style}
    }
`;

export const onScreenXtraLarge = (style: any) => css`
    @media only screen and (min-width: 1800px) {
        ${style}
    }
`;

export const hrefHtml = (url: string): string => `<a href='${url}' target='_blank' class='fancy'>${url}</a>`;

export const inlineEmoji = (emoji: string): string => `<b class='emoji'>${emoji}</b>`;

export const preTag = (message: string): string => `<pre>${message}</pre>`;
