import React from "react";
import styled from "styled-components";
import { CONTACT_CHAT, SOCIAL } from "../MyData";
import { H1 } from "./BaseElements/H1";
import { Chat } from "./Chat";
import { SocialBox } from "./SocialBox";

const ChatWrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    ${Chat} {
        min-height: 15rem;
    }
`;

const Layout = styled.div`
    display: flex;
    flex: 1 1 100%;
    flex-wrap: wrap;
    align-self: center;
    width: 100%;
`;

export const Contact = () => (
    <>
        <ChatWrapper>
            <Chat data={CONTACT_CHAT} />
        </ChatWrapper>
        <H1 as="h2">{`< social />`}</H1>
        <Layout>
            {SOCIAL.map(({ name, link }, index) => (
                <SocialBox key={index} name={name} link={link} />
            ))}
        </Layout>
    </>
);
