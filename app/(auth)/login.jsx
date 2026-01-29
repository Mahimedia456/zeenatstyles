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

export default function Login() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef(null);

  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);

  const canSubmit = useMemo(() => {
    return emailOrPhone.trim().length > 0 && password.trim().length > 0;
  }, [emailOrPhone, password]);

  const scrollToEndSoon = () => {
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
            { paddingBottom: Math.max(insets.bottom, 18) },
          ]}
        >
          {/* HERO */}
          <RNView style={[styles.heroWrap, { marginTop: insets.top }]}>
            <ImageBackground
              source={{
                uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBC862XoZCcpCEP-3qxmIrDyS7xYBGxr-Eo_qhCk8j42DD0DviKGhVnfODHhj7xxSNfFYAzsn_40HePGPMCWChx8kJQSDhlJRHcvcugb7dXIsE7wcra8QAhCs8qyOMYiV6gmrMEEUHf50M6Z9kZ5X7D4-06fHHfiesZww-o0Bx8qIe6EXpEySCqymN8yiR673RrF4qtnK1Ns9ZVprvtiXY6ZkXec5KGqgt3io2duEFywer7IJbebAq-wYa-7OXTWhUcLnPaCGAOFg",
              }}
              resizeMode="cover"
              style={styles.hero}
              imageStyle={styles.heroImg}
            >
              {/* ✅ FULL HERO OVERLAY */}
              <RNView style={styles.heroOverlay} pointerEvents="none" />

              <RNView style={styles.topBar}>
                <RNView style={{ width: 40 }} />
                <Text style={styles.brandTop}>ZEENAT</Text>
                <RNView style={{ width: 40 }} />
              </RNView>
            </ImageBackground>
          </RNView>

          {/* FORM */}
          <RNView style={styles.form}>
            <RNView style={styles.head}>
              <Text style={styles.h1}>Welcome Back</Text>
              <Text style={styles.h2}>
                Sign in to continue your luxury experience
              </Text>
            </RNView>

            <RNView style={styles.fields}>
              <RNView style={styles.field}>
                <Text style={styles.label}>Email or Phone</Text>
                <TextInput
                  value={emailOrPhone}
                  onChangeText={setEmailOrPhone}
                  placeholder="Enter your email or phone"
                  placeholderTextColor="rgba(139,117,91,0.55)"
                  style={styles.input}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  returnKeyType="next"
                  onFocus={scrollToEndSoon}
                />
              </RNView>

              <RNView style={styles.field}>
                <Text style={styles.label}>Password</Text>
                <RNView style={styles.inputWrap}>
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Enter your password"
                    placeholderTextColor="rgba(139,117,91,0.55)"
                    style={[styles.input, styles.inputWithIcon]}
                    secureTextEntry={secure}
                    returnKeyType="done"
                    onFocus={scrollToEndSoon}
                  />
                  <Pressable
                    onPress={() => setSecure((s) => !s)}
                    hitSlop={12}
                    style={styles.eyeBtn}
                  >
                    <Feather
                      name={secure ? "eye" : "eye-off"}
                      size={20}
                      color={GOLD}
                    />
                  </Pressable>
                </RNView>
              </RNView>
            </RNView>

            {/* ACTIONS */}
            <RNView style={styles.actions}>
              <ShinyButton
                label="Sign In"
                disabled={!canSubmit}
                onPress={() => router.replace("/(tabs)")}
                style={{ width: "100%" }}
              />

              <Pressable onPress={() => router.push("/(auth)/forgot-password")}>
                <Text style={styles.link}>Forgot Password?</Text>
              </Pressable>

              <RNView style={styles.divider} />

              <RNView style={styles.rowCenter}>
                <Text style={styles.muted}>New here?</Text>
                <Pressable onPress={() => router.push("/(auth)/register")}>
                  <Text style={styles.linkBold}> Create Account</Text>
                </Pressable>
              </RNView>

              <RNView style={styles.socialRow}>
                <Pressable style={styles.socialBtn}>
                  <Feather name="fingerprint" size={22} color="#191510" />
                </Pressable>
                <Pressable style={styles.socialBtn}>
                  <Feather name="smile" size={22} color="#191510" />
                </Pressable>
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

  heroWrap: {
    width: "100%",
    height: 360,
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

  // ✅ full overlay (same across whole hero)
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

  form: {
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 24,
    maxWidth: 520,
    width: "100%",
    alignSelf: "center",
  },

  head: { alignItems: "center", marginTop: 8, marginBottom: 18 },
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
    fontStyle: "italic",
    textAlign: "center",
  },

  fields: { gap: 14 },
  field: { width: "100%" },
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

  link: { color: GOLD, fontSize: 14, fontWeight: "800" },
  divider: {
    height: 1,
    width: 90,
    backgroundColor: "rgba(227,220,212,1)",
    marginVertical: 6,
  },
  rowCenter: { flexDirection: "row", alignItems: "center" },
  muted: { color: "rgba(139,117,91,0.95)", fontSize: 14, fontWeight: "700" },
  linkBold: { color: GOLD, fontSize: 14, fontWeight: "900" },

  socialRow: { flexDirection: "row", gap: 14, marginTop: 8 },
  socialBtn: {
    width: 52,
    height: 52,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(227,220,212,1)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.7)",
  },
});
