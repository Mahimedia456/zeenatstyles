import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, View as RNView, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import InnerHeader from "../../components/InnerHeader";
import { Text, View } from "../../components/Themed";

const BG = "#FBFAF9";
const PRIMARY = "#B8803C";

function LinkRow({ label, url, router }) {
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/(modals)/webview",
          params: { title: label, url },
        })
      }
      style={styles.rowItem}
    >
      <RNView style={styles.rowIconWrap}>
        <Feather name="external-link" size={16} color={PRIMARY} />
      </RNView>

      <Text style={styles.rowLabel} numberOfLines={1}>
        {label}
      </Text>

      <Feather name="chevron-right" size={20} color="rgba(138,117,92,0.9)" />
    </Pressable>
  );
}

export default function HelpSupport() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]} lightColor={BG}>
      <InnerHeader title="Help & Support" onBack={() => router.back()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: Math.max(16, insets.bottom + 16) }}
      >
        <Text style={styles.sectionTitle}>SUPPORT</Text>

        <RNView style={styles.block}>
          <LinkRow
            label="Shipping & Handling"
            url="https://www.zeenatstyles.pk/pages/shipping-handling"
            router={router}
          />
          <LinkRow label="FAQ" url="https://www.zeenatstyles.pk/pages/faq" router={router} />
          <LinkRow
            label="Return Policy"
            url="https://www.zeenatstyles.pk/pages/return-policy"
            router={router}
          />
          <LinkRow
            label="Contact Us"
            url="https://www.zeenatstyles.pk/pages/contact"
            router={router}
          />
        </RNView>

        <Text style={styles.sectionTitle}>CUSTOMER SUPPORT</Text>

        <RNView style={styles.infoCard}>
          <RNView style={styles.infoRow}>
            <RNView style={styles.infoIcon}>
              <Feather name="phone" size={16} color={PRIMARY} />
            </RNView>
            <RNView style={{ flex: 1 }}>
              <Text style={styles.infoLabel}>Helpline</Text>
              <Text style={styles.infoValue}>03215071534</Text>
            </RNView>
          </RNView>

          <RNView style={styles.divider} />

          <RNView style={styles.infoRow}>
            <RNView style={styles.infoIcon}>
              <Feather name="map-pin" size={16} color={PRIMARY} />
            </RNView>
            <RNView style={{ flex: 1 }}>
              <Text style={styles.infoLabel}>Address</Text>
              <Text style={styles.infoValue}>
                Main Zarar Shaheed Road Saddar Cantt
              </Text>
            </RNView>
          </RNView>

          <RNView style={styles.divider} />

          <RNView style={styles.infoRow}>
            <RNView style={styles.infoIcon}>
              <Feather name="mail" size={16} color={PRIMARY} />
            </RNView>
            <RNView style={{ flex: 1 }}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>Zeenatstyles30@gmail.com</Text>
            </RNView>
          </RNView>
        </RNView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },

  sectionTitle: {
    marginTop: 18,
    marginBottom: 10,
    marginHorizontal: 18,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 2,
    color: "rgba(138,117,92,1)",
  },

  block: { marginHorizontal: 16, gap: 12 },

  rowItem: {
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "rgba(226,220,212,0.75)",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  rowIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "rgba(184,128,60,0.10)",
    alignItems: "center",
    justifyContent: "center",
  },
  rowLabel: { flex: 1, fontSize: 16, fontWeight: "800", color: "#181510" },

  infoCard: {
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(226,220,212,0.75)",
  },
  infoRow: { flexDirection: "row", gap: 12, alignItems: "flex-start" },
  infoIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "rgba(184,128,60,0.10)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  infoLabel: { fontSize: 12, fontWeight: "900", color: "rgba(138,117,92,1)", letterSpacing: 1 },
  infoValue: { marginTop: 3, fontSize: 14, fontWeight: "900", color: "#181510", lineHeight: 20 },

  divider: { height: 1, backgroundColor: "rgba(226,220,212,0.7)", marginVertical: 14 },
});
