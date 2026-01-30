// app/catalog/[slug].jsx
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, Pressable, View as RNView, StyleSheet, TextInput } from "react-native";

import AppHeader from "../../components/AppHeader";
import BottomSheet from "../../components/BottomSheet";
import ProductCard from "../../components/ProductCard";
import { Text, View } from "../../components/Themed";

import products from "../data/products";

const BG = "#FBFAF9";
const PRIMARY = "#B8803C";

const Chip = ({ label, icon, rightIcon = "chevron-down", badge, onPress }) => (
  <Pressable onPress={onPress} style={styles.chip}>
    {!!icon && <Feather name={icon} size={16} color="#181510" />}
    <Text style={styles.chipTxt}>{label}</Text>
    {badge ? <Text style={styles.chipBadge}>{badge}</Text> : null}
    {!!rightIcon && <Feather name={rightIcon} size={16} color="#181510" />}
  </Pressable>
);

const ColorDot = ({ color, active, onPress }) => (
  <Pressable
    onPress={onPress}
    hitSlop={10}
    style={[
      styles.filterDot,
      { backgroundColor: color },
      active ? styles.filterDotActive : styles.filterDotInactive,
    ]}
  />
);

function normalizeSlug(s = "") {
  return String(s).trim().toLowerCase().replace(/%20/g, " ").replace(/\s+/g, "-");
}

function prettyTitle(slug = "") {
  const s = String(slug).replace(/[-_]+/g, " ").trim();
  if (!s) return "Products";
  return s.replace(/\b\w/g, (m) => m.toUpperCase());
}

export default function CatalogBySlug() {
  const router = useRouter();
  const { slug } = useLocalSearchParams();

  const [sheet, setSheet] = useState(null); // "sort" | "filter" | null
  const [query, setQuery] = useState("");

  const [sort, setSort] = useState("Popular");
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("999");
  const [selectedColors, setSelectedColors] = useState([]);

  const activeSlug = useMemo(() => normalizeSlug(slug || ""), [slug]);
  const title = useMemo(() => prettyTitle(slug || ""), [slug]);

  const allColors = useMemo(() => {
    const set = new Set();
    (products || []).forEach((p) => (p.colors || []).forEach((c) => set.add(c)));
    return Array.from(set);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const min = Number(minPrice || 0);
    const max = Number(maxPrice || 999999);

    let list = (products || []).filter((p) => {
      const pSlug = normalizeSlug(p.categorySlug || p.category || "");
      if (pSlug !== activeSlug) return false;

      if (!(Number(p.price) >= min && Number(p.price) <= max)) return false;

      if (selectedColors.length) {
        const has = (p.colors || []).some((c) => selectedColors.includes(c));
        if (!has) return false;
      }

      if (q) {
        const hay = `${p.title} ${p.category}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }

      return true;
    });

    if (sort === "Price: Low") list = [...list].sort((a, b) => Number(a.price) - Number(b.price));
    if (sort === "Price: High") list = [...list].sort((a, b) => Number(b.price) - Number(a.price));
    if (sort === "Rating") list = [...list].sort((a, b) => Number(b.rating) - Number(a.rating));

    return list;
  }, [activeSlug, query, minPrice, maxPrice, selectedColors, sort]);

  const filterCount =
    (selectedColors.length ? 1 : 0) +
    ((minPrice && minPrice !== "0") || (maxPrice && maxPrice !== "999") ? 1 : 0);

  return (
    <View style={styles.screen} lightColor={BG}>
      {/* ✅ Same header style like Products tab */}
      <AppHeader
        title={title}
        onPressSearch={() => setSheet("filter")}
        onPressWishlist={() => router.push("/(modals)/wishlist")}
        onPressCart={() => router.push("/(tabs)/cart")}
        cartBadge={2}
      />

      {/* ✅ Chips row - ONLY Sort + Filter */}
      <RNView style={styles.chipsRow}>
        <Chip label="Sort" icon="sliders" onPress={() => setSheet("sort")} />
        <Chip
          label="Filter"
          icon="filter"
          badge={filterCount ? String(filterCount) : null}
          onPress={() => setSheet("filter")}
        />
      </RNView>

      {/* ✅ Grid exactly like Products tab */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <RNView style={styles.cell}>
            <ProductCard
              image={item.image}
              badge={item.badge}
              title={item.title}
              price={Number(item.price)}
              oldPrice={Number(item.oldPrice || 0)}
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
          <RNView style={styles.emptyWrap}>
            <Text style={styles.emptyTitle}>No products found</Text>
            <Text style={styles.emptySub}>Is category me abhi products available nahi hain.</Text>
          </RNView>
        }
        ListFooterComponent={<RNView style={{ height: 110 }} />}
      />

      {/* ✅ Sort Sheet */}
      <BottomSheet visible={sheet === "sort"} title="Sort" onClose={() => setSheet(null)}>
        {["Popular", "Price: Low", "Price: High", "Rating"].map((s) => {
          const active = sort === s;
          return (
            <Pressable
              key={s}
              onPress={() => {
                setSort(s);
                setSheet(null);
              }}
              style={[styles.sheetRow, active && styles.sheetRowActive]}
            >
              <Text style={styles.sheetRowTxt}>{s}</Text>
            </Pressable>
          );
        })}
      </BottomSheet>

      {/* ✅ Filter Sheet */}
      <BottomSheet visible={sheet === "filter"} title="Filter" onClose={() => setSheet(null)}>
        <Text style={styles.sheetSectionTitle}>Search</Text>
        <RNView style={styles.searchWrap}>
          <Feather name="search" size={16} color="rgba(138,117,92,1)" />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search products..."
            placeholderTextColor="rgba(138,117,92,0.7)"
            style={styles.searchInput}
          />
        </RNView>

        <Text style={styles.sheetSectionTitle}>Price Range</Text>
        <RNView style={styles.rangeRow}>
          <RNView style={styles.rangeBox}>
            <Text style={styles.rangeLbl}>Min</Text>
            <TextInput
              value={minPrice}
              onChangeText={setMinPrice}
              keyboardType="numeric"
              style={styles.rangeInput}
              placeholder="0"
              placeholderTextColor="rgba(138,117,92,0.7)"
            />
          </RNView>

          <RNView style={styles.rangeBox}>
            <Text style={styles.rangeLbl}>Max</Text>
            <TextInput
              value={maxPrice}
              onChangeText={setMaxPrice}
              keyboardType="numeric"
              style={styles.rangeInput}
              placeholder="999"
              placeholderTextColor="rgba(138,117,92,0.7)"
            />
          </RNView>
        </RNView>

        <Text style={styles.sheetSectionTitle}>Colors</Text>
        <RNView style={styles.colorsRow}>
          {allColors.map((c) => {
            const active = selectedColors.includes(c);
            return (
              <ColorDot
                key={c}
                color={c}
                active={active}
                onPress={() =>
                  setSelectedColors((prev) =>
                    active ? prev.filter((x) => x !== c) : [...prev, c]
                  )
                }
              />
            );
          })}
        </RNView>

        <RNView style={styles.sheetButtons}>
          <Pressable
            onPress={() => {
              setQuery("");
              setSelectedColors([]);
              setMinPrice("0");
              setMaxPrice("999");
            }}
            style={styles.resetBtn}
          >
            <Text style={styles.resetTxt}>Reset</Text>
          </Pressable>

          <Pressable onPress={() => setSheet(null)} style={styles.applyBtn}>
            <Text style={styles.applyTxt}>Apply</Text>
          </Pressable>
        </RNView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },

  chipsRow: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },
  chip: {
    height: 40,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "rgba(226,220,212,1)",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 1,
  },
  chipTxt: { fontSize: 14, fontWeight: "800", color: "#181510" },
  chipBadge: { fontSize: 12, fontWeight: "900", color: PRIMARY },

  listContent: { paddingHorizontal: 16, paddingTop: 6 },
  row: { justifyContent: "space-between", marginBottom: 16 },
  cell: { flex: 1, maxWidth: "48.5%" },

  emptyWrap: { paddingTop: 30, paddingHorizontal: 16, alignItems: "center" },
  emptyTitle: { fontSize: 16, fontWeight: "900", color: "#181510" },
  emptySub: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: "700",
    color: "rgba(138,117,92,1)",
    textAlign: "center",
  },

  sheetRow: {
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(226,220,212,0.9)",
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sheetRowActive: { borderColor: "rgba(184,128,60,0.55)" },
  sheetRowTxt: { fontSize: 14, fontWeight: "900", color: "#181510" },

  sheetSectionTitle: {
    marginTop: 6,
    marginBottom: 10,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1.4,
    color: "rgba(138,117,92,1)",
    textTransform: "uppercase",
  },

  searchWrap: {
    height: 44,
    borderRadius: 999,
    backgroundColor: "#F1EEEA",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.02)",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    marginBottom: 14,
  },
  searchInput: { flex: 1, height: 44, fontSize: 13, fontWeight: "700", color: "#181510" },

  rangeRow: { flexDirection: "row", gap: 12, marginBottom: 14 },
  rangeBox: {
    flex: 1,
    borderRadius: 14,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "rgba(226,220,212,0.9)",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  rangeLbl: { fontSize: 11, fontWeight: "900", color: "rgba(138,117,92,1)" },
  rangeInput: { height: 34, fontSize: 16, fontWeight: "900", color: "#181510" },

  colorsRow: { flexDirection: "row", gap: 12, marginBottom: 10, flexWrap: "wrap" },
  filterDot: { width: 22, height: 22, borderRadius: 999 },
  filterDotInactive: { borderWidth: 1, borderColor: "rgba(226,220,212,1)" },
  filterDotActive: { borderWidth: 2, borderColor: PRIMARY },

  sheetButtons: { flexDirection: "row", gap: 12, marginTop: 12 },
  resetBtn: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "rgba(226,220,212,1)",
    alignItems: "center",
    justifyContent: "center",
  },
  resetTxt: { fontSize: 14, fontWeight: "900", color: "#181510" },

  applyBtn: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    backgroundColor: PRIMARY,
    alignItems: "center",
    justifyContent: "center",
  },
  applyTxt: { fontSize: 14, fontWeight: "900", color: "#fff" },
});
