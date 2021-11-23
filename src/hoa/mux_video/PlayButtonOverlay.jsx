import React from "react"
import styled from "@emotion/styled"

const StyledButton = styled.div`
  --ar-h: 9;
  --ar-w: 16;
  --border-radius: 15%;

  aspect-ratio: var(--ar-w) / var(--ar-h);
  border-radius: var(--border-radius) /
    calc(var(--border-radius) * var(--ar-w) / var(--ar-h));
  width: 30%;
`

export const PlayButtonOverlay = () => (
  <div className="absolute flex items-center inset-0 justify-center pointer-events-none">
    <StyledButton className="bg-opacity-25 bg-white flex items-center justify-center">
      <svg className="w-6" viewBox="30.93000030517578 0 148.1400146484375 210">
        <path d="M179.07,105L30.93,210V0L179.07,105z" fill="white" />
      </svg>
    </StyledButton>
  </div>
)

PlayButtonOverlay.propTypes = {}
