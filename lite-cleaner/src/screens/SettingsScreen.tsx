import React from 'react'
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Switch } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import AnimatedPressable from '@/components/AnimatedPressable'
import { theme } from '@/theme'
import FadeInView from '@/components/FadeInView'

type SettingItemProps = {
  icon: string
  title: string
  subtitle?: string
  value?: boolean
  onPress?: () => void
  onValueChange?: (value: boolean) => void
  type?: 'toggle' | 'button'
  gradientColors?: string[]
}

function SettingItem({ 
  icon, 
  title, 
  subtitle, 
  value, 
  onPress, 
  onValueChange,
  type = 'button',
  gradientColors = theme.colors.primaryGradient 
}: SettingItemProps) {
  return (
    <FadeInView>
      <AnimatedPressable onPress={onPress} style={styles.settingCard}>
        <BlurView intensity={20} tint="dark" style={styles.settingContent}>
          <View style={styles.settingLeft}>
            <LinearGradient
              colors={gradientColors as any}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.settingIcon}
            >
              <Ionicons name={icon as any} size={20} color={theme.colors.text} />
            </LinearGradient>
            <View style={styles.settingTexts}>
              <Text style={styles.settingTitle}>{title}</Text>
              {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
            </View>
          </View>
          {type === 'toggle' && (
            <Switch
              value={value}
              onValueChange={onValueChange}
              trackColor={{ false: theme.colors.glass, true: theme.colors.primary }}
              thumbColor={theme.colors.text}
            />
          )}
          {type === 'button' && (
            <Ionicons name="chevron-forward" size={20} color={theme.colors.text} />
          )}
        </BlurView>
      </AnimatedPressable>
    </FadeInView>
  )
}

export default function SettingsScreen() {
  const [notifications, setNotifications] = React.useState(true)
  const [autoClean, setAutoClean] = React.useState(false)
  const [darkMode, setDarkMode] = React.useState(true)

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Ionicons name="settings" size={30} color="#fff" style={styles.headerIcon} />
            <Text style={styles.title}>Ayarlar</Text>
          </View>
          <Text style={styles.subtitle}>Uygulama tercihlerinizi özelleştirin</Text>
        </View>

        {/* Profile Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profil</Text>
          <SettingItem
            icon="person-outline"
            title="Hesap Bilgileri"
            subtitle="Kişisel bilgilerinizi yönetin"
          />
          <SettingItem
            icon="notifications-outline"
            title="Bildirimler"
            type="toggle"
            value={notifications}
            onValueChange={setNotifications}
          />
        </View>

        {/* General Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Genel</Text>
          <SettingItem
            icon="moon-outline"
            title="Karanlık Mod"
            type="toggle"
            value={darkMode}
            onValueChange={setDarkMode}
          />
          <SettingItem
            icon="language-outline"
            title="Dil"
            subtitle="Türkçe"
          />
        </View>

        {/* Optimization Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Optimizasyon</Text>
          <SettingItem
            icon="refresh-circle-outline"
            title="Otomatik Temizlik"
            subtitle="Belirli aralıklarla otomatik temizlik yap"
            type="toggle"
            value={autoClean}
            onValueChange={setAutoClean}
          />
          <SettingItem
            icon="time-outline"
            title="Temizlik Zamanı"
            subtitle="Her gün 03:00"
          />
        </View>

        {/* Security Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Güvenlik</Text>
          <SettingItem
            icon="lock-closed-outline"
            title="Uygulama Kilidi"
            subtitle="PIN veya biyometrik kilit kullanın"
          />
          <SettingItem
            icon="shield-checkmark-outline"
            title="Güvenlik Taraması"
            subtitle="Otomatik güvenlik taraması ayarları"
          />
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hakkında</Text>
          <SettingItem
            icon="information-circle-outline"
            title="Uygulama Bilgisi"
            subtitle="Sürüm 1.0.0"
          />
          <SettingItem
            icon="star-outline"
            title="Uygulamayı Değerlendir"
          />
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
  },
  settingCard: {
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
    marginBottom: 12,
    ...theme.shadows.sm,
  },
  settingContent: {
    padding: 16,
    backgroundColor: theme.colors.glass,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingTexts: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  settingSubtitle: {
    fontSize: 13,
    color: theme.colors.muted,
    marginTop: 2,
  },
})
