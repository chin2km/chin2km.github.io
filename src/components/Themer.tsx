import React from "react";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import { CONSTANTS } from "../constants";

const Bubble = styled.span<{ isLightTheme: boolean }>`
    width: 40px;
    height: 40px;
    position: fixed;
    bottom: 20px;
    right: 20px;
    border-radius: 100%;
    background: ${({ isLightTheme }) => (isLightTheme ? "#000000e0" : "#ffffffe0")};
    box-shadow: ${({ isLightTheme }) => (isLightTheme ? "0px 0px 15px #999" : "0px 0px 15px #000")};
    transition: transform 0.2s ease-in-out, background 0.2s ease-in, box-shadow 0.2s ease-in-out;

    &:hover {
        transform: scale(1.2);
        cursor: pointer;
    }
`;

export function Themer() {
    const [{ useLightTheme }, setCookie] = useCookies([CONSTANTS.COOKIES.useLightTheme]);
    const isLightTheme = useLightTheme === "true" ? true : false;
    const handleClick = () => {
        const CookieDate = new Date();
        CookieDate.setFullYear(CookieDate.getFullYear() + 1);
        setCookie(CONSTANTS.COOKIES.useLightTheme, !isLightTheme, { expires: CookieDate });
    };
    return <Bubble isLightTheme={isLightTheme} onClick={handleClick} />;
}
