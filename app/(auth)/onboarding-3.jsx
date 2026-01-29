import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, View as RNView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ShinyButton from "../../components/ShinyButton";
import { Text, View } from "../../components/Themed";

const GOLD = "#B8803C";

export default function Onboarding3() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen} lightColor="#FCFBF8">
      {/* ✅ Header with Back */}
      <RNView style={[styles.header, { paddingTop: insets.top + 6 }]}>
        <Pressable onPress={() => router.back()} hitSlop={12} style={styles.headerBtn}>
          <Text style={styles.chev}>‹</Text>
        </Pressable>

        <Text style={styles.headerTitle}>Trust &amp; Security</Text>

        <RNView style={{ width: 72, alignItems: "flex-end" }}>
          <Pressable hitSlop={12} onPress={() => router.replace("/(auth)/login")}>
            <Text style={[styles.skipTop, { color: GOLD }]}>Skip</Text>
          </Pressable>
        </RNView>
      </RNView>

      <RNView style={styles.main}>
        <RNView style={styles.bigIconWrap}>
          <MaterialCommunityIcons name="shield-check" size={44} color={GOLD} />
        </RNView>

        <RNView style={{ marginTop: 18 }}>
          <Text style={styles.title}>Shop with Confidence</Text>
          <Text style={styles.subtitle}>Secure payments, fast delivery, and easy returns on every order.</Text>
        </RNView>

        <RNView style={{ marginTop: 22, gap: 14, width: "100%" }}>
          <Feature icon="lock" title="Secure Payments" desc="Encrypted and safe transactions" />
          <Feature icon="truck-fast" title="Fast Delivery" desc="Directly to your doorstep" />
          <Feature icon="keyboard-return" title="Easy Returns" desc="Hassle-free 30-day process" />
        </RNView>
      </RNView>

      <RNView style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 18) }]}>
        <RNView style={styles.dotsRow}>
          <RNView style={styles.dot} />
          <RNView style={styles.dot} />
          <RNView style={[styles.dotLong, { backgroundColor: GOLD }]} />
        </RNView>

        <ShinyButton label="Continue" onPress={() => router.replace("/(auth)/login")} />
        <Text style={styles.stepText}>STEP 3 OF 3</Text>
      </RNView>
    </View>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <RNView style={styles.featureCard}>
      <RNView style={styles.featureIcon}>
        <MaterialCommunityIcons name={icon} size={20} color={GOLD} />
      </RNView>

      <RNView style={{ flex: 1 }}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDesc}>{desc}</Text>
      </RNView>
    </RNView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },

  header: { paddingHorizontal: 16, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: 10 },
  headerBtn: { width: 40, height: 40, borderRadius: 999, backgroundColor: "rgba(255,255,255,0.55)", alignItems: "center", justifyContent: "center" },
  chev: { fontSize: 28, color: "#1b180d", marginTop: -2 },
  headerTitle: { flex: 1, textAlign: "center", fontSize: 16, fontWeight: "900", color: "#1b180d" },
  skipTop: { fontSize: 14, fontWeight: "900" },

  main: { flex: 1, paddingHorizontal: 24, justifyContent: "center", alignItems: "center" },

  bigIconWrap: {
    width: 96,
    height: 96,
    borderRadius: 999,
    backgroundColor: "rgba(184,128,60,0.10)",
    borderWidth: 1,
    borderColor: "rgba(184,128,60,0.20)",
    alignItems: "center",
    justifyContent: "center",
  },

  title: { textAlign: "center", fontSize: 28, fontWeight: "900", color: "#1b180d", letterSpacing: -0.3 },
  subtitle: { marginTop: 10, textAlign: "center", fontSize: 14, lineHeight: 22, color: "rgba(125,107,56,0.95)", paddingHorizontal: 10 },

  featureCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 18,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(184,128,60,0.10)",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  featureIcon: { width: 48, height: 48, borderRadius: 999, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(184,128,60,0.10)" },
  featureTitle: { fontSize: 14, fontWeight: "900", color: "#1b180d" },
  featureDesc: { marginTop: 4, fontSize: 12.5, color: "rgba(125,107,56,0.90)" },

  footer: { paddingHorizontal: 24, paddingTop: 10 },
  dotsRow: { flexDirection: "row", justifyContent: "center", gap: 10, marginBottom: 18 },
  dot: { width: 6, height: 6, borderRadius: 999, backgroundColor: "#E5E1D5" },
  dotLong: { width: 26, height: 6, borderRadius: 999 },

  stepText: { marginTop: 16, textAlign: "center", fontSize: 11, fontWeight: "900", color: "rgba(27,24,13,0.40)", letterSpacing: 2 },
});
