import React from "react";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background: #333;
  }
`;

export class ErrorBoundary extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {}

    render() {
        if (this.state.hasError) {
            return <GlobalStyle />;
        }

        return this.props.children;
    }
}
