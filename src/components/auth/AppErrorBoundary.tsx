import React from "react"

interface EBState {
  hasError: boolean
  errorCount: number
  errorStr?: string
}

export class AppErrorBoundary extends React.Component<
  { children: React.ReactNode },
  EBState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, errorCount: 0 }
  }

  static getDerivedStateFromError(err: unknown): Partial<EBState> {
    return { hasError: true, errorStr: String(err) }
  }

  componentDidCatch(err: unknown) {
    console.error("[AppErrorBoundary]", err)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            background: "var(--page-bg)",
            gap: 16,
            padding: 24,
          }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#e91835" strokeWidth="1.8" />
            <path
              d="M12 8v4M12 16h.01"
              stroke="#e91835"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: 16,
              color: "#111827",
            }}
          >
            Something went wrong
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              color: "#e91835",
              textAlign: "center",
              maxWidth: 600,
            }}
          >
            {this.state.errorStr}
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13,
              color: "#6b7280",
              textAlign: "center",
              maxWidth: 320,
            }}
          >
            The app encountered an unexpected error. Please refresh the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: 14,
              color: "white",
              background: "#e91835",
              border: "none",
              borderRadius: 10,
              padding: "10px 24px",
              cursor: "pointer",
            }}
          >
            Refresh Page
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
