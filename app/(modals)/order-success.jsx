import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Pressable, View as RNView, StyleSheet } from "react-native";

import InnerHeader from "../../components/InnerHeader";
import ShinyButton from "../../components/ShinyButton";
import { Text, View } from "../../components/Themed";

const BG = "#FBFAF9";
const PRIMARY = "#B8803C";

export default function OrderSuccess() {
  const router = useRouter();

  return (
    <View style={styles.screen} lightColor={BG}>
      <InnerHeader title="Order Status" leftIcon="x" onPressLeft={() => router.replace("/(tabs)")} />

      <RNView style={styles.center}>
        <RNView style={styles.iconRing}>
          <Feather name="check" size={44} color={PRIMARY} />
        </RNView>

        <Text style={styles.h1}>Order Placed{"\n"}Successfully!</Text>

        <Text style={styles.p}>
          Thank you for shopping with Zeenat Styles. Your order is on its way and will be delivered
          shortly.
        </Text>

        <RNView style={styles.summaryCard}>
          <RNView style={styles.sumTop}>
            <RNView style={{ flex: 1 }}>
              <Text style={styles.kicker}>CONFIRMATION</Text>
              <Text style={styles.sumTitle}>Order Summary</Text>

              <RNView style={{ marginTop: 10, gap: 4 }}>
                <Text style={styles.meta}>
                  Order ID: <Text style={styles.metaStrong}>#ZS-98231</Text>
                </Text>
                <Text style={styles.meta}>
                  Delivery: <Text style={styles.metaStrong}>3–5 Business Days</Text>
                </Text>
              </RNView>
            </RNView>

            <Image
              source={{
                uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5SWlUlWX3UNGlmDpnsFGy4tKIBSEYniv2U7MUSRSLGnheilS8G5Ya9E8Q14Bqb3qt22NbC-_VqSOwn67O9RW8cNojvTuNbQDeH5Yu4ikLsxeN6C3Rz8Cp4YTuqHbPjrZebo_pX8ItOp38_yRVNqBfEJmb1h1NvM7an7m3U4im4mZoRJ9Pz03t-yJFBSGyPUNc18PuK9xno9Erx36sjshVRr8kzvX74g7z4ehr_7_hxcvp8sS_KVzfC0QA02tmc5HA7X-Ktd2i7A",
              }}
              style={styles.boxImg}
            />
          </RNView>

          <RNView style={styles.line} />

          <RNView style={styles.totalRow}>
            <Text style={styles.totalLbl}>Total Amount</Text>
            <RNView style={styles.totalPill}>
              <Text style={styles.totalPillTxt}>$245.00</Text>
            </RNView>
          </RNView>
        </RNView>

        <RNView style={{ width: "100%", gap: 12 }}>
          <ShinyButton
            title="Continue Shopping"
            onPress={() => router.replace("/(tabs)")}
          />

          <Pressable onPress={() => {}} style={styles.linkBtn}>
            <Text style={styles.linkTxt}>View Order Details</Text>
          </Pressable>
        </RNView>
      </RNView>

      <RNView style={styles.progressWrap}>
        <RNView style={styles.progressTrack}>
          <RNView style={styles.progressFill} />
        </RNView>
      </RNView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },
  center: { flex: 1, paddingHorizontal: 18, alignItems: "center", paddingTop: 24 },

  iconRing: {
    width: 96,
    height: 96,
    borderRadius: 999,
    borderWidth: 4,
    borderColor: PRIMARY,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  h1: {
    fontSize: 32,
    fontWeight: "900",
    color: "#181510",
    textAlign: "center",
    lineHeight: 38,
  },
  p: {
    marginTop: 10,
    marginBottom: 18,
    fontSize: 15,
    fontWeight: "600",
    color: "rgba(138,117,92,1)",
    textAlign: "center",
    lineHeight: 22,
  },

  summaryCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(226,220,212,0.9)",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 1,
    marginBottom: 18,
  },
  sumTop: { flexDirection: "row", gap: 12, alignItems: "flex-start" },
  kicker: { fontSize: 11, fontWeight: "900", letterSpacing: 1.4, color: PRIMARY },
  sumTitle: { marginTop: 4, fontSize: 20, fontWeight: "900", color: "#181510" },
  meta: { fontSize: 13, fontWeight: "700", color: "rgba(138,117,92,1)" },
  metaStrong: { fontWeight: "900", color: "#181510" },

  boxImg: { width: 62, height: 62, borderRadius: 16, backgroundColor: "#f1eeea" },

  line: { height: 1, backgroundColor: "rgba(226,220,212,0.9)", marginVertical: 14 },

  totalRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  totalLbl: { fontSize: 14, fontWeight: "900", color: "#181510" },
  totalPill: {
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: "rgba(184,128,60,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  totalPillTxt: { fontSize: 18, fontWeight: "900", color: PRIMARY },

  linkBtn: { height: 44, alignItems: "center", justifyContent: "center" },
  linkTxt: {
    fontSize: 15,
    fontWeight: "800",
    color: "#181510",
    textDecorationLine: "underline",
    textDecorationColor: "rgba(184,128,60,0.35)",
  },

  progressWrap: { paddingBottom: 14, alignItems: "center" },
  progressTrack: { width: 120, height: 6, borderRadius: 999, backgroundColor: "rgba(0,0,0,0.12)" },
  progressFill: { width: "100%", height: "100%", borderRadius: 999, backgroundColor: PRIMARY },
});
