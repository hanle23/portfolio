import React, { useState, useContext, useCallback } from 'react'
import type { ComponentPropsWithRef } from 'react'
import { Context } from '../appWrapper'

const withHover = (
  Component: React.ComponentType<ComponentPropsWithRef<'div'>>,
  type: string,
  config?: Record<string, object>,
) => {
  return function WithHoverComponent({
    ref,
    ...props
  }: ComponentPropsWithRef<'div'>) {
    const context = useContext(Context)

    const [hovering, setHovering] = useState(false)

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLElement>) => {
        if (context === null) return
        const result = {
          el: e.currentTarget,
          type,
          config: { ...config },
        }

        context.selectedElementSet(result)
        setHovering(true)
      },
      [context],
    )

    const handleMouseLeave = useCallback(() => {
      if (context === null) return
      context.removeSelectedElement()
      setHovering(false)
    }, [context])

    let styles: React.CSSProperties | undefined

    if (
      context !== null &&
      hovering &&
      context.selectedElement?.el !== null &&
      context.selectedElement?.type === 'block'
    ) {
      let amount = context?.selectedElement?.config?.hoverOffset
      if (amount === undefined) {
        amount = 2
      }
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
        ref={ref}
        {...props}
      />
    )
  }
}

export default withHover
