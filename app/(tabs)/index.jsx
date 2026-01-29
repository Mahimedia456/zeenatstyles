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

const BG = "#FBFAF9";
const PRIMARY = "#B8803C";

export default function Home() {
  const router = useRouter();
  const [activeCat, setActiveCat] = useState("Handbags");

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

  const trending = useMemo(
    () => [
      {
        id: "t1",
        badge: "-20%",
        brandLine: "Sahara Gold Collection",
        title: "Aurelia Tote",
        rating: 4.8,
        price: 240,
        oldPrice: 300,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDU4wg5xWxLy7Qn2UNej0Nx3zpwWm1RJlYTV_heAOAYvQoht8h41Cq22ZsWFtPKDRHv8hhDy0qmUN70rd4fG7m8MeI6lMMvMWWrSpzPsMLAJvmDsJTtYPBbpzc3lr64zoMWdICoeUYVWxwU4IOR92kEVEELGT4gkoHDfh0Bi0bXix91Sb12j2sEWs7LA1xW-jwjtTDjvf-IbaTeeTy5gzIS9sFFms73VCpaQPg4KyzKyCVhRgA72OnxloyVcSUhhv3Yt1fmng1WEg",
      },
      {
        id: "t2",
        badge: "New",
        brandLine: "Evening Essential",
        title: "Luna Crossbody",
        rating: 4.9,
        price: 185,
        oldPrice: null,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBxafewXxS69ABW2MEUeeryUSeMXEqtVlZqwnf74_rIGj41qyk9TTwZp9pt1QjtsirL69nl718RfCHOkkgvXFLh5urGd-1PSCH7y66Vb2OU9AKUaCHacq2-l71FDEfG1BOHyNAdKkdz7syBNx6KNzaaBXqzDFuQzi7YqnDzIuqG-AC48lKQGR96ima7vdPmQeF43ymAwEbt6q-o30OIXgqJd78UMIseohbxyakw-_lot-4Gpy4ZG2-fTwxbtWIaEGLPa_zDq66g3w",
      },
    ],
    []
  );

  const bestSellers = useMemo(
    () => [
      {
        id: "b1",
        title: "Zeenat Signature",
        price: 450,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuC5Prdf6lXzsPUA_7a497dP0FGJAnPHowq9PYLfYJAJZfwn77C83gxwRObihDZ-UgML_6GOXsuSky7xsxFljkCVlB0jSgJjSs3-w4vB2a47q0MZM0EwCi4I9vmCAUVO9PtwUWLBDRUKj6zgHVaBf90j1XZ-qr1we166XCjxHyUi7PqzJ5kgTYlOUrDtnMI0V_alFEXm-KXkm8ZIyOsjatPcSw6twkIA0ke-Twmr5FWXPyTTKZkWXYsBikhbEbbPRQ_NyEM5cgh2cQ",
      },
      {
        id: "b2",
        title: "Heirloom Satchel",
        price: 320,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDW-ygUVogTOD8bS0d8jBtrB5v-h_LdiZS7BbxALNwh0EauZxyWvOsmgBSKKmbEJ85f5pH7_s91NpXeOdCKJGKWKfFQbcGW9IMpGYxTpLz60wNq2kkizeVRctE0PAkaMe1n1CWoWM_qelSHMeLdGXvPI4KVz578BoU4SqaJwQrjiWwuCWwPZlASBYiFJ5RUc3T6erwCTMPZ9gR9Iwf3HXfDsJUkK1zzYBn1uCLyvBBzPALeOXGSsN_mEYz_88-WEXg4pUWssaPBJg",
      },
    ],
    []
  );

  return (
    <View style={styles.screen} lightColor={BG}>
      <AppHeader
        title="Zeenat Styles"
        onPressSearch={() => router.push("/(modals)/search")}
        onPressWishlist={() => router.push("/(modals)/wishlist")}
        onPressCart={() => router.push("/(tabs)/cart")}
        cartBadge={3}
      />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
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

            <Pressable style={styles.heroBtn}>
              <Text style={styles.heroBtnTxt}>Shop Now</Text>
            </Pressable>
          </RNView>
        </RNView>

        {/* Categories */}
        <RNView style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Categories</Text>
        </RNView>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.catRow}
        >
          {categories.map((c) => (
            <CategoryCard
              key={c.label}
              label={c.label}
              icon={c.icon}
              active={activeCat === c.label}
              onPress={() => setActiveCat(c.label)}
            />
          ))}
        </ScrollView>

        {/* Trending */}
        <RNView style={[styles.sectionRow, { marginTop: 8 }]}>
          <Text style={styles.sectionTitle}>Trending Now</Text>
          <Pressable>
            <Text style={styles.viewAll}>VIEW ALL</Text>
          </Pressable>
        </RNView>

        <RNView style={styles.grid}>
          {trending.map((p) => (
            <RNView key={p.id} style={styles.gridItem}>
              <ProductCard {...p} />
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

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.bestRow}
        >
          {bestSellers.map((b) => (
            <RNView key={b.id} style={styles.bestCard}>
              <Image source={{ uri: b.image }} style={styles.bestImg} />
              <RNView style={styles.bestBottom}>
                <RNView style={{ flex: 1 }}>
                  <Text style={styles.bestTitle} numberOfLines={1}>
                    {b.title}
                  </Text>
                  <Text style={styles.bestPrice}>${b.price}</Text>
                </RNView>

                <Pressable style={styles.addBtn}>
                  <Feather name="plus" size={18} color="#fff" />
                </Pressable>
              </RNView>
            </RNView>
          ))}
        </ScrollView>

        {/* Customer Love */}
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
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  heroInner: {
    ...StyleSheet.absoluteFillObject,
    padding: 16,
    justifyContent: "center",
  },
  heroKicker: {
    color: PRIMARY,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 2,
  },
  heroTitle: {
    marginTop: 6,
    color: "#fff",
    fontSize: 28,
    fontWeight: "900",
    lineHeight: 30,
  },
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

  sectionRow: {
    marginTop: 18,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  sectionTitle: { fontSize: 18, fontWeight: "900", color: "#1b180d" },
  viewAll: {
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1,
    color: PRIMARY,
  },

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
  bestBottom: {
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  bestTitle: { fontSize: 13, fontWeight: "900", color: "#1b180d" },
  bestPrice: { marginTop: 4, fontSize: 13, fontWeight: "900", color: PRIMARY },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 999,
    backgroundColor: PRIMARY,
    alignItems: "center",
    justifyContent: "center",
  },

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
