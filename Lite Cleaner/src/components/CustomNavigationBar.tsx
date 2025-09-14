import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface CustomNavigationBarProps {
  activeTab: 'quick' | 'home' | 'deep';
  onTabPress: (tab: 'quick' | 'home' | 'deep') => void;
}

export const CustomNavigationBar: React.FC<CustomNavigationBarProps> = ({
  activeTab,
  onTabPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.navContent}>
        {/* Hızlı Temizlik */}
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => onTabPress('quick')}
        >
          <Ionicons 
            name="flash" 
            size={24} 
            color={activeTab === 'quick' ? '#f9ca24' : '#9ca3af'} 
          />
          <Text style={[
            styles.tabText,
            activeTab === 'quick' && styles.activeTabText
          ]}>
            Hızlı Temizlik
          </Text>
        </TouchableOpacity>

        {/* Ana Sayfa - Yuvarlak */}
        <TouchableOpacity
          style={styles.centerButton}
          onPress={() => onTabPress('home')}
        >
          <View style={[
            styles.roundButton,
            activeTab === 'home' && styles.activeRoundButton
          ]}>
            <Ionicons 
              name="home" 
              size={24} 
              color={activeTab === 'home' ? 'white' : '#9ca3af'} 
            />
          </View>
          <Text style={[
            styles.tabText,
            styles.centerButtonText,
            activeTab === 'home' && styles.activeTabText
          ]}>
            Ana Sayfa
          </Text>
        </TouchableOpacity>

        {/* Derin Temizlik */}
        <TouchableOpacity
          style={styles.tabButton}
          onPress={() => onTabPress('deep')}
        >
          <Ionicons 
            name="scan" 
            size={24} 
            color={activeTab === 'deep' ? '#06b6d4' : '#9ca3af'} 
          />
          <Text style={[
            styles.tabText,
            activeTab === 'deep' && styles.activeTabText
          ]}>
            Derin Temizlik
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    paddingBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
    zIndex: 1000,
  },
  navContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginHorizontal: 16,
    marginBottom: 8,
    backgroundColor: 'rgba(26, 28, 45, 0.95)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#374151',
    backdropFilter: 'blur(10px)',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  centerButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginTop: -30, // Butonu daha yukarıya kaldır
  },
  roundButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    borderWidth: 2,
    borderColor: '#374151',
  },
  activeRoundButton: {
    backgroundColor: '#8b5cf6',
    borderColor: '#8b5cf6',
  },
  tabText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#9ca3af',
    marginTop: 4,
    textAlign: 'center',
  },
  activeTabText: {
    fontWeight: '600',
  },
  centerButtonText: {
    marginTop: 4, // Metni daha az aşağıya it
  },
});
