import { useEffect, useRef } from "react";
import { Animated, Easing, Pressable, StyleSheet, View } from "react-native";
import { Text } from "./Themed";

const GOLD = "#B8803C";

export default function ShinyButton({ label, onPress, style, textStyle }) {
  const shine = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(shine, {
          toValue: 1,
          duration: 1400,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.delay(700),
        Animated.timing(shine, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );

    loop.start();
    return () => loop.stop();
  }, [shine]);

  const translateX = shine.interpolate({
    inputRange: [0, 1],
    outputRange: [-140, 260],
  });

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.btn, style, pressed && { transform: [{ scale: 0.985 }] }]}>
      <View style={styles.base} />
      <Animated.View
        pointerEvents="none"
        style={[
          styles.shine,
          {
            transform: [{ translateX }, { rotate: "18deg" }],
          },
        ]}
      />
      <View style={styles.content}>
        <Text style={[styles.text, textStyle]}>{label}</Text>
        <Text style={[styles.arrow, textStyle]}>→</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 56,
    borderRadius: 999,
    overflow: "hidden",
    elevation: 5,
  },
  base: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: GOLD,
  },
  shine: {
    position: "absolute",
    top: -18,
    left: -120,
    width: 90,
    height: 150,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.22)",
  },
  content: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: { color: "#fff", fontSize: 16.5, fontWeight: "900" },
  arrow: { color: "#fff", fontSize: 18, fontWeight: "900" },
});
