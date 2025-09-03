import React from 'react'
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg'
import { theme } from '@/theme'

type Props = {
  size?: number
  strokeWidth?: number
  progress: number // 0..1
  gradientColors?: string[]
  backgroundColor?: string
}

export default function ProgressRing({
  size = 140,
  strokeWidth = 12,
  progress,
  gradientColors = [theme.colors.primary, theme.colors.accent],
  backgroundColor = 'rgba(255,255,255,0.08)',
}: Props) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const clamped = Math.max(0, Math.min(1, progress))
  const dashoffset = circumference * (1 - clamped)

  return (
    <Svg width={size} height={size}>
      <Defs>
        <LinearGradient id="grad" x1="0" y1="0" x2="100%" y2="0">
          <Stop offset="0" stopColor={gradientColors[0]} stopOpacity="1" />
          <Stop offset="1" stopColor={gradientColors[1]} stopOpacity="1" />
        </LinearGradient>
      </Defs>
      <Circle
        stroke={backgroundColor}
        fill="none"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
      />
      <Circle
        stroke="url(#grad)"
        fill="none"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={dashoffset}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </Svg>
  )
}


