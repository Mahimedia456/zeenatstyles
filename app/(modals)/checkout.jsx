import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, View as RNView, ScrollView, StyleSheet, TextInput } from "react-native";

import InnerHeader from "../../components/InnerHeader";
import ShinyButton from "../../components/ShinyButton";
import { Text, View } from "../../components/Themed";

const BG = "#FFFFFF";
const CARD = "#F9F9F8";
const BORDER = "#E5E5E5";
const PRIMARY = "#B8803C";

function RadioRow({ active, icon, title, onPress }) {
  return (
    <Pressable onPress={onPress} style={[styles.radioRow, active && styles.radioRowActive]}>
      <RNView style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Feather name={icon} size={18} color={active ? PRIMARY : "rgba(0,0,0,0.45)"} />
        <Text style={styles.radioTitle}>{title}</Text>
      </RNView>

      <RNView style={[styles.radioDot, active && styles.radioDotActive]} />
    </Pressable>
  );
}

export default function Checkout() {
  const router = useRouter();

  const [payment, setPayment] = useState("cod"); // "cod" | "online"
  const [name, setName] = useState("Zeenat Ahmed");
  const [phone, setPhone] = useState("+1 (555) 000-0000");
  const [address, setAddress] = useState("123 Luxury Avenue, Suite 4B, New York, NY");

  const summary = useMemo(
    () => ({
      subtotal: 245,
      shipping: 15,
      tax: 12.5,
      total: 272.5,
    }),
    []
  );

  return (
    <View style={styles.screen} lightColor={BG}>
      <InnerHeader title="Checkout" onPressLeft={() => router.back()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 140 }}
      >
        {/* Delivery */}
        <RNView style={styles.card}>
          <Text style={styles.cardTitle}>Delivery Information</Text>

          <Text style={styles.lbl}>Full Name</Text>
          <TextInput value={name} onChangeText={setName} style={styles.input} />

          <Text style={styles.lbl}>Phone Number</Text>
          <TextInput value={phone} onChangeText={setPhone} style={styles.input} />

          <Text style={styles.lbl}>Shipping Address</Text>
          <TextInput
            value={address}
            onChangeText={setAddress}
            style={[styles.input, styles.textarea]}
            multiline
          />
        </RNView>

        {/* Payment */}
        <RNView style={[styles.card, { marginTop: 14 }]}>
          <Text style={styles.cardTitle}>Payment Method</Text>

          <RadioRow
            active={payment === "cod"}
            icon="dollar-sign"
            title="Cash on Delivery"
            onPress={() => setPayment("cod")}
          />
          <RadioRow
            active={payment === "online"}
            icon="credit-card"
            title="Online Payment"
            onPress={() => setPayment("online")}
          />
        </RNView>

        {/* Summary */}
        <RNView style={[styles.card, { marginTop: 14 }]}>
          <Text style={styles.cardTitle}>Order Summary</Text>

          <RNView style={styles.sumRow}>
            <Text style={styles.sumLbl}>Subtotal</Text>
            <Text style={styles.sumVal}>${summary.subtotal.toFixed(2)}</Text>
          </RNView>

          <RNView style={styles.sumRow}>
            <Text style={styles.sumLbl}>Shipping Fee</Text>
            <Text style={styles.sumVal}>${summary.shipping.toFixed(2)}</Text>
          </RNView>

          <RNView style={styles.sumRow}>
            <Text style={styles.sumLbl}>Tax</Text>
            <Text style={styles.sumVal}>${summary.tax.toFixed(2)}</Text>
          </RNView>

          <RNView style={styles.divider} />

          <RNView style={styles.sumRow}>
            <Text style={styles.totalLbl}>Total</Text>
            <Text style={styles.totalVal}>${summary.total.toFixed(2)}</Text>
          </RNView>
        </RNView>

        <RNView style={styles.secureRow}>
          <Feather name="lock" size={14} color="rgba(0,0,0,0.45)" />
          <Text style={styles.secureTxt}>Secure encrypted checkout powered by Zeenat Pay</Text>
        </RNView>
      </ScrollView>

      {/* Bottom button */}
      <RNView style={styles.bottomBar}>
        <RNView style={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 18 }}>
          <ShinyButton
            title="Place Order"
            rightIcon="trending-up"
            onPress={() => router.replace("/(modals)/order-success")}
          />
        </RNView>
      </RNView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },

  card: {
    backgroundColor: CARD,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: BORDER,
  },
  cardTitle: { fontSize: 18, fontWeight: "900", color: "#333", marginBottom: 12 },

  lbl: { marginTop: 10, marginBottom: 8, fontSize: 13, fontWeight: "800", color: "#666" },
  input: {
    height: 48,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: BORDER,
    paddingHorizontal: 14,
    fontSize: 15,
    fontWeight: "700",
    color: "#333",
  },
  textarea: { height: 96, paddingTop: 12, textAlignVertical: "top" },

  radioRow: {
    height: 56,
    borderRadius: 14,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: BORDER,
    paddingHorizontal: 14,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  radioRowActive: { borderWidth: 2, borderColor: PRIMARY },
  radioTitle: { fontSize: 14, fontWeight: "800", color: "#333" },
  radioDot: { width: 18, height: 18, borderRadius: 999, borderWidth: 1, borderColor: BORDER },
  radioDotActive: { borderWidth: 5, borderColor: PRIMARY, backgroundColor: "#fff" },

  sumRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  sumLbl: { fontSize: 13, fontWeight: "700", color: "#666" },
  sumVal: { fontSize: 13, fontWeight: "900", color: "#333" },
  divider: { height: 1, backgroundColor: BORDER, marginVertical: 8 },
  totalLbl: { fontSize: 16, fontWeight: "900", color: "#333" },
  totalVal: { fontSize: 18, fontWeight: "900", color: PRIMARY },

  secureRow: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  secureTxt: { fontSize: 11, fontWeight: "700", color: "rgba(0,0,0,0.45)" },

  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.92)",
    borderTopWidth: 1,
    borderTopColor: BORDER,
  },
});
