import React, { useState, useContext } from 'react'
import { Context } from '../appWrapper'

const withHover = (
  Component: React.ComponentType<any>, // Adjust the type accordingly
  type: string,
  config?: Record<string, any>, // Adjust the type accordingly
) => {
  return function WithHoverComponent({ passThroughRef, ...props }: any) {
    const context = useContext(Context)

    const [hovering, setHovering] = useState(false)

    const handleMouseEnter = (e: React.MouseEvent<HTMLElement>): void => {
      if (context === null) return
      if (context.selectedElementSet == null) return

      const result = {
        el: e.currentTarget,
        type,
        config: { ...config },
      }

      if (type === 'text') {
        const computed = window.getComputedStyle(e.currentTarget).fontSize
        result.config.textSize = parseFloat(computed.replace('px', ''))
      }

      context.selectedElementSet(result)
      setHovering(true)
    }

    const handleMouseLeave = (): void => {
      if (context === null) return
      context.removeSelectedElement()
      setHovering(false)
    }

    let styles: React.CSSProperties | undefined

    if (
      context != null &&
      hovering &&
      context.selectedElement?.el != null &&
      context.selectedElement.type === 'block'
    ) {
      const amount = context.selectedElement.config?.hoverOffset ?? 2

      const relativePos = {
        x: context.pos.x - context.selectedElement.el.offsetLeft,
        y: context.pos.y - context.selectedElement.el.offsetTop,
      }

      const xMid = context.selectedElement.el.offsetWidth / 2
      const yMid = context.selectedElement.el.offsetHeight / 2
      const xMove =
        ((relativePos.x - xMid) / context.selectedElement.el.offsetHeight) *
        amount
      const yMove =
        ((relativePos.y - yMid) / context.selectedElement.el.offsetHeight) *
        amount

      styles = {
        transform: `translate(${xMove}px, ${yMove}px)`,
      }
    }

    return (
      <Component
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={styles}
        ref={passThroughRef}
        {...props}
      />
    )
  }
}

export default withHover
