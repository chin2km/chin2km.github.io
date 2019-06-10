import React, { Component } from "react";
import InView from "react-intersection-observer";
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
    height: 10rem;
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
    color: #000;
    box-shadow: 1px 3px 10px #0f0f0f;
    margin: 3rem 1.6rem;
    padding: 1rem;
    height: 100% !important;
    position: relative;

    background: linear-gradient(to bottom, rgb(27, 27, 27), #000);
    border: 1px solid #8d27da;
    border-radius: 3px;

    ${onScreenMedium(css`
        margin: 4rem 3rem;
    `)}

    ${({ inView }) =>
        inView &&
        css`
            background: linear-gradient(to bottom, rgb(27, 27, 27), #000);
            border-image: linear-gradient(90deg, #d82881 36%, #8d27da) 1;

            transform: scale(1.2);
            color: #fff;
        `}

    &:hover {
        transform: scale(1.25);
    }
`;

const TeaserImage = styled.img<{ inView: boolean }>`
    width: 80%;
    max-height: 10rem;
    align-self: center;
    border-radius: 3px;
    margin: 1rem 0rem;
    transition: all 0.7s ease-in-out;
    opacity: ${({ inView }) => (inView ? 0.5 : 0)};
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

export class Teaser extends Component<IWork> {
    render() {
        const { name, tags } = this.props;
        return (
            <InViewAsAny triggerOnce={false} rootMargin={"-20% 0px -20% 0px"}>
                {({ inView, ref }) => (
                    <TeaserWrapper ref={ref} inView={inView}>
                        <Box inView={inView}>
                            <H1 as="h4">{name}</H1>
                            <TeaserImage inView={inView} src={`../images/thumbs/${name}.png`}></TeaserImage>
                            <div>{tags && tags.map((tag, index) => <Tag key={index}>{tag}</Tag>)}</div>
                        </Box>
                    </TeaserWrapper>
                )}
            </InViewAsAny>
        );
    }
}
