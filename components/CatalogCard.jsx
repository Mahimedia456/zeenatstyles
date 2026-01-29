import { Image, Pressable, View as RNView, StyleSheet } from "react-native";
import { Text } from "./Themed";

export default function CatalogCard({ title, image, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      {/* Image */}
      <Image source={{ uri: image }} style={styles.img} />

      {/* ✅ Bottom black overlay */}
      <RNView style={styles.overlay} />

      {/* ✅ Title */}
      <RNView style={styles.labelWrap}>
        <Text style={styles.label} numberOfLines={1}>
          {title}
        </Text>
      </RNView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    aspectRatio: 4 / 5,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
  },

  img: {
    width: "100%",
    height: "100%",
  },

  /* ✅ Bottom dark fade (HTML-like) */
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 40,
    backgroundColor: "rgba(0,0,0,0.45)",
  },

  /* Title container */
  labelWrap: {
    position: "absolute",
    left: 14,
    right: 14,
    bottom: 14,
  },

  label: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
});
