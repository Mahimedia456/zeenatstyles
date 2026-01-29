import { useRouter } from "expo-router";
import { ImageBackground, Pressable, View as RNView, StyleSheet, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ShinyButton from "../../components/ShinyButton";
import { Text, View } from "../../components/Themed";

const GOLD = "#B8803C";

export default function Onboarding1() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const heroH = Math.round(height * 0.55);

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]} lightColor="#FFFFFF">
      <ImageBackground
        source={{
          uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkPTdoVsnt605bde86wpvC0bjquHyvkvC_OGmsHvtI8yj1ki_NZ5k4qeh06U6ugoMez_jb7UTd2GmKRcqvtU4xK3yliYwXJl0Zwf7Kw05T-X2f09reKS8mNJRzBi86xLiHhaS7mLRaZfI-Amd6geEedoM3fyQrV9OxA7fJ8LHfe6fbPfq5KWTQigrRPpoZn2dIXKXGTggH1rP8ZH53eWg89zDdyY9zGVgZgr659MzB1RLOer-p87kV3IeUUnekJj_AEJc1t4r9fQ",
        }}
        resizeMode="cover"
        style={[styles.hero, { height: heroH }]}
        imageStyle={styles.heroImg}
      >
        {/* ✅ remove white overlay band */}
        <RNView style={styles.heroFade} pointerEvents="none" />
      </ImageBackground>

      <RNView style={styles.content}>
        <Text style={styles.h1}>Zeenat Styles</Text>
        <Text style={[styles.h2, { color: GOLD }]}>WHERE LOYALTY MEETS FASHION</Text>
        <Text style={styles.p}>Discover stylish bags made for everyday elegance.</Text>

        <RNView style={{ flex: 1 }} />

        <RNView style={styles.dotsRow}>
          <RNView style={[styles.dotLong, { backgroundColor: GOLD }]} />
          <RNView style={styles.dot} />
          <RNView style={styles.dot} />
        </RNView>

        <RNView style={styles.actions}>
          <ShinyButton label="Get Started" onPress={() => router.push("/(auth)/onboarding-2")} />
          <Pressable onPress={() => router.replace("/(auth)/login")} hitSlop={10}>
            <Text style={styles.skip}>Skip</Text>
          </Pressable>
        </RNView>

        <RNView style={{ height: Math.max(insets.bottom, 16) }} />
      </RNView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  hero: {
    width: "100%",
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  heroImg: { borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  heroFade: {
    height: 120,
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.06)", // ✅ very light, no “white band”
  },

  content: { flex: 1, paddingHorizontal: 28, paddingTop: 14, alignItems: "center" },
  h1: { fontSize: 36, fontWeight: "900", color: "#1b180d", textAlign: "center" },
  h2: { marginTop: 6, fontSize: 16, fontWeight: "900", letterSpacing: 1.2, textTransform: "uppercase", textAlign: "center" },
  p: { marginTop: 12, fontSize: 15, color: "rgba(27,24,13,0.60)", textAlign: "center", lineHeight: 22, maxWidth: 280 },

  dotsRow: { flexDirection: "row", gap: 10, marginBottom: 18 },
  dotLong: { height: 6, width: 32, borderRadius: 999 },
  dot: { height: 6, width: 6, borderRadius: 999, backgroundColor: "rgba(27,24,13,0.10)" },

  actions: { width: "100%", gap: 12, marginBottom: 8 },
  skip: { textAlign: "center", fontSize: 15, fontWeight: "700", color: "rgba(27,24,13,0.40)", paddingVertical: 8 },
});
