import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
    FlatList,
    Image,
    Pressable,
    View as RNView,
    ScrollView,
    StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import InnerHeader from "../../components/InnerHeader";
import { Text, View } from "../../components/Themed";

const BG = "#FBFAF9";
const PRIMARY = "#B8803C";
const BORDER = "rgba(226,220,212,0.85)";
const MUTED = "rgba(138,117,92,1)";

const TABS = [
  { key: "all", label: "All" },
  { key: "processing", label: "Processing" },
  { key: "delivered", label: "Delivered" },
  { key: "cancelled", label: "Cancelled" },
];

function StatusPill({ status }) {
  const isProcessing = status === "processing";
  const label =
    status === "processing"
      ? "Processing"
      : status === "delivered"
      ? "Delivered"
      : "Cancelled";

  return (
    <RNView
      style={[
        styles.statusPill,
        isProcessing ? styles.statusPillActive : styles.statusPillSoft,
      ]}
    >
      <Text
        style={[
          styles.statusTxt,
          isProcessing ? styles.statusTxtActive : styles.statusTxtSoft,
        ]}
      >
        {label.toUpperCase()}
      </Text>
    </RNView>
  );
}

function Thumb({ uri, text }) {
  if (text) {
    return (
      <RNView style={styles.thumbMore}>
        <Text style={styles.thumbMoreTxt}>{text}</Text>
      </RNView>
    );
  }
  return <Image source={{ uri }} style={styles.thumb} />;
}

function OrderCard({ order, onPressDetails }) {
  return (
    <RNView style={styles.card}>
      <RNView style={styles.cardTop}>
        <RNView style={{ flex: 1 }}>
          <Text style={styles.orderTitle}>Order #{order.id}</Text>
          <Text style={styles.orderSub}>{order.placedOn}</Text>
        </RNView>

        <StatusPill status={order.status} />
      </RNView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 10, gap: 10 }}
      >
        {order.thumbs.map((t, idx) => (
          <Thumb key={idx} uri={t.uri} text={t.text} />
        ))}
      </ScrollView>

      <RNView style={styles.cardFooter}>
        <Text style={styles.totalTxt}>Total: ${order.total.toFixed(2)}</Text>

        <Pressable onPress={onPressDetails} hitSlop={10} style={styles.detailsBtn}>
          <Text style={styles.detailsTxt}>View Details</Text>
          <Feather name="chevron-right" size={16} color={PRIMARY} />
        </Pressable>
      </RNView>
    </RNView>
  );
}

export default function Orders() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [tab, setTab] = useState("all");

  // ✅ Dummy data (replace later with real API/state)
  const allOrders = useMemo(
    () => [
      {
        id: "ZS-99231",
        status: "processing",
        placedOn: "Placed on Oct 24, 2023",
        total: 245,
        thumbs: [
          {
            uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBoQX2nN9BT7M_cnVh_M_qopK8s_KTSg6HkhqbmxiOg9pIBUtBZ7pCDiKHr4OBj76SIZo_pXsyisfT2kQHL19DI6V-wpkMkD1etuHW6TQoXI9n35GU_ggjKdARCAvStrmvHntOrZOaleWOlrhMwxl7Vt_1qmeC3ByVMEQK2rd4qeFgvOla9bisMmD_F4uKfu64GHQ3nKCfrmkqoVlGJLlLwhkM9afsXMrWHo2Y83tg8JMpY4YPhWA-4DqUSkl1i59ZzG9tzaH9jQ",
          },
          {
            uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFvPhBTid-mWdhMJlLJwKokXI4BTbZIlDjQThBajbbbbdev4CuBaRdXGZ3YkZ146TcfnEG-a7pW_0P3nZzUh5Q9AWj6v6LGQss4JbLlcDO7uO5-xSFSgnpYWfJTB-hyBZix7pnn9aYwNDN2qNeO_BmttcbO8CYC526BKrsEQZNzCPhtH9zINBJtHf29r19yWtweh9TghYIRhwkNrz4g3W7MNT4aAXLgBgusiLl8PLWWAZjiGxY21sms3y2jNYRqtjr8dNXu0T2ag",
          },
          { text: "+2" },
        ],
      },
      {
        id: "ZS-98110",
        status: "delivered",
        placedOn: "Placed on Oct 15, 2023",
        total: 124,
        thumbs: [
          {
            uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHMtPs6tR3IcFKOvjBB5S0SevLUN_lp4-ug9oEnWH-cXbCQwkOTP7smtlHQm86DG77-b95z1ujaHzsJQkA_jEh56IR_qgdqwtWV15N8CfZPRrGLN59wCl8mCej7BrtLZr1kC3r6X-61-ppa1xfAR98jTZOBr2pUc1HANnzBApOfmgI1sJUANHxKy9ePuPL-WzG9SBHTPX-j6qyU-BaxK8bk0J9qYLbmhhg5uxJYX-7URqLGNTR3nsS38GgplqqTfy6_J_KCPv8ow",
          },
        ],
      },
      {
        id: "ZS-97542",
        status: "delivered",
        placedOn: "Placed on Sep 28, 2023",
        total: 410,
        thumbs: [
          {
            uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCM0ZcYDthuh7LWWUxUz5fTlbtvNdAVYYiU-C35bBFt-z_30uSF-93N4tjwQRxIegHfysWokw9FK1JWEdWimy7ePahUpO7BNhA8u8NMmHOfiAXKnW7yiMAoTkAoawGcq7Ou9JdABB7eCBtF4CPFXKS2eGa8ZHwzTjVVuAgJNjfs0AAkAcfb3Z3pnDL6gmwJSOVhO5F5gzMPIippJTbLp3FBmGM0U7mLmXZztXHPXcxTFZtbLkKFMOJZ2W8HN8iAKirUx8rO8fvKEg",
          },
          {
            uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAX-z7yqcfigUb9Fc3_QDb9VVJ9onK4Gq-9YBNMkNf9pOvalTePXVai63zJpC7aNJOeOWG2viWOtMgfVqBYobMBRYXEGJduG4PwoEVd6OdUFVqc2ePYBTjgqgxYg43JaXOmSrb0mQylo8zFqa-a3tnlMaArLD6o4OwExgYKXUtrAyy5gt00YWxZV1Xz9DSUEsiwmJ_kn7qxxVR8hcogJgw4jJFHF5jOuyrDS8gYPFuTC3-4cjbR8vM7b24AGw6-0ZgBQgSRe9UoTg",
          },
        ],
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    if (tab === "all") return allOrders;
    return allOrders.filter((o) => o.status === tab);
  }, [allOrders, tab]);

  return (
    <View style={styles.screen} lightColor={BG}>
      {/* ✅ InnerHeader */}
      <InnerHeader title="My Orders" onBack={() => router.back()} />

      {/* ✅ Tabs */}
      <RNView style={styles.tabsWrap}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsRow}>
          {TABS.map((t) => {
            const active = t.key === tab;
            return (
              <Pressable
                key={t.key}
                onPress={() => setTab(t.key)}
                style={[styles.tabBtn, active && styles.tabBtnActive]}
              >
                <Text style={[styles.tabTxt, active && styles.tabTxtActive]}>{t.label}</Text>
                {active ? <RNView style={styles.tabUnderline} /> : null}
              </Pressable>
            );
          })}
        </ScrollView>
      </RNView>

      <FlatList
        data={filtered}
        keyExtractor={(o) => o.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 14,
          paddingBottom: 26 + Math.max(insets.bottom, 10),
        }}
        renderItem={({ item }) => (
          <OrderCard
            order={item}
            onPressDetails={() =>
              router.push({
                pathname: "/(modals)/order-details",
                params: { id: item.id },
              })
            }
          />
        )}
        ListFooterComponent={
          <RNView style={styles.trustWrap}>
            <RNView style={styles.trustIcon}>
              <Feather name="shield" size={18} color={PRIMARY} />
            </RNView>
            <Text style={styles.trustTxt}>
              Secure and authenticated orders{"\n"}by Zeenat Styles Luxury Logistics
            </Text>
          </RNView>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },

  tabsWrap: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(226,220,212,0.7)",
    backgroundColor: BG,
  },
  tabsRow: { paddingHorizontal: 16, gap: 18 },
  tabBtn: { paddingVertical: 12, alignItems: "center" },
  tabBtnActive: {},
  tabTxt: { fontSize: 14, fontWeight: "900", color: MUTED },
  tabTxtActive: { color: "#181510" },
  tabUnderline: {
    marginTop: 10,
    height: 3,
    width: "100%",
    borderRadius: 999,
    backgroundColor: PRIMARY,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 14,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 1,
  },
  cardTop: { flexDirection: "row", alignItems: "flex-start", gap: 10 },

  orderTitle: { fontSize: 18, fontWeight: "900", color: "#181510" },
  orderSub: { marginTop: 6, fontSize: 13, fontWeight: "700", color: MUTED },

  statusPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  statusPillActive: { borderColor: PRIMARY, backgroundColor: "transparent" },
  statusPillSoft: { borderColor: BORDER, backgroundColor: "transparent" },
  statusTxt: { fontSize: 11, fontWeight: "900", letterSpacing: 1.2 },
  statusTxtActive: { color: PRIMARY },
  statusTxtSoft: { color: MUTED },

  thumb: {
    width: 70,
    height: 70,
    borderRadius: 14,
    backgroundColor: "#f1eeea",
    borderWidth: 1,
    borderColor: BORDER,
  },
  thumbMore: {
    width: 70,
    height: 70,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: BG,
    alignItems: "center",
    justifyContent: "center",
  },
  thumbMoreTxt: { fontSize: 16, fontWeight: "900", color: MUTED },

  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: "rgba(226,220,212,0.5)",
    paddingTop: 12,
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  totalTxt: { fontSize: 15, fontWeight: "900", color: "#181510" },
  detailsBtn: { flexDirection: "row", alignItems: "center", gap: 6 },
  detailsTxt: { fontSize: 14, fontWeight: "900", color: PRIMARY },

  trustWrap: { alignItems: "center", paddingVertical: 18, opacity: 0.75 },
  trustIcon: {
    width: 44,
    height: 44,
    borderRadius: 999,
    backgroundColor: "rgba(184,128,60,0.10)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  trustTxt: { textAlign: "center", fontSize: 12, fontWeight: "800", color: MUTED, lineHeight: 18 },
});
