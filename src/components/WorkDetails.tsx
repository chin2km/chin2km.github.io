import * as React from "react";
import styled, { css } from "styled-components";
import { H1 } from "./BaseElements/H1";
import { Link } from "react-router-dom";
import { WORKS } from "../MyData";
import { Chat } from "./Chat";
import InView from "react-intersection-observer";
import { hrefHtml, inlineEmoji } from "../utils/styleSettings";
const InViewAsAny: any = InView;

const DetailsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 2rem;
    flex: 1 1 100%;
    min-width: 100%;
    width: 100%;
    ${Chat} {
        min-height: 18rem;
    }
`;

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

export const WorkDetails = styled(({ match, className }) => {
    const work = WORKS.find((_, index) => index === Number(match.params.id));
    window["scrollTo"]({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });

    return work ? (
        <DetailsWrapper className={className}>
            <H1 as={"h3"}>{`< ${work.name} />`}</H1>
            <br />
            <Chat data={work.chat} />

            <H1 as={"h3"}>{`< screenshots />`}</H1>
            <br />
            <br />
            {getRange(work.images).map(key => (
                <InViewAsAny key={key} triggerOnce={true} rootMargin={"-20% 0px -20% 0px"}>
                    {({ inView, ref }) => (
                        <Screenshot
                            ref={ref}
                            imageShadow={work.imageShadow}
                            inView={inView}
                            src={`../images/screenshots/${work.name}/${key}.png`}
                        ></Screenshot>
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
                <H1>← Back to home</H1>
                <br />
                <br />
            </Link>
        </DetailsWrapper>
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
})`
    position: absolute;
    top: 100px;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-self: center;
`;
