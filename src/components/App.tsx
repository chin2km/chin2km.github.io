import React, { useState } from "react";
import { HashRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import styled, { css, ThemeProvider, createGlobalStyle } from "styled-components";
import { Contact, Header, WorkDetails, Works, Themer } from "../components";
import { INTRO, WORKS } from "../MyData";
import { onScreenLarge, onScreenMedium, onScreenXtraLarge } from "../utils/styleSettings";
import { Chat } from "./Chat";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { THEMES, ThemeProp } from "../themes";
import { useCookies } from "react-cookie";
import { CONSTANTS } from "../constants";

const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }: ThemeProp) => theme.bg};
    transition: background 0.5s ease-in-out;
    will-change: background;
  }
`;

const Home = styled(({ className }) => (
    <div className={className}>
        <Chat data={INTRO} />
        <Works works={WORKS} />
    </div>
))`
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;

    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
`;

const Container = styled.div`
    display: flex;
    position: relative;
    justify-content: center;
    width: 100%;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 110px;
    margin: auto;

    ${onScreenLarge(css`
        width: 60%;
    `)}
    ${onScreenXtraLarge(css`
        width: 40%;
    `)}
`;

const enterAnimation = `enterAnimation`;
const exitAnimation = `exitAnimation`;
const animationTimeout = 700;

const Layout = styled.div<{isTransitioning: boolean}>`
    font-size: 1rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;
    position: relative;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    transition: all 0.3s ease-in-out;

    ${({isTransitioning}) => isTransitioning && css`
        font-style: oblique;
        transform: scale(0.9);
    `};

    b.emoji {
        transform: scale(1.3);
        display: inline-block;
        margin-left: 0.5rem;
        vertical-align: middle;
        margin-right: 0.3rem;
        ${onScreenMedium(css`
            vertical-align: middle;
            transform: scale(1.6);
            margin-right: 0.2rem;
        `)}
    }

    a.fancy {
        color: white;
        text-decoration: none;
        border-bottom: solid 1.5px;
        padding-bottom: 1px;
        line-height: 2rem;
    }

    .${enterAnimation} {
        animation: ${animationTimeout}ms ${enterAnimation} ease-out;
        z-index: 1;
    }
    .${exitAnimation} {
        animation: ${animationTimeout}ms ${exitAnimation} ease-out forwards;
    }

    @keyframes ${enterAnimation} {
        0% {
            opacity: 0;
            transform: translateX(30%);
        }
        100% {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes ${exitAnimation} {
        0% {
            opacity: 1;
            transform: translateX(0);
        }
        100% {
            opacity: 0;
            transform: translateX(-10%);
        }
    }
`;

const AnimatedApp = ({setIsTransitioning}) => {
    let location = useLocation();
    return (
        <TransitionGroup native={"true"} exit enter>
            <CSSTransition
                key={location.pathname}
                classNames={{ enterActive: enterAnimation, exitActive: exitAnimation }}
                timeout={animationTimeout}
                onEnter={() => setIsTransitioning(true)}
                onExited={() => setIsTransitioning(false)}
            >
                <Switch location={location}>
                    <Route exact={true} path="/" component={Home} />
                    <Route path="/contact" component={Contact} />
                    <Route path="/works/:id" component={WorkDetails} />
                </Switch>
            </CSSTransition>
        </TransitionGroup>
    );
};

export const App = () => {
    const [{ useLightTheme }] = useCookies([CONSTANTS.COOKIES.useLightTheme]);
    const isLightTheme = useLightTheme === "true" ? true : false;
    const [isTransitioning, setIsTransitioning] = useState(false);
    return (
        <Router>
            <ThemeProvider theme={isLightTheme ? THEMES.light : THEMES.dark}>
                <>
                    <GlobalStyle />
                    <Layout isTransitioning={isTransitioning}>
                        <Header />
                        <Container>
                            <Switch>
                                <Route path="*">
                                    <AnimatedApp setIsTransitioning={setIsTransitioning} />
                                </Route>
                            </Switch>
                        </Container>
                    </Layout>
                </>
            </ThemeProvider>
            <Themer />
        </Router>
    );
};
