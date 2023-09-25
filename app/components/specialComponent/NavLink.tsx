import React from 'react'
import WithHover from '../cursor/WithHover'
const baseStyles = {
  padding: '8px 16px',
  position: 'relative',
}
const NavLink = (props: any): React.JSX.Element => {
  return <div style={baseStyles} {...props} />
}

export default WithHover(NavLink, 'block')
