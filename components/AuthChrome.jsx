import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
    ImageBackground,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    View as RNView,
    ScrollView,
    StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Text, View } from "./Themed";

const BG = "#FBFAF9";
const GOLD = "#B8803C";

const HERO_URI =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBC862XoZCcpCEP-3qxmIrDyS7xYBGxr-Eo_qhCk8j42DD0DviKGhVnfODHhj7xxSNfFYAzsn_40HePGPMCWChx8kJQSDhlJRHcvcugb7dXIsE7wcra8QAhCs8qyOMYiV6gmrMEEUHf50M6Z9kZ5X7D4-06fHHfiesZww-o0Bx8qIe6EXpEySCqymN8yiR673RrF4qtnK1Ns9ZVprvtiXY6ZkXec5KGqgt3io2duEFywer7IJbebAq-wYa-7OXTWhUcLnPaCGAOFg";

export function AuthChrome({
  title = "Zeenat Styles",
  heroHeight = 320,
  showBrandBelowHero = true,
  children,
}) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const scrollRef = useRef(null);
  const [kbH, setKbH] = useState(0);

  useEffect(() => {
    const showEvt = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvt = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const s = Keyboard.addListener(showEvt, (e) => setKbH(e.endCoordinates?.height ?? 0));
    const h = Keyboard.addListener(hideEvt, () => setKbH(0));
    return () => {
      s.remove();
      h.remove();
    };
  }, []);

  // ✅ focus pe field ko keyboard se upar le aata
  const scrollToField = useCallback(
    (ref) => {
      requestAnimationFrame(() => {
        const sv = scrollRef.current;
        const node = ref?.current;
        if (!sv || !node) return;

        const innerNode = sv.getInnerViewNode?.() ?? sv;

        node.measureLayout(
          innerNode,
          (x, y, w, h) => {
            // keyboard open ho to extra lift
            const extra = kbH ? 120 : 24;
            const target = Math.max(0, y - extra);
            sv.scrollTo({ y: target, animated: true });
          },
          () => {}
        );
      });
    },
    [kbH]
  );

  return (
    <View style={styles.screen} lightColor={BG}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.select({ ios: "padding", android: "height" })}
        keyboardVerticalOffset={Platform.select({ ios: 0, android: 0 })}
      >
        <ScrollView
          ref={scrollRef}
          bounces={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingBottom: Math.max(insets.bottom, 18) + 18,
          }}
        >
          {/* HERO */}
          <RNView style={[styles.heroWrap, { height: heroHeight, marginTop: insets.top }]}>
            <ImageBackground
              source={{ uri: HERO_URI }}
              resizeMode="cover"
              style={styles.hero}
              imageStyle={styles.heroImg}
            >
              {/* ✅ full overlay on hero */}
              <RNView style={styles.heroOverlay} pointerEvents="none" />

              {/* back button on hero */}
              <Pressable
                onPress={() => router.back()}
                hitSlop={12}
                style={styles.backBtn}
              >
                <Feather name="chevron-left" size={22} color="#1b180d" />
              </Pressable>

              {/* ZEENAT text on hero top */}
              <RNView style={styles.heroTopTitle}>
                <Text style={styles.heroTopText}>ZEENAT</Text>
              </RNView>
            </ImageBackground>
          </RNView>

          {/* ✅ “Zeenat Styles” hero ke baad */}
          {showBrandBelowHero ? (
            <RNView style={styles.brandBelow}>
              <Text style={styles.brandBelowText}>{title}</Text>
            </RNView>
          ) : null}

          {/* BODY */}
          <RNView style={styles.body}>
            {typeof children === "function"
              ? children({ scrollToField, scrollRef })
              : children}
          </RNView>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },

  heroWrap: {
    width: "100%",
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
    backgroundColor: "rgba(0,0,0,0.18)",
  },

  backBtn: {
    position: "absolute",
    left: 16,
    top: 16,
    width: 44,
    height: 44,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.85)",
    borderWidth: 1,
    borderColor: "rgba(227,220,212,1)",
  },

  heroTopTitle: {
    position: "absolute",
    top: 18,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  heroTopText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 6,
    textTransform: "uppercase",
  },

  brandBelow: {
    paddingTop: 10,
    paddingBottom: 6,
    alignItems: "center",
  },
  brandBelowText: {
    fontSize: 18,
    fontWeight: "900",
    color: "#1b180d",
  },

  // ✅ gap kam (pehle yahan zyada padding/center tha)
  body: {
    paddingHorizontal: 22,
    paddingTop: 6,
  },
});
