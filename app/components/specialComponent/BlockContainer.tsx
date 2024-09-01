import React from 'react'
import type { ComponentProps, CSSProperties } from 'react'

import WithHover from '../cursor/WithHover'

const baseStyles: CSSProperties = {
  padding: '8px 16px',
  position: 'relative',
}
const BlockContainer = (props: ComponentProps<'div'>): React.JSX.Element => {
  return <div style={baseStyles} {...props} />
}

export default WithHover(BlockContainer, 'block')
