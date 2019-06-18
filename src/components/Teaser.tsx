import React, { FunctionComponent } from "react";
import InView from "react-intersection-observer";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { IWork } from "../MyData";
import { onScreenMedium } from "../utils/styleSettings";
import { H1 } from "./BaseElements/H1";

const InViewAsAny: any = InView;

const TeaserWrapper = styled.div<{ inView: boolean }>`
    display: flex;
    flex-direction: column;
    transition: all 0.5s ease-in-out;

    width: 50%;
    height: 15rem;
    ${onScreenMedium(css`
        width: 33.33%;
    `)}

    ${({ inView }) =>
        inView &&
        css`
            height: 23rem !important;
            ${onScreenMedium(css`
                height: 25rem !important;
            `)}
        `}
`;

const Box = styled.div<{ inView: boolean }>`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    transition: all 0.5s ease-in-out;
    color: #fff;
    margin: 3rem 1.6rem;
    padding: 1rem;
    height: 100% !important;
    min-height: 15rem;
    position: relative;
    box-shadow: 2px 3px 15px #000;
    background: linear-gradient(to bottom, rgb(27, 27, 27), #000);
    border: 1px solid #8d27da;

    ${onScreenMedium(css`
        margin: 4rem 3rem;
    `)}

    ${({ inView }) =>
        inView &&
        css`
            background: linear-gradient(to bottom, rgb(27, 27, 27), #000);
            border-image: linear-gradient(90deg, #d82881 36%, #8d27da) 1;
            box-shadow: 2px 3px 15px #000;
            transform: scale(1.2);
            > * {
                opacity: 1 !important;
            }
        `}
    > * {
        transition: all 0.7s ease-in-out;
        opacity: 0.1;
    }
    @media (hover: hover) {
        &:hover {
            transform: scale(1.25);
        }
    }

    a {
        text-decoration: none;
        color: white;
    }
`;

const TeaserImage = styled.img`
    max-width: 80%;
    max-height: 8rem;
    align-self: center;
    border-radius: 3px;
    margin: 1rem 0rem;
`;

const Tag = styled.span`
    background: linear-gradient(75deg, #d82881 10%, #8d27da);
    opacity: 0.8;
    border-radius: 1rem;
    font-size: 0.6rem;
    margin: 0.2rem;
    padding: 0.1rem 0.5rem;
    float: right;
    display: block;
`;

export const Teaser: FunctionComponent<Pick<IWork, "tags" | "name"> & { index: number }> = ({ name, tags, index }) => {
    const navigateTo = (index: number) => () => {
        window.location.href = `#/works/${index}`;
    };
    return (
        <InViewAsAny triggerOnce={false} rootMargin={"-20% 0px -20% 0px"}>
            {({ inView, ref }) => (
                <TeaserWrapper ref={ref} inView={inView}>
                    <Box inView={inView} onClick={navigateTo(index)}>
                        <Link to={`/works/${index}`}>
                            <H1 as="h4">{name}</H1>
                            <TeaserImage src={`../images/thumbs/${name}.png`} alt={name}></TeaserImage>
                            <div>{tags && tags.map((tag, index) => <Tag key={index}>{tag}</Tag>)}</div>
                        </Link>
                    </Box>
                </TeaserWrapper>
            )}
        </InViewAsAny>
    );
};
