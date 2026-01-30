import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
    Pressable,
    View as RNView,
    ScrollView,
    StyleSheet,
    Switch,
    TextInput,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import InnerHeader from "../../components/InnerHeader";
import ShinyButton from "../../components/ShinyButton";
import { Text, View } from "../../components/Themed";

const BG = "#FBFAF9";
const PRIMARY = "#B8803C";

function Label({ children }) {
  return <Text style={styles.label}>{children}</Text>;
}

function Field({ label, value, onChangeText, placeholder, keyboardType = "default" }) {
  return (
    <RNView style={styles.fieldWrap}>
      <Label>{label}</Label>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="rgba(138,117,92,0.7)"
        style={styles.input}
        keyboardType={keyboardType}
      />
    </RNView>
  );
}

export default function AddAddressScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();

  const isEdit = params?.edit === "1";

  const [fullName, setFullName] = useState(isEdit ? "Sarah Jenkins" : "");
  const [phone, setPhone] = useState(isEdit ? "+1 (555) 012-3456" : "");
  const [street, setStreet] = useState(isEdit ? "123 Elegant Way, Suite 400" : "");
  const [area, setArea] = useState(isEdit ? "Near Mall" : "");
  const [city, setCity] = useState(isEdit ? "Los Angeles" : "");
  const [postal, setPostal] = useState(isEdit ? "90210" : "");
  const [isDefault, setIsDefault] = useState(isEdit ? true : false);

  const bottomPad = useMemo(() => 140 + insets.bottom, [insets.bottom]);

  const onSave = () => {
    // TODO: Save to store / backend
    router.back();
  };

  return (
    <View style={styles.screen} lightColor={BG}>
      <InnerHeader
        title={isEdit ? "Edit Address" : "Add New Address"}
        onBack={() => router.back()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 14, paddingBottom: bottomPad }}
      >
        <Field
          label="Full Name"
          value={fullName}
          onChangeText={setFullName}
          placeholder="Enter your full name"
        />

        <Field
          label="Phone Number"
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter phone number"
          keyboardType="phone-pad"
        />

        <Field
          label="Street Address"
          value={street}
          onChangeText={setStreet}
          placeholder="House no., building, street name"
        />

        <Field
          label="Area/Landmark"
          value={area}
          onChangeText={setArea}
          placeholder="Near hospital, mall, etc."
        />

        <RNView style={styles.row2}>
          <RNView style={{ flex: 1 }}>
            <Field label="City" value={city} onChangeText={setCity} placeholder="City name" />
          </RNView>
          <RNView style={{ flex: 1 }}>
            <Field
              label="Postal Code"
              value={postal}
              onChangeText={setPostal}
              placeholder="Zip code"
              keyboardType="number-pad"
            />
          </RNView>
        </RNView>

        <RNView style={styles.defaultRow}>
          <RNView style={{ flex: 1 }}>
            <Text style={styles.defaultTitle}>Set as default address</Text>
            <Text style={styles.defaultSub}>Use this for all future orders</Text>
          </RNView>

          <Switch
            value={isDefault}
            onValueChange={setIsDefault}
            trackColor={{ false: "rgba(180,180,180,0.35)", true: "rgba(184,128,60,0.35)" }}
            thumbColor={isDefault ? PRIMARY : "#fff"}
          />
        </RNView>
      </ScrollView>

      {/* Bottom actions (safe area fixed) */}
      <RNView style={styles.bottomBar}>
        <RNView style={[styles.bottomInner, { paddingBottom: 14 + insets.bottom }]}>
          <ShinyButton
            title={isEdit ? "Save Changes" : "Save Address"}
            rightIcon="arrow-right"
            onPress={onSave}
          />

          <Pressable onPress={() => router.back()} style={styles.cancelBtn}>
            <Text style={styles.cancelTxt}>Cancel</Text>
          </Pressable>
        </RNView>
      </RNView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },

  fieldWrap: { marginBottom: 14 },

  label: {
    fontSize: 13,
    fontWeight: "900",
    color: "#181510",
    marginBottom: 8,
  },

  input: {
    height: 56,
    borderRadius: 14,
    paddingHorizontal: 14,
    fontSize: 15,
    fontWeight: "800",
    color: "#181510",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "rgba(226,220,212,0.9)",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 1,
  },

  row2: { flexDirection: "row", gap: 12 },

  defaultRow: {
    marginTop: 6,
    paddingVertical: 12,
    paddingHorizontal: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  defaultTitle: { fontSize: 15, fontWeight: "900", color: "#181510" },
  defaultSub: { marginTop: 4, fontSize: 12, fontWeight: "700", color: "rgba(138,117,92,1)" },

  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
  },
  bottomInner: {
    paddingTop: 12,
    paddingHorizontal: 16,
    backgroundColor: "rgba(251,250,249,0.92)",
    borderTopWidth: 1,
    borderTopColor: "rgba(226,220,212,0.7)",
  },

  cancelBtn: { height: 44, alignItems: "center", justifyContent: "center" },
  cancelTxt: {
    fontSize: 16,
    fontWeight: "900",
    color: "#181510",
    textDecorationLine: "underline",
    textDecorationColor: "rgba(184,128,60,0.35)",
    textDecorationStyle: "solid",
  },
});
