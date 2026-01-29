import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useRef, useState } from "react";
import {
  ImageBackground,
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

export default function ResetPassword() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const scrollRef = useRef(null);
  const p1InputRef = useRef(null);
  const p2InputRef = useRef(null);

  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [s1, setS1] = useState(true);
  const [s2, setS2] = useState(true);

  const canSubmit = useMemo(
    () => p1.trim().length >= 4 && p2.trim().length >= 4,
    [p1, p2]
  );

  const scrollToBottomSoon = () => {
    // ✅ simple + reliable (no measureLayout error)
    requestAnimationFrame(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    });
  };

  return (
    <View style={styles.screen} lightColor={BG}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.select({ ios: "padding", android: "height" })}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          ref={scrollRef}
          bounces={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[
            styles.scrollContent,
            // ✅ keyboard close pe extra space nahi — sirf safe area
            { paddingBottom: Math.max(insets.bottom, 18) },
          ]}
        >
          {/* HERO (same as login) */}
          <RNView style={[styles.heroWrap, { marginTop: insets.top }]}>
            <ImageBackground
              source={{ uri: HERO_URI }}
              resizeMode="cover"
              style={styles.hero}
              imageStyle={styles.heroImg}
            >
              <RNView style={styles.heroOverlay} pointerEvents="none" />

              {/* Back on HERO */}
              <Pressable
                onPress={() => router.back()}
                hitSlop={12}
                style={styles.heroBackBtn}
              >
                <Feather name="chevron-left" size={22} color="#fff" />
              </Pressable>

              {/* Center brand text on HERO */}
              <RNView style={styles.topBar}>
                <RNView style={{ width: 40 }} />
                <Text style={styles.brandTop}>ZEENAT</Text>
                <RNView style={{ width: 40 }} />
              </RNView>
            </ImageBackground>
          </RNView>

          {/* FORM */}
          <RNView style={styles.form}>
            {/* ✅ Hero ke baad Zeenat Styles (same placement vibe) */}
            <Text style={styles.smallHeader}>Zeenat Styles</Text>

            {/* ✅ gap kam / upar */}
            <RNView style={styles.head}>
              <Text style={styles.h1}>Reset Password</Text>
              <Text style={styles.h2}>Create a new password for your account</Text>
            </RNView>

            <RNView style={styles.fields}>
              <RNView style={styles.field}>
                <Text style={styles.label}>New Password</Text>

                <RNView style={styles.inputWrap}>
                  <TextInput
                    ref={p1InputRef}
                    value={p1}
                    onChangeText={setP1}
                    placeholder="Enter new password"
                    placeholderTextColor="rgba(139,117,91,0.55)"
                    style={[styles.input, styles.inputWithIcon]}
                    secureTextEntry={s1}
                    returnKeyType="next"
                    onFocus={scrollToBottomSoon}
                    onSubmitEditing={() => p2InputRef.current?.focus?.()}
                  />
                  <Pressable
                    onPress={() => setS1((v) => !v)}
                    hitSlop={12}
                    style={styles.eyeBtn}
                  >
                    <Feather name={s1 ? "eye" : "eye-off"} size={20} color={GOLD} />
                  </Pressable>
                </RNView>
              </RNView>

              <RNView style={styles.field}>
                <Text style={styles.label}>Confirm New Password</Text>

                <RNView style={styles.inputWrap}>
                  <TextInput
                    ref={p2InputRef}
                    value={p2}
                    onChangeText={setP2}
                    placeholder="Confirm new password"
                    placeholderTextColor="rgba(139,117,91,0.55)"
                    style={[styles.input, styles.inputWithIcon]}
                    secureTextEntry={s2}
                    returnKeyType="done"
                    onFocus={scrollToBottomSoon}
                  />
                  <Pressable
                    onPress={() => setS2((v) => !v)}
                    hitSlop={12}
                    style={styles.eyeBtn}
                  >
                    <Feather name={s2 ? "eye" : "eye-off"} size={20} color={GOLD} />
                  </Pressable>
                </RNView>
              </RNView>
            </RNView>

            <RNView style={styles.actions}>
              <ShinyButton
                label="Reset Password"
                disabled={!canSubmit}
                onPress={() => router.replace("/(auth)/login")}
                style={{ width: "100%" }}
              />

              <Pressable onPress={() => router.replace("/(auth)/login")}>
                <Text style={styles.linkBold}>Back to Login</Text>
              </Pressable>

              <RNView style={styles.secureRow}>
                <Feather name="lock" size={14} color="#000" />
                <Text style={styles.secureText}>SECURE CONNECTION</Text>
              </RNView>
            </RNView>
          </RNView>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },
  scrollContent: { paddingBottom: 18 },

  // HERO same as login
  heroWrap: {
    width: "100%",
    height: 320, // ✅ thora chota so gap kam lage
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
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.20)",
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
  brandTop: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: 6,
    textTransform: "uppercase",
  },

  heroBackBtn: {
    position: "absolute",
    left: 16,
    top: 16,
    width: 44,
    height: 44,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.18)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.22)",
  },

  form: {
    paddingHorizontal: 22,
    paddingTop: 12, // ✅ upar
    paddingBottom: 24,
    maxWidth: 520,
    width: "100%",
    alignSelf: "center",
  },

  smallHeader: {
    textAlign: "center",
    marginTop: 6,
    fontSize: 14,
    fontWeight: "800",
    color: "rgba(27,24,13,0.65)",
  },

  head: { alignItems: "center", marginTop: 10, marginBottom: 14 },
  h1: {
    fontSize: 40,
    fontWeight: "900",
    color: "#191510",
    letterSpacing: -0.5,
    textAlign: "center",
  },
  h2: {
    marginTop: 6,
    fontSize: 14,
    color: "rgba(139,117,91,0.95)",
    textAlign: "center",
    lineHeight: 20,
    maxWidth: 320,
  },

  fields: { gap: 14, marginTop: 6 },
  field: { width: "100%" },

  // ✅ same labels / inputs as login
  label: {
    fontSize: 13,
    fontWeight: "800",
    color: "#191510",
    marginBottom: 8,
    paddingLeft: 14,
  },

  input: {
    height: 56,
    borderRadius: 999,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "rgba(186,129,59,0.30)",
    paddingHorizontal: 18,
    color: "#191510",
    fontSize: 15,
  },

  inputWrap: { position: "relative" },
  inputWithIcon: { paddingRight: 52 },
  eyeBtn: {
    position: "absolute",
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },

  actions: { marginTop: 18, alignItems: "center", gap: 14 },

  linkBold: { color: GOLD, fontSize: 18, fontWeight: "900" },

  secureRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    opacity: 0.18,
    marginTop: 4,
  },
  secureText: {
    letterSpacing: 4,
    fontWeight: "900",
    color: "#000",
    fontSize: 12,
  },
});
