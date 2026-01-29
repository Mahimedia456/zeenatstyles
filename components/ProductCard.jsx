import { Feather } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { Image, Pressable, View as RNView, StyleSheet } from "react-native";
import { Text } from "./Themed";

const PRIMARY = "#B8803C";
const BG = "#FBFAF9";

export default function ProductCard({
  image,
  badge, // "15% OFF" | "NEW"
  title,
  price,
  oldPrice,
  rating = 4.8,
  reviews = 124,
  colors = [], // ["#000000", "#5d4037", "#f5f5dc"]
  onPress,
  onPressFav,
  onSelectColor,
}) {
  const [selectedColor, setSelectedColor] = useState(colors?.[0] ?? null);

  const showColors = useMemo(() => Array.isArray(colors) && colors.length > 0, [colors]);

  const pickColor = (c) => {
    setSelectedColor(c);
    onSelectColor?.(c);
  };

  return (
    <Pressable onPress={onPress} style={styles.card}>
      {/* Image Card */}
      <RNView style={styles.imgWrap}>
        <Image source={{ uri: image }} style={styles.img} />

        {!!badge && (
          <RNView style={styles.badge}>
            <Text style={styles.badgeTxt}>{badge}</Text>
          </RNView>
        )}

        <Pressable onPress={onPressFav} hitSlop={12} style={styles.favBtn}>
          <RNView style={styles.favCircle}>
            <Feather name="heart" size={18} color="#111" />
          </RNView>
        </Pressable>
      </RNView>

      {/* Content */}
      <RNView style={styles.body}>
        {/* ✅ Color Swatches */}
        {showColors ? (
          <RNView style={styles.swatches}>
            {colors.slice(0, 4).map((c) => {
              const active = selectedColor === c;
              return (
                <Pressable
                  key={c}
                  onPress={() => pickColor(c)}
                  hitSlop={10}
                  style={[
                    styles.swatch,
                    { backgroundColor: c },
                    active ? styles.swatchActive : styles.swatchInactive,
                  ]}
                />
              );
            })}
          </RNView>
        ) : null}

        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>

        <RNView style={styles.priceRow}>
          <Text style={styles.price}>${Number(price).toFixed(2)}</Text>
          {!!oldPrice && (
            <Text style={styles.oldPrice}>${Number(oldPrice).toFixed(2)}</Text>
          )}
        </RNView>

        <RNView style={styles.ratingRow}>
          <Feather name="star" size={13} color={PRIMARY} />
          <Text style={styles.ratingTxt}>
            {rating} ({reviews})
          </Text>
        </RNView>
      </RNView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "transparent",
  },

  imgWrap: {
    aspectRatio: 3 / 4,
    borderRadius: 22,
    overflow: "hidden",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "rgba(226,220,212,0.35)",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },

  img: { width: "100%", height: "100%" },

  badge: {
    position: "absolute",
    left: 10,
    top: 10,
    backgroundColor: PRIMARY,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeTxt: { color: "#fff", fontSize: 10, fontWeight: "900", letterSpacing: 1 },

  favBtn: { position: "absolute", right: 10, top: 10 },
  favCircle: {
    width: 34,
    height: 34,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.88)",
    alignItems: "center",
    justifyContent: "center",
  },

  body: { paddingTop: 10, paddingHorizontal: 4 },

  swatches: { flexDirection: "row", gap: 8, marginBottom: 8 },
  swatch: { width: 16, height: 16, borderRadius: 999 },
  swatchInactive: { borderWidth: 1, borderColor: "rgba(226,220,212,0.9)" },
  swatchActive: { borderWidth: 2, borderColor: PRIMARY },

  title: { fontSize: 16, fontWeight: "900", color: "#181510" },

  priceRow: { flexDirection: "row", alignItems: "baseline", gap: 10, marginTop: 6 },
  price: { fontSize: 18, fontWeight: "900", color: PRIMARY },
  oldPrice: { fontSize: 13, color: "rgba(138,117,92,1)", textDecorationLine: "line-through" },

  ratingRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 6 },
  ratingTxt: { fontSize: 13, fontWeight: "800", color: "rgba(138,117,92,1)" },
});
