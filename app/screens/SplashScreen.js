
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Easing,
    Image,
    ImageBackground,
    StatusBar,
    StyleSheet
} from 'react-native';

export default function SplashScreen() {
  const router = useRouter();

  const translateY = useRef(new Animated.Value(100)).current;
  const scale = useRef(new Animated.Value(0.5)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 1500,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 1500,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 2000,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        router.replace('/screens/LoginScreen');
      }, 1050); // délai après animation avant redirection
    });
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/images/background_app.jpg')}
      resizeMode="cover"
      style={styles.background}
    >
      <LinearGradient
        colors={['rgba(34, 39, 34, 0.31)', 'rgba(147, 148, 150, 0.32)']}
        style={styles.gradient}
      >
        <StatusBar barStyle="light-content" backgroundColor="#111827" />

        <Animated.View
          style={[
            styles.logoCard,
            {
              transform: [{ translateY }, { scale }],
              opacity,
            },
          ]}
        >
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>

        <Animated.Text
          style={[
            styles.subtitle,
            { opacity, transform: [{ translateY }] },
          ]}
        >
          Office Chérifien des Phosphates 
        </Animated.Text>
        <Animated.Text
          style={[
            styles.title,
            { opacity, transform: [{ translateY }] },
          ]}
        >
           <Animated.Text
          style={[
            styles.subtitle,
            { opacity, transform: [{ translateY }] },
          ]}
        >
         Khouribga
        </Animated.Text>
        </Animated.Text>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.31)',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'white',
    

  },
  logo: {
    width: 180,
    height: 180,
  },
  subtitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center', // use center for consistency
    position: 'absolute',
    bottom:  60, // adjust as needed
    left: 20,
    right: 20,
},
title: {
    color: 'white',
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center', // use center for consistency
    position: 'absolute',
    bottom: 40, // adjust as needed
    left: 20,
    right: 20,
},

});
