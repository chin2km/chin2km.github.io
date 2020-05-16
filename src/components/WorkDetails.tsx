import * as React from "react";
import styled, { css } from "styled-components";
import { H1 } from "./BaseElements/H1";
import { Link } from "react-router-dom";
import { WORKS } from "../MyData";
import { Chat } from "./Chat";
import InView from "react-intersection-observer";
import { hrefHtml, inlineEmoji, onScreenLarge, onScreenXtraLarge } from "../utils/styleSettings";
import { motion } from "framer-motion";
import { ThemeProp } from "../themes";
const InViewAsAny: any = InView;

const Overlay = motion.custom(styled.div`
    z-index: 1;
    position: fixed;
    background-color: ${({ theme }: ThemeProp) => theme.header.bg} !important;
    backdrop-filter: blur(5px);
    will-change: opacity;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 990px;

    a {
        display: block;
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100vw;
        left: 50%;
        transform: translateX(-50%);
    }
`);

const DetailsWrapper = motion.custom(styled.div`
    background: ${({ theme }: ThemeProp) => theme.teaser.bg} !important;
    border: 1px solid #8d27da;
    border-image: linear-gradient(90deg, #d82881 36%, #8d27da) 1;
    align-items: center;
    align-self: center;
    display: flex;
    flex-direction: column;
    flex: 1 1 100%;
    overflow: scroll;
    padding-top: 2rem;
    position: fixed;
    top: 120px;
    bottom: 1rem;
    z-index: 2;

    width: 90%;
    ${onScreenLarge(css`
        width: 60%;
    `)}
    ${onScreenXtraLarge(css`
        width: 40%;
    `)}

    ${Chat} {
        min-height: 30rem;
    }
`);

const Screenshot = styled.img<{ inView: boolean; imageShadow: boolean }>`
    max-height: 40rem;
    max-width: 80%;
    align-self: center;
    border-radius: 3px;
    margin: 3rem 0rem;
    transition: all 0.7s ease-in-out;
    opacity: ${({ inView }) => (inView ? 1 : 0.1)};
    ${({ inView }) =>
        inView &&
        css`
            transform: scale(1.1);
        `}
    ${({ imageShadow }) =>
        imageShadow &&
        css`
            box-shadow: 0px 5px 20px #000000de;
        `}
`;

const getRange = (count: number): number[] => Object.keys(Array.from(new Array(count))).map((_, index) => index + 1);

export const WorkDetails = ({ id }) => {
    const work = WORKS.find((_, index) => index === Number(id));

    if (!id) {
        return null;
    }

    return work ? (
        <>
            <Overlay
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                style={{ pointerEvents: "auto" }}
            >
                <Link to="/" />
            </Overlay>
            <DetailsWrapper layoutId={`details-${Number(id)}`}>
                <H1 as={"h3"}>{`< ${work.name} />`}</H1>
                <br />
                <Chat data={work.chat} />

                <H1 as={"h3"}>{`< screenshots />`}</H1>
                <br />
                <br />
                {getRange(work.images).map((key) => (
                    <InViewAsAny key={key} triggerOnce={false} rootMargin={"-10% 0px -10% 0px"}>
                        {({ inView, ref }) => (
                            <Screenshot
                                ref={ref}
                                imageShadow={work.imageShadow}
                                inView={inView}
                                src={`../images/screenshots/${work.name}/${key}.png`}
                            />
                        )}
                    </InViewAsAny>
                ))}

                <br />
                <br />
                {work.link ? (
                    <Chat data={work.link} />
                ) : (
                    <Chat
                        data={[
                            `Unfortunately, the code for this work is not public ${inlineEmoji(`🤷🏻‍♂️`)}`,
                            "but, some of my other works are open source and you can find it on my Github Profile ↓",
                            `Here: ${hrefHtml("https://github.com/chin2km")}`,
                        ]}
                    />
                )}

                <Link to="/">
                    <H1>← Go back</H1>
                    <br />
                    <br />
                </Link>
            </DetailsWrapper>
        </>
    ) : (
        <>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <H1> Whaaaaat? Thats a {`<404/>`} 🤷🏻‍♂️</H1>
            <br />
            <br />
            <br />
            <Link to="/">
                <H1>← Back to home</H1>
            </Link>
            <br />
            <br />
        </>
    );
};
