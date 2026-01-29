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

export default function VerifyOtp() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef(null);

  const [d1, setD1] = useState("");
  const [d2, setD2] = useState("");
  const [d3, setD3] = useState("");
  const [d4, setD4] = useState("");

  const r1 = useRef(null);
  const r2 = useRef(null);
  const r3 = useRef(null);
  const r4 = useRef(null);

  const otp = `${d1}${d2}${d3}${d4}`;
  const canVerify = useMemo(() => otp.length === 4, [otp]);

  const onChange = (setter, nextRef) => (t) => {
    const v = (t || "").replace(/\D/g, "").slice(-1);
    setter(v);
    if (v && nextRef?.current) nextRef.current.focus();
  };

  const onKeyPress = (val, prevRef, setter) => (e) => {
    if (e.nativeEvent.key === "Backspace" && !val && prevRef?.current) {
      prevRef.current.focus();
      setter("");
    }
  };

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
              <RNView style={styles.center}>
                <RNView style={styles.iconCircle}>
                  <Feather name="shield" size={30} color={GOLD} />
                </RNView>

                <Text style={styles.h1}>Verify OTP</Text>
                <Text style={styles.h2}>Enter the 4-digit code sent to your phone or email</Text>

                <RNView style={styles.otpRow}>
                  <TextInput
                    ref={r1}
                    value={d1}
                    onChangeText={onChange(setD1, r2)}
                    keyboardType="number-pad"
                    maxLength={1}
                    style={[styles.otpBox, d1 ? styles.otpActive : styles.otpIdle]}
                    autoFocus
                  />
                  <TextInput
                    ref={r2}
                    value={d2}
                    onChangeText={onChange(setD2, r3)}
                    onKeyPress={onKeyPress(d2, r1, setD2)}
                    keyboardType="number-pad"
                    maxLength={1}
                    style={[styles.otpBox, d2 ? styles.otpActive : styles.otpIdle]}
                  />
                  <TextInput
                    ref={r3}
                    value={d3}
                    onChangeText={onChange(setD3, r4)}
                    onKeyPress={onKeyPress(d3, r2, setD3)}
                    keyboardType="number-pad"
                    maxLength={1}
                    style={[styles.otpBox, d3 ? styles.otpActive : styles.otpIdle]}
                  />
                  <TextInput
                    ref={r4}
                    value={d4}
                    onChangeText={onChange(setD4, null)}
                    onKeyPress={onKeyPress(d4, r3, setD4)}
                    keyboardType="number-pad"
                    maxLength={1}
                    style={[styles.otpBox, d4 ? styles.otpActive : styles.otpIdle]}
                  />
                </RNView>

                <RNView style={{ width: "100%", marginTop: 18 }}>
                  <ShinyButton
                    label="Verify"
                    disabled={!canVerify}
                    onPress={() => router.push("/(auth)/reset-password")}
                    style={{ width: "100%" }}
                  />
                </RNView>

                <RNView style={{ alignItems: "center", marginTop: 18 }}>
                  <Text style={styles.muted}>Didn't receive the code?</Text>
                  <Pressable onPress={() => {}}>
                    <Text style={styles.linkBold}>Resend Code</Text>
                  </Pressable>
                </RNView>
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
    height: 240,
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

  center: { alignItems: "center", paddingTop: 16, paddingBottom: 10 },

  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 999,
    backgroundColor: "rgba(184,128,60,0.10)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  h1: { fontSize: 42, fontWeight: "900", color: "#191510", textAlign: "center" },
  h2: { marginTop: 8, fontSize: 16, color: "rgba(27,24,13,0.55)", textAlign: "center", lineHeight: 24, maxWidth: 320 },

  otpRow: { flexDirection: "row", gap: 14, marginTop: 22 },
  otpBox: {
    width: 68,
    height: 68,
    borderRadius: 18,
    borderWidth: 2,
    backgroundColor: "#fff",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "900",
    color: GOLD,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  otpIdle: { borderColor: "rgba(227,220,212,1)" },
  otpActive: { borderColor: GOLD },

  muted: { color: "rgba(27,24,13,0.55)", fontSize: 14, fontWeight: "700" },
  linkBold: { marginTop: 8, color: GOLD, fontSize: 18, fontWeight: "900" },
});
