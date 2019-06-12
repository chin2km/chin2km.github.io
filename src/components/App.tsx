import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import styled, { css } from "styled-components";
import { Contact, Header, WorkDetails, Works } from "../components";
import { INTRO, WORKS } from "../MyData";
import { onScreenLarge, onScreenMedium, onScreenXtraLarge } from "../utils/styleSettings";
import { Chat } from "./Chat";

const Layout = styled.div`
    font-size: 1rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;
    max-width: 110rem;
    width: 100%;

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
        ${onScreenMedium(css`
            transform: scale(1.6);
            margin-left: 0.5rem;
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

const Home = () => (
    <>
        <Chat data={INTRO} />
        <Works works={WORKS} />
    </>
);

export class App extends Component {
    render() {
        return (
            <Router>
                <Layout>
                    <Header></Header>
                    <Route exact={true} path="/" component={Home} />
                    <Route path="/contact" component={Contact} />
                    <Route path="/works/:id" component={WorkDetails} />
                </Layout>
            </Router>
        );
    }
}
