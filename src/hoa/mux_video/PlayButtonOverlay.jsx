import React from "react"
import styled from "@emotion/styled"

const StyledButton = styled.div`
  --ar-h: 9;
  --ar-w: 16;
  /* Border radius as percentage of container width */
  --radius: 15%;

  align-items: center;
  aspect-ratio: var(--ar-w) / var(--ar-h);
  background: rgba(255, 255, 255, 0.25);
  border-radius: var(--radius) / calc(var(--radius) * var(--ar-w) / var(--ar-h));
  display: flex;
  justify-content: center;
  width: 30%;

  @supports not (aspect-ratio: 1/1) {
    /* For Safari 14-; https://caniuse.com/mdn-css_properties_aspect-ratio */
    padding: 10px 0;
  }
`

export const PlayButtonOverlay = () => (
  <div className="absolute flex items-center inset-0 justify-center pointer-events-none">
    <StyledButton>
      <svg className="w-6" viewBox="30.93000030517578 0 148.1400146484375 210">
        <path d="M179.07,105L30.93,210V0L179.07,105z" fill="white" />
      </svg>
    </StyledButton>
  </div>
)

PlayButtonOverlay.propTypes = {}
