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

export default function Register() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef(null);

  const pos = useRef({}); // { key: y }
  const setPos = (key) => (e) => (pos.current[key] = e.nativeEvent.layout.y);

  const scrollToKey = (key) => {
    requestAnimationFrame(() => {
      const y = pos.current[key] ?? 0;
      scrollRef.current?.scrollTo({ y: Math.max(0, y - 18), animated: true });
    });
  };

  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [s1, setS1] = useState(true);
  const [s2, setS2] = useState(true);

  const canSubmit = useMemo(() => {
    return name.trim().length > 1 && value.trim().length > 3 && p1.length >= 4 && p2.length >= 4;
  }, [name, value, p1, p2]);

  return (
    <View style={styles.screen} lightColor={BG}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.select({ ios: "padding", android: "height" })}
        keyboardVerticalOffset={0}
      >
        <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
          <ScrollView
            ref={scrollRef}
            bounces={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            contentContainerStyle={[
              styles.scrollContent,
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

                {/* back button on hero */}
                <Pressable
                  onPress={() => router.back()}
                  hitSlop={12}
                  style={styles.heroBackBtn}
                >
                  <Feather name="chevron-left" size={22} color="#1b180d" />
                </Pressable>

                <RNView style={styles.topBar}>
                  <RNView style={{ width: 40 }} />
                  <Text style={styles.brandTop}>ZEENAT</Text>
                  <RNView style={{ width: 40 }} />
                </RNView>
              </ImageBackground>
            </RNView>

            {/* title under hero */}
            <Text style={styles.brandBelow}>Zeenat Styles</Text>

            {/* FORM */}
            <RNView style={styles.form}>
              <RNView style={styles.head}>
                <Text style={styles.h1}>Create Account</Text>
                <Text style={styles.h2}>Join Zeenat Styles and start shopping</Text>
              </RNView>

              <RNView style={styles.fields}>
                <RNView onLayout={setPos("name")} style={styles.field}>
                  <Text style={styles.label}>Full Name</Text>
                  <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter your full name"
                    placeholderTextColor="rgba(139,117,91,0.55)"
                    style={styles.input}
                    returnKeyType="next"
                    onFocus={() => scrollToKey("name")}
                  />
                </RNView>

                <RNView onLayout={setPos("value")} style={styles.field}>
                  <Text style={styles.label}>Phone or Email</Text>
                  <TextInput
                    value={value}
                    onChangeText={setValue}
                    placeholder="Enter phone or email"
                    placeholderTextColor="rgba(139,117,91,0.55)"
                    style={styles.input}
                    autoCapitalize="none"
                    returnKeyType="next"
                    onFocus={() => scrollToKey("value")}
                  />
                </RNView>

                <RNView onLayout={setPos("p1")} style={styles.field}>
                  <Text style={styles.label}>Password</Text>
                  <RNView style={styles.inputWrap}>
                    <TextInput
                      value={p1}
                      onChangeText={setP1}
                      placeholder="Create password"
                      placeholderTextColor="rgba(139,117,91,0.55)"
                      style={[styles.input, styles.inputWithIcon]}
                      secureTextEntry={s1}
                      returnKeyType="next"
                      onFocus={() => scrollToKey("p1")}
                    />
                    <Pressable onPress={() => setS1((v) => !v)} hitSlop={12} style={styles.eyeBtn}>
                      <Feather name={s1 ? "eye" : "eye-off"} size={20} color={GOLD} />
                    </Pressable>
                  </RNView>
                </RNView>

                <RNView onLayout={setPos("p2")} style={styles.field}>
                  <Text style={styles.label}>Confirm Password</Text>
                  <RNView style={styles.inputWrap}>
                    <TextInput
                      value={p2}
                      onChangeText={setP2}
                      placeholder="Confirm your password"
                      placeholderTextColor="rgba(139,117,91,0.55)"
                      style={[styles.input, styles.inputWithIcon]}
                      secureTextEntry={s2}
                      returnKeyType="done"
                      onFocus={() => scrollToKey("p2")}
                    />
                    <Pressable onPress={() => setS2((v) => !v)} hitSlop={12} style={styles.eyeBtn}>
                      <Feather name={s2 ? "eye" : "eye-off"} size={20} color={GOLD} />
                    </Pressable>
                  </RNView>
                </RNView>

                <Text style={styles.terms}>
                  By tapping Create Account, you agree to our Terms of Service and Privacy Policy.
                </Text>
              </RNView>

              <RNView style={styles.actions}>
                <ShinyButton
                  label="Create Account"
                  disabled={!canSubmit}
                  onPress={() => router.replace("/(tabs)")}
                  style={{ width: "100%" }}
                />

                <RNView style={styles.rowCenter}>
                  <Text style={styles.muted}>Already have an account?</Text>
                  <Pressable onPress={() => router.replace("/(auth)/login")}>
                    <Text style={styles.linkBold}> Login</Text>
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
    height: 300,
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

  brandBelow: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "900",
    color: "#1b180d",
  },

  form: { paddingHorizontal: 22, paddingTop: 12, paddingBottom: 24, maxWidth: 520, width: "100%", alignSelf: "center" },

  head: { alignItems: "center", marginTop: 10, marginBottom: 16 },
  h1: { fontSize: 40, fontWeight: "900", color: "#191510", letterSpacing: -0.5, textAlign: "center" },
  h2: { marginTop: 6, fontSize: 14, color: "rgba(139,117,91,0.95)", textAlign: "center" },

  fields: { gap: 14 },
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

  inputWrap: { position: "relative" },
  inputWithIcon: { paddingRight: 52 },
  eyeBtn: { position: "absolute", right: 16, top: 0, bottom: 0, justifyContent: "center", alignItems: "center" },

  terms: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 12,
    color: "rgba(139,117,91,0.60)",
    paddingHorizontal: 12,
    lineHeight: 18,
  },

  actions: { marginTop: 18, alignItems: "center", gap: 16 },
  rowCenter: { flexDirection: "row", alignItems: "center" },
  muted: { color: "rgba(139,117,91,0.95)", fontSize: 14, fontWeight: "700" },
  linkBold: { color: GOLD, fontSize: 14, fontWeight: "900" },
});
