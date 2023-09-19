import React from 'react'
import WithHover from './cursor/WithHover'

const Container = ({ children }) => (
  <div className="p-2 md:p-4 relative">{children}</div>
)

const NavLink = (props) => {
  return <Container {...props} />
}

export default WithHover(NavLink, 'block')
