import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
    FlatList,
    Image,
    Pressable,
    View as RNView,
    StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import InnerHeader from "../../components/InnerHeader";
import ShinyButton from "../../components/ShinyButton";
import { Text, View } from "../../components/Themed";

const BG = "#FBFAF9";
const PRIMARY = "#B8803C";

function Pill({ label, variant = "outline" }) {
  return (
    <RNView
      style={[
        styles.pill,
        variant === "soft" && { backgroundColor: "rgba(184,128,60,0.10)" },
      ]}
    >
      <Text
        style={[
          styles.pillTxt,
          variant === "soft" && { color: PRIMARY },
        ]}
      >
        {label}
      </Text>
    </RNView>
  );
}

function AddressCard({
  tag,
  isDefault,
  name,
  lines,
  phone,
  onDelete,
  onEdit,
}) {
  return (
    <RNView style={styles.card}>
      <RNView style={styles.cardTop}>
        <RNView style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Pill label={tag.toUpperCase()} />
          {isDefault ? (
            <RNView style={styles.defaultWrap}>
              <Feather name="check-circle" size={16} color={PRIMARY} />
              <Text style={styles.defaultTxt}>Default</Text>
            </RNView>
          ) : null}
        </RNView>
      </RNView>

      <RNView style={{ gap: 8 }}>
        <Text style={styles.name}>{name}</Text>

        <Text style={styles.addr} numberOfLines={4}>
          {lines}
        </Text>

        {!!phone ? <Text style={styles.phone}>{phone}</Text> : null}
      </RNView>

      <RNView style={styles.cardActions}>
        <Pressable onPress={onDelete} style={styles.actionBtn}>
          <Feather name="trash-2" size={18} color="rgba(120,120,120,0.9)" />
          <Text style={[styles.actionTxt, { color: "rgba(120,120,120,0.9)" }]}>
            Delete
          </Text>
        </Pressable>

        <Pressable onPress={onEdit} style={styles.actionBtn}>
          <Feather name="edit-3" size={18} color={PRIMARY} />
          <Text style={[styles.actionTxt, { color: PRIMARY }]}>Edit</Text>
        </Pressable>
      </RNView>
    </RNView>
  );
}

function CoverageCard() {
  return (
    <RNView style={styles.coverage}>
      <RNView style={styles.coverageImgWrap}>
        <Image
          source={{
            uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmH5vMU0Q8An-5mx6qLnDxW1erAgTeic5WovXGHKP5iv7v0g8c3Z6jrsRJXRFiCzwvQSoq5eoDGK8WfnnROxZ1_tpRkyZDbO9UHX585SiJTVltM6RbtP3RZlFD4M69v3eAk-NuGC59AgdTSSuGvlYu-KOfMa-tZryVzQM1on8qtkQmaGPo7TsbzV_vO7HjxzxUSzpCo0LHZ_WD31OkDXxd4YGTVFJlcvfeK4hWKm3bNswpueiNyS1bkHPQ5KOAN3z-BE9LNSBqhw",
          }}
          style={styles.coverageImg}
        />
      </RNView>

      <RNView style={{ flex: 1, gap: 4 }}>
        <Text style={styles.coverageTitle}>Delivery Coverage</Text>
        <Text style={styles.coverageSub}>
          All your saved addresses are within our premium delivery zone for Zeenat Styles.
        </Text>
      </RNView>
    </RNView>
  );
}

export default function AddressesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [addresses, setAddresses] = useState([
    {
      id: "a1",
      tag: "Home",
      isDefault: true,
      name: "Sarah Jenkins",
      lines: "123 Elegant Way, Suite 400\nLos Angeles, CA 90210\nUnited States",
      phone: "+1 (555) 012-3456",
    },
    {
      id: "a2",
      tag: "Office",
      isDefault: false,
      name: "Sarah Jenkins",
      lines: "456 Corporate Plaza, Floor 12\nSan Francisco, CA 94105\nUnited States",
      phone: "+1 (555) 987-6543",
    },
    {
      id: "a3",
      tag: "Vacation",
      isDefault: false,
      name: "Sarah Jenkins",
      lines: "789 Coastal Retreat, Villa 4B\nMalibu, CA 90265\nUnited States",
      phone: "",
    },
  ]);

  const bottomPad = useMemo(() => 120 + insets.bottom, [insets.bottom]);

  const handleDelete = (id) => {
    setAddresses((prev) => prev.filter((x) => x.id !== id));
  };

  return (
    <View style={styles.screen} lightColor={BG}>
      <InnerHeader
        title="My Addresses"
        onBack={() => router.back()}
        rightIcon="more-horizontal"
        onRightPress={() => {}}
      />

      <FlatList
        data={addresses}
        keyExtractor={(it) => it.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 10,
          paddingBottom: bottomPad,
        }}
        ItemSeparatorComponent={() => <RNView style={{ height: 14 }} />}
        ListFooterComponent={
          <RNView style={{ marginTop: 18 }}>
            <CoverageCard />
          </RNView>
        }
        renderItem={({ item }) => (
          <AddressCard
            tag={item.tag}
            isDefault={item.isDefault}
            name={item.name}
            lines={item.lines}
            phone={item.phone}
            onDelete={() => handleDelete(item.id)}
            onEdit={() => router.push({ pathname: "/(modals)/add-address", params: { edit: "1" } })}
          />
        )}
      />

      {/* Bottom button (safe area fixed) */}
      <RNView pointerEvents="box-none" style={styles.bottomBar}>
        <RNView style={[styles.bottomInner, { paddingBottom: 14 + insets.bottom }]}>
          <ShinyButton
            title="Add New Address"
            leftIcon="map-pin"
            onPress={() => router.push("/(modals)/add-address")}
          />
        </RNView>
      </RNView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },

  card: {
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(226,220,212,0.75)",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 10 },
    elevation: 1,
    gap: 14,
  },

  cardTop: { flexDirection: "row", justifyContent: "space-between" },

  pill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(184,128,60,0.45)",
    backgroundColor: "transparent",
  },
  pillTxt: {
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.5,
    color: PRIMARY,
  },

  defaultWrap: { flexDirection: "row", alignItems: "center", gap: 6 },
  defaultTxt: { fontSize: 12, fontWeight: "800", color: PRIMARY },

  name: { fontSize: 18, fontWeight: "900", color: "#181510" },
  addr: { fontSize: 13, fontWeight: "700", color: "rgba(138,117,92,1)", lineHeight: 18 },
  phone: { fontSize: 12, fontWeight: "800", color: "rgba(138,117,92,1)" },

  cardActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 18,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(240,236,230,1)",
  },

  actionBtn: { flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 6 },
  actionTxt: { fontSize: 14, fontWeight: "900" },

  coverage: {
    flexDirection: "row",
    gap: 14,
    padding: 14,
    borderRadius: 22,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "rgba(184,128,60,0.35)",
    backgroundColor: "rgba(184,128,60,0.08)",
    alignItems: "center",
  },
  coverageImgWrap: { width: 64, height: 64, borderRadius: 16, overflow: "hidden" },
  coverageImg: { width: "100%", height: "100%" },
  coverageTitle: { fontSize: 14, fontWeight: "900", color: PRIMARY },
  coverageSub: { fontSize: 12, fontWeight: "700", color: "rgba(138,117,92,1)", lineHeight: 16 },

  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
  },
  bottomInner: {
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: "rgba(251,250,249,0.92)",
    borderTopWidth: 1,
    borderTopColor: "rgba(226,220,212,0.7)",
  },
});
