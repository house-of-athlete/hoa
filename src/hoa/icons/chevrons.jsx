import classNames from "classnames"
import PropTypes from "prop-types"
import React from "react"

export const ChevronRight = ({ className }) => (
  <svg
    className={className}
    width="9"
    height="18"
    viewBox="0 0 9 18"
    fill="none"
  >
    <path
      d="M1.56443 0.506122C1.29167 0.194394 0.817849 0.162806 0.506122 0.435567C0.194394 0.708329 0.162806 1.18215 0.435567 1.49388L1.56443 0.506122ZM8 9L8.56443 9.49388L8.99658 9L8.56443 8.50612L8 9ZM0.435567 16.5061C0.162806 16.8178 0.194394 17.2917 0.506122 17.5644C0.817849 17.8372 1.29167 17.8056 1.56443 17.4939L0.435567 16.5061ZM0.435567 1.49388L7.43557 9.49388L8.56443 8.50612L1.56443 0.506122L0.435567 1.49388ZM7.43557 8.50612L0.435567 16.5061L1.56443 17.4939L8.56443 9.49388L7.43557 8.50612Z"
      fill="var(--hoa-close-button-color, purple)"
    />
  </svg>
)

ChevronRight.propTypes = {
  className: PropTypes.string,
}

export const ChevronLeft = ({ className }) => (
  <ChevronRight className={classNames(className, "transform rotate-180")} />
)

ChevronLeft.propTypes = {
  className: PropTypes.string,
}
