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

import AppHeader from "../../components/AppHeader";
import BottomSheet from "../../components/BottomSheet";
import ProductCard from "../../components/ProductCard";
import { Text, View } from "../../components/Themed";

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

export default function Products() {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [sheet, setSheet] = useState(null); // "sort" | "filter" | "category" | null

  const [sort, setSort] = useState("Popular");
  const [selectedCategory, setSelectedCategory] = useState("Handbags");
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("999");
  const [selectedColors, setSelectedColors] = useState(["#000000"]);

  const products = useMemo(
    () => [
      {
        id: "p1",
        badge: "15% OFF",
        title: "Classic Leather Tote",
        price: 120,
        oldPrice: 150,
        rating: 4.8,
        reviews: 124,
        category: "Handbags",
        colors: ["#000000", "#5d4037", "#f5f5dc"],
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCkd2jg0i2Mzr6vnnSvYGoH0R-b5-pBm8oU8y0sCXyFSkARP6MrxfDddktEoRTPNoCmY13RrqB3mU3mxNT4EvBjgqIxQyAdil-hWSNFlk7t4xcCGisoEx77UONHZLFXv-OVF3extBFhuwwFqtd8PVlMRCsZY4mrH_SfkfZuxQ3s0K3v0-lQkitaN4EETcHSrjHhCpzk3xC3ljFkyg5j3hwkpwl8toW2L5Ysmna9NVfx6XR3bVNT1G14S3YywZVC35qyF_sxZUYpWg",
      },
      {
        id: "p2",
        badge: "20% OFF",
        title: "Quilted Crossbody",
        price: 85,
        oldPrice: 100,
        rating: 4.9,
        reviews: 88,
        category: "Handbags",
        colors: ["#f48fb1", "#5d4037", "#000000"],
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCa05w_QGhIodNBboeVe1xxBe1GN7uT-6-UlOmibAnUkdmcOwTVpBJ_fsnXtcSG5agovZJL11Yb05Qn0rB3KJ--P4-pALT0ZLhHCHI6s0eRFrSd8Koz5p4315bH8TG3gH8sgoy-XkJ_ab7SaeYkDF6sV4uLzPSOdT0vtcT9ug8JCj1T8BT44pvzCJFfzvYHSvJqqYJ3pzbLT5LG202tw2HV9AaFymj58dcD2yfpUzeuDy3r6heUtE98yz7_7giNv3nd_acdi3aNvw",
      },
      {
        id: "p3",
        badge: "10% OFF",
        title: "Structured Satchel",
        price: 150,
        oldPrice: 180,
        rating: 4.7,
        reviews: 210,
        category: "Handbags",
        colors: ["#5d4037", "#000000"],
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuD6IYlUHnk4PwWMxVsoDE2ewUkg3TbCwVNroLvcK3tRsYu7m7drqAKZmNmUo-pf36bqCX-bSje5Qdr8TbFvTccSiJtR-m-vvOsWqyh0Nr3LxoVoGK7_7SUrm6L8lMm4kgkaCnvraZMf8OCamELpCCAPHOVqo5Zls2rKSkpEgZ655AwZl7E7dfg85GkTwUef8Zpv7zdPaehaoY4kjmvam3EhPDYb1OTC9BdPglu4BmkR8fghOwO6x0OzYL92ThPmlfaz37XuRDC7TQ",
      },
      {
        id: "p4",
        badge: "NEW",
        title: "Mini Suede Bucket",
        price: 65,
        oldPrice: 80,
        rating: 4.6,
        reviews: 45,
        category: "Handbags",
        colors: ["#f5f5dc", "#f48fb1"],
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBIdoEvv8uuWCi-tS01pngTN3P7aLXGPZZhoKT_wgyxQuIgUNywcVT_MmayXp9rnLXsyvSCf6wGFP_14rzYfvdBY78EdnbGS7cmv8YCboAtTBVTb9lTVrv3u86Q_0XAOzBWyV7hv2Pdj9y0PFM28J29HVZgTBmMJNNnMkaOy2x2aWccxbnU93bUpsAjJjbaQsKhebjP95idn-wO9sTbA47284cSHvF3auzdrmR0VS2p93lR8Zjd1ESVf0n5vOAgr6tHhAqKfVDmRg",
      },
    ],
    []
  );

  const categories = useMemo(
    () => ["Handbags", "Tote Bags", "Crossbody", "Clutches"],
    []
  );

  const allColors = useMemo(
    () => ["#000000", "#5d4037", "#f5f5dc", "#f48fb1"],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const min = Number(minPrice || 0);
    const max = Number(maxPrice || 999999);

    let list = products.filter((p) => {
      if (selectedCategory && p.category !== selectedCategory) return false;

      if (!(p.price >= min && p.price <= max)) return false;

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

    if (sort === "Price: Low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "Price: High") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "Rating") list = [...list].sort((a, b) => b.rating - a.rating);

    return list;
  }, [products, query, selectedCategory, minPrice, maxPrice, selectedColors, sort]);

  const filterCount =
    (selectedColors.length ? 1 : 0) +
    ((minPrice && minPrice !== "0") || (maxPrice && maxPrice !== "999") ? 1 : 0);

  return (
    <View style={styles.screen} lightColor={BG}>
      {/* ✅ AppHeader Added */}
      <AppHeader
        title="Products"
        onPressSearch={() => setSheet("filter")}
        onPressWishlist={() => router.push("/(modals)/wishlist")}
        onPressCart={() => router.push("/(tabs)/cart")}
        cartBadge={2}
      />

      {/* Chips */}
      <RNView style={styles.chipsRow}>
        <Chip label="Sort" icon="sliders" onPress={() => setSheet("sort")} />
        <Chip
          label="Filter"
          icon="filter"
          badge={filterCount ? String(filterCount) : null}
          onPress={() => setSheet("filter")}
        />
        <Chip label="Category" rightIcon="chevron-down" onPress={() => setSheet("category")} />
      </RNView>

      {/* Grid */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
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
              price={item.price}
              oldPrice={item.oldPrice}
              rating={item.rating}
              reviews={item.reviews}
              colors={item.colors}
              onPress={() => {}}
              onPressFav={() => {}}
            />
          </RNView>
        )}
        ListFooterComponent={<RNView style={{ height: 110 }} />}
      />

      {/* Bottom Sheets */}
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

      <BottomSheet visible={sheet === "category"} title="Category" onClose={() => setSheet(null)}>
        {categories.map((c) => {
          const active = selectedCategory === c;
          return (
            <Pressable
              key={c}
              onPress={() => {
                setSelectedCategory(c);
                setSheet(null);
              }}
              style={[styles.sheetRow, active && styles.sheetRowActive]}
            >
              <Text style={styles.sheetRowTxt}>{c}</Text>
            </Pressable>
          );
        })}
      </BottomSheet>

      <BottomSheet visible={sheet === "filter"} title="Filter" onClose={() => setSheet(null)}>
        {/* Search */}
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

        {/* Price Range */}
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

        {/* Colors */}
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

  colorsRow: { flexDirection: "row", gap: 12, marginBottom: 10 },
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
