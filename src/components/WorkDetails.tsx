import * as React from "react";
import styled from "styled-components";
import { H1 } from "./BaseElements/H1";
import { Link } from "react-router-dom";

const DetailsWrapper = styled.div`
    padding: 30% 0;
`;
export const WorkDetails = ({ match }: any) => (
    <DetailsWrapper>
        <H1>This page is under development 🤷🏻‍♂️. Coming soon I guess..</H1>
        <H1>Coming soon I guess... 👻</H1>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Link to="/">
            <H1>← Go back to home👻</H1>
        </Link>
    </DetailsWrapper>
);
