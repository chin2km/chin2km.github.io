import React from "react";
import { HashRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import { Contact, Header, WorkDetails, Works } from "../components";
import { INTRO, WORKS } from "../MyData";
import { onScreenLarge, onScreenMedium, onScreenXtraLarge } from "../utils/styleSettings";
import { Chat } from "./Chat";
import {
    TransitionGroup,
    CSSTransition
} from "react-transition-group";

const Home = styled(({className}) => (
    <div className={className}>
        <Chat data={INTRO} />
        <Works works={WORKS} />
    </div>
))`
    position: absolute;
    top: 100px;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;
`;

const Layout = styled.div`
    font-size: 1rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;
    max-width: 110rem;
    width: 100%;
    height: 100%;
    position: relative;

    ${onScreenLarge(css`
        width: 60%;
    `)}
    ${onScreenXtraLarge(css`
        width: 40%;
    `)}

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
        <TransitionGroup native exit enter style={{display: 'contents'}} >
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
    )
}

export const App = () => {
    return (
        <Router>
            <Layout>
                <Header/>
                <Switch>
                    <Route path="*">
                        <AnimatedApp />
                    </Route>
                </Switch>
            </Layout>
        </Router>
    );
}
