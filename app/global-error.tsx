'use client'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif' }}>
        <div
          style={{
            display: 'flex',
            minHeight: '100vh',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            padding: '24px',
            textAlign: 'center',
            backgroundColor: '#fbfbfb',
            color: '#1c1c1f',
          }}
        >
          <p style={{ fontWeight: 600 }}>BIX Scout couldn&apos;t start.</p>
          <p style={{ color: '#7a7b82', maxWidth: 420, fontSize: '14px' }}>
            {error.message || 'A critical error occurred. Check your DATABASE_URL and server logs.'}
          </p>
          <button
            onClick={reset}
            style={{
              marginTop: '8px',
              padding: '8px 16px',
              borderRadius: '12px',
              backgroundColor: '#5B50E8',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
