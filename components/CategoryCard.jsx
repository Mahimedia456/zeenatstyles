import { Feather } from "@expo/vector-icons";
import { Pressable, View as RNView, StyleSheet } from "react-native";
import { Text } from "./Themed";

const PRIMARY = "#B8803C";

export default function CategoryCard({
  label,
  icon = "shopping-bag",
  active = false,
  onPress,
}) {
  return (
    <Pressable onPress={onPress} style={styles.wrap}>
      <RNView style={[styles.circle, active && styles.circleActive]}>
        <Feather name={icon} size={22} color={PRIMARY} />
      </RNView>
      <Text style={[styles.label, active ? styles.labelActive : styles.labelInactive]} numberOfLines={1}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { width: 74, alignItems: "center", gap: 8 },
  circle: {
    width: 64,
    height: 64,
    borderRadius: 999,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "rgba(184,128,60,0.12)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  circleActive: {
    borderWidth: 2,
    borderColor: PRIMARY,
  },
  label: { fontSize: 11, fontWeight: "800" },
  labelActive: { color: PRIMARY },
  labelInactive: { color: "rgba(27,24,13,0.6)" },
});
