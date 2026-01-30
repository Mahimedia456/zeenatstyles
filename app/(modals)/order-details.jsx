import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo } from "react";
import {
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

function Pill({ label }) {
  return (
    <RNView style={styles.pill}>
      <Text style={styles.pillTxt}>{label}</Text>
    </RNView>
  );
}

function Card({ children, style }) {
  return <RNView style={[styles.card, style]}>{children}</RNView>;
}

function TimelineStep({ done, active, title, time, isLast }) {
  return (
    <RNView style={styles.stepRow}>
      <RNView style={styles.stepLeft}>
        {/* dot */}
        <RNView
          style={[
            styles.dot,
            done || active ? styles.dotOn : styles.dotOff,
          ]}
        >
          {done ? (
            <Feather name="check" size={12} color="#fff" />
          ) : active ? (
            <Feather name="truck" size={12} color="#fff" />
          ) : null}
        </RNView>

        {/* line */}
        {!isLast ? (
          <RNView
            style={[
              styles.line,
              done ? styles.lineOn : styles.lineOff,
            ]}
          />
        ) : null}
      </RNView>

      <RNView style={{ flex: 1, paddingBottom: isLast ? 0 : 14 }}>
        <Text
          style={[
            styles.stepTitle,
            !(done || active) && styles.stepTitleOff,
          ]}
        >
          {title}
        </Text>
        <Text style={[styles.stepTime, !(done || active) && styles.stepTimeOff]}>
          {time}
        </Text>
      </RNView>
    </RNView>
  );
}

function ItemRow({ item, isLast }) {
  return (
    <RNView style={[styles.itemRow, !isLast && styles.itemRowBorder]}>
      <Image source={{ uri: item.image }} style={styles.itemImg} />

      <RNView style={{ flex: 1 }}>
        <Text style={styles.itemTitle} numberOfLines={1}>
          {item.title}
        </Text>

        <RNView style={styles.itemMetaRow}>
          <RNView
            style={[
              styles.colorDot,
              { backgroundColor: item.colorDot },
              item.colorDotBorder ? styles.colorDotBorder : null,
            ]}
          />
          <Text style={styles.itemMeta} numberOfLines={1}>
            {item.meta}
          </Text>
        </RNView>
      </RNView>

      <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
    </RNView>
  );
}

export default function OrderDetails() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();

  // ✅ dummy data (replace with real later)
  const order = useMemo(() => {
    return {
      id: String(id || "ZS-88291"),
      statusLabel: "IN TRANSIT",
      placedOn: "Placed on October 24, 2023",
      amount: 245.0,
      cover:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDyVssILUnAE_kw6KZRnvwssqNHP1aC45056KxLWigmga9c4bFEpw07IB3bunkym5w7C5AE7y_KD-5XDS6WLl-ZlBvKy7dq5B3DdrcCEAg59hr9kT-p5Vg1R5BBOj7S9KDnRrREfPk84iCiTCAJJZ7fc3t9t6LAI-G2ds763KC9_6Fc9mqa4eiXaQW4T_KBo2yZIjSOwaZNAZkjMHdNAY24U5Qu-mml-pMTAOQG-i5M0RKB1E8m008N515JDJ4t9KM4O90xSDr-2Q",
      timeline: [
        { title: "Order Placed", time: "Oct 24, 10:30 AM", done: true },
        { title: "Processing", time: "Oct 24, 02:15 PM", done: true },
        { title: "Shipped", time: "Oct 25, 09:00 AM", active: true },
        { title: "Delivered", time: "Expected Oct 27" },
      ],
      items: [
        {
          title: "Silk Evening Dress",
          meta: "Size: M | Gold",
          price: 180,
          colorDot: PRIMARY,
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDNkLwQz5ANYddj-ejHHcry_V9lGWV8xNJC4SRXzOR0ENWp_3r0iYxEZ82GBtaWk08LrYpPJnknQGjxL_jJ7nfLgyOQHLI3WUnwpsRUGfdUWotiVDhCb3POltyDGIag4IYUXsaeRGlAr1PhM-yhtGp0BdAiw2-H9pigw-2i8qLKXG_10BAJSVIl32MYheK5i_j_xzgp3jVmAGLioGSVATB3mZ6Rl4dm1dgFYe2HaCPKloEfa8pe9hOGSxrGkRKjtIj7A_l2n_rSHg",
        },
        {
          title: "Zeenat Signature Scarf",
          meta: "Size: OS | Cream",
          price: 65,
          colorDot: "#F5F5F5",
          colorDotBorder: true,
          image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBSMf0g-RwXkzLktFKgsErEBt7ptUcxv5khfD2qAHQnm1ajRf8dzrzr6V1fSZ5Gt_0VPH4jB58H6VIvA1VTiapF8WQf2f-MsI47puNOYlZxzxMyX3_m82DdfWnC3yt8acnSvwnF6-B_DtEq5BOtwj_kvHns5zZaBfTBQHNgkIeAJW8Ht1wUZv2Ko8UU-QLGGpXqe5UBa1sWJCHbKoSje-0LbYDmLPbZ687HdmFJu9GZ9k2mzA2WbyJbxKoVY-TvSpdFRo9oJdj3PQ",
        },
      ],
      address: {
        name: "Sarah Jenkins",
        line1: "742 Evergreen Terrace",
        line2: "Springfield, IL 62704",
        line3: "United States",
      },
      payment: {
        brand: "VISA",
        ending: "4242",
      },
      footerOrderId: "ZS-88291-2023-X",
    };
  }, [id]);

  return (
    <View style={styles.screen} lightColor={BG}>
      {/* ✅ InnerHeader (no AppHeader) */}
      <InnerHeader
        title={`Order #${order.id}`}
        onBack={() => router.back()}
        right={
          <Pressable onPress={() => {}} hitSlop={12} style={styles.headerRightBtn}>
            <Feather name="share-2" size={18} color="#181510" />
          </Pressable>
        }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 12,
          paddingBottom: 22 + Math.max(insets.bottom, 10),
        }}
      >
        {/* ✅ Order Summary */}
        <Card style={{ padding: 0, overflow: "hidden" }}>
          <RNView style={styles.coverWrap}>
            <Image source={{ uri: order.cover }} style={styles.coverImg} />
            <RNView style={styles.coverOverlay} />
            <RNView style={styles.coverBottom}>
              <Pill label={order.statusLabel} />
            </RNView>
          </RNView>

          <RNView style={styles.summaryBody}>
            <Text style={styles.summaryTitle}>Order Summary</Text>

            <RNView style={styles.summaryRow}>
              <RNView>
                <Text style={styles.summarySub}>{order.placedOn}</Text>
                <Text style={styles.summaryAmount}>${order.amount.toFixed(2)}</Text>
              </RNView>

              <RNView style={styles.shipIconWrap}>
                <Feather name="truck" size={20} color={PRIMARY} />
              </RNView>
            </RNView>
          </RNView>
        </Card>

        {/* ✅ Tracking Timeline */}
        <Card style={{ marginTop: 14 }}>
          <Text style={styles.cardTitle}>Tracking Timeline</Text>

          <RNView style={{ marginTop: 14 }}>
            {order.timeline.map((s, idx) => (
              <TimelineStep
                key={s.title}
                title={s.title}
                time={s.time}
                done={!!s.done}
                active={!!s.active}
                isLast={idx === order.timeline.length - 1}
              />
            ))}
          </RNView>
        </Card>

        {/* ✅ Items */}
        <Card style={{ marginTop: 14, paddingHorizontal: 0, paddingVertical: 0 }}>
          <RNView style={{ paddingHorizontal: 14, paddingTop: 14 }}>
            <Text style={styles.cardTitle}>Items ({order.items.length})</Text>
          </RNView>

          <RNView style={{ marginTop: 10 }}>
            {order.items.map((it, idx) => (
              <ItemRow
                key={it.title}
                item={it}
                isLast={idx === order.items.length - 1}
              />
            ))}
          </RNView>
        </Card>

        {/* ✅ Delivery Address */}
        <Card style={{ marginTop: 14 }}>
          <RNView style={styles.iconTitleRow}>
            <Feather name="map-pin" size={18} color={PRIMARY} />
            <Text style={styles.upperTitle}>DELIVERY ADDRESS</Text>
          </RNView>

          <Text style={styles.addrName}>{order.address.name}</Text>
          <Text style={styles.addrLine}>{order.address.line1}</Text>
          <Text style={styles.addrLine}>{order.address.line2}</Text>
          <Text style={styles.addrLine}>{order.address.line3}</Text>
        </Card>

        {/* ✅ Payment Method */}
        <Card style={{ marginTop: 14 }}>
          <RNView style={styles.iconTitleRow}>
            <Feather name="credit-card" size={18} color={PRIMARY} />
            <Text style={styles.upperTitle}>PAYMENT METHOD</Text>
          </RNView>

          <RNView style={{ flexDirection: "row", alignItems: "center", gap: 10, marginTop: 10 }}>
            <RNView style={styles.brandPill}>
              <Text style={styles.brandPillTxt}>{order.payment.brand}</Text>
            </RNView>
            <Text style={styles.payTxt}>Ending in •••• {order.payment.ending}</Text>
          </RNView>
        </Card>

        {/* ✅ Need Help Button */}
        <Pressable onPress={() => {}} style={styles.helpBtn}>
          <Feather name="help-circle" size={18} color={PRIMARY} />
          <Text style={styles.helpTxt}>Need Help?</Text>
        </Pressable>

        <Text style={styles.footerId}>Order ID: {order.footerOrderId}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },

  headerRightBtn: {
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 14,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 1,
  },

  coverWrap: { height: 150, width: "100%" },
  coverImg: { width: "100%", height: "100%" },
  coverOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  coverBottom: {
    position: "absolute",
    left: 12,
    bottom: 12,
  },

  pill: {
    backgroundColor: PRIMARY,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  pillTxt: { fontSize: 11, fontWeight: "900", letterSpacing: 1.4, color: "#181510" },

  summaryBody: { padding: 14 },
  summaryTitle: { fontSize: 18, fontWeight: "900", color: "#181510" },
  summaryRow: { marginTop: 10, flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between" },
  summarySub: { fontSize: 12, fontWeight: "700", color: "rgba(110,110,110,1)" },
  summaryAmount: { marginTop: 6, fontSize: 22, fontWeight: "900", color: "#181510" },
  shipIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(184,128,60,0.10)",
    alignItems: "center",
    justifyContent: "center",
  },

  cardTitle: { fontSize: 16, fontWeight: "900", color: "#181510" },

  /* timeline */
  stepRow: { flexDirection: "row", gap: 12 },
  stepLeft: { width: 24, alignItems: "center" },
  dot: {
    width: 22,
    height: 22,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  dotOn: { backgroundColor: PRIMARY },
  dotOff: { backgroundColor: "rgba(226,220,212,0.55)", borderWidth: 1, borderColor: BORDER },
  line: {
    position: "absolute",
    top: 22,
    width: 2,
    bottom: 0,
    borderRadius: 999,
  },
  lineOn: { backgroundColor: PRIMARY },
  lineOff: { backgroundColor: "rgba(226,220,212,0.55)" },

  stepTitle: { fontSize: 14, fontWeight: "900", color: "#181510" },
  stepTitleOff: { color: "rgba(160,160,160,1)", fontWeight: "800" },
  stepTime: { marginTop: 4, fontSize: 12, fontWeight: "700", color: "rgba(120,120,120,1)" },
  stepTimeOff: { color: "rgba(170,170,170,1)" },

  /* items */
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  itemRowBorder: { borderBottomWidth: 1, borderBottomColor: "rgba(245,242,238,1)" },
  itemImg: {
    width: 54,
    height: 54,
    borderRadius: 14,
    backgroundColor: "#f1eeea",
    borderWidth: 1,
    borderColor: "rgba(245,242,238,1)",
  },
  itemTitle: { fontSize: 15, fontWeight: "900", color: "#181510" },
  itemMetaRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 6 },
  colorDot: { width: 10, height: 10, borderRadius: 999 },
  colorDotBorder: { borderWidth: 1, borderColor: "rgba(226,220,212,0.9)" },
  itemMeta: { fontSize: 12, fontWeight: "700", color: MUTED },
  itemPrice: { fontSize: 15, fontWeight: "900", color: "#181510" },

  /* address/payment */
  iconTitleRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  upperTitle: { fontSize: 12, fontWeight: "900", letterSpacing: 1.6, color: "#181510" },

  addrName: { marginTop: 10, fontSize: 14, fontWeight: "900", color: "#181510" },
  addrLine: { marginTop: 4, fontSize: 13, fontWeight: "700", color: "rgba(120,120,120,1)" },

  brandPill: {
    backgroundColor: "rgba(245,242,238,1)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  brandPillTxt: { fontSize: 11, fontWeight: "900", color: "#181510", letterSpacing: 0.5 },
  payTxt: { fontSize: 13, fontWeight: "800", color: "rgba(120,120,120,1)" },

  /* help */
  helpBtn: {
    marginTop: 16,
    height: 56,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: PRIMARY,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  helpTxt: { fontSize: 16, fontWeight: "900", color: PRIMARY },

  footerId: {
    marginTop: 14,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "700",
    color: "rgba(160,160,160,1)",
  },
});
