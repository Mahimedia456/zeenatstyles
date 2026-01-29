import { Feather } from "@expo/vector-icons";
import {
    Image,
    Pressable,
    View as RNView,
    StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "./Themed";

const GOLD = "#B8803C";

export default function AppHeader({
  title = "Zeenat Styles",
  onPressSearch,
  onPressWishlist,
  onPressCart,
  cartBadge = 0,
}) {
  const insets = useSafeAreaInsets();

  return (
    <RNView style={[styles.wrap, { paddingTop: insets.top + 8 }]}>
      <RNView style={styles.row}>

        {/* ✅ LEFT: Logo + Title */}
        <RNView style={styles.left}>
          <Image
            source={require("../assets/images/headerlogo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </RNView>

        {/* ✅ RIGHT: Icons */}
        <RNView style={styles.right}>
          <Pressable hitSlop={12} onPress={onPressSearch} style={styles.iconBtn}>
            <Feather name="search" size={20} color="#191510" />
          </Pressable>

          <Pressable hitSlop={12} onPress={onPressWishlist} style={styles.iconBtn}>
            <Feather name="heart" size={20} color="#191510" />
          </Pressable>

          <Pressable hitSlop={12} onPress={onPressCart} style={styles.iconBtn}>
            <RNView>
              <Feather name="shopping-bag" size={20} color="#191510" />
              {!!cartBadge && (
                <RNView style={styles.badge}>
                  <Text style={styles.badgeText}>{cartBadge}</Text>
                </RNView>
              )}
            </RNView>
          </Pressable>
        </RNView>

      </RNView>
    </RNView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: "#FBFAF9",
    paddingHorizontal: 16,
    paddingBottom: 10,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  /* LEFT */
  left: {
    flex: 1,                     // 👈 takes remaining space
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  logo: {
    width: 22,
    height: 22,
    borderRadius: 6,
  },

  title: {
    fontSize: 18,
    fontWeight: "900",
    color: "#191510",
  },

  /* RIGHT */
  right: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },

  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.70)",
    borderWidth: 1,
    borderColor: "rgba(227,220,212,1)",
  },

  badge: {
    position: "absolute",
    right: -6,
    top: -6,
    minWidth: 18,
    height: 18,
    borderRadius: 999,
    backgroundColor: GOLD,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
    borderWidth: 2,
    borderColor: "#FBFAF9",
  },

  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "900",
  },
});
