import { AnimatePresence, AnimateSharedLayout } from "framer-motion";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled, { createGlobalStyle, css, ThemeProvider } from "styled-components";
import { Contact, Header, Themer, WorkDetails, Works } from "../components";
import { CONSTANTS } from "../constants";
import { INTRO, WORKS } from "../MyData";
import { ThemeProp, THEMES } from "../themes";
import { onScreenLarge, onScreenMedium, onScreenXtraLarge } from "../utils/styleSettings";
import { Chat } from "./Chat";
import { ErrorBoundary } from "./Error";

const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }: ThemeProp) => theme.bg} !important;
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
    margin-top: 110px;

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
`;

const AnimatedApp = ({ match }) => {
    const {
        params: { id },
        path,
    } = match;
    const shouldRenderLayout = path === "/" || path.includes("work");
    return shouldRenderLayout ? (
        <AnimateSharedLayout type="crossfade">
            <Home />
            <AnimatePresence>{id ? <WorkDetails id={id} /> : null}</AnimatePresence>
        </AnimateSharedLayout>
    ) : path.includes("/app-shell") ? null : (
        <Route path="/contact" component={Contact} />
    );
};

export const App = () => {
    const [{ useLightTheme }] = useCookies([CONSTANTS.COOKIES.useLightTheme]);
    const isLightTheme = useLightTheme === "true";
    useEffect(() => {
        if (window["isUpdateAvailable"]) {
            window["isUpdateAvailable"].then((isAvailable: boolean) => {
                if (isAvailable) {
                    window.location.reload();
                }
            });
        }
    }, []);
    return (
        <ErrorBoundary>
            <ThemeProvider theme={isLightTheme ? THEMES.light : THEMES.dark}>
                <Router>
                    <GlobalStyle />
                    <Layout>
                        <Header />
                        <Container>
                            <Route path={["/works/:id", "/contact", "/app-shell", "/"]} component={AnimatedApp} />
                        </Container>
                        <Themer />
                    </Layout>
                </Router>
            </ThemeProvider>
        </ErrorBoundary>
    );
};
