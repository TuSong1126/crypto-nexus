import { CSSProperties } from 'react'

interface SvgIconProps {
  name: string
  prefix?: string
  color?: string
  size?: string | number
  className?: string
  style?: CSSProperties
}

export default function SvgIcon({
  name,
  prefix = 'icon',
  color = 'currentColor',
  size = '1em',
  style = {}
}: SvgIconProps) {
  const symbolId = `#${prefix}-${name}`
  const svgStyle: CSSProperties = {
    verticalAlign: 'middle',
    width: size,
    height: size,
    color,
    ...style
  }
  return (
    <svg aria-hidden="true" style={svgStyle}>
      <use href={symbolId} />
    </svg>
  )
}
