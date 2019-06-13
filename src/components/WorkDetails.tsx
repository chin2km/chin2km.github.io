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

const Screenshot = styled.img<{ inView: boolean }>`
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
            transform: scale(1.05);
            z-index: 1;
        `}
`;

const getRange = (count: number): number[] => Object.keys(Array.from(new Array(count))).map((_, index) => index + 1);

export const WorkDetails = ({ match }) => {
    const work = WORKS.find((_, index) => index === Number(match.params.id));
    window["scrollTo"](0, 0);

    return work ? (
        <DetailsWrapper>
            <H1 as={"h3"}>{`< ${work.name} />`}</H1>
            <br />
            <Chat data={work.chat} />

            <H1 as={"h3"}>{`< screenshots />`}</H1>
            <br />
            <br />
            {getRange(work.images).map(key => (
                <InViewAsAny key={key} triggerOnce={false} rootMargin={"-20% 0px -20% 0px"}>
                    {({ inView, ref }) => (
                        <Screenshot
                            ref={ref}
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
            </Link>
            <br />
            <br />
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
        </>
    );
};
