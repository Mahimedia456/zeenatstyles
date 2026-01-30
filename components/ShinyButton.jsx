import { Feather } from "@expo/vector-icons";
import { useEffect, useMemo, useRef } from "react";
import { Animated, Easing, Pressable, StyleSheet, View } from "react-native";
import { Text } from "./Themed";

const GOLD = "#B8803C";

export default function ShinyButton({
  // ✅ support both
  title,
  label,

  onPress,
  style,
  textStyle,

  leftIcon,
  disabled = false,

  // ✅ solid / soft
  variant = "solid",
  showArrow = true,
}) {
  const shine = useRef(new Animated.Value(0)).current;

  const text = title ?? label ?? "";

  const isSoft = variant === "soft";

  useEffect(() => {
    if (disabled) return;

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
  }, [shine, disabled]);

  const translateX = shine.interpolate({
    inputRange: [0, 1],
    outputRange: [-140, 260],
  });

  const baseBg = isSoft ? "rgba(184,128,60,0.12)" : GOLD;
  const borderColor = isSoft ? "rgba(184,128,60,0.35)" : "transparent";
  const txtColor = isSoft ? GOLD : "#fff";

  const ripple = useMemo(
    () => ({ color: isSoft ? "rgba(184,128,60,0.14)" : "rgba(255,255,255,0.12)" }),
    [isSoft]
  );

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      android_ripple={ripple}
      style={({ pressed }) => [
        styles.btn,
        { opacity: disabled ? 0.55 : 1 },
        style,
        pressed ? styles.pressed : null,
      ]}
    >
      <View style={[styles.base, { backgroundColor: baseBg, borderColor }]} />

      {/* ✅ shine only for solid */}
      {!isSoft && !disabled && (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.shine,
            {
              transform: [{ translateX }, { rotate: "18deg" }],
            },
          ]}
        />
      )}

      <View style={styles.content}>
        {!!leftIcon && (
          <Feather name={leftIcon} size={18} color={txtColor} style={{ marginRight: 8 }} />
        )}

        <Text style={[styles.text, { color: txtColor }, textStyle]} numberOfLines={1}>
          {text}
        </Text>

        {showArrow ? (
          <Feather name="arrow-right" size={18} color={txtColor} style={{ marginLeft: 8 }} />
        ) : null}
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
  pressed: { transform: [{ scale: 0.985 }] },

  base: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 1,
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
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },

  text: { fontSize: 16, fontWeight: "900" },
});
