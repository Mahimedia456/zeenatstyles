import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useRef, useState } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    Pressable,
    View as RNView,
    ScrollView,
    StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import InnerHeader from "../../components/InnerHeader";
import ShinyButton from "../../components/ShinyButton";
import { Text, View } from "../../components/Themed";

// ✅ your data
import products from "../data/products";

const BG = "#FBFAF9";
const PRIMARY = "#B8803C";
const MUTED = "rgba(31, 41, 55, 0.65)";

const { width: W } = Dimensions.get("window");
const PAGE_W = Math.min(W - 32, 430);

const MOCK = {
  id: "p1",
  title: "Zeenat Signature Leather Tote",
  price: 240,
  compareAt: 300,
  rating: 4.8,
  reviews: 128,
  discountLabel: "20% OFF",
  images: [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDX2jqvrOEm8XrBlImWpWhd3c9iYAukGhush70LjD-G1GgEXCLCXQaXSDM0ZY9RN3mJcQL-goBkb8WZXRb4zSBuE_vH_ztAhb5nZYl8ocvecTzjSDFpHa1ewX9STw3Clo8SIwhUWNWnQvpAbOZUOBHGz733vieI6snt39AHo7RSf4Psf0ir8ZEoui7w8bQJhaHc9CCYway3ZQWmUWiJsYkDcia8H2OaRdPHIxaV6fee_9WijcTjLXOdzGGG_jqo17lKvuwndzGPYA",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDTzxOT1ndOtRGzjgbNqs1nv_8lIAFJ1ApPGPnA-tIKiWB5U84rB58s8NoehwkHVxEE_0fljNiy_I3I6yqChpUrsLjwMncjBKuOH4qfSJHGildlrqx95n_yQ-fM4LQRxlEPRhKcK2i4m3li0T_Pud8hK_6v_9aKckhjeDUvyMkqWVDrpZl6-zOTjP4PgWWEzGTdhFMhATdcTSyRuUZUTxs41SUHOlRlPpZGORiFCgLl0wg4g-SkaciTMkjaoKrwcLJR9hQpAZ98Zw",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCUAjXfB7IOZd1wLMsvAeOz8GRUImzBLE9QUqofa-nbFKS8fQf5TIE2mX0BXHrP7qss53rap9o6jECNuwI0hAr5vq9JZcUrFaDuLjuUdCmF8wtl3XCwhKBTpznvfAeI2BOGh6wpEAsio5hNXnZh7tP6H2VkVE-ZJT4Q7a--XCl1QvxgeV6Een_n9JMTCGYa-bnt-8rLyLjjIFxMXgTSBoyW5v9shHbA9dXsPlrh8_1u4UXkKOvTeI5K-VN5NUHHnTP9E1BWyMwI9g",
  ],
  colors: [
    { id: "espresso", name: "Espresso", hex: "#3c2a21" },
    { id: "gold", name: "Sienna Gold", hex: "#b9813c" },
    { id: "onyx", name: "Midnight Onyx", hex: "#1e1a14" },
    { id: "sand", name: "Sandstone", hex: "#e3dcd2" },
  ],
  completeLook: [
    {
      id: "c1",
      title: "Leather Wallet",
      price: 85,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAMcH2QVtAfVkxMxgsNF9fRaIj835eR4CBs39XQCnhvqBqeexNLfGSCHQ2vd0gvle4yGRMosDZQCDMXnMEH6HtluSMK2I8sN5j5cxYRl6-O40TcOiFN10YcXMyalPlyXs-LYpgSIDis-zecvcZ3alJi5kNRSgpA362nAZp8uBKwoOv9EVzRG3yNXoP7VChekgw5UC-fgHHRj18OqWIXvBDoC81bD-g_LH5o8Hmx9fd1D1s_Tw34Cw4EuYcW71N65gHQZj-GB_O-lA",
    },
    {
      id: "c2",
      title: "Silk Scarf",
      price: 45,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDG2xQn5tCZRdDiIzZ6fTbJ6XU0--xQrtp4HyhqyQQoppCKMuHmYh-MiJa4MRgIhhEDT6A3fe99BqolSk3LkDM9egT0sQhjSs4OI64ul1ST5Dvbtn0-VvE9NI30rpgGUOGtp3o-dKSr4xKcpbEOCVoWIdhI_TWCE_noia_JTpFZJjdUNTUXqkhi2UJLtF0hB7j2UKwWS6KZX1P9bMxd718i1hpCL_0GAGKspi4RR9ijjqpTub6FCDewN4NzPp2ZkncD-X3YcJBPZg",
    },
    {
      id: "c3",
      title: "Classic Belt",
      price: 110,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCgMejrsXPr0xHUb1SuAyFk7xR9G8E7eKIBUcZy8p6-zrLyfq4tOnBR3Z0bEQovHsqys5rhZnU8tlRRbc5BeZx3N3KkY474ZXY2ZvWc2r_6tIRNlcEk1OUawoEPJU0uhUz5Bk3iZGnUvGqVevfzAGiPu5Ps9IIJgPeteE8qxn-zgnH7H2u3Kdj0V2j7_6TS_oSYv-RjdG8JVkRPR1c5k8gdQYqOgsHFBMSulNyH-Ql5SrWcHh1798nibHfp2oldz-VqcTpxsWikPA",
    },
  ],
};

function Dot({ active }) {
  return <RNView style={[styles.dot, active ? styles.dotActive : styles.dotIdle]} />;
}

function QtyPill({ qty, onMinus, onPlus }) {
  return (
    <RNView style={styles.qtyWrap}>
      <Pressable style={styles.qtyBtn} onPress={onMinus} hitSlop={10}>
        <Feather name="minus" size={18} color="#1F2937" />
      </Pressable>
      <Text style={styles.qtyText}>{qty}</Text>
      <Pressable style={styles.qtyBtnPrimary} onPress={onPlus} hitSlop={10}>
        <Feather name="plus" size={18} color="#fff" />
      </Pressable>
    </RNView>
  );
}

function InfoRow({ icon, title, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.infoRow}>
      <RNView style={styles.infoLeft}>
        <Feather name={icon} size={18} color={PRIMARY} />
        <Text style={styles.infoTitle}>{title}</Text>
      </RNView>
      <Feather name="chevron-right" size={18} color="rgba(107,114,128,0.9)" />
    </Pressable>
  );
}

function MiniCard({ item, onPress }) {
  const priceNum = Number(item?.price ?? 0);
  return (
    <Pressable onPress={onPress} style={styles.miniCard}>
      <Image source={{ uri: item.image }} style={styles.miniImg} />
      <Text style={styles.miniTitle} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={styles.miniPrice}>${Number.isFinite(priceNum) ? priceNum.toFixed(2) : "0.00"}</Text>
    </Pressable>
  );
}

export default function ProductDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  // ✅ get real product from data by id
  const product = useMemo(() => {
    const arr = Array.isArray(products) ? products : [];
    const found = arr.find((p) => String(p?.id) === String(id));
    return found ?? MOCK;
  }, [id]);

  // ✅ safe numbers (no NaN)
  const priceNum = Number(product?.price ?? 0);
  const compareNum = product?.compareAt != null ? Number(product.compareAt) : null;
  const ratingNum = Number(product?.rating ?? 0);
  const reviewsNum = Number(product?.reviews ?? 0);

  const images = Array.isArray(product?.images) && product.images.length ? product.images : MOCK.images;
  const colors = Array.isArray(product?.colors) && product.colors.length ? product.colors : MOCK.colors;
  const completeLook =
    Array.isArray(product?.completeLook) && product.completeLook.length ? product.completeLook : MOCK.completeLook;

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(colors[0]?.id ?? "gold");
  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(true);

  const listRef = useRef(null);

  // ✅ MODAL safe bottom padding (no bottom tab)
  const bottomBarH = 12 + 56 + 12;
  const scrollPadBottom = Math.max(18, insets.bottom) + bottomBarH + 24;

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    const i = viewableItems?.[0]?.index ?? 0;
    setActiveIndex(i);
  }).current;

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 70 }).current;

  const compareText = useMemo(() => {
    if (!Number.isFinite(compareNum)) return null;
    if (compareNum <= priceNum) return null;
    return `$${compareNum.toFixed(2)}`;
  }, [compareNum, priceNum]);

  return (
    <View style={styles.screen} lightColor={BG}>
      <InnerHeader
        title="Product Details"
        rightIcon="shopping-bag"
        badge={4}
        onPressBack={() => router.back()}
        onPressRight={() => router.push("/(tabs)/cart")}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: scrollPadBottom }}>
        {/* Images */}
        <RNView style={{ paddingHorizontal: 16, paddingTop: 16 }}>
          <FlatList
            ref={listRef}
            data={images}
            keyExtractor={(u, idx) => `${u}-${idx}`}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToAlignment="start"
            decelerationRate="fast"
            contentContainerStyle={{ gap: 14 }}
            renderItem={({ item }) => (
              <RNView style={{ width: PAGE_W }}>
                <Image source={{ uri: item }} style={styles.heroImg} />
              </RNView>
            )}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
          />

          <RNView style={styles.dotsRow}>
            {images.map((_, i) => (
              <Dot key={i} active={i === activeIndex} />
            ))}
          </RNView>
        </RNView>

        {/* Title + Heart */}
        <RNView style={{ paddingHorizontal: 16, paddingTop: 18 }}>
          <RNView style={styles.titleRow}>
            <Text style={styles.title}>{product?.title ?? "Product"}</Text>

            <Pressable onPress={() => setLiked((v) => !v)} style={styles.heartBtn} hitSlop={10}>
              <Feather name="heart" size={18} color={liked ? PRIMARY : "rgba(31,41,55,0.6)"} />
            </Pressable>
          </RNView>

          {/* Rating + Discount */}
          <RNView style={styles.pillsRow}>
            <RNView style={[styles.pill, { backgroundColor: "rgba(184,128,60,0.12)" }]}>
              <RNView style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                <Feather name="star" size={14} color={PRIMARY} />
                <Text style={styles.pillBold}>{Number.isFinite(ratingNum) ? ratingNum.toFixed(1) : "0.0"}</Text>
                <Text style={styles.pillMuted}>({Number.isFinite(reviewsNum) ? reviewsNum : 0} Reviews)</Text>
              </RNView>
            </RNView>

            {!!product?.discountLabel && (
              <RNView style={[styles.pill, { backgroundColor: PRIMARY }]}>
                <RNView style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                  <Feather name="tag" size={14} color="#fff" />
                  <Text style={[styles.pillBold, { color: "#fff", fontSize: 10, letterSpacing: 1.2 }]}>
                    {product.discountLabel}
                  </Text>
                </RNView>
              </RNView>
            )}
          </RNView>

          {/* Price */}
          <RNView style={styles.priceRow}>
            <Text style={styles.price}>${Number.isFinite(priceNum) ? priceNum.toFixed(2) : "0.00"}</Text>
            {!!compareText && <Text style={styles.compare}>{compareText}</Text>}
          </RNView>
        </RNView>

        {/* Colors */}
        <RNView style={{ paddingHorizontal: 16, paddingTop: 18 }}>
          <Text style={styles.sectionCap}>AVAILABLE COLORS</Text>
          <RNView style={styles.colorRow}>
            {colors.map((c) => {
              const active = selectedColor === c.id;
              return (
                <Pressable
                  key={c.id}
                  onPress={() => setSelectedColor(c.id)}
                  style={[styles.colorOuter, active && styles.colorOuterActive]}
                  hitSlop={10}
                >
                  <RNView style={[styles.colorInner, { backgroundColor: c.hex }]} />
                </Pressable>
              );
            })}
          </RNView>
        </RNView>

        {/* Qty */}
        <RNView style={{ paddingHorizontal: 16, paddingTop: 18 }}>
          <Text style={styles.sectionCap}>QUANTITY</Text>
          <QtyPill qty={qty} onMinus={() => setQty((q) => Math.max(1, q - 1))} onPlus={() => setQty((q) => q + 1)} />
        </RNView>

        {/* Info rows */}
        <RNView style={{ paddingTop: 18 }}>
          <InfoRow icon="truck" title="Free Delivery & Returns" onPress={() => {}} />
          <InfoRow icon="shield" title="2-Year Luxury Warranty" onPress={() => {}} />
        </RNView>

        {/* Complete the look */}
        <RNView style={{ paddingTop: 20 }}>
          <RNView style={styles.lookHeader}>
            <Text style={styles.lookTitle}>Complete the Look</Text>
            <Pressable onPress={() => {}} style={styles.viewAllPill}>
              <Text style={styles.viewAllTxt}>View All</Text>
            </Pressable>
          </RNView>

          <FlatList
            data={completeLook}
            keyExtractor={(it) => String(it.id)}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 14, paddingBottom: 10 }}
            renderItem={({ item }) => <MiniCard item={item} onPress={() => {}} />}
          />
        </RNView>
      </ScrollView>

      {/* Bottom actions */}
      <RNView style={[styles.bottomBar, { paddingBottom: Math.max(12, insets.bottom) + 6 }]} pointerEvents="box-none">
        <RNView style={styles.bottomInner}>
          <RNView style={{ flex: 1 }}>
            <ShinyButton
              title="Add to Cart"
              leftIcon="shopping-cart"
              onPress={() => router.push("/(tabs)/cart")}
              style={{ height: 56 }}
            />
          </RNView>

          <Pressable onPress={() => {}} style={styles.buyBtn}>
            <Text style={styles.buyTxt}>Buy Now</Text>
          </Pressable>
        </RNView>
      </RNView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },

  heroImg: {
    width: "100%",
    aspectRatio: 4 / 5,
    borderRadius: 22,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "rgba(226,220,212,0.55)",
  },

  dotsRow: { flexDirection: "row", justifyContent: "center", gap: 6, marginTop: 10 },
  dot: { height: 6, borderRadius: 999 },
  dotActive: { width: 22, backgroundColor: PRIMARY },
  dotIdle: { width: 6, backgroundColor: "rgba(184,128,60,0.18)" },

  titleRow: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  title: { flex: 1, fontSize: 24, fontWeight: "900", color: "#1F2937", lineHeight: 30 },

  heartBtn: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: "rgba(184,128,60,0.08)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(184,128,60,0.12)",
  },

  pillsRow: { flexDirection: "row", gap: 10, marginTop: 12, flexWrap: "wrap" },
  pill: { borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8 },
  pillBold: { fontSize: 13, fontWeight: "900", color: PRIMARY },
  pillMuted: { fontSize: 12, fontWeight: "700", color: "rgba(184,128,60,0.75)" },

  priceRow: { flexDirection: "row", alignItems: "flex-end", gap: 10, marginTop: 14 },
  price: { fontSize: 32, fontWeight: "900", color: PRIMARY },
  compare: {
    fontSize: 18,
    fontWeight: "800",
    color: MUTED,
    textDecorationLine: "line-through",
    textDecorationColor: "rgba(184,128,60,0.35)",
  },

  sectionCap: {
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 2,
    color: "rgba(107,114,128,0.75)",
    marginBottom: 12,
  },

  colorRow: { flexDirection: "row", gap: 14 },
  colorOuter: {
    width: 52,
    height: 52,
    borderRadius: 999,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "transparent",
    padding: 4,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 1,
  },
  colorOuterActive: { borderColor: PRIMARY },
  colorInner: { flex: 1, borderRadius: 999 },

  qtyWrap: {
    width: 150,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F6F3EF",
    borderRadius: 999,
    padding: 4,
    borderWidth: 1,
    borderColor: "rgba(226,220,212,0.6)",
  },
  qtyBtn: {
    width: 42,
    height: 42,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.8)",
  },
  qtyBtnPrimary: {
    width: 42,
    height: 42,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: PRIMARY,
    shadowColor: PRIMARY,
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  qtyText: { fontSize: 16, fontWeight: "900", color: "#1F2937" },

  infoRow: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderTopWidth: 1,
    borderColor: "rgba(226,220,212,0.35)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: BG,
  },
  infoLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  infoTitle: { fontSize: 14, fontWeight: "800", color: "#1F2937" },

  lookHeader: {
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  lookTitle: { fontSize: 18, fontWeight: "900", color: "#1F2937" },
  viewAllPill: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: "rgba(184,128,60,0.10)",
  },
  viewAllTxt: { fontSize: 11, fontWeight: "900", color: PRIMARY },

  miniCard: {
    width: 140,
    borderRadius: 18,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "rgba(226,220,212,0.6)",
    padding: 10,
  },
  miniImg: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 14,
    backgroundColor: "#f1eeea",
    marginBottom: 10,
  },
  miniTitle: { fontSize: 13, fontWeight: "900", color: "#1F2937" },
  miniPrice: { marginTop: 4, fontSize: 13, fontWeight: "900", color: PRIMARY },

  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.92)",
    borderTopWidth: 1,
    borderTopColor: "rgba(226,220,212,0.6)",
  },
  bottomInner: {
    paddingHorizontal: 16,
    paddingTop: 12,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },

  buyBtn: {
    height: 56,
    flex: 0.75,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: PRIMARY,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  buyTxt: { fontSize: 15, fontWeight: "900", color: PRIMARY },
});
