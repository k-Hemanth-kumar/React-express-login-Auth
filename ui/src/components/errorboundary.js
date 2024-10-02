// src/components/ErrorBoundary.js

import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can log the error to an error reporting service
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="d-flex flex-column justify-content-center align-items-center text-center">
                    <h4 className="display-4">Something went wrong.</h4>
                    <button className="btn btn-secondary" onClick={() => this.setState({ hasError: false })}>
                        Try Again
                    </button>
                </div>
            );
        }

        return this.props.children; 
    }
}

export default ErrorBoundary;
