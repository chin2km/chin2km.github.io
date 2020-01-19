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
    right: 0;
    width: 100%;
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

    .enterNicely {
        animation: 1s enterNicely forwards;
    }
    .exitNicely {
        animation: 1s exitNicely forwards;
    }

    @keyframes enterNicely {
        0% {
            opacity: 0;
            transform: translateX(50%);
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
            filter: blur(5px);
        }
    }
`;



const AnimatedApp = () => {
    let location = useLocation();
    return (
        <TransitionGroup exit enter>
            <CSSTransition
                key={location.pathname}
                classNames={{ enterActive: "enterNicely", exitActive: "exitNicely" }}
                timeout={1000}
            >
                <Switch location={location}>
                    <Route exact={true} path="/" component={Home} />
                    <Route path="/contact" children={<Contact />} />
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
                <Header></Header>
                <Switch>
                    <Route path="*">
                        <AnimatedApp />
                    </Route>
                </Switch>
            </Layout>
        </Router>
    );
}
