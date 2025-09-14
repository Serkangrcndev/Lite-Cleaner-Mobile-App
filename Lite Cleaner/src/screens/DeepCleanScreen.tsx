import React, { useState, useCallback, useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions,
  Modal
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
  withDelay,
  withSequence,
  Easing
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface CleanupItem {
  id: string;
  name: string;
  description: string;
  size: string;
  icon: string;
  color: string;
  selected: boolean;
}

interface ScanHistoryItem {
  id: string;
  date: string;
  time: string;
  result: string;
  size: string;
  status: 'success' | 'warning' | 'error';
}

interface DeepCleanScreenProps {
  navigation?: any;
}

export const DeepCleanScreen: React.FC<DeepCleanScreenProps> = ({ navigation }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);
  const [totalSize, setTotalSize] = useState('0 MB');
  const [isCleaning, setIsCleaning] = useState(false);
  const [showScanDetail, setShowScanDetail] = useState(false);
  const [selectedScan, setSelectedScan] = useState<ScanHistoryItem | null>(null);
  const [scanHistory, setScanHistory] = useState<ScanHistoryItem[]>(() => [
    {
      id: '1',
      date: '15 Aralık 2024',
      time: '14:30',
      result: 'Tarama Başarılı',
      size: '1.2 GB',
      status: 'success'
    },
    {
      id: '2',
      date: '14 Aralık 2024',
      time: '09:15',
      result: 'Tarama Başarılı',
      size: '856 MB',
      status: 'success'
    },
    {
      id: '3',
      date: '13 Aralık 2024',
      time: '16:45',
      result: 'Uyarı: Bazı dosyalar korundu',
      size: '2.1 GB',
      status: 'warning'
    },
    {
      id: '4',
      date: '12 Aralık 2024',
      time: '11:20',
      result: 'Tarama Başarılı',
      size: '1.8 GB',
      status: 'success'
    },
    {
      id: '5',
      date: '11 Aralık 2024',
      time: '08:30',
      result: 'Tarama Başarılı',
      size: '945 MB',
      status: 'success'
    }
  ]);
  const [cleanupItems, setCleanupItems] = useState<CleanupItem[]>(() => [
    {
      id: '1',
      name: 'Önbellek Dosyaları',
      description: 'Uygulama önbellek verileri',
      size: '245 MB',
      icon: 'trash',
      color: '#ff6b6b',
      selected: true
    },
    {
      id: '2',
      name: 'Geçici Dosyalar',
      description: 'Sistem geçici dosyaları',
      size: '128 MB',
      icon: 'document',
      color: '#4ecdc4',
      selected: true
    },
    {
      id: '3',
      name: 'Gereksiz Resimler',
      description: 'Duplikat ve bulanık resimler',
      size: '1.2 GB',
      icon: 'image',
      color: '#45b7d1',
      selected: false
    },
    {
      id: '4',
      name: 'Büyük Dosyalar',
      description: 'Kullanılmayan büyük dosyalar',
      size: '856 MB',
      icon: 'folder',
      color: '#f9ca24',
      selected: true
    },
    {
      id: '5',
      name: 'Eski Yedekler',
      description: 'Eski sistem yedekleri',
      size: '2.1 GB',
      icon: 'archive',
      color: '#6c5ce7',
      selected: false
    },
    {
      id: '6',
      name: 'Log Dosyaları',
      description: 'Sistem log kayıtları',
      size: '67 MB',
      icon: 'list',
      color: '#a29bfe',
      selected: true
    }
  ]);

  // Animasyon değerleri - her kart için ayrı animasyon değeri
  const cardSlideValues = useSharedValue(Array(6).fill(0)); // 6 kart var

  // Her kart için animasyon style'ları - tüm kartlar için ayrı ayrı
  const card0Style = useAnimatedStyle(() => ({
    transform: [{ translateX: cardSlideValues.value[0] }],
    opacity: cardSlideValues.value[0] > 0 ? 0 : 1,
  }));
  const card1Style = useAnimatedStyle(() => ({
    transform: [{ translateX: cardSlideValues.value[1] }],
    opacity: cardSlideValues.value[1] > 0 ? 0 : 1,
  }));
  const card2Style = useAnimatedStyle(() => ({
    transform: [{ translateX: cardSlideValues.value[2] }],
    opacity: cardSlideValues.value[2] > 0 ? 0 : 1,
  }));
  const card3Style = useAnimatedStyle(() => ({
    transform: [{ translateX: cardSlideValues.value[3] }],
    opacity: cardSlideValues.value[3] > 0 ? 0 : 1,
  }));
  const card4Style = useAnimatedStyle(() => ({
    transform: [{ translateX: cardSlideValues.value[4] }],
    opacity: cardSlideValues.value[4] > 0 ? 0 : 1,
  }));
  const card5Style = useAnimatedStyle(() => ({
    transform: [{ translateX: cardSlideValues.value[5] }],
    opacity: cardSlideValues.value[5] > 0 ? 0 : 1,
  }));

  const getCardStyle = (index: number) => {
    switch (index) {
      case 0: return card0Style;
      case 1: return card1Style;
      case 2: return card2Style;
      case 3: return card3Style;
      case 4: return card4Style;
      case 5: return card5Style;
      default: return card0Style;
    }
  };

  const startScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setScanComplete(false);
    
    // Simüle edilmiş tarama
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        setScanProgress(100);
        setIsScanning(false);
        setScanComplete(true);
        clearInterval(interval);
        
        // Toplam boyutu hesapla
        const selectedItems = cleanupItems.filter(item => item.selected);
        const total = selectedItems.reduce((sum, item) => {
          const size = parseFloat(item.size.replace(/[^\d.]/g, ''));
          return sum + size;
        }, 0);
        setTotalSize(`${total.toFixed(1)} GB`);
      } else {
        setScanProgress(progress);
      }
    }, 200);
  };

  const toggleItem = (id: string) => {
    setCleanupItems(items =>
      items.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const startCleanup = () => {
    setIsCleaning(true);
    
    const selectedItems = cleanupItems.filter(item => item.selected);
    
    // Kartlara sırayla sağa doğru kayma efekti
    selectedItems.forEach((item, index) => {
      const itemIndex = cleanupItems.findIndex(cleanupItem => cleanupItem.id === item.id);
      cardSlideValues.value[itemIndex] = withDelay(
        index * 300, // Her kart 300ms arayla
        withTiming(width, { 
          duration: 500, // 500ms animasyon
          easing: Easing.out(Easing.cubic) 
        })
      );
    });
    
    // Tüm animasyonlar tamamlandıktan sonra sayfayı kapat
    const totalAnimationTime = selectedItems.length * 300 + 500;
    const navigationTimer = setTimeout(() => {
      if (navigation) {
        navigation.navigate('DeepCleanProcess');
      }
    }, totalAnimationTime);

    // Cleanup function
    return () => {
      clearTimeout(navigationTimer);
    };
  };

  const selectedItems = useMemo(() => 
    cleanupItems.filter(item => item.selected), 
    [cleanupItems]
  );
  
  const selectedSize = useMemo(() => 
    selectedItems.reduce((sum, item) => {
      const size = parseFloat(item.size.replace(/[^\d.]/g, ''));
      return sum + size;
    }, 0), 
    [selectedItems]
  );

  const handleScanDetail = useCallback((scan: ScanHistoryItem) => {
    setSelectedScan(scan);
    setShowScanDetail(true);
  }, []);

  const handleViewAllHistory = useCallback(() => {
    if (navigation) {
      navigation.navigate('ScanHistory');
    }
  }, [navigation]);

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
              <Ionicons name="scan" size={24} color="white" />
            </View>
            <View>
              <Text style={styles.headerTitle}>Derin Temizlik</Text>
              <Text style={styles.headerSubtitle}>Sistemi derinlemesine tara</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation?.navigate('DeepCleanSettings')}>
            <Ionicons name="settings-outline" size={24} color="#9ca3af" />
          </TouchableOpacity>
        </Animated.View>

        {/* Scan Status */}
        <Animated.View 
          entering={FadeInUp.delay(200).duration(800)}
          style={styles.scanContainer}
        >
          <LinearGradient
            colors={['#1a1c2d', '#2d2d3a']}
            style={styles.scanCard}
          >
            {!isScanning && !scanComplete && (
              <View style={styles.scanPrompt}>
                <Ionicons name="search" size={48} color="#60a5fa" />
                <Text style={styles.scanTitle}>Sistemi Tara</Text>
                <Text style={styles.scanDescription}>
                  Gereksiz dosyaları bulmak için sistemi tarayalım
                </Text>
                <TouchableOpacity style={styles.scanButton} onPress={startScan}>
                  <LinearGradient
                    colors={['#60a5fa', '#8b5cf6']}
                    style={styles.scanButtonGradient}
                  >
                    <Ionicons name="play" size={20} color="white" />
                    <Text style={styles.scanButtonText}>Tarayı Başlat</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )}

            {isScanning && (
              <View style={styles.scanningView}>
                <View style={styles.pulseContainer}>
                  <ProgressRing
                    size={120}
                    strokeWidth={6}
                    progress={scanProgress}
                    color="#60a5fa"
                    backgroundColor="#374151"
                  >
                    <Text style={styles.progressText}>{Math.round(scanProgress)}%</Text>
                  </ProgressRing>
                </View>
                <Text style={styles.scanningTitle}>Sistem Taranıyor...</Text>
                <Text style={styles.scanningDescription}>
                  Dosyalar analiz ediliyor
                </Text>
              </View>
            )}

            {scanComplete && (
              <View style={styles.scanCompleteView}>
                <Ionicons name="checkmark-circle" size={48} color="#34d399" />
                <Text style={styles.completeTitle}>Tarama Tamamlandı!</Text>
                <Text style={styles.completeDescription}>
                  {cleanupItems.length} kategori analiz edildi
                </Text>
                <View style={styles.sizeInfo}>
                  <Text style={styles.sizeLabel}>Toplam Temizlenebilir:</Text>
                  <Text style={styles.sizeValue}>{totalSize}</Text>
                </View>
              </View>
            )}
          </LinearGradient>
        </Animated.View>

        {/* Cleanup Items */}
        {scanComplete && (
          <Animated.View 
            entering={FadeInUp.delay(300).duration(800)}
            style={styles.itemsContainer}
          >
            <Text style={styles.itemsTitle}>Temizlik Seçenekleri</Text>
            
            <View style={styles.itemsList}>
              {cleanupItems.map((item, index) => (
                <Animated.View
                  key={item.id}
                  entering={FadeInUp.delay(400 + index * 100).duration(600)}
                >
                  <Animated.View style={getCardStyle(index)}>
                    <TouchableOpacity
                      style={[
                        styles.itemCard,
                        item.selected && styles.selectedItemCard
                      ]}
                      onPress={() => !isCleaning && toggleItem(item.id)}
                      disabled={isCleaning}
                    >
                      <View style={styles.itemLeft}>
                        <View style={[styles.itemIcon, { backgroundColor: item.color }]}>
                          <Ionicons name={item.icon as any} size={20} color="white" />
                        </View>
                        <View style={styles.itemInfo}>
                          <Text style={styles.itemName}>{item.name}</Text>
                          <Text style={styles.itemDescription}>{item.description}</Text>
                        </View>
                      </View>
                      <View style={styles.itemRight}>
                        <Text style={styles.itemSize}>{item.size}</Text>
                        <View style={[
                          styles.checkbox,
                          item.selected && styles.checkedBox
                        ]}>
                          {item.selected && (
                            <Ionicons name="checkmark" size={16} color="white" />
                          )}
                        </View>
                      </View>
                    </TouchableOpacity>
                  </Animated.View>
                </Animated.View>
              ))}
            </View>
          </Animated.View>
        )}

        {/* Cleanup Summary */}
        {scanComplete && selectedItems.length > 0 && (
          <Animated.View 
            entering={FadeInUp.delay(500).duration(800)}
            style={styles.summaryContainer}
          >
            <GradientCard
              colors={['#34d399', '#10b981']}
              style={styles.summaryCard}
              onPress={startCleanup}
            >
              <View style={styles.summaryContent}>
                <Ionicons name="trash" size={20} color="white" />
                <View style={styles.summaryInfo}>
                  <Text style={styles.summaryTitle}>Temizliği Başlat</Text>
                  <Text style={styles.summaryDescription}>
                    {selectedItems.length} kategori • {selectedSize.toFixed(1)} GB
                  </Text>
                </View>
                <Ionicons name="arrow-forward" size={24} color="white" />
              </View>
            </GradientCard>
          </Animated.View>
        )}

        {/* Scan History */}
        <Animated.View 
          entering={FadeInUp.delay(600).duration(800)}
          style={styles.historyContainer}
        >
          <View style={styles.historyHeader}>
            <View style={styles.historyTitleContainer}>
              <Ionicons name="time-outline" size={20} color="#60a5fa" />
              <Text style={styles.historyTitle}>Son Taramalar</Text>
            </View>
            <TouchableOpacity onPress={handleViewAllHistory}>
              <Text style={styles.viewAllText}>Tümünü Gör</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.historyList}>
            {scanHistory.map((item, index) => (
              <Animated.View
                key={item.id}
                entering={FadeInUp.delay(700 + index * 100).duration(600)}
              >
                <TouchableOpacity 
                  style={styles.historyItem}
                  onPress={() => handleScanDetail(item)}
                >
                  <View style={styles.historyLeft}>
                    <View style={[
                      styles.statusIndicator,
                      { backgroundColor: item.status === 'success' ? '#34d399' : 
                                        item.status === 'warning' ? '#f59e0b' : '#ef4444' }
                    ]}>
                      <Ionicons 
                        name={item.status === 'success' ? 'checkmark' : 
                              item.status === 'warning' ? 'warning' : 'close'} 
                        size={12} 
                        color="white" 
                      />
                    </View>
                    <View style={styles.historyInfo}>
                      <Text style={styles.historyDate}>{item.date}</Text>
                      <Text style={styles.historyTime}>{item.time}</Text>
                      <Text style={styles.historyResult}>{item.result}</Text>
                    </View>
                  </View>
                  <View style={styles.historyRight}>
                    <Text style={styles.historySize}>{item.size}</Text>
                    <Ionicons name="chevron-forward" size={16} color="#6b7280" />
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </Animated.View>
      </ScrollView>

      {/* Scan Detail Modal */}
      <Modal
        visible={showScanDetail}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowScanDetail(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowScanDetail(false)}
            >
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Tarama Detayları</Text>
            <View style={styles.placeholder} />
          </View>

          {selectedScan && (
            <ScrollView style={styles.modalContent}>
              <View style={styles.detailCard}>
                <View style={styles.detailHeader}>
                  <View style={[
                    styles.detailStatusIndicator,
                    { backgroundColor: selectedScan.status === 'success' ? '#34d399' : 
                                      selectedScan.status === 'warning' ? '#f59e0b' : '#ef4444' }
                  ]}>
                    <Ionicons 
                      name={selectedScan.status === 'success' ? 'checkmark' : 
                            selectedScan.status === 'warning' ? 'warning' : 'close'} 
                      size={20} 
                      color="white" 
                    />
                  </View>
                  <View style={styles.detailInfo}>
                    <Text style={styles.detailDate}>{selectedScan.date}</Text>
                    <Text style={styles.detailTime}>{selectedScan.time}</Text>
                  </View>
                </View>

                <View style={styles.detailSection}>
                  <Text style={styles.detailSectionTitle}>Tarama Sonucu</Text>
                  <Text style={styles.detailResult}>{selectedScan.result}</Text>
                </View>

                <View style={styles.detailSection}>
                  <Text style={styles.detailSectionTitle}>Temizlenen Boyut</Text>
                  <Text style={styles.detailSize}>{selectedScan.size}</Text>
                </View>

                <View style={styles.detailSection}>
                  <Text style={styles.detailSectionTitle}>Tarama Süresi</Text>
                  <Text style={styles.detailDuration}>2 dakika 34 saniye</Text>
                </View>

                <View style={styles.detailSection}>
                  <Text style={styles.detailSectionTitle}>Taranan Kategoriler</Text>
                  <View style={styles.categoriesList}>
                    <View style={styles.categoryItem}>
                      <Ionicons name="trash" size={16} color="#ff6b6b" />
                      <Text style={styles.categoryText}>Önbellek Dosyaları</Text>
                      <Text style={styles.categorySize}>245 MB</Text>
                    </View>
                    <View style={styles.categoryItem}>
                      <Ionicons name="document" size={16} color="#4ecdc4" />
                      <Text style={styles.categoryText}>Geçici Dosyalar</Text>
                      <Text style={styles.categorySize}>128 MB</Text>
                    </View>
                    <View style={styles.categoryItem}>
                      <Ionicons name="folder" size={16} color="#f9ca24" />
                      <Text style={styles.categoryText}>Büyük Dosyalar</Text>
                      <Text style={styles.categorySize}>856 MB</Text>
                    </View>
                    <View style={styles.categoryItem}>
                      <Ionicons name="list" size={16} color="#a29bfe" />
                      <Text style={styles.categoryText}>Log Dosyaları</Text>
                      <Text style={styles.categorySize}>67 MB</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.detailSection}>
                  <Text style={styles.detailSectionTitle}>Sistem Bilgileri</Text>
                  <View style={styles.systemInfo}>
                    <View style={styles.systemInfoRow}>
                      <Text style={styles.systemInfoLabel}>İşletim Sistemi:</Text>
                      <Text style={styles.systemInfoValue}>Android 14</Text>
                    </View>
                    <View style={styles.systemInfoRow}>
                      <Text style={styles.systemInfoLabel}>Cihaz Modeli:</Text>
                      <Text style={styles.systemInfoValue}>Samsung Galaxy S24</Text>
                    </View>
                    <View style={styles.systemInfoRow}>
                      <Text style={styles.systemInfoLabel}>Uygulama Versiyonu:</Text>
                      <Text style={styles.systemInfoValue}>v1.2.3</Text>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          )}
        </SafeAreaView>
      </Modal>
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
    paddingBottom: 180,
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
    backgroundColor: '#8b5cf6',
    padding: 12,
    borderRadius: 50,
    marginRight: 16,
    shadowColor: '#8b5cf6',
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
  scanContainer: {
    marginBottom: 24,
  },
  scanCard: {
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  scanPrompt: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  scanTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    marginTop: 16,
    marginBottom: 8,
  },
  scanDescription: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    marginBottom: 24,
  },
  scanButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  scanButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  scanButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  scanningView: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  pulseContainer: {
    marginBottom: 20,
  },
  progressText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  scanningTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
  },
  scanningDescription: {
    fontSize: 14,
    color: '#9ca3af',
  },
  scanCompleteView: {
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
  sizeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sizeLabel: {
    fontSize: 14,
    color: '#9ca3af',
    marginRight: 8,
  },
  sizeValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34d399',
  },
  itemsContainer: {
    marginBottom: 24,
  },
  itemsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 16,
  },
  itemsList: {
    gap: 12,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1a1c2d',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  selectedItemCard: {
    borderColor: '#60a5fa',
    backgroundColor: '#1e3a8a',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  itemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 12,
    color: '#9ca3af',
  },
  itemRight: {
    alignItems: 'flex-end',
  },
  itemSize: {
    fontSize: 14,
    fontWeight: '600',
    color: '#60a5fa',
    marginBottom: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedBox: {
    backgroundColor: '#60a5fa',
    borderColor: '#60a5fa',
  },
  summaryContainer: {
    position: 'absolute',
    bottom: 80,
    left: 16,
    right: 16,
    zIndex: 1000,
    elevation: 5,
    backgroundColor: '#0d0f1a',
    paddingBottom: 16,
  },
  summaryCard: {
    borderRadius: 16,
  },
  summaryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  summaryInfo: {
    flex: 1,
    marginLeft: 12,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    marginBottom: 1,
  },
  summaryDescription: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  historyContainer: {
    marginTop: 24,
    marginBottom: 24,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  historyTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginLeft: 8,
  },
  viewAllText: {
    fontSize: 14,
    color: '#60a5fa',
    fontWeight: '500',
  },
  historyList: {
    gap: 12,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1a1c2d',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  historyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statusIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  historyInfo: {
    flex: 1,
  },
  historyDate: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    marginBottom: 2,
  },
  historyTime: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 4,
  },
  historyResult: {
    fontSize: 12,
    color: '#d1d5db',
  },
  historyRight: {
    alignItems: 'flex-end',
  },
  historySize: {
    fontSize: 14,
    fontWeight: '600',
    color: '#60a5fa',
    marginBottom: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#0d0f1a',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  closeButton: {
    padding: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  placeholder: {
    width: 40,
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  detailCard: {
    backgroundColor: '#1a1c2d',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#374151',
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  detailStatusIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  detailInfo: {
    flex: 1,
  },
  detailDate: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  detailTime: {
    fontSize: 14,
    color: '#9ca3af',
  },
  detailSection: {
    marginBottom: 24,
  },
  detailSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    marginBottom: 8,
  },
  detailResult: {
    fontSize: 14,
    color: '#d1d5db',
  },
  detailSize: {
    fontSize: 18,
    fontWeight: '600',
    color: '#60a5fa',
  },
  detailDuration: {
    fontSize: 14,
    color: '#d1d5db',
  },
  categoriesList: {
    gap: 12,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2d2d3a',
    padding: 12,
    borderRadius: 8,
  },
  categoryText: {
    flex: 1,
    fontSize: 14,
    color: 'white',
    marginLeft: 12,
  },
  categorySize: {
    fontSize: 14,
    fontWeight: '600',
    color: '#60a5fa',
  },
  systemInfo: {
    gap: 8,
  },
  systemInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  systemInfoLabel: {
    fontSize: 14,
    color: '#9ca3af',
  },
  systemInfoValue: {
    fontSize: 14,
    color: 'white',
    fontWeight: '500',
  },
});