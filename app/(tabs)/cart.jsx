import { Feather } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, Image, Pressable, View as RNView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AppHeader from "../../components/AppHeader";
import ShinyButton from "../../components/ShinyButton";
import { Text, View } from "../../components/Themed";

const BG = "#FBFAF9";
const PRIMARY = "#B8803C";

function QtyPill({ qty, onMinus, onPlus }) {
  return (
    <RNView style={styles.qtyPill}>
      <Pressable onPress={onMinus} style={styles.qtyBtn} hitSlop={10}>
        <Feather name="minus" size={16} color={PRIMARY} />
      </Pressable>

      <Text style={styles.qtyTxt}>{qty}</Text>

      <Pressable onPress={onPlus} style={styles.qtyBtn} hitSlop={10}>
        <Feather name="plus" size={16} color={PRIMARY} />
      </Pressable>
    </RNView>
  );
}

function CartRow({ item, onMinus, onPlus }) {
  return (
    <RNView style={styles.itemCard}>
      <Image source={{ uri: item.image }} style={styles.itemImg} />

      <RNView style={styles.itemInfo}>
        <RNView>
          <Text style={styles.itemTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.itemSub} numberOfLines={1}>
            {item.meta}
          </Text>
        </RNView>

        <RNView style={styles.itemBottom}>
          <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
          <QtyPill qty={item.qty} onMinus={onMinus} onPlus={onPlus} />
        </RNView>
      </RNView>
    </RNView>
  );
}

export default function Cart() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight(); // ✅ key fix

  const [items, setItems] = useState([
    {
      id: "c1",
      title: "Silk Midi Dress",
      meta: "Color: Emerald Green • Size: M",
      price: 145,
      qty: 1,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAQmko7lCXhSNmUcBECMUXob-5fhYPYmBipOs5Hf6LAX9ZAlj3MbVT4vl8uj8mp68UB9OGeQmsHAh1isR6aaDZyF5j9ZbiICgN6zDjMmLMY3cDohb7A4BICwEiOaImBS5aBvA0tys_4j3LfYtmMk07aEcBiGJ9O5NPECyAVVJm3OFU11Tmmjz1tAE7N0MlpfrliYY3CYIVW39xfm4lvTwDwmE34rzUTny3XUKz2ZnUc8nLxsWWXgpuPLhywREuXbSHn2ysyF8YWFw",
    },
    {
      id: "c2",
      title: "Leather Handbag",
      meta: "Color: Tan • Size: OS",
      price: 60,
      qty: 1,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB_DpaHTMWwZ0BaQ0cqeI7Nv71iQpO_rU-L2fv8-FymWNv0JkXuYT4scrMh-3eSSYu9wShjqgG4IB7x_PkLYSy2M8wsQHf-GhlgrucPaQ2knCKp1gRee8mhkVWlU0SPgSwP0difL0sPtrP-sDLls246peFF52LJhERYofgrFskCqD6IbbwMW3Tbofh5-CfIPipwKaVK0OXQhhMz4BhYZZnNsf23BqOOeW0ef7XBFrOSmwu4tUoTWRRIKkKXjITyjmR7FBOfM0m1aA",
    },
    {
      id: "c3",
      title: "Minimalist Earrings",
      meta: "Finish: 18k Gold",
      price: 25,
      qty: 2,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDIZQvGkGFGfdsBIvtzXihN6vo9Cpmr-L-i_IiOE7CTXIONeo3x1LuJL9hN5PuQiP5Uc0ZmzN_admmLfBCxfYAXL3dQemeGV-Um4LI2J0b0WTGVJBINXxPinBUK-d1jerc2XmnVFqFe1F1L8cbDxTfKbWMoFWCOVFXxGdqs0UAB4vxGC658MhJTBvFkfh7r3SXlnUgg44bSTvqmkqalylggekC2i9nculrCtjpkY8nRV1l9fLVHWG4RLhQtRwYIc4po5HYdUbqsPw",
    },
  ]);

  const subtotal = useMemo(() => items.reduce((sum, it) => sum + it.price * it.qty, 0), [items]);

  const shipping = 10;
  const discount = 25.5;
  const total = Math.max(0, subtotal + shipping - discount);

  const cartBadge = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items]);

  const updateQty = (id, delta) => {
    setItems((prev) =>
      prev.map((x) => (x.id === id ? { ...x, qty: Math.max(1, x.qty + delta) } : x))
    );
  };

  // ✅ bottom bar height estimate (button + padding)
  const bottomActionHeight = 12 + 18 + 52; // topPad + bottomPad + button approx
  const listBottomPadding = tabBarHeight + insets.bottom + bottomActionHeight + 18;

  return (
    <View style={styles.screen} lightColor={BG}>
      <AppHeader
        title="My Cart"
        onPressSearch={() => {}}
        onPressWishlist={() => router.push("/(modals)/wishlist")}
        onPressCart={() => {}}
        cartBadge={cartBadge}
      />

      <FlatList
        data={items}
        keyExtractor={(it) => it.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 8,
          paddingBottom: listBottomPadding, // ✅ IMPORTANT
        }}
        renderItem={({ item }) => (
          <CartRow
            item={item}
            onMinus={() => updateQty(item.id, -1)}
            onPlus={() => updateQty(item.id, +1)}
          />
        )}
        ListFooterComponent={
          <RNView style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Order Summary</Text>

            <RNView style={styles.sumRow}>
              <Text style={styles.sumLbl}>Subtotal</Text>
              <Text style={styles.sumVal}>${subtotal.toFixed(2)}</Text>
            </RNView>

            <RNView style={styles.sumRow}>
              <Text style={styles.sumLbl}>Shipping</Text>
              <Text style={styles.sumVal}>${shipping.toFixed(2)}</Text>
            </RNView>

            <RNView style={styles.sumRow}>
              <Text style={styles.sumLbl}>Discount (WELCOME10)</Text>
              <Text style={[styles.sumVal, { color: PRIMARY }]}>-${discount.toFixed(2)}</Text>
            </RNView>

            <RNView style={styles.divider} />

            <RNView style={styles.sumRow}>
              <Text style={styles.totalLbl}>Total</Text>
              <Text style={styles.totalVal}>${total.toFixed(2)}</Text>
            </RNView>
          </RNView>
        }
      />

      {/* ✅ Bottom action (NOW ABOVE TAB BAR) */}
      <RNView pointerEvents="box-none" style={[styles.bottomBar, { bottom: tabBarHeight }]}>
        <RNView style={[styles.bottomInner, { paddingBottom: Math.max(12, insets.bottom) }]}>
       <ShinyButton
  title="Proceed to Checkout"
  rightIcon="arrow-right"
  onPress={() => router.push("/(modals)/checkout")}
/>
        </RNView>
      </RNView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },

  itemCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 12,
    marginBottom: 14,
    flexDirection: "row",
    gap: 12,
    borderWidth: 1,
    borderColor: "rgba(226,220,212,0.75)",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 1,
  },
  itemImg: { width: 86, height: 86, borderRadius: 14, backgroundColor: "#f1eeea" },

  itemInfo: { flex: 1, height: 86, justifyContent: "space-between" },
  itemTitle: { fontSize: 16, fontWeight: "900", color: "#181510" },
  itemSub: { marginTop: 4, fontSize: 12, fontWeight: "600", color: "rgba(138,117,92,1)" },

  itemBottom: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  itemPrice: { fontSize: 16, fontWeight: "900", color: PRIMARY },

  qtyPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: "#FBFAF9",
    borderWidth: 1,
    borderColor: "rgba(226,220,212,0.9)",
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "rgba(226,220,212,0.9)",
  },
  qtyTxt: { width: 18, textAlign: "center", fontSize: 14, fontWeight: "900", color: "#181510" },

  summaryCard: {
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(226,220,212,0.9)",
    marginTop: 6,
  },
  summaryTitle: { fontSize: 18, fontWeight: "900", color: "#181510", marginBottom: 14 },
  sumRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  sumLbl: { fontSize: 13, fontWeight: "700", color: "rgba(138,117,92,1)" },
  sumVal: { fontSize: 13, fontWeight: "800", color: "#181510" },
  divider: { height: 1, backgroundColor: "rgba(226,220,212,0.9)", marginVertical: 8 },
  totalLbl: { fontSize: 16, fontWeight: "900", color: "#181510" },
  totalVal: { fontSize: 22, fontWeight: "900", color: "#181510" },

  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: "rgba(255,255,255,0.88)",
    borderTopWidth: 1,
    borderTopColor: "rgba(226,220,212,0.7)",
  },
  bottomInner: { paddingHorizontal: 16, paddingTop: 12 },
});
