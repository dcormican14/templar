/**
 * Bare diagnostic page — zero components, zero providers, zero JS.
 * Tests whether viewport-fit=cover + position:fixed actually reaches
 * the physical screen edges on iOS Safari / standalone PWA.
 *
 * Visit /ios-test on your iPhone. You should see:
 *   - RED strip behind the status bar / notch
 *   - BLUE strip behind the home indicator
 *   - GREEN fills the rest of the screen
 *
 * If you see white/black bars instead of red/blue, viewport-fit=cover
 * is not working at the Next.js level.
 */
export default function IOSTestPage() {
  return (
    <>
      {/*
        Inline style tag to override ANY external CSS (Tailwind preflight,
        index.css wildcard transitions, etc.) for this test only.
      */}
      <style>{`
        /* Kill every inherited style that could interfere */
        html, body {
          position: fixed !important;
          inset: 0 !important;
          margin: 0 !important;
          padding: 0 !important;
          overflow: hidden !important;
          background: #000 !important;
        }

        /* Nuke the wildcard transition from index.css */
        *, *::before, *::after {
          transition: none !important;
        }

        .ios-test-shell {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: green;
          display: flex;
          flex-direction: column;
          z-index: 99999;
        }

        /* This should sit BEHIND the notch/status bar — visible as red */
        .ios-test-top {
          flex-shrink: 0;
          height: env(safe-area-inset-top, 0px);
          background: red;
          width: 100%;
        }

        /* Main content area */
        .ios-test-content {
          flex: 1;
          background: green;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          color: white;
          font-family: system-ui, sans-serif;
          font-size: 16px;
          text-align: center;
          line-height: 1.6;
        }

        /* This should sit BEHIND the home indicator — visible as blue */
        .ios-test-bottom {
          flex-shrink: 0;
          height: env(safe-area-inset-bottom, 0px);
          background: blue;
          width: 100%;
        }
      `}</style>

      <div className="ios-test-shell">
        <div className="ios-test-top" />
        <div className="ios-test-content">
          <div>
            <p><strong>iOS Edge-to-Edge Test</strong></p>
            <p>RED = behind status bar / notch</p>
            <p>GREEN = safe content area</p>
            <p>BLUE = behind home indicator</p>
            <p style={{ marginTop: '20px', fontSize: '14px', opacity: 0.7 }}>
              If you see white or black bars at top/bottom instead of red/blue,
              then viewport-fit=cover is NOT reaching the edges.
            </p>
          </div>
        </div>
        <div className="ios-test-bottom" />
      </div>
    </>
  );
}
