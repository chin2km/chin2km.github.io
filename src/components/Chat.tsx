import React, { FunctionComponent, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { onScreenLarge, onScreenMedium } from "../utils/styleSettings";

const Typing = styled.div`
    width: auto;
    display: table;
    margin: 0 auto;
    position: relative;
    animation: 2s bulge infinite ease-out;
    span {
        height: 5px;
        width: 5px;
        float: left;
        margin: 0 1px;
        background-color: #fff;
        display: block;
        border-radius: 50%;
        opacity: 0.4;
        animation: 1s blink infinite;
    }

    @keyframes blink {
        50% {
            opacity: 1;
        }
    }

    @keyframes bulge {
        50% {
            transform: scale(1.3);
        }
    }
`;

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
    }, [intros, className]);

    return (
        <div className={className}>
            {chats.map(({ text, loading }, index) => {
                return loading ? (
                    <Bubble key={Math.random()} className={"loading"}>
                        <Typing>
                            <span></span>
                            <span></span>
                            <span></span>
                        </Typing>
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
    min-height: 38rem;
    margin-bottom: 1rem;
    align-self: center;
    justify-self: center;
    transition: all 0.3s ease-in-out;

    ${onScreenMedium(
        css`
            min-height: 37rem;
        `,
    )}

    ${onScreenLarge(
        css`
            min-height: 33rem;
        `,
    )}
`;
