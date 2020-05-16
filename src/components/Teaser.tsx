import { motion } from "framer-motion";
import React, { FunctionComponent } from "react";
import InView from "react-intersection-observer";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { IWork } from "../MyData";
import { ThemeProp } from "../themes";
import { H1 } from "./BaseElements/H1";

const InViewAsAny: any = InView;

const Box = motion.custom(styled.div<{ inView: boolean }>`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    color: #fff;
    padding: 1rem;
    position: relative;
    box-shadow: ${({ theme }: ThemeProp) => theme.teaser.shadow} !important;
    background: ${({ theme }: ThemeProp) => theme.teaser.bg} !important;
    transition: all 0.3s ease-in-out;
    border: 1px solid #8d27da;
    height: 15rem;

    > * {
        transition: all 0.7s ease-in-out;
        opacity: 0.1;
    }

    ${({ inView }) =>
        inView &&
        css`
            border-image: linear-gradient(90deg, #d82881 36%, #8d27da) 1;
            transform: scale(1.1) !important;
            > * {
                opacity: 1;
            }
        `}


    @media (hover: hover) {
        &:hover {
            transform: scale(1.15) !important;
        }
    }

    a {
        text-decoration: none;
        color: white;
    }
`);

const TeaserImage = motion.custom(styled.img`
    opacity: 0.9;
    max-width: 90%;
    max-height: 8rem;
    align-self: center;
    border-radius: 3px;
    margin: 1rem 0rem;
`);

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

export const Teaser: FunctionComponent<Pick<IWork, "tags" | "name"> & { index: number }> = ({ name, tags, index }) => (
    <InViewAsAny triggerOnce={false} rootMargin={"-20% 0px -20% 0px"}>
        {({ inView, ref }) => (
            <Box inView={inView} ref={ref} layoutId={`details-${Number(index)}`}>
                <Link to={`/works/${index}`}>
                    <H1 as="h4">{name}</H1>
                    <TeaserImage src={`../images/thumbs/${name}.png`} alt={name}></TeaserImage>
                    <div>{tags && tags.map((tag, index) => <Tag key={index}>{tag}</Tag>)}</div>
                </Link>
            </Box>
        )}
    </InViewAsAny>
);
