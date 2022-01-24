import PropTypes from "prop-types"
import React from "react"

// https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=<id> must be loaded by GTM
export const KlaviyoForm = ({ klaviyoClass }) => (
  <div className={klaviyoClass} />
)

KlaviyoForm.propTypes = {
  klaviyoClass: PropTypes.string.isRequired,
}
