import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '20px',
          textAlign: 'center',
          background: '#0D0D0D',
          color: '#FAFAFA',
          fontFamily: 'IBM Plex Sans, -apple-system, BlinkMacSystemFont, sans-serif'
        }}>
          <h1 style={{ color: '#BFA24B', marginBottom: '16px' }}>
            Ops! Algo deu errado
          </h1>
          <p style={{ color: '#999', maxWidth: '400px', lineHeight: '1.6' }}>
            Ocorreu um erro inesperado. Por favor, tente recarregar a página.
          </p>
          <button
            onClick={this.handleReload}
            style={{
              marginTop: '24px',
              padding: '12px 24px',
              background: '#007A33',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Recarregar Página
          </button>
          {import.meta.env.DEV && this.state.error && (
            <pre style={{
              marginTop: '24px',
              padding: '16px',
              background: '#1a1a1a',
              borderRadius: '8px',
              fontSize: '12px',
              textAlign: 'left',
              maxWidth: '600px',
              overflow: 'auto',
              color: '#f87171'
            }}>
              {this.state.error.toString()}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
