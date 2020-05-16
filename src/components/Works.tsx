import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";
import { IWork } from "../MyData";
import { H1 } from "./BaseElements/H1";
import { Teaser } from "./Teaser";
import { onScreenMedium } from "../utils/styleSettings";

const Layout = styled.div`
    display: grid;
    padding: 3rem 0;
    grid-auto-rows: minmax(min-content, max-content);
    grid-auto-rows: minmax(min-content, max-content);
    width: 90%;
    grid-template-columns: repeat(auto-fill, minmax(calc((100% - 6rem) / 2), 1fr));
    grid-gap: 4rem 2rem;
    ${onScreenMedium(css`
        grid-template-columns: repeat(auto-fill, minmax(calc((100% - 10rem) / 3), 1fr));
        grid-gap: 6rem 4rem;
    `)}
`;

interface IProps {
    works: IWork[];
}

export const Works: FunctionComponent<IProps> = ({ works }) => (
    <>
        <H1 as="h2">{`< some of my works />`}</H1>
        <Layout>
            {works.map(({ name, tags }, index) => (
                <Teaser key={index} index={index} name={name} tags={tags} />
            ))}
        </Layout>
    </>
);
