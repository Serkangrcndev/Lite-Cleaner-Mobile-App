import React, { useState } from 'react';
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
import Animated, { 
  FadeInUp,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface ScanHistoryItem {
  id: string;
  date: string;
  time: string;
  result: string;
  size: string;
  status: 'success' | 'warning' | 'error';
}

interface ScanHistoryScreenProps {
  navigation?: any;
}

export const ScanHistoryScreen: React.FC<ScanHistoryScreenProps> = ({ navigation }) => {
  const [showScanDetail, setShowScanDetail] = useState(false);
  const [selectedScan, setSelectedScan] = useState<ScanHistoryItem | null>(null);
  
  const [scanHistory, setScanHistory] = useState<ScanHistoryItem[]>([
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
    },
    {
      id: '6',
      date: '10 Aralık 2024',
      time: '19:45',
      result: 'Tarama Başarılı',
      size: '1.5 GB',
      status: 'success'
    },
    {
      id: '7',
      date: '9 Aralık 2024',
      time: '13:20',
      result: 'Hata: Tarama yarıda kesildi',
      size: '0 MB',
      status: 'error'
    },
    {
      id: '8',
      date: '8 Aralık 2024',
      time: '10:15',
      result: 'Tarama Başarılı',
      size: '2.3 GB',
      status: 'success'
    },
    {
      id: '9',
      date: '7 Aralık 2024',
      time: '15:30',
      result: 'Tarama Başarılı',
      size: '1.1 GB',
      status: 'success'
    },
    {
      id: '10',
      date: '6 Aralık 2024',
      time: '12:00',
      result: 'Uyarı: Yetersiz depolama alanı',
      size: '800 MB',
      status: 'warning'
    }
  ]);

  const handleScanDetail = (scan: ScanHistoryItem) => {
    setSelectedScan(scan);
    setShowScanDetail(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return '#34d399';
      case 'warning': return '#f59e0b';
      case 'error': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return 'checkmark';
      case 'warning': return 'warning';
      case 'error': return 'close';
      default: return 'help';
    }
  };

  const totalScans = scanHistory.length;
  const successfulScans = scanHistory.filter(scan => scan.status === 'success').length;
  const totalCleaned = scanHistory.reduce((sum, scan) => {
    const size = parseFloat(scan.size.replace(/[^\d.]/g, ''));
    return sum + size;
  }, 0);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {/* Header */}
      <Animated.View 
        entering={FadeInUp.delay(100).duration(800)}
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
          <Text style={styles.headerTitle}>Tarama Geçmişi</Text>
          <Text style={styles.headerSubtitle}>Tüm tarama kayıtları</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="filter-outline" size={24} color="#9ca3af" />
        </TouchableOpacity>
      </Animated.View>

      {/* Statistics */}
      <Animated.View 
        entering={FadeInUp.delay(200).duration(800)}
        style={styles.statsContainer}
      >
        <LinearGradient
          colors={['#1a1c2d', '#2d2d3a']}
          style={styles.statsCard}
        >
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{totalScans}</Text>
              <Text style={styles.statLabel}>Toplam Tarama</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{successfulScans}</Text>
              <Text style={styles.statLabel}>Başarılı</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{totalCleaned.toFixed(1)} GB</Text>
              <Text style={styles.statLabel}>Toplam Temizlik</Text>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>

      {/* History List */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View 
          entering={FadeInUp.delay(300).duration(800)}
          style={styles.historyContainer}
        >
          <Text style={styles.historyTitle}>Tüm Taramalar</Text>
          
          <View style={styles.historyList}>
            {scanHistory.map((item, index) => (
              <Animated.View
                key={item.id}
                entering={FadeInUp.delay(400 + index * 100).duration(600)}
              >
                <TouchableOpacity 
                  style={styles.historyItem}
                  onPress={() => handleScanDetail(item)}
                >
                  <View style={styles.historyLeft}>
                    <View style={[
                      styles.statusIndicator,
                      { backgroundColor: getStatusColor(item.status) }
                    ]}>
                      <Ionicons 
                        name={getStatusIcon(item.status) as any} 
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
                    { backgroundColor: getStatusColor(selectedScan.status) }
                  ]}>
                    <Ionicons 
                      name={getStatusIcon(selectedScan.status) as any} 
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  backButton: {
    padding: 8,
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
  statsContainer: {
    margin: 16,
  },
  statsCard: {
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#60a5fa',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#374151',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  historyContainer: {
    marginBottom: 24,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 16,
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
