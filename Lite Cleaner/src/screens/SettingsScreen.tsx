import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Switch,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  FadeInUp,
  FadeInDown
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface SettingsScreenProps {
  navigation?: any;
}

interface SettingItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  type: 'toggle' | 'navigate' | 'info';
  value?: boolean;
  onPress?: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const [settings, setSettings] = useState<SettingItem[]>([
    {
      id: '1',
      title: 'Otomatik Temizlik',
      subtitle: 'Gereksiz dosyaları otomatik temizle',
      icon: 'refresh',
      type: 'toggle',
      value: true
    },
    {
      id: '2',
      title: 'Bildirimler',
      subtitle: 'Temizlik tamamlandığında bildirim gönder',
      icon: 'notifications',
      type: 'toggle',
      value: false
    },
    {
      id: '3',
      title: 'Güvenlik Taraması',
      subtitle: 'Sistem güvenliğini düzenli kontrol et',
      icon: 'shield-checkmark',
      type: 'toggle',
      value: true
    },
    {
      id: '4',
      title: 'Pil Optimizasyonu',
      subtitle: 'Pil ömrünü otomatik optimize et',
      icon: 'battery-charging',
      type: 'toggle',
      value: true
    },
    {
      id: '5',
      title: 'Temizlik Geçmişi',
      subtitle: 'Geçmiş temizlik işlemlerini görüntüle',
      icon: 'time',
      type: 'navigate',
      onPress: () => {
        // TODO: Navigate to cleanup history
      }
    },
    {
      id: '6',
      title: 'Yedekleme',
      subtitle: 'Önemli dosyaları yedekle',
      icon: 'cloud-upload',
      type: 'navigate',
      onPress: () => {
        // TODO: Navigate to backup screen
      }
    },
    {
      id: '7',
      title: 'Uygulama Hakkında',
      subtitle: 'Sürüm 1.0.0',
      icon: 'information-circle',
      type: 'info'
    },
    {
      id: '8',
      title: 'Gizlilik Politikası',
      subtitle: 'Veri kullanımı ve gizlilik',
      icon: 'lock-closed',
      type: 'navigate',
      onPress: () => {
        // TODO: Navigate to privacy policy
      }
    }
  ]);

  const toggleSetting = (id: string) => {
    setSettings(prev => prev.map(setting => 
      setting.id === id 
        ? { ...setting, value: !setting.value }
        : setting
    ));
  };

  const renderSettingItem = (item: SettingItem) => {
    return (
      <Animated.View
        key={item.id}
        entering={FadeInUp.delay(parseInt(item.id) * 100).duration(600)}
        style={styles.settingItem}
      >
        <TouchableOpacity
          style={styles.settingContent}
          onPress={() => {
            if (item.type === 'toggle') {
              toggleSetting(item.id);
            } else if (item.onPress) {
              item.onPress();
            }
          }}
          disabled={item.type === 'info'}
        >
          <View style={styles.settingLeft}>
            <View style={styles.settingIcon}>
              <Ionicons name={item.icon as any} size={22} color="white" />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>{item.title}</Text>
              <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
            </View>
          </View>
          
          <View style={styles.settingRight}>
            {item.type === 'toggle' ? (
              <Switch
                value={item.value}
                onValueChange={() => toggleSetting(item.id)}
                trackColor={{ false: '#374151', true: '#8b5cf6' }}
                thumbColor={item.value ? '#ffffff' : '#9ca3af'}
                ios_backgroundColor="#374151"
              />
            ) : item.type === 'navigate' ? (
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            ) : null}
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Background Gradient */}
      <LinearGradient
        colors={['#0d0f1a', '#1a1c2d', '#0d0f1a']}
        style={styles.backgroundGradient}
      />

      {/* Header */}
      <Animated.View 
        entering={FadeInDown.delay(200).duration(800)}
        style={styles.header}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation?.navigate('Home')}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ayarlar</Text>
        <View style={styles.placeholder} />
      </Animated.View>

      {/* Settings Content */}
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Section */}
        <Animated.View 
          entering={FadeInUp.delay(300).duration(800)}
          style={styles.profileSection}
        >
          <View style={styles.profileCard}>
            <View style={styles.profileIcon}>
              <Ionicons name="person" size={32} color="white" />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Kullanıcı</Text>
              <Text style={styles.profileEmail}>kullanici@example.com</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="create-outline" size={20} color="#8b5cf6" />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Settings Categories */}
        <Animated.View 
          entering={FadeInUp.delay(400).duration(800)}
          style={styles.settingsSection}
        >
          <Text style={styles.sectionTitle}>Genel Ayarlar</Text>
          <View style={styles.settingsList}>
            {settings.slice(0, 4).map(renderSettingItem)}
          </View>
        </Animated.View>

        <Animated.View 
          entering={FadeInUp.delay(500).duration(800)}
          style={styles.settingsSection}
        >
          <Text style={styles.sectionTitle}>Araçlar</Text>
          <View style={styles.settingsList}>
            {settings.slice(4, 6).map(renderSettingItem)}
          </View>
        </Animated.View>

        <Animated.View 
          entering={FadeInUp.delay(600).duration(800)}
          style={styles.settingsSection}
        >
          <Text style={styles.sectionTitle}>Hakkında</Text>
          <View style={styles.settingsList}>
            {settings.slice(6).map(renderSettingItem)}
          </View>
        </Animated.View>

        {/* App Info */}
        <Animated.View 
          entering={FadeInUp.delay(700).duration(800)}
          style={styles.appInfoSection}
        >
          <View style={styles.appInfoCard}>
            <View style={styles.appIcon}>
              <Ionicons name="shield-checkmark" size={24} color="white" />
            </View>
            <View style={styles.appInfo}>
              <Text style={styles.appName}>Lite Cleaner</Text>
              <Text style={styles.appVersion}>Sürüm 1.0.0</Text>
              <Text style={styles.appDescription}>
                Sisteminizi temiz ve hızlı tutun
              </Text>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0f1a',
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  placeholder: {
    width: 40,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 120,
  },
  profileSection: {
    marginBottom: 32,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  profileIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#8b5cf6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#9ca3af',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9ca3af',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  settingsList: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  settingItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#9ca3af',
  },
  settingRight: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  appInfoSection: {
    marginBottom: 32,
  },
  appInfoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  appIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  appInfo: {
    flex: 1,
  },
  appName: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 14,
    color: '#8b5cf6',
    marginBottom: 4,
  },
  appDescription: {
    fontSize: 14,
    color: '#9ca3af',
  },
});