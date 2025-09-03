import React from 'react'
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import AnimatedPressable from '@/components/AnimatedPressable'
import { theme } from '@/theme'
import FadeInView from '@/components/FadeInView'

type ToolCardProps = {
  icon: string
  title: string
  description: string
  gradientColors?: string[]
  onPress?: () => void
}

function ToolCard({ icon, title, description, gradientColors = theme.colors.primaryGradient, onPress }: ToolCardProps) {
  return (
    <AnimatedPressable onPress={onPress} style={styles.toolCard}>
      <BlurView intensity={20} tint="dark" style={styles.toolContent}>
        <LinearGradient
          colors={gradientColors as any}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.toolIcon}
        >
          <Ionicons name={icon as any} size={24} color={theme.colors.text} />
        </LinearGradient>
        <View>
          <Text style={styles.toolTitle}>{title}</Text>
          <Text style={styles.toolDescription}>{description}</Text>
        </View>
      </BlurView>
    </AnimatedPressable>
  )
}

export default function ToolsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Ionicons name="build" size={30} color="#fff" style={styles.headerIcon} />
            <Text style={styles.title}>Araçlar</Text>
          </View>
          <Text style={styles.subtitle}>Cihazınızı optimize etmek için kullanabileceğiniz araçlar</Text>
        </View>

        {/* Storage Tools */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Depolama Araçları</Text>
          <FadeInView>
            <ToolCard
              icon="trash-outline"
              title="Önbellek Temizleyici"
              description="Uygulamaların önbelleklerini temizleyerek alan kazanın"
              gradientColors={theme.colors.primaryGradient}
            />
          </FadeInView>
          <FadeInView delay={100}>
            <ToolCard
              icon="copy-outline"
              title="Kopya Bulucu"
              description="Aynı dosyaları bulun ve silin"
              gradientColors={theme.colors.accentGradient}
            />
          </FadeInView>
        </View>

        {/* System Tools */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sistem Araçları</Text>
          <FadeInView delay={200}>
            <ToolCard
              icon="hardware-chip-outline"
              title="RAM Edici"
              description="RAM kullanımını optimize edin"
              gradientColors={theme.colors.primaryGradient}
            />
          </FadeInView>
          <FadeInView delay={300}>
            <ToolCard
              icon="battery-charging-outline"
              title="Pil Optimize"
              description="Pil ömrünü uzatın"
              gradientColors={theme.colors.accentGradient}
            />
          </FadeInView>
        </View>

        {/* Network Tools */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ağ Araçları</Text>
          <FadeInView delay={400}>
            <ToolCard
              icon="wifi-outline"
              title="İnternet Hızlandırıcı"
              description="İnternet bağlantınızı optimize edin"
              gradientColors={theme.colors.primaryGradient}
            />
          </FadeInView>
          <FadeInView delay={500}>
            <ToolCard
              icon="analytics-outline"
              title="Ağ Analizi"
              description="Ağ kullanımınızı analiz edin"
              gradientColors={theme.colors.accentGradient}
            />
          </FadeInView>
        </View>

        {/* Security Tools */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Güvenlik Araçları</Text>
          <FadeInView delay={600}>
            <ToolCard
              icon="shield-checkmark-outline"
              title="Güvenlik Taraması"
              description="Cihazınızı zararlı yazılımlara karşı tarayın"
              gradientColors={theme.colors.primaryGradient}
            />
          </FadeInView>
          <FadeInView delay={700}>
            <ToolCard
              icon="lock-closed-outline"
              title="Gizlilik Koruması"
              description="Gizliliğinizi koruyun"
              gradientColors={theme.colors.accentGradient}
            />
          </FadeInView>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
    paddingBottom: 120, // Alt menü için daha az padding
  },
  header: {
    padding: 20,
    paddingTop: 16,
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerIcon: {
    marginRight: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.muted,
    marginBottom: 16,
  },
  section: {
    padding: 16,
    paddingTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  toolCard: {
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
    marginBottom: 12,
    ...theme.shadows.lg,
  },
  toolContent: {
    padding: 20,
    backgroundColor: theme.colors.glass,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  toolIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    ...theme.shadows.sm,
  },
  toolTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 4,
  },
  toolDescription: {
    fontSize: 13,
    color: theme.colors.muted,
    lineHeight: 18,
  },
})


