import React, { FunctionComponent, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { onScreenLarge } from "../utils/styleSettings";

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
    transition: all 0.2s ease-in-out;
    animation: come-up 1.5s forwards ease-in-out;

    &.loading {
        animation: come-up-slow 2s forwards ease-in-out;
        animation-delay: 0s;
        border-radius: 1rem;
        opacity: 0;
        display: none;

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

    @keyframes come-up-slow {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

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

const getRandomBetween = (start: number, end: number): number => Math.floor(Math.random() * end) + start;

export const ChatComponent: FunctionComponent<IProps> = ({ data: intros, className }) => {
    const [chats, setChats] = useState(buildChat(intros));
    let interval: number;
    let idx = 0;
    const pushChat = () => {
        if (idx < intros.length) {
            const newChats = chats.map((chat, index) => (index <= idx ? { ...chat, loading: false } : chat));
            setChats(newChats);
        } else {
            clearInterval(interval);
        }
        idx++;
        clearInterval(interval);
        interval = setInterval(pushChat, getRandomBetween(1.5, 2.5) * 1000);
    };
    useEffect(() => {
        interval = setInterval(pushChat, 1500);
        return () => {
            clearInterval(interval);
        };
    }, [intros]);
    return (
        <div className={className}>
            {chats.map(({ text, loading }, index) => {
                return loading ? (
                    <Bubble key={Math.random()} className={"loading"}>
                        · · ·
                    </Bubble>
                ) : (
                    <Bubble key={index} dangerouslySetInnerHTML={{ __html: text }}></Bubble>
                );
            })}
        </div>
    );
};

export const Chat = styled(ChatComponent)`
    display: flex;
    flex-direction: column;
    width: 70%;
    min-height: 30rem;
    margin-bottom: 1rem;
    align-self: center;
    justify-self: center;
    ${onScreenLarge(
        css`
            min-height: 28rem;
        `,
    )}
`;
