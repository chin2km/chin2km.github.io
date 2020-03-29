import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { onScreenMedium, onScreenXtraLarge, onScreenLarge } from "../utils/styleSettings";
import { ThemeProp } from "../themes";

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    position: relative;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;

    ${onScreenLarge(css`
        width: 60%;
        flex-direction: row;
    `)}
    ${onScreenXtraLarge(css`
        width: 40%;
        align-items: center;
    `)}
`;

const Wrapper = styled.header`
    display: flex;
    position: sticky;
    top: 0px;
    z-index: 100;
    justify-content: center;
    padding: 0.5rem 0rem;
    width: 100%;

    nav {
        align-self: flex-end;
        display: flex;
        margin-right: 20px;
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

    background-color: ${({ theme }: ThemeProp) => theme.header.bg};
    backdrop-filter: ${({ theme }: ThemeProp) => theme.header.filter};
    -webkit-backdrop-filter: ${({ theme }: ThemeProp) => theme.header.filter};
    transition: all 0.5s ease-in;
    overflow: hidden;
    box-shadow: ${({ theme }: ThemeProp) => theme.header.shadow};
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
    margin-left: 20px;

    ${onScreenMedium(
        css`
            width: 50px;
            height: 50px;
        `,
    )}
`;

export const Header: React.FunctionComponent = () => (
    <Wrapper>
        <Container>
            <Link to="/" style={{ textDecoration: "none" }}>
                <Logo src={"../../icon.png"} />
                <Title>{`< built by chin2km />`}</Title>
            </Link>
            <nav>
                <Link to="/">{`< home />`}</Link>
                <Link to="/contact">{`< contact />`}</Link>
            </nav>
        </Container>
    </Wrapper>
);
