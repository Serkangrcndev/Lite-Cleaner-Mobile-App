import React from 'react'
import { View, ViewProps } from 'react-native'
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming,
  withDelay,
  runOnJS
} from 'react-native-reanimated'

type Props = ViewProps & {
  children: React.ReactNode
  delay?: number
  duration?: number
  onAnimationComplete?: () => void
}

export default function FadeInView({ 
  children, 
  delay = 0, 
  duration = 500,
  onAnimationComplete,
  style,
  ...rest 
}: Props) {
  const opacity = useSharedValue(0)
  const translateY = useSharedValue(20)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      opacity.value = withTiming(1, { duration })
      translateY.value = withDelay(
        delay,
        withTiming(0, { duration }, (finished) => {
          if (finished && onAnimationComplete) {
            runOnJS(onAnimationComplete)()
          }
        })
      )
    }, delay)

    return () => clearTimeout(timer)
  }, [delay, duration, onAnimationComplete])

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }]
  }))

  return (
    <Animated.View style={[style, animatedStyle]} {...rest}>
      {children}
    </Animated.View>
  )
}
