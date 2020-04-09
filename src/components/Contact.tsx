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

export const Contact = styled(({ className }) => (
    <div className={className}>
        <ChatWrapper>
            <Chat data={CONTACT_CHAT} />
        </ChatWrapper>
        <H1 as="h2">{`< social />`}</H1>
        <Layout>
            {SOCIAL.map(({ name, link }, index) => (
                <SocialBox key={index} name={name} link={link} />
            ))}
        </Layout>
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
