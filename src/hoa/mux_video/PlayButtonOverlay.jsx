import React from "react"

export const PlayButtonOverlay = () => (
  <div className="absolute flex items-center inset-0 justify-center pointer-events-none">
    <div
      className="bg-opacity-25 bg-white flex h-32 items-center justify-center w-40"
      style={{ borderRadius: "30px" }}
    >
      <svg className="w-6" viewBox="30.93000030517578 0 148.1400146484375 210">
        <path d="M179.07,105L30.93,210V0L179.07,105z" fill="white" />
      </svg>
    </div>
  </div>
)

PlayButtonOverlay.propTypes = {}
