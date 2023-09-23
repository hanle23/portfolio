import { useState, useContext } from 'react'
import { Context } from '../appWrapper'
export default (Component, type, config) =>
  ({ passThroughRef, ...props }) => {
    const context = useContext(Context)
    const [hovering, setHovering] = useState(false)
    const handleMouseEnter = (e): void => {
      if (context == null) return
      if (context.selectedElementSet == null) return
      const result = {
        el: e.currentTarget,
        type,
        config: { ...config },
      }
      if (type === 'text') {
        let computed = window.getComputedStyle(e.currentTarget).fontSize
        result.config.textSize = parseFloat(computed.replace('px'))
      }
      context?.selectedElementSet(result)
      setHovering(true)
    }
    const handleMouseLeave = ({ pageX, pageY, ...e }): void => {
      if (context == null) return
      context.removeSelectedElement()
      setHovering(false)
    }
    let styles
    if (
      context != null &&
      hovering &&
      context.selectedElement.el != null &&
      context.selectedElement.type === 'block'
    ) {
      const amount =
        context.selectedElement.config?.hoverOffset != null
          ? context.selectedElement.config.hoverOffset
          : 2
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
  }
