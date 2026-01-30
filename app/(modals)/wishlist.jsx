// app/(modals)/wishlist.jsx
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
    FlatList,
    Image,
    Platform,
    Pressable,
    View as RNView,
    StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import InnerHeader from "../../components/InnerHeader";
import { Text, View } from "../../components/Themed";

// If you REALLY want to use your existing ProductCard component,
// you can swap WishlistCard with <ProductCard ... /> inside renderItem.
// import ProductCard from "../../components/ProductCard";

const BG = "#FBFAF9";
const PRIMARY = "#B8803C";
const TEXT = "#181510";
const MUTED = "rgba(138,117,92,1)";

function Dot({ color }) {
  return (
    <RNView
      style={[
        styles.dot,
        {
          backgroundColor: color,
          borderColor: "rgba(226,220,212,0.9)",
        },
      ]}
    />
  );
}

function WishlistCard({ item, onToggleHeart, onAddToCart }) {
  return (
    <RNView style={styles.card}>
      <RNView style={styles.imageWrap}>
        <Image source={{ uri: item.image }} style={styles.image} />

        <Pressable onPress={onToggleHeart} style={styles.heartBtn} hitSlop={10}>
          <Feather
            name="heart"
            size={18}
            color={PRIMARY}
            style={{ opacity: item.liked ? 1 : 0.9 }}
          />
        </Pressable>
      </RNView>

      <RNView style={styles.cardBody}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>

        <Text style={styles.price}>${item.price.toFixed(2)}</Text>

        {!!item.colors?.length && (
          <RNView style={styles.dotsRow}>
            {item.colors.slice(0, 4).map((c) => (
              <Dot key={c} color={c} />
            ))}
          </RNView>
        )}

        <Pressable onPress={onAddToCart} style={styles.addBtn}>
          <Text style={styles.addTxt}>ADD TO CART</Text>
        </Pressable>
      </RNView>
    </RNView>
  );
}

export default function Wishlist() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [items, setItems] = useState([
    {
      id: "w1",
      title: "Embroidered Silk Kaftan",
      price: 240,
      liked: true,
      colors: [PRIMARY, "#00402E", "#700115"],
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBA2QaAY8Myvj8I_idTo0a-1Rm6PkPflcrQ3SBuGBqeoubQduXFIw9aBKA0h93wdbTZh6G4157q7J4FO5cLjdGYcLTTFBbJOi_BYJXlO8etRemwJ_R8H87uf8zxLsTJG8FK05W7wutkukGNw0scF9qs0nzG8C0e2pAc5Mv9JnwuFojWrajEgrNL2YnUtDYKSHlf7c6PyoqU3b_t9xyIsjrGzGPv6yDjpQaH69eI7zR2fQWvE-gak5LNAc9uXPNNUlnwJA5KWhXfEg",
    },
    {
      id: "w2",
      title: "Velvet Evening Gown",
      price: 380,
      liked: true,
      colors: ["#121b3a", "#000000"],
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBHjYGtgO4n5ijQNSjo_zC8U2cSNDuBBLds_9SN-Rd4zNAuiZBvDmx9BPxmVOB2R-wZH2x6UjIPJbgZLjP7RqhF19FWc4KRUihF2EP5FCNgdB0uGtg8iCb7GPqUjzNHEPuA6JTewil_47izKmUTZ1u5ZIZ9b6dELzJCvSKFTqV4D62WQOWCcw6e-drJxcsHIM8hOeMmQlwR1_TYJ4MBbbG0kmxTYSmch9JpkcVTXEvofw4fbkGk3z21Ji2XxtulF4R3A52fQVpx3g",
    },
    {
      id: "w3",
      title: "Gold Thread Abaya",
      price: 195,
      liked: true,
      colors: ["#d4af37"],
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAmcM5am3B-f0o7w8r9QLLmWRTz7pytmLquGOJq8H0x5JRSCdC4rzX4AXVrY3ym8ZEcGX0T9mgxgoV2EWBbCLVGVYRXV8GwYv8ZLn9OTBSjbNNyxgSk2ZUqIdgcAmIz2QoY8D45zIWEGqvfiO7ZfH9y7KBWlYoB6-VUZ6b88zCpDkANfziWu_X9q27wAv3LLZzHPfNp6TXbCDLjCNVzx5Rk7KQZTQmjywINAnB-yZE5LtC9r9GK66hb8XmA3HFp5MO3Sl-Zd1TtWw",
    },
    {
      id: "w4",
      title: "Floral Summer Dress",
      price: 150,
      liked: true,
      colors: ["#f3e5f5", "#ffc1cc"],
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDJR6BML--pqWWhCYBUemMF9Sa1BpecanYHmZu_lkgfCIoGjMXGh7u9h2IVgf-1dQLy343fCbSwdxYNiHc-0etrOkog9eVJtZjJD-KxZ-ZjS9esfxf-kG7o7mbNStBuRfSG0LktBHkm0M1u1iaF9x06crcdFS6RIdKWBlgL1RFlrFDgk6tt0ldkSOrp3GiNlYFdLEsv2pdaNRviaC1ca6xp3Ndo2XQMPlAbJ2ZVnqxOFKuVttMneUssuK285a95byoI8UdzgU2Q-w",
    },
    {
      id: "w5",
      title: "Chiffon Pleated Skirt",
      price: 89,
      liked: true,
      colors: ["#d2b48c", "#8b4513"],
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD8IcIc_wcuKtTOwOqLA_GM-FIwdnW7cSECR0SdMwEYHYDWvV0OCzjnmEURIJGTcmw0Q3Qb6Tcsu8FVcPLjcvHanF1fO0y-E_6vFw2FKedxhj3Vl1auzHQpSZ_lCuWVcWw4fOhNCcJL0rJYpU3h1IA09L1t1MIe_vLKEUQURXW31jLk1gzsca9pMsyzFxeGQ7Ppp8oUb4xZm-Gk-yJ7QCDY36Rh75MmKfmno0XLGfNCVvZ8Ld7P-QFJj-1rCWhqOjgwDQ9kxoOM1g",
    },
    {
      id: "w6",
      title: "Crystal Statement Necklace",
      price: 115,
      liked: true,
      colors: ["#e5e4e2"],
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBpiiBKLD8rnZjQ74SsogQDppAKTpXAY9yrJqEicBZtmIV5Eo0VL7lj_sdLHL-N4mbxHsnmunjp1tlDsajS6DPUxUtqzjd31JOBMSTeIlb0bsF7beIbrmRb0DImLJYG7V1NJSsHXa3TNoAMSEWhp1X3haxibk7yJSjPjAZ_rBxDJFks9beg-EhuuDzyUcDVMgdQgiaMlCwtdQA8Sx6gqnAoDVC7NJdLM7rdwUxZXF615waiV8pmupxi9uM5OrMKaf8ntZ1ElQKMRg",
    },
  ]);

  const toggleHeart = (id) => {
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, liked: !x.liked } : x)));
  };

  const contentPadBottom = useMemo(() => {
    // ✅ Fix: Android nav/gesture area + any bottom UI overlays
    // If you ever add a bottom sheet / button, increase extra value.
    const extra = Platform.OS === "android" ? 28 : 18;
    return insets.bottom + extra;
  }, [insets.bottom]);

  return (
    <View style={styles.screen} lightColor={BG}>
      <InnerHeader
        title="Wishlist"
        onBack={() => router.back()}
        rightIcon="more-horizontal"
        onRight={() => {}}
      />

      <FlatList
        data={items}
        keyExtractor={(it) => it.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: contentPadBottom + 16 },
        ]}
        renderItem={({ item }) => (
          <WishlistCard
            item={item}
            onToggleHeart={() => toggleHeart(item.id)}
            onAddToCart={() => {
              // TODO: add to cart state
              // router.push("/(tabs)/cart") // optional
            }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },

  listContent: { paddingHorizontal: 16, paddingTop: 14 },
  row: { justifyContent: "space-between" },

  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "rgba(226,220,212,0.6)",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 1,
  },

  imageWrap: {
    width: "100%",
    aspectRatio: 3 / 4,
    backgroundColor: "#f1eeea",
  },
  image: { width: "100%", height: "100%" },

  heartBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 34,
    height: 34,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.85)",
    borderWidth: 1,
    borderColor: "rgba(226,220,212,0.8)",
  },

  cardBody: { padding: 12 },
  title: { fontSize: 13, fontWeight: "800", color: TEXT },
  price: { marginTop: 4, fontSize: 14, fontWeight: "900", color: TEXT },

  dotsRow: { flexDirection: "row", gap: 6, marginTop: 8 },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 999,
    borderWidth: 1,
  },

  addBtn: {
    marginTop: 10,
    height: 36,
    borderRadius: 12,
    backgroundColor: PRIMARY,
    alignItems: "center",
    justifyContent: "center",
  },
  addTxt: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 2,
  },
});
