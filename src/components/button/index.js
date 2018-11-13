import React from 'react'
import PropTypes from 'prop-types'

import './button.css'

const Button = ({ onClick, children, kind }) => (
  <button className={`button ${kind ? '-' + kind : ''}`} onClick={onClick}>
    {children}
  </button>
)

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
  kind: PropTypes.oneOf(['danger', 'sucess'])
}

export default Button
