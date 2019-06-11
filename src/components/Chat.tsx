import React, { FunctionComponent, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { onScreenXtraLarge, onScreenLarge } from "../utils/styleSettings";

const Bubble = styled.div`
    background: linear-gradient(to left, #6e48aa, #9d50bb);
    width: auto;
    min-width: 1.5rem;
    border-radius: 1rem 1rem 1rem 0;
    padding: 0.5rem;
    align-self: flex-start;
    margin: 0.5rem 0;
    color: white;
    font-size: 0.8rem;
    word-spacing: 0.1rem;
    text-align: left;
    text-decoration: pre;

    ${onScreenLarge(
        css`
            font-size: 0.8rem;
        `,
    )}
`;

interface Bubble {
    text: string;
    loading: boolean;
}
const buildChat = (chats: string[]): Bubble[] =>
    chats.map(chat => ({
        text: chat,
        loading: true,
    }));

interface IProps {
    data: string[];
    className?: string;
}
export const ChatComponent: FunctionComponent<IProps> = ({ data: intros, className }) => {
    const [chats, setChats] = useState(buildChat(intros));
    useEffect(() => {
        let idx = 0;
        const interval = setInterval(() => {
            if (idx < intros.length) {
                const newChats = chats.map((chat, index) => (index <= idx ? { ...chat, loading: false } : chat));
                setChats(newChats);
            } else {
                clearInterval(interval);
            }
            idx++;
        }, 1500);
    }, [intros]);
    return (
        <div className={className}>
            {chats.map(({ text, loading }, index) => {
                return loading ? (
                    <Bubble key={Math.random()} className={"loading"}>
                        · · ·
                    </Bubble>
                ) : (
                    <Bubble key={index}>{text}</Bubble>
                );
            })}
        </div>
    );
};

export const Chat = styled(ChatComponent)`
    display: flex;
    flex-direction: column;
    width: 80%;
    min-height: 30rem;
    margin-bottom: 1rem;
    ${onScreenLarge(
        css`
            min-height: 28rem;
        `,
    )}
    ${onScreenXtraLarge(
        css`
            width: 60%;
        `,
    )}

    ${Bubble}.loading {
        display: none;
        animation: come-up 1.5s forwards ease-in-out;

        &:last-of-type {
            display: block;
        }
    }

    @keyframes come-up {
        0% {
            opacity: 0;
            transform: translateY(1rem);
        }
        100% {
            opacity: 1;
            transform: translateY(0px);
        }
    }
`;
