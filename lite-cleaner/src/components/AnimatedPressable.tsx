import React from 'react'
import { Pressable, PressableProps } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

const APressable = Animated.createAnimatedComponent(Pressable)

type Props = PressableProps & {
	children: React.ReactNode
	from?: number
	to?: number
}

export default function AnimatedPressable({ children, from = 1, to = 0.96, style, ...rest }: Props) {
	const scale = useSharedValue(from)
	const rStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }))

	return (
		<APressable
			style={[style as any, rStyle]}
			onPressIn={() => (scale.value = withSpring(to, { damping: 12, stiffness: 250 }))}
			onPressOut={() => (scale.value = withSpring(from, { damping: 12, stiffness: 250 }))}
			{...rest}
		>
			{children}
		</APressable>
	)
}
