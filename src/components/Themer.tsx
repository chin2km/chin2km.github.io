import React from "react";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import { CONSTANTS } from "../constants";

const Bubble = styled.div<{ useLightTheme: boolean }>`
    width: 40px;
    height: 40px;
    position: fixed;
    bottom: 20px;
    right: 20px;
    opacity: 0.8;
    border-radius: 100%;
    background: ${({ useLightTheme }) => (useLightTheme ? "black" : "white")};
    box-shadow: 0px 0px 15px #999;
    transition: all 0.2s ease-in;

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
    return <Bubble useLightTheme={isLightTheme} onClick={handleClick} />;
}
