import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useRef, useState } from "react";
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  View as RNView,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ShinyButton from "../../components/ShinyButton";
import { Text, View } from "../../components/Themed";

const GOLD = "#B8803C";
const BG = "#FBFAF9";
const HERO_URI =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBC862XoZCcpCEP-3qxmIrDyS7xYBGxr-Eo_qhCk8j42DD0DviKGhVnfODHhj7xxSNfFYAzsn_40HePGPMCWChx8kJQSDhlJRHcvcugb7dXIsE7wcra8QAhCs8qyOMYiV6gmrMEEUHf50M6Z9kZ5X7D4-06fHHfiesZww-o0Bx8qIe6EXpEySCqymN8yiR673RrF4qtnK1Ns9ZVprvtiXY6ZkXec5KGqgt3io2duEFywer7IJbebAq-wYa-7OXTWhUcLnPaCGAOFg";

export default function ForgotPassword() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef(null);

  const pos = useRef({});
  const setPos = (key) => (e) => (pos.current[key] = e.nativeEvent.layout.y);
  const scrollToKey = (key) => {
    requestAnimationFrame(() => {
      const y = pos.current[key] ?? 0;
      scrollRef.current?.scrollTo({ y: Math.max(0, y - 18), animated: true });
    });
  };

  const [value, setValue] = useState("");
  const canSubmit = useMemo(() => value.trim().length > 3, [value]);

  return (
    <View style={styles.screen} lightColor={BG}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.select({ ios: "padding", android: "height" })}>
        <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
          <ScrollView
            ref={scrollRef}
            bounces={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            contentContainerStyle={[styles.scrollContent, { paddingBottom: Math.max(insets.bottom, 18) }]}
          >
            {/* HERO */}
            <RNView style={[styles.heroWrap, { marginTop: insets.top }]}>
              <ImageBackground source={{ uri: HERO_URI }} resizeMode="cover" style={styles.hero} imageStyle={styles.heroImg}>
                <RNView style={styles.heroOverlay} pointerEvents="none" />

                <Pressable onPress={() => router.back()} hitSlop={12} style={styles.heroBackBtn}>
                  <Feather name="chevron-left" size={22} color="#1b180d" />
                </Pressable>

                <RNView style={styles.topBar}>
                  <RNView style={{ width: 40 }} />
                  <Text style={styles.brandTop}>ZEENAT</Text>
                  <RNView style={{ width: 40 }} />
                </RNView>
              </ImageBackground>
            </RNView>

            <Text style={styles.brandBelow}>Zeenat Styles</Text>

            <RNView style={styles.form}>
              <RNView style={styles.head}>
                <Text
                  style={styles.h1}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  Forgot Password?
                </Text>
                <Text style={styles.h2}>
                  Enter your registered phone number or email to receive a verification code.
                </Text>
              </RNView>

              <RNView onLayout={setPos("field")} style={styles.field}>
                <Text style={styles.label}>Phone or Email</Text>
                <TextInput
                  value={value}
                  onChangeText={setValue}
                  placeholder="Enter your phone or email"
                  placeholderTextColor="rgba(139,117,91,0.55)"
                  style={styles.input}
                  autoCapitalize="none"
                  returnKeyType="done"
                  onFocus={() => scrollToKey("field")}
                />
              </RNView>

              <RNView style={styles.actions}>
                <ShinyButton
                  label="Send Code"
                  disabled={!canSubmit}
                  onPress={() => router.push("/(auth)/verify-otp")}
                  style={{ width: "100%" }}
                />

                <Pressable onPress={() => router.replace("/(auth)/login")}>
                  <Text style={styles.linkBold}>Back to Login</Text>
                </Pressable>
              </RNView>
            </RNView>
          </ScrollView>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },
  scrollContent: { paddingBottom: 18 },

  heroWrap: {
    width: "100%",
    height: 260,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: "hidden",
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.16,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 14 },
  },
  hero: { flex: 1 },
  heroImg: { borderBottomLeftRadius: 40, borderBottomRightRadius: 40 },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.20)" },

  heroBackBtn: {
    position: "absolute",
    left: 16,
    top: 16,
    width: 44,
    height: 44,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.85)",
    borderWidth: 1,
    borderColor: "rgba(227,220,212,1)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
  },

  topBar: {
    position: "absolute",
    top: 18,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brandTop: { color: "#fff", fontSize: 24, fontWeight: "900", letterSpacing: 6, textTransform: "uppercase" },

  brandBelow: { marginTop: 10, textAlign: "center", fontSize: 16, fontWeight: "900", color: "#1b180d" },

  form: { paddingHorizontal: 22, paddingTop: 12, paddingBottom: 24, maxWidth: 520, width: "100%", alignSelf: "center" },

  head: { alignItems: "center", marginTop: 10, marginBottom: 18 },
  h1: { fontSize: 40, fontWeight: "900", color: "#191510", textAlign: "center" },
  h2: { marginTop: 10, fontSize: 16, color: "rgba(99,92,82,0.95)", textAlign: "center", lineHeight: 24, maxWidth: 340 },

  field: { width: "100%" },
  label: { fontSize: 13, fontWeight: "800", color: "#191510", marginBottom: 8, paddingLeft: 14 },

  input: {
    height: 56,
    borderRadius: 999,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "rgba(186,129,59,0.30)",
    paddingHorizontal: 18,
    color: "#191510",
    fontSize: 15,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },

  actions: { marginTop: 18, alignItems: "center", gap: 14 },
  linkBold: { color: GOLD, fontSize: 18, fontWeight: "900" },
});
