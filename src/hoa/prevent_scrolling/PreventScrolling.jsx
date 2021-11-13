import React from "react"

const preventScrollingCSS = `
  html,
  body {
    overflow-y: hidden;
  }

  @media (max-width: 767px) {
    html,
    body {
      position: fixed;
      height: 100vh;
    }
  }
`

export const PreventScrolling = () => <style>{preventScrollingCSS}</style>
