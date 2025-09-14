import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions,
  Switch
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  FadeInUp,
  FadeInDown
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface DeepCleanSettingsScreenProps {
  navigation?: any;
}

interface SettingItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: 'switch' | 'button' | 'select';
  value?: boolean;
  options?: string[];
  selectedOption?: string;
}

const DeepCleanSettingsScreen: React.FC<DeepCleanSettingsScreenProps> = ({ navigation }) => {
  const [settings, setSettings] = useState<SettingItem[]>([
    {
      id: 'auto_scan',
      title: 'Otomatik Tarama',
      description: 'Uygulama açıldığında otomatik tarama yap',
      icon: 'scan-outline',
      type: 'switch',
      value: true
    },
    {
      id: 'deep_scan',
      title: 'Derin Tarama',
      description: 'Daha kapsamlı dosya taraması yap',
      icon: 'search-outline',
      type: 'switch',
      value: false
    },
    {
      id: 'auto_clean',
      title: 'Otomatik Temizlik',
      description: 'Tarama sonrası otomatik temizlik yap',
      icon: 'trash-outline',
      type: 'switch',
      value: false
    },
    {
      id: 'scan_frequency',
      title: 'Tarama Sıklığı',
      description: 'Otomatik tarama sıklığını belirle',
      icon: 'time-outline',
      type: 'select',
      options: ['Günlük', 'Haftalık', 'Aylık', 'Manuel'],
      selectedOption: 'Haftalık'
    },
    {
      id: 'file_types',
      title: 'Dosya Türleri',
      description: 'Hangi dosya türlerini tarayacağını seç',
      icon: 'document-outline',
      type: 'button'
    },
    {
      id: 'exclude_folders',
      title: 'Klasör Hariç Tut',
      description: 'Taranmayacak klasörleri belirle',
      icon: 'folder-outline',
      type: 'button'
    },
    {
      id: 'notifications',
      title: 'Bildirimler',
      description: 'Tarama ve temizlik bildirimlerini al',
      icon: 'notifications-outline',
      type: 'switch',
      value: true
    },
    {
      id: 'backup',
      title: 'Yedekleme',
      description: 'Temizlik öncesi otomatik yedekleme yap',
      icon: 'cloud-upload-outline',
      type: 'switch',
      value: false
    }
  ]);

  const handleSettingChange = (id: string, value: boolean | string) => {
    setSettings(prev => prev.map(setting => 
      setting.id === id 
        ? { ...setting, value: value as boolean, selectedOption: value as string }
        : setting
    ));
  };

  const handleButtonPress = (id: string) => {
    // Handle button press actions
    // TODO: Implement specific actions for each button
  };

  const renderSettingItem = (setting: SettingItem, index: number) => {
    return (
      <Animated.View
        key={setting.id}
        entering={FadeInUp.delay(index * 100).duration(600)}
        style={styles.settingItem}
      >
        <LinearGradient
          colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']}
          style={styles.settingGradient}
        >
          <View style={styles.settingContent}>
            <View style={styles.settingLeft}>
              <View style={styles.settingIconContainer}>
                <Ionicons name={setting.icon as any} size={20} color="#8b5cf6" />
              </View>
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingTitle}>{setting.title}</Text>
                <Text style={styles.settingDescription}>{setting.description}</Text>
              </View>
            </View>
            
            <View style={styles.settingRight}>
              {setting.type === 'switch' && (
                <Switch
                  value={setting.value}
                  onValueChange={(value) => handleSettingChange(setting.id, value)}
                  trackColor={{ false: '#374151', true: '#8b5cf6' }}
                  thumbColor={setting.value ? '#ffffff' : '#9ca3af'}
                  ios_backgroundColor="#374151"
                />
              )}
              
              {setting.type === 'select' && (
                <TouchableOpacity style={styles.selectButton}>
                  <Text style={styles.selectText}>{setting.selectedOption}</Text>
                  <Ionicons name="chevron-down" size={16} color="#9ca3af" />
                </TouchableOpacity>
              )}
              
              {setting.type === 'button' && (
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleButtonPress(setting.id)}
                >
                  <Ionicons name="chevron-forward" size={16} color="#8b5cf6" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </LinearGradient>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <LinearGradient
        colors={['#0f0f23', '#1a1a2e', '#16213e']}
        style={styles.background}
      >
        {/* Header */}
        <Animated.View 
          entering={FadeInDown.delay(100).duration(600)}
          style={styles.header}
        >
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => {
              if (navigation && navigation.goBack) {
                navigation.goBack();
              }
            }}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Derin Temizlik Ayarları</Text>
            <Text style={styles.headerSubtitle}>Tarama ve temizlik seçenekleri</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="save-outline" size={24} color="#8b5cf6" />
          </TouchableOpacity>
        </Animated.View>

        {/* Settings List */}
        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Scan Settings Section */}
          <Animated.View 
            entering={FadeInUp.delay(200).duration(600)}
            style={styles.section}
          >
            <Text style={styles.sectionTitle}>Tarama Ayarları</Text>
            {settings.slice(0, 4).map((setting, index) => renderSettingItem(setting, index))}
          </Animated.View>

          {/* File Settings Section */}
          <Animated.View 
            entering={FadeInUp.delay(300).duration(600)}
            style={styles.section}
          >
            <Text style={styles.sectionTitle}>Dosya Ayarları</Text>
            {settings.slice(4, 6).map((setting, index) => renderSettingItem(setting, index + 4))}
          </Animated.View>

          {/* System Settings Section */}
          <Animated.View 
            entering={FadeInUp.delay(400).duration(600)}
            style={styles.section}
          >
            <Text style={styles.sectionTitle}>Sistem Ayarları</Text>
            {settings.slice(6, 8).map((setting, index) => renderSettingItem(setting, index + 6))}
          </Animated.View> 

          {/* Reset Settings */}
          <Animated.View 
            entering={FadeInUp.delay(600).duration(600)}
            style={styles.section}
          >
            <TouchableOpacity style={styles.resetButton}>
              <Ionicons name="refresh-outline" size={20} color="#ef4444" />
              <Text style={styles.resetButtonText}>Ayarları Sıfırla</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
  },
  background: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 12,
    marginLeft: 4,
  },
  settingItem: {
    marginBottom: 12,
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingGradient: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 12,
    color: '#9ca3af',
    lineHeight: 16,
  },
  settingRight: {
    marginLeft: 12,
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  selectText: {
    fontSize: 12,
    color: 'white',
    marginRight: 4,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(139, 92, 246, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  advancedButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  advancedGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
  },
  advancedButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginLeft: 8,
    marginRight: 8,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ef4444',
    marginLeft: 8,
  },
});

export default DeepCleanSettingsScreen;
