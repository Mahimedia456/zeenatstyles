import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
    FlatList,
    Pressable,
    View as RNView,
    StyleSheet,
    TextInput,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import InnerHeader from "../../components/InnerHeader";
import ProductCard from "../../components/ProductCard";
import { Text, View } from "../../components/Themed";

// ✅ IMPORTANT: apne shared data ka sahi path lagao
// mostly you said: app/data/products.js
import products from "../data/products"; // if file is app/data/products.js then use: import products from "../data/products";

const BG = "#FBFAF9";
const PRIMARY = "#B8803C";

export default function SearchModal() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return products || [];
    return (products || []).filter((p) => {
      const hay = `${p.title || ""} ${p.category || ""} ${p.categorySlug || ""}`.toLowerCase();
      return hay.includes(s);
    });
  }, [q]);

  return (
    <View style={styles.screen} lightColor={BG}>
      <InnerHeader title="Search" onPressBack={() => router.back()} />

      {/* Search bar */}
      <RNView style={styles.searchWrap}>
        <Feather name="search" size={18} color="rgba(138,117,92,1)" />
        <TextInput
          value={q}
          onChangeText={setQ}
          placeholder="Search products..."
          placeholderTextColor="rgba(138,117,92,0.7)"
          style={styles.searchInput}
          autoFocus
        />
        {!!q && (
          <Pressable onPress={() => setQ("")} hitSlop={10}>
            <Feather name="x" size={18} color="rgba(138,117,92,1)" />
          </Pressable>
        )}
      </RNView>

      {/* Results */}
      <FlatList
        data={filtered}
        keyExtractor={(item, idx) => String(item.id ?? idx)}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: Math.max(20, insets.bottom) + 16 }}
        columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 16 }}
        renderItem={({ item }) => (
          <RNView style={{ flex: 1, maxWidth: "48.5%" }}>
            <ProductCard
              image={item.image}
              badge={item.badge}
              title={item.title}
              price={Number(item.price || 0)}
              oldPrice={item.oldPrice ? Number(item.oldPrice) : null}
              rating={Number(item.rating || 0)}
              reviews={Number(item.reviews || 0)}
              colors={item.colors || []}
              onPress={() =>
                router.push({
                  pathname: "/(modals)/product-details",
                  params: { id: String(item.id) },
                })
              }
              onPressFav={() => {}}
            />
          </RNView>
        )}
        ListEmptyComponent={
          <RNView style={{ paddingTop: 40, alignItems: "center" }}>
            <Text style={{ fontWeight: "900" }}>No results</Text>
            <Text style={{ marginTop: 6, fontWeight: "700", color: "rgba(138,117,92,1)" }}>
              Try another keyword.
            </Text>
          </RNView>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },
  searchWrap: {
    marginTop: 10,
    marginHorizontal: 16,
    height: 48,
    borderRadius: 999,
    backgroundColor: "#F1EEEA",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.02)",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    marginBottom: 10,
  },
  searchInput: { flex: 1, height: 48, fontSize: 13, fontWeight: "700", color: "#181510" },
});
