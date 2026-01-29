import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { Text } from "./Themed";

const GOLD = "#B8803C";

export default function SimpleBackHeader({ title = "Zeenat Styles" }) {
  const router = useRouter();

  return (
    <View style={styles.wrap}>
      <Pressable onPress={() => router.back()} hitSlop={12} style={styles.backBtn}>
        {/* ✅ simple less-than */}
        <Text style={styles.less}>&lt;</Text>
      </Pressable>

      <Text style={styles.title}>{title}</Text>
      <View style={{ width: 40 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    backgroundColor: "#fff",
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.04)",
    alignItems: "center",
    justifyContent: "center",
  },
  less: { fontSize: 22, fontWeight: "900", color: "#1b180d", marginTop: -2 },
  title: { flex: 1, textAlign: "center", fontSize: 16, fontWeight: "900", color: "#1b180d" },
});
