// app/(auth)/splash.jsx
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Easing, Image, StyleSheet, Text, View } from "react-native";

const GOLD = "#B8803C";

export default function SplashScreen() {
  const router = useRouter();

  // Anim values
  const fade = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.96)).current;
  const shine = useRef(new Animated.Value(0)).current;
  const dot1 = useRef(new Animated.Value(0.3)).current;
  const dot2 = useRef(new Animated.Value(0.3)).current;
  const dot3 = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    // Intro: fade + scale in
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 650,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 650,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    // Shine loop (subtle highlight bar)
    Animated.loop(
      Animated.timing(shine, {
        toValue: 1,
        duration: 1400,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      })
    ).start();

    // Dots loop
    const pulse = (a, delay) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(a, { toValue: 1, duration: 450, useNativeDriver: true }),
          Animated.timing(a, { toValue: 0.3, duration: 450, useNativeDriver: true }),
        ])
      ).start();

    pulse(dot1, 0);
    pulse(dot2, 150);
    pulse(dot3, 300);

    // Navigate after a short time
    const t = setTimeout(() => {
      // Change this to your first onboarding screen route when you create it
      router.replace("/(auth)/onboarding-1");
      // or router.replace("/(auth)/login");
    }, 1800);

    return () => clearTimeout(t);
  }, [router, fade, scale, shine, dot1, dot2, dot3]);

  const translateX = shine.interpolate({
    inputRange: [0, 1],
    outputRange: [-120, 120],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fade, transform: [{ scale }] }}>
        {/* Logo (your icon) */}
        <View style={styles.logoWrap}>
          <Image
            source={require("../../assets/images/icon.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Subtle shine overlay */}
          <Animated.View
            pointerEvents="none"
            style={[
              styles.shine,
              {
                transform: [{ translateX }],
              },
            ]}
          />
        </View>

        {/* Brand Text */}
        <Text style={styles.brand}>Zeenat Styles</Text>
        <Text style={styles.tagline}>Where Loyalty Meets Fashion</Text>

        {/* Optional sale line (comment out if not needed) */}
        <Text style={styles.subTag}>
          Limited Time. Unlimited Style.
        </Text>

        {/* Loading dots */}
        <View style={styles.dotsRow}>
          <Animated.View style={[styles.dot, { opacity: dot1 }]} />
          <Animated.View style={[styles.dot, { opacity: dot2 }]} />
          <Animated.View style={[styles.dot, { opacity: dot3 }]} />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  logoWrap: {
    width: 92,
    height: 92,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    // soft shadow
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
    overflow: "hidden",
    marginBottom: 14,
  },
  logo: {
    width: 62,
    height: 62,
  },

  shine: {
    position: "absolute",
    top: -20,
    left: 0,
    width: 60,
    height: 140,
    backgroundColor: "rgba(184,128,60,0.10)",
    transform: [{ rotate: "20deg" }],
  },

  brand: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "700",
    color: "#111111",
    letterSpacing: 0.2,
  },
  tagline: {
    textAlign: "center",
    marginTop: 6,
    fontSize: 14,
    fontWeight: "600",
    color: GOLD,
  },
  subTag: {
    textAlign: "center",
    marginTop: 8,
    fontSize: 13,
    color: "#6B6B6B",
  },

  dotsRow: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 99,
    backgroundColor: GOLD,
  },
});
