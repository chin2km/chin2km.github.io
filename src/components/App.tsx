import React, { Component } from "react";
import styled from "styled-components";
import { Header, Works, Contact, WorkDetails } from "../components";
import { HashRouter as Router, Route } from "react-router-dom";
import { Chat } from "./Chat";
import { INTRO, WORKS } from "../MyData";

const Layout = styled.div`
    font-size: 1rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;
    max-width: 110rem;
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
