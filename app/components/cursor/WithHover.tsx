import React, { useState, useContext } from 'react'
import { Context } from '../appWrapper'

const withHover = (
  Component: React.ComponentType<any>,
  type: string,
  config?: Record<string, any>,
) => {
  return function WithHoverComponent({ passThroughRef, ...props }: any) {
    const context = useContext(Context)

    const [hovering, setHovering] = useState(false)

    const handleMouseEnter = (e: React.MouseEvent<HTMLElement>): void => {
      if (context === null) return
      const result = {
        el: e.currentTarget,
        type,
        config: { ...config },
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
      const amount =
        context.selectedElement.config?.hoverOffset != null
          ? context.selectedElement.config.hoverOffset
          : 2
      const relativePos = {
        x:
          context.pos.x -
          context.selectedElement.el.getBoundingClientRect().left,
        y:
          context.pos.y -
          context.selectedElement.el.getBoundingClientRect().top,
      }

      const xMid = context.selectedElement.el.getBoundingClientRect().width / 2
      const yMid = context.selectedElement.el.getBoundingClientRect().height / 2
      const xMove =
        ((relativePos.x - xMid) / context.selectedElement.el.clientWidth) *
        amount
      const yMove =
        ((relativePos.y - yMid) / context.selectedElement.el.clientHeight) *
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
