import React from "react";
import { Chat } from "./Chat";
import { CONTACT_CHAT, SOCIAL } from "../MyData";
import styled, { css } from "styled-components";
import { H1 } from "./BaseElements/H1";
import { onScreenXtraLarge } from "../utils/styleSettings";
import { SocialBox } from "./SocialBox";

const Wrapper = styled.div`
    display: flex;
    width: 80%;
    ${Chat} {
        min-height: 15rem;
        ${onScreenXtraLarge(
            css`
                width: 100%;
            `,
        )}
    }
    ${onScreenXtraLarge(
        css`
            width: 30%;
        `,
    )}
`;

const Layout = styled.div`
    display: flex;
    flex: 1 1 100%;
    flex-wrap: wrap;
    align-self: center;
    width: 100%;
    ${onScreenXtraLarge(
        css`
            width: 60%;
        `,
    )}
`;

export const Contact = () => (
    <>
        <Wrapper>
            <Chat data={CONTACT_CHAT} />
        </Wrapper>
        <H1 as="h2">{`< social />`}</H1>
        <Layout>
            {SOCIAL.map(({ name, link }, index) => (
                <SocialBox key={index} name={name} link={link} />
            ))}
        </Layout>
    </>
);
