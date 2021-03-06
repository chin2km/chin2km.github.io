import React, { Component } from "react";
import InView from "react-intersection-observer";
import styled, { css } from "styled-components";
import { ISocial } from "../MyData";
import { onScreenMedium } from "../utils/styleSettings";
import { ThemeProp } from "../themes";

const InViewAsAny: any = InView;

const SocialBoxWrapper = styled.div<{ inView: boolean }>`
    display: flex;
    flex-direction: column;
    transition: all 0.5s ease-in-out;

    width: 33.33%;
    height: 5rem;

    ${({ inView }) =>
        inView &&
        css`
            height: 13rem !important;
            ${onScreenMedium(css`
                height: 23rem !important;
            `)}
        `}
`;

const Box = styled.div<{ inView: boolean }>`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: all 0.5s ease-in-out;
    color: #000;
    box-shadow: ${({ theme }: ThemeProp) => theme.teaser.shadow} !important;
    margin: 3rem 1.6rem;
    padding: 1rem;
    height: 100% !important;
    position: relative;

    background: ${({ theme }: ThemeProp) => theme.teaser.bg} !important;
    border: 1px solid #8d27da;
    border-radius: 3px;

    ${onScreenMedium(css`
        margin: 4rem 3rem;
    `)}

    ${({ inView }) =>
        inView &&
        css`
            background: ${({ theme }: ThemeProp) => theme.teaser.bg} !important;
            border-image: linear-gradient(90deg, #d82881 36%, #8d27da) 1;

            transform: scale(1.2);
            color: #fff;
        `}

    @media (hover: hover) {
        &:hover {
            transform: scale(1.3);
        }
    }
`;

const TeaserImage = styled.img<{ inView: boolean }>`
    width: 50%;
    max-height: 10rem;
    align-self: center;
    border-radius: 3px;
    margin: 1rem 0rem;
    transition: all 0.7s ease-in-out;
    opacity: ${({ inView }) => (inView ? 0.8 : 0)};
`;

export class SocialBox extends Component<ISocial> {
    render() {
        const { name, link } = this.props;
        return (
            <InViewAsAny triggerOnce={false} rootMargin={"-20% 0px -20% 0px"}>
                {({ inView, ref }) => (
                    <SocialBoxWrapper ref={ref} inView={inView}>
                        <Box inView={inView}>
                            <a href={link} target={"_blank"}>
                                <TeaserImage
                                    inView={inView}
                                    src={`../images/contacts/${name}.svg`}
                                    alt={name}
                                ></TeaserImage>
                            </a>
                        </Box>
                    </SocialBoxWrapper>
                )}
            </InViewAsAny>
        );
    }
}
