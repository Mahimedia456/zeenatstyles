import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Image,
  Pressable,
  View as RNView,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";

import AppHeader from "../../components/AppHeader";
import CategoryCard from "../../components/CategoryCard";
import ProductCard from "../../components/ProductCard";
import { Text, View } from "../../components/Themed";

// ✅ real products
import products from "../data/products";

const BG = "#FBFAF9";
const PRIMARY = "#B8803C";

// ✅ slug helper (Handbags -> handbags, Tote Bags -> tote-bags)
function toSlug(label = "") {
  return String(label)
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function Home() {
  const router = useRouter();
  const [activeCat, setActiveCat] = useState("Handbags");

  // ✅ categories same (UI same)
  const categories = useMemo(
    () => [
      { label: "Handbags", icon: "shopping-bag" },
      { label: "Tote Bags", icon: "shopping-bag" },
      { label: "Clutches", icon: "lock" },
      { label: "Work", icon: "briefcase" },
      { label: "Backpack", icon: "archive" },
    ],
    []
  );

  // ✅ Trending: products.js se first 2 (fallback safe)
  const trending = useMemo(() => {
    const list = (products || []).slice(0, 2);

    // ProductCard tumhare home me props spread se chal raha hai,
    // isliye mapping karke same keys bana rahe hain.
    return list.map((p) => ({
      id: String(p.id),
      badge: p.badge || "",
      brandLine: p.category || "Zeenat Styles",
      title: p.title,
      rating: Number(p.rating || 0),
      price: Number(p.price || 0),
      oldPrice: p.oldPrice ? Number(p.oldPrice) : null,
      image: p.image,
      _sourceId: String(p.id), // ✅ for navigation
      colors: p.colors || [],
      reviews: Number(p.reviews || 0),
    }));
  }, []);

  // ✅ Best sellers: next 2
  const bestSellers = useMemo(() => {
    const list = (products || []).slice(2, 4);
    return list.map((p) => ({
      id: String(p.id),
      title: p.title,
      price: Number(p.price || 0),
      image: p.image,
      _sourceId: String(p.id),
    }));
  }, []);

  return (
    <View style={styles.screen} lightColor={BG}>
      <AppHeader
        title="Zeenat Styles"
        onPressSearch={() => router.push("/(modals)/search")}
        onPressWishlist={() => router.push("/(modals)/wishlist")}
        onPressCart={() => router.push("/(tabs)/cart")}
        cartBadge={3}
      />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Search */}
        <RNView style={styles.searchWrap}>
          <Feather name="search" size={18} color="rgba(27,24,13,0.45)" />
          <TextInput
            placeholder="Search for luxury bags..."
            placeholderTextColor="rgba(27,24,13,0.45)"
            style={styles.searchInput}
          />
        </RNView>

        {/* Hero */}
        <RNView style={styles.hero}>
          <Image
            source={{
              uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUDBNx9f_u-5FvDcDUOmTUQ0_Qen5jJ49R7IKHnutChR1GjVg8dbKHIWJ9mfBgjGVOLpkCv3TJOdbL5hE7bQ3HeO3b3xl8wGsbpEFAnZaBo9Xa1i-Z0yULtNWfJlDXJAy74YF3hoMlIKDqqGoTz-w0tx7pg_aJjumrkHoA9dNuwf1V8ML2_CzBgtHYsV5UQgPQvJhTrjsFmoApIr5Xqh001DVynV4mMOkD0dDElh5INd72Y3rgrcgIjdRZfX3lksCgW4SjVTaBqg",
            }}
            style={styles.heroImg}
          />
          <RNView style={styles.heroOverlay} />
          <RNView style={styles.heroInner}>
            <Text style={styles.heroKicker}>LIMITED TIME</Text>
            <Text style={styles.heroTitle}>
              New Year Sale{"\n"}
              <Text style={{ color: PRIMARY }}>Up to 50% Off</Text>
            </Text>

            {/* ✅ Shop Now -> open active category */}
            <Pressable
              style={styles.heroBtn}
              onPress={() => router.push(`/catalog/${encodeURIComponent(toSlug(activeCat))}`)}
            >
              <Text style={styles.heroBtnTxt}>Shop Now</Text>
            </Pressable>
          </RNView>
        </RNView>

        {/* Categories */}
        <RNView style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Categories</Text>
        </RNView>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catRow}>
          {categories.map((c) => (
            <CategoryCard
              key={c.label}
              label={c.label}
              icon={c.icon}
              active={activeCat === c.label}
              onPress={() => {
                setActiveCat(c.label);
                // ✅ directly open category products
                router.push(`/catalog/${encodeURIComponent(toSlug(c.label))}`);
              }}
            />
          ))}
        </ScrollView>

        {/* Trending */}
        <RNView style={[styles.sectionRow, { marginTop: 8 }]}>
          <Text style={styles.sectionTitle}>Trending Now</Text>

          {/* ✅ View all -> Products tab */}
          <Pressable onPress={() => router.push("/(tabs)/products")}>
            <Text style={styles.viewAll}>VIEW ALL</Text>
          </Pressable>
        </RNView>

        <RNView style={styles.grid}>
          {trending.map((p) => (
            <RNView key={p.id} style={styles.gridItem}>
              <ProductCard
                {...p}
                // ✅ open details
                onPress={() =>
                  router.push({
                    pathname: "/(modals)/product-details",
                    params: { id: String(p._sourceId) },
                  })
                }
                onPressFav={() => {}}
              />
            </RNView>
          ))}
        </RNView>

        {/* Benefits */}
        <RNView style={styles.benefits}>
          <RNView style={styles.benefitItem}>
            <Feather name="shield" size={18} color={PRIMARY} />
            <Text style={styles.benefitTxt}>SECURE PAYMENTS</Text>
          </RNView>
          <RNView style={styles.divider} />
          <RNView style={styles.benefitItem}>
            <Feather name="truck" size={18} color={PRIMARY} />
            <Text style={styles.benefitTxt}>FREE SHIPPING</Text>
          </RNView>
          <RNView style={styles.divider} />
          <RNView style={styles.benefitItem}>
            <Feather name="rotate-ccw" size={18} color={PRIMARY} />
            <Text style={styles.benefitTxt}>EASY RETURNS</Text>
          </RNView>
        </RNView>

        {/* Best Sellers */}
        <RNView style={[styles.sectionRow, { marginTop: 10 }]}>
          <Text style={styles.sectionTitle}>Best Sellers</Text>
        </RNView>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.bestRow}>
          {bestSellers.map((b) => (
            <Pressable
              key={b.id}
              style={styles.bestCard}
              onPress={() =>
                router.push({
                  pathname: "/(modals)/product-details",
                  params: { id: String(b._sourceId) },
                })
              }
            >
              <Image source={{ uri: b.image }} style={styles.bestImg} />
              <RNView style={styles.bestBottom}>
                <RNView style={{ flex: 1 }}>
                  <Text style={styles.bestTitle} numberOfLines={1}>
                    {b.title}
                  </Text>
                  <Text style={styles.bestPrice}>${b.price}</Text>
                </RNView>

                {/* ✅ plus -> details (or cart, tum chaaho to cart kar do) */}
                <Pressable
                  style={styles.addBtn}
                  onPress={() =>
                    router.push({
                      pathname: "/(modals)/product-details",
                      params: { id: String(b._sourceId) },
                    })
                  }
                >
                  <Feather name="plus" size={18} color="#fff" />
                </Pressable>
              </RNView>
            </Pressable>
          ))}
        </ScrollView>

        {/* Customer Love (same) */}
        <RNView style={[styles.sectionRow, { marginTop: 14 }]}>
          <Text style={styles.sectionTitle}>Customer Love</Text>
        </RNView>

        <RNView style={styles.reviewCard}>
          <RNView style={styles.stars}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Feather key={i} name="star" size={14} color={PRIMARY} />
            ))}
          </RNView>
          <Text style={styles.reviewText}>
            "The quality of the leather is just unmatched. My Aurelia Tote gets
            compliments everywhere I go!"
          </Text>
          <Text style={styles.reviewBy}>— Sarah Jenkins, New York</Text>
        </RNView>

        <RNView style={{ height: 90 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },
  scroll: { paddingHorizontal: 16, paddingBottom: 110 },

  searchWrap: {
    marginTop: 10,
    height: 48,
    borderRadius: 999,
    backgroundColor: "#F4F3F1",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.03)",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 13,
    fontWeight: "700",
    color: "#1b180d",
  },

  hero: {
    marginTop: 14,
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(184,128,60,0.18)",
    aspectRatio: 16 / 9,
  },
  heroImg: { width: "100%", height: "100%" },
  heroOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.35)" },
  heroInner: { ...StyleSheet.absoluteFillObject, padding: 16, justifyContent: "center" },
  heroKicker: { color: PRIMARY, fontSize: 11, fontWeight: "900", letterSpacing: 2 },
  heroTitle: { marginTop: 6, color: "#fff", fontSize: 28, fontWeight: "900", lineHeight: 30 },
  heroBtn: {
    marginTop: 12,
    height: 40,
    borderRadius: 999,
    backgroundColor: PRIMARY,
    alignSelf: "flex-start",
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  heroBtnTxt: { color: "#fff", fontSize: 13, fontWeight: "900" },

  sectionRow: { marginTop: 18, flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between" },
  sectionTitle: { fontSize: 18, fontWeight: "900", color: "#1b180d" },
  viewAll: { fontSize: 11, fontWeight: "900", letterSpacing: 1, color: PRIMARY },

  catRow: { paddingVertical: 10, gap: 14 },

  grid: { marginTop: 10, flexDirection: "row", gap: 12 },
  gridItem: { flex: 1 },

  benefits: {
    marginTop: 18,
    borderRadius: 22,
    backgroundColor: "#F4F3F1",
    borderWidth: 1,
    borderColor: "rgba(184,128,60,0.14)",
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  benefitItem: { flex: 1, alignItems: "center", gap: 6 },
  benefitTxt: { fontSize: 9, fontWeight: "900", letterSpacing: 0.6, color: "#1b180d" },
  divider: { width: 1, height: 36, backgroundColor: "rgba(184,128,60,0.25)" },

  bestRow: { paddingVertical: 10, gap: 14 },
  bestCard: {
    width: 260,
    borderRadius: 22,
    overflow: "hidden",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },
  bestImg: { width: "100%", height: 160, backgroundColor: "#f2f2f2" },
  bestBottom: { padding: 14, flexDirection: "row", alignItems: "center", gap: 10 },
  bestTitle: { fontSize: 13, fontWeight: "900", color: "#1b180d" },
  bestPrice: { marginTop: 4, fontSize: 13, fontWeight: "900", color: PRIMARY },
  addBtn: { width: 36, height: 36, borderRadius: 999, backgroundColor: PRIMARY, alignItems: "center", justifyContent: "center" },

  reviewCard: {
    marginTop: 10,
    borderRadius: 22,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
    borderLeftWidth: 4,
    borderLeftColor: PRIMARY,
    padding: 14,
  },
  stars: { flexDirection: "row", gap: 3, marginBottom: 8 },
  reviewText: {
    fontSize: 13,
    fontStyle: "italic",
    lineHeight: 18,
    color: "rgba(27,24,13,0.75)",
    fontWeight: "700",
  },
  reviewBy: { marginTop: 10, fontSize: 12, fontWeight: "900", color: PRIMARY },
});
