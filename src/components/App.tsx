import React from "react";
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
`;

const Container = styled.div`
    display: flex;
    position: relative;
    justify-content: center;

    ${onScreenLarge(css`
        width: 60%;
    `)}
    ${onScreenXtraLarge(css`
        width: 40%;
    `)}
`;

const Layout = styled.div`
    font-size: 1rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;
    max-width: 110rem;
    position: relative;

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

    will-change: transform, opacity;
    .enterNicely {
        animation: 600ms enterNicely ease-out;
    }
    .exitNicely {
        animation: 600ms exitNicely ease-out;
    }

    @keyframes enterNicely {
        0% {
            opacity: 0;
            transform: translateX(30%);
        }
        100% {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes exitNicely {
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

const AnimatedApp = () => {
    let location = useLocation();
    return (
        <TransitionGroup native={"true"} exit enter>
            <CSSTransition
                key={location.pathname}
                classNames={{ enterActive: "enterNicely", exitActive: "exitNicely" }}
                timeout={600}
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
    return (
        <Router>
            <ThemeProvider theme={isLightTheme ? THEMES.light : THEMES.dark}>
                <>
                    <GlobalStyle />
                    <Layout>
                        <Header />
                        <Container>
                            <Switch>
                                <Route path="*">
                                    <AnimatedApp />
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
