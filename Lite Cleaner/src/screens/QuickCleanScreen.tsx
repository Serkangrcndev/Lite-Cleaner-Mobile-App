import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { GradientCard } from '../components/GradientCard';
import { ProgressRing } from '../components/ProgressRing';
import Animated, { 
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface QuickAction {
  id: string;
  name: string;
  description: string;
  size: string;
  icon: string;
  colors: [string, string];
  completed: boolean;
}

interface QuickCleanScreenProps {
  navigation?: any;
}

export const QuickCleanScreen: React.FC<QuickCleanScreenProps> = ({ navigation }) => {
  const [isCleaning, setIsCleaning] = useState(false);
  const [cleanProgress, setCleanProgress] = useState(0);
  const [cleanComplete, setCleanComplete] = useState(false);
  const [totalCleaned, setTotalCleaned] = useState('0 MB');
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Refresh animation values
  const refreshRotation = useSharedValue(0);
  const refreshScale = useSharedValue(1);
  const [quickActions, setQuickActions] = useState<QuickAction[]>([
    {
      id: '1',
      name: 'Önbellek Temizliği',
      description: 'Uygulama önbellek verilerini temizle',
      size: '245 MB',
      icon: 'trash',
      colors: ['#8b5cf6', '#3b82f6'],
      completed: false
    },
    {
      id: '2',
      name: 'Geçici Dosyalar',
      description: 'Sistem geçici dosyalarını sil',
      size: '128 MB',
      icon: 'document',
      colors: ['#06b6d4', '#0891b2'],
      completed: false
    },
  ]);

  const startQuickClean = () => {
    if (navigation) {
      // Tüm action'ları completed yap
      setQuickActions(actions =>
        actions.map(action => ({ ...action, completed: true }))
      );
      setCleanComplete(true);
      setTotalCleaned('618 MB');
      
      navigation.navigate('QuickCleanAnimation');
    }
  };

  const resetClean = () => {
    setIsCleaning(false);
    setCleanProgress(0);
    setCleanComplete(false);
    setTotalCleaned('0 MB');
    setQuickActions(actions =>
      actions.map(action => ({ ...action, completed: false }))
    );
  };

  const handleRefresh = () => {
    if (isRefreshing) return;
    
    setIsRefreshing(true);
    
    // Scale animation
    refreshScale.value = withSequence(
      withTiming(0.8, { duration: 150, easing: Easing.out(Easing.quad) }),
      withTiming(1.1, { duration: 150, easing: Easing.out(Easing.quad) }),
      withTiming(1, { duration: 150, easing: Easing.out(Easing.quad) })
    );
    
    // Rotation animation
    refreshRotation.value = withRepeat(
      withTiming(360, { duration: 1000, easing: Easing.linear }),
      3,
      false
    );
    
    // Simulate refresh process
    setTimeout(() => {
      // Reset all data
      resetClean();
      
      // Simulate new data loading
      setTimeout(() => {
        setIsRefreshing(false);
        refreshRotation.value = 0;
      }, 500);
    }, 2000);
  };

  const totalSize = quickActions.reduce((sum, action) => {
    const size = parseFloat(action.size.replace(/[^\d.]/g, ''));
    return sum + size;
  }, 0);

  // Completed olan action'lar için yeşil renk döndür
  const getActionColors = (action: QuickAction) => {
    if (action.completed) {
      return ['#34d399', '#10b981'] as [string, string];
    }
    return action.colors;
  };

  // Refresh icon animation styles
  const refreshIconStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${refreshRotation.value}deg` },
      { scale: refreshScale.value }
    ],
  }));

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View 
          entering={FadeInUp.delay(100).duration(800)}
          style={styles.header}
        >
          <View style={styles.headerLeft}>
            <View style={styles.iconContainer}>
              <Ionicons name="flash" size={24} color="white" />
            </View>
            <View>
              <Text style={styles.headerTitle}>Hızlı Temizlik</Text>
              <Text style={styles.headerSubtitle}>Gereksiz dosyaları hızla temizle</Text>
            </View>
          </View>
          <TouchableOpacity onPress={handleRefresh} disabled={isRefreshing}>
            <Animated.View style={refreshIconStyle}>
              <Ionicons 
                name={isRefreshing ? "refresh" : "refresh-outline"} 
                size={24} 
                color={isRefreshing ? "#60a5fa" : "#9ca3af"} 
              />
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>

        {/* Quick Clean Status */}
        <Animated.View 
          entering={FadeInUp.delay(200).duration(800)}
          style={styles.statusContainer}
        >
          <LinearGradient
            colors={['#1a1c2d', '#2d2d3a']}
            style={styles.statusCard}
          >
            {!isCleaning && !cleanComplete && !isRefreshing && (
              <View style={styles.cleanPrompt}>
                <Ionicons name="flash" size={48} color="#f9ca24" />
                <Text style={styles.cleanTitle}>Hızlı Temizlik</Text>
                <Text style={styles.cleanDescription}>
                  Sisteminizi hızla temizleyin ve performansı artırın
                </Text>
                <View style={styles.sizePreview}>
                  <Text style={styles.sizePreviewLabel}>Temizlenebilir Alan:</Text>
                  <Text style={styles.sizePreviewValue}>{totalSize.toFixed(1)} MB</Text>
                </View>
                <TouchableOpacity style={styles.cleanButton} onPress={startQuickClean}>
                  <LinearGradient
                    colors={['#8b5cf6', '#3b82f6']}
                    style={styles.cleanButtonGradient}
                  >
                    <Ionicons name="flash" size={20} color="white" />
                    <Text style={styles.cleanButtonText}>Hızlı Temizlik Başlat</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )}

            {isRefreshing && (
              <View style={styles.refreshingView}>
                <View style={styles.refreshContainer}>
                  <ProgressRing
                    size={120}
                    strokeWidth={6}
                    progress={75}
                    color="#60a5fa"
                    backgroundColor="#374151"
                  >
                    <Ionicons name="refresh" size={32} color="#60a5fa" />
                  </ProgressRing>
                </View>
                <Text style={styles.refreshingTitle}>Yenileniyor...</Text>
                <Text style={styles.refreshingDescription}>
                  Sistem verileri güncelleniyor
                </Text>
              </View>
            )}

            {isCleaning && (
              <View style={styles.cleaningView}>
                <View style={styles.progressContainer}>
                  <ProgressRing
                    size={120}
                    strokeWidth={6}
                    progress={cleanProgress}
                    color="#f9ca24"
                    backgroundColor="#374151"
                  >
                    <Text style={styles.progressText}>{Math.round(cleanProgress)}%</Text>
                  </ProgressRing>
                </View>
                <Text style={styles.cleaningTitle}>Temizlik Yapılıyor...</Text>
                <Text style={styles.cleaningDescription}>
                  Dosyalar temizleniyor
                </Text>
              </View>
            )}

            {cleanComplete && (
              <View style={styles.completeView}>
                <Ionicons name="checkmark-circle" size={48} color="#34d399" />
                <Text style={styles.completeTitle}>Temizlik Tamamlandı!</Text>
                <Text style={styles.completeDescription}>
                  Sisteminiz başarıyla temizlendi
                </Text>
                <View style={styles.cleanedInfo}>
                  <Text style={styles.cleanedLabel}>Temizlenen Alan:</Text>
                  <Text style={styles.cleanedValue}>{totalCleaned}</Text>
                </View>
                <TouchableOpacity style={styles.resetButton} onPress={resetClean}>
                  <Text style={styles.resetButtonText}>Tekrar Temizle</Text>
                </TouchableOpacity>
              </View>
            )}
          </LinearGradient>
        </Animated.View>

        {/* Quick Actions - New Design */}
        <Animated.View 
          entering={FadeInUp.delay(300).duration(800)}
          style={styles.actionsContainer}
        >
          <View style={styles.actionsHeader}>
            <View style={styles.actionsTitleContainer}>
              <View style={styles.actionsTitleIcon}>
                <Ionicons name="flash" size={20} color="#f9ca24" />
              </View>
              <Text style={styles.actionsTitle}>Hızlı Temizlik Seçenekleri</Text>
            </View>
            <View style={styles.actionsSubtitle}>
              <Text style={styles.actionsSubtitleText}>Tek tıkla temizlik yapın</Text>
            </View>
          </View>
          
          <View style={styles.actionsGrid}>
            {quickActions.map((action, index) => (
              <Animated.View
                key={action.id}
                entering={FadeInUp.delay(400 + index * 100).duration(600)}
                style={styles.actionWrapper}
              >
                <TouchableOpacity
                  style={[
                    styles.modernActionCard,
                    action.completed && styles.completedActionCard
                  ]}
                  onPress={() => {
                    if (action.id === '1') {
                      navigation?.navigate('CacheCleanAnimation');
                    } else if (action.id === '2') {
                      navigation?.navigate('TempFilesCleanAnimation');
                    }
                  }}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={getActionColors(action)}
                    style={styles.actionGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    {/* Background Pattern */}
                    <View style={styles.actionPattern}>
                      <View style={styles.patternCircle1} />
                      <View style={styles.patternCircle2} />
                    </View>
                    
                    {/* Content */}
                    <View style={styles.modernActionContent}>
                      {/* Icon with glow effect */}
                      <View style={[
                        styles.modernIconContainer,
                        { backgroundColor: action.completed ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.15)' }
                      ]}>
                        <Ionicons 
                          name={action.icon as any} 
                          size={32} 
                          color="white" 
                        />
                        {action.completed && (
                          <View style={styles.completedBadge}>
                            <Ionicons name="checkmark" size={16} color="white" />
                          </View>
                        )}
                      </View>
                      
                      {/* Text Content */}
                      <View style={styles.modernTextContent}>
                        <Text style={styles.modernActionName}>{action.name}</Text>
                        <Text style={styles.modernActionDescription}>{action.description}</Text>
                      </View>
                      
                      {/* Size Badge */}
                      <View style={styles.modernSizeBadge}>
                        <Text style={styles.modernSizeText}>{action.size}</Text>
                      </View>
                      
                      {/* Arrow Icon */}
                      <View style={styles.arrowContainer}>
                        <Ionicons name="arrow-forward" size={20} color="rgba(255,255,255,0.8)" />
                      </View>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
          
          {/* Quick Stats */}
          <View style={styles.quickStatsContainer}>
            <View style={styles.quickStatsCard}>
              <View style={styles.quickStatsItem}>
                <Ionicons name="time" size={16} color="#60a5fa" />
                <Text style={styles.quickStatsLabel}>Ortalama Süre</Text>
                <Text style={styles.quickStatsValue}>2-3 dk</Text>
              </View>
              <View style={styles.quickStatsDivider} />
              <View style={styles.quickStatsItem}>
                <Ionicons name="shield-checkmark" size={16} color="#34d399" />
                <Text style={styles.quickStatsLabel}>Güvenli</Text>
                <Text style={styles.quickStatsValue}>%100</Text>
              </View>
              <View style={styles.quickStatsDivider} />
              <View style={styles.quickStatsItem}>
                <Ionicons name="flash" size={16} color="#f9ca24" />
                <Text style={styles.quickStatsLabel}>Hızlı</Text>
                <Text style={styles.quickStatsValue}>Anında</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* System Info */}
        <Animated.View 
          entering={FadeInUp.delay(500).duration(800)}
          style={styles.infoContainer}
        >
          <LinearGradient
            colors={['#1a1c2d', '#2d2d3a']}
            style={styles.infoCard}
          >
            <View style={styles.infoHeader}>
              <Ionicons name="information-circle" size={24} color="#60a5fa" />
              <Text style={styles.infoTitle}>Sistem Bilgisi</Text>
            </View>
            <View style={styles.infoContent}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Toplam Depolama:</Text>
                <Text style={styles.infoValue}>128 GB</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Kullanılan Alan:</Text>
                <Text style={styles.infoValue}>83.2 GB</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Boş Alan:</Text>
                <Text style={styles.infoValue}>44.8 GB</Text>
              </View>
            </View>
          </LinearGradient>
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
  scrollContent: {
    padding: 16,
    paddingBottom: 120,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: '#f9ca24',
    padding: 12,
    borderRadius: 50,
    marginRight: 16,
    shadowColor: '#f9ca24',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#9ca3af',
  },
  statusContainer: {
    marginBottom: 24,
  },
  statusCard: {
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cleanPrompt: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  cleanTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    marginTop: 16,
    marginBottom: 8,
  },
  cleanDescription: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    marginBottom: 16,
  },
  sizePreview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  sizePreviewLabel: {
    fontSize: 14,
    color: '#9ca3af',
    marginRight: 8,
  },
  sizePreviewValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f9ca24',
  },
  cleanButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  cleanButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  cleanButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  cleaningView: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  cleaningTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
  },
  cleaningDescription: {
    fontSize: 14,
    color: '#9ca3af',
  },
  completeView: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  completeTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    marginTop: 16,
    marginBottom: 8,
  },
  completeDescription: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 16,
  },
  cleanedInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cleanedLabel: {
    fontSize: 14,
    color: '#9ca3af',
    marginRight: 8,
  },
  cleanedValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34d399',
  },
  resetButton: {
    backgroundColor: '#374151',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  actionsContainer: {
    marginBottom: 24,
  },
  actionsHeader: {
    marginBottom: 20,
  },
  actionsTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionsTitleIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(249, 202, 36, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  actionsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
  },
  actionsSubtitle: {
    marginLeft: 44,
  },
  actionsSubtitleText: {
    fontSize: 14,
    color: '#9ca3af',
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  actionWrapper: {
    flex: 1,
  },
  modernActionCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  completedActionCard: {
    shadowColor: '#34d399',
    shadowOpacity: 0.4,
  },
  actionGradient: {
    minHeight: 160,
    position: 'relative',
  },
  completedCard: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  actionContent: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    height: '100%',
  },
  actionIconContainer: {
    marginBottom: 8,
  },
  actionName: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
    textAlign: 'center',
  },
  actionDescription: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 14,
  },
  actionSize: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  actionSizeText: {
    fontSize: 11,
    fontWeight: '600',
    color: 'white',
  },
  actionPattern: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 100,
    height: 100,
    opacity: 0.1,
  },
  patternCircle1: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  patternCircle2: {
    position: 'absolute',
    top: 30,
    right: 30,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  modernActionContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  modernIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  completedBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#34d399',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modernTextContent: {
    flex: 1,
    marginBottom: 16,
  },
  modernActionName: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
    marginBottom: 6,
  },
  modernActionDescription: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 18,
  },
  modernSizeBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  modernSizeText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  arrowContainer: {
    alignSelf: 'flex-end',
  },
  quickStatsContainer: {
    marginTop: 20,
  },
  quickStatsCard: {
    backgroundColor: '#1a1c2d',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: '#374151',
  },
  quickStatsItem: {
    alignItems: 'center',
    flex: 1,
  },
  quickStatsLabel: {
    fontSize: 11,
    color: '#9ca3af',
    marginTop: 4,
    marginBottom: 2,
  },
  quickStatsValue: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  quickStatsDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#374151',
  },
  infoContainer: {
    marginBottom: 24,
  },
  infoCard: {
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginLeft: 8,
  },
  infoContent: {
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    color: '#9ca3af',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  refreshingView: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  refreshContainer: {
    marginBottom: 20,
  },
  refreshingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
  },
  refreshingDescription: {
    fontSize: 14,
    color: '#9ca3af',
  },
});