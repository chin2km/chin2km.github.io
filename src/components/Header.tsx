import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { onScreenMedium, onScreenXtraLarge } from "../utils/styleSettings";

const Wrapper = styled.header`
    display: flex;
    position: sticky;
    top: 0px;
    z-index: 1;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0.5rem 0rem;
    width: 100%;

    ${onScreenXtraLarge(
        css`
            align-items: center;
        `,
    )}
    ${onScreenMedium(css`
        flex-direction: row;
    `)}

    nav {
        align-self: flex-end;
        display: flex;
        a {
            text-decoration: none;
            border-bottom: solid 2px #8d27da;
            color: #8d27da;
            margin: 0 10px;
            &:hover {
                border-bottom: solid 2px #d82881;
            }
        }
    }

    background: rgba(27, 27, 27, 0.33);
    backdrop-filter: blur(8px);
    &:after {
        content: " ";
        position: absolute;
        z-index: -1;
        top: 0%;
        bottom: 0;
        width: 120%;
        height: 90%;
        left: -10%;
        right: -10%;
        opacity: 0.1;
        background: radial-gradient(ellipse at 50% -3%, #d82881, #8d27da, rgba(255, 116, 225, 0) 50%);
    }
`;

const Title = styled.h1`
    font-size: 1.8rem;
    vertical-align: 0.9rem;
    display: inline;
    align-self: center;
    margin: 0;
    background: -webkit-gradient(linear, left top, right top, color-stop(36%, #d82881), to(#8d27da));
    background: -webkit-linear-gradient(left, #d82881 36%, #8d27da);
    background: -o-linear-gradient(left, #d82881 36%, #8d27da 100%);
    background: linear-gradient(90deg, #d82881 36%, #8d27da);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    opacity: 1;
    color: transparent;

    ${onScreenMedium(
        css`
            font-size: 2rem;
        `,
    )}
`;

const Logo = styled.img`
    width: 30px;
    height: 30px;
    margin: 10px;

    ${onScreenMedium(
        css`
            width: 50px;
            height: 50px;
        `,
    )}
`;

export const Header: React.FunctionComponent = () => (
    <Wrapper>
        <Link to="/" style={{ textDecoration: "none" }}>
            <Logo src={"../../icon.png"} />
            <Title>{`< built by chin2km />`}</Title>
        </Link>
        <nav>
            <Link to="/">{`< home />`}</Link>
            <Link to="/contact">{`< contact />`}</Link>
        </nav>
    </Wrapper>
);
