import React from 'react'
import { View, ScrollView, ViewProps } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

type Props = ViewProps & {
  scroll?: boolean
  children: React.ReactNode
}

export default function Screen({ children, scroll, className, ...rest }: Props) {
  if (scroll) {
    return (
      <View className={`flex-1 bg-dark ${className ?? ''}`}>
        <LinearGradient
          colors={["#0E0B2B", "#060914"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="absolute inset-0"
        />
        <LinearGradient
          colors={["rgba(139,92,246,0.32)", "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="absolute -top-28 -left-20 w-80 h-80 rounded-full opacity-40"
          pointerEvents="none"
        />
        <LinearGradient
          colors={["rgba(244,114,182,0.28)", "transparent"]}
          start={{ x: 1, y: 1 }}
          end={{ x: 0, y: 0 }}
          className="absolute -bottom-28 -right-24 w-96 h-96 rounded-full opacity-50"
          pointerEvents="none"
        />
        <ScrollView className="flex-1 bg-transparent" contentContainerClassName="pb-24" {...rest}>
          <View className="w-full max-w-[1080px] self-center p-4">{children}</View>
        </ScrollView>
      </View>
    )
  }
  return (
    <View className={`flex-1 bg-dark ${className ?? ''}`} {...rest}>
      <LinearGradient
        colors={["#0E0B2B", "#060914"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute inset-0"
      />
      <LinearGradient
        colors={["rgba(139,92,246,0.32)", "transparent"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute -top-28 -left-20 w-80 h-80 rounded-full opacity-40"
        pointerEvents="none"
      />
      <LinearGradient
        colors={["rgba(244,114,182,0.28)", "transparent"]}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
        className="absolute -bottom-28 -right-24 w-96 h-96 rounded-full opacity-50"
        pointerEvents="none"
      />
      <View className="w-full max-w-[1080px] self-center p-4 pb-24">{children}</View>
    </View>
  )
}


