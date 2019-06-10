import React, { FunctionComponent } from "react";
import styled, { css } from "styled-components";
import { IWork } from "../MyData";
import { onScreenXtraLarge } from "../utils/styleSettings";
import { Teaser } from "./Teaser";
import { H1 } from "./BaseElements/H1";

const Layout = styled.div`
    display: flex;
    flex: 1 1 100%;
    flex-wrap: wrap;
    align-self: center;
    width: 100%;
    ${onScreenXtraLarge(
        css`
            width: 60%;
        `,
    )}
`;

interface IProps {
    works: IWork[];
}

export const Works: FunctionComponent<IProps> = ({ works }) => (
    <>
        <H1 as="h2">{`< some of my works />`}</H1>
        <Layout>
            {works.map(({ name, description, link, tags }, index) => (
                <Teaser key={index} name={name} description={description} link={link} tags={tags} />
            ))}
        </Layout>
    </>
);
