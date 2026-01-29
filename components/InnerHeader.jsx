import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, View as RNView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "./Themed";

const GOLD = "#B8803C";

export default function InnerHeader({
  title = "Handbags",
  subtitle = "",
  rightIcon = "search",
  onPressRight,
}) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <RNView style={[styles.wrap, { paddingTop: insets.top + 8 }]}>
      <RNView style={styles.row}>
        <Pressable
          hitSlop={12}
          onPress={() => router.back()}
          style={styles.backBtn}
        >
          <Feather name="chevron-left" size={22} color={GOLD} />
        </Pressable>

        <RNView style={styles.center}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {!!subtitle && (
            <Text style={styles.sub} numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </RNView>

        <Pressable hitSlop={12} onPress={onPressRight} style={styles.rightBtn}>
          <Feather name={rightIcon} size={20} color="#191510" />
        </Pressable>
      </RNView>
    </RNView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: "#FBFAF9",
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  row: { flexDirection: "row", alignItems: "center" },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.70)",
    borderWidth: 1,
    borderColor: "rgba(227,220,212,1)",
  },
  center: { flex: 1, alignItems: "center" },
  title: { fontSize: 18, fontWeight: "900", color: "#191510" },
  sub: { marginTop: 2, fontSize: 11, fontWeight: "800", color: "rgba(27,24,13,0.45)", letterSpacing: 1.2 },
  rightBtn: {
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.70)",
    borderWidth: 1,
    borderColor: "rgba(227,220,212,1)",
  },
});
