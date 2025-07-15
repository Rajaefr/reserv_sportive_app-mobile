import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';

const tabs = [
  { name: 'home', icon: 'home-outline' },
  { name: 'history', icon: 'history' },
  { name: 'settings', icon: 'settings-outline' },
];

const FloatingTabBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleTabPress = (tabName) => {
    if (tabName === 'history') {
      router.push('/screens/NotificationScreen'); 
    } else if (tabName === 'home') {
      router.push('/screens/HomeScreen');
    } else if (tabName === 'settings') {
      router.push('/screens/ParametresScreen');
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const isActive = pathname.includes(tab.name);
          const IconComponent = tab.icon === 'history' ? MaterialIcons : Ionicons;

          return (
            <TouchableOpacity
              key={tab.name}
              style={styles.tab}
              onPress={() => handleTabPress(tab.name)}
              activeOpacity={0.8}
            >
              <IconComponent
                name={tab.icon}
                size={24}
                color={isActive ? '#1FA739' : '#FFFFFF'}
              />
              {isActive && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default FloatingTabBar;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
    zIndex: 100,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.19)',
    width: width * 0.9,
    borderRadius: 22,
    padding: 12,
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 12,
    elevation: 10,
    borderWidth: 2,
    borderColor: '#999',
   
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -4,
    height: 3,
    width: 24,
    backgroundColor: '#1FA739',
    borderRadius: 2,
  },
});
