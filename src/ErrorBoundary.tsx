import React from 'react';

interface State {
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<React.PropsWithChildren<unknown>, State> {
  state: State = { error: null, errorInfo: null };

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, errorInfo });
    // eslint-disable-next-line no-console
    console.error('[ErrorBoundary]', error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          minHeight: '100vh',
          background: '#0f172a',
          color: '#e2e8f0',
          padding: '2rem',
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          fontSize: '13px',
          lineHeight: 1.6,
        }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <h1 style={{ color: '#f87171', fontSize: '20px', fontWeight: 700, marginBottom: '1rem' }}>
              Render error captured
            </h1>
            <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>
              The app crashed while rendering. Full diagnostic below.
            </p>

            <h2 style={{ color: '#fcd34d', fontSize: '14px', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Error message</h2>
            <pre style={{ background: '#020617', padding: '1rem', borderRadius: 6, whiteSpace: 'pre-wrap', overflow: 'auto', border: '1px solid #1e293b' }}>
              {String(this.state.error?.message || this.state.error)}
            </pre>

            <h2 style={{ color: '#fcd34d', fontSize: '14px', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Error stack</h2>
            <pre style={{ background: '#020617', padding: '1rem', borderRadius: 6, whiteSpace: 'pre-wrap', overflow: 'auto', border: '1px solid #1e293b' }}>
              {this.state.error?.stack || '(no stack)'}
            </pre>

            <h2 style={{ color: '#fcd34d', fontSize: '14px', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Component stack</h2>
            <pre style={{ background: '#020617', padding: '1rem', borderRadius: 6, whiteSpace: 'pre-wrap', overflow: 'auto', border: '1px solid #1e293b' }}>
              {this.state.errorInfo?.componentStack || '(no component stack)'}
            </pre>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
