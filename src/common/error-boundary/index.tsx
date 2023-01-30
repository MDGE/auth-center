import React from 'react';
import { Component, ReactNode, ReactElement } from 'react';
interface Props {
  children: ReactNode;
  fallbackRender: ({ error }: { error: Error | null }) => ReactElement;
}

interface State {
  hasError: boolean;
}
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch() {
    // You can also log the error to an error reporting service
    //   logErrorToMyService(error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
