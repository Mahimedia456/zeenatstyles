// app/(tabs)/_layout.jsx
import { Feather } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";

import {
  Animated,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// ✅ ZTEPK theme colors
const COLORS = {
  pillBg: "#0B0B0B",
  activeBg: "#B8803C",
  activeTxt: "#fffdfd",
  inactiveTxt: "rgba(255,255,255,0.78)",
};

function AnimatedTabBar({ state, descriptors, navigation }) {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  // ✅ responsive pill width (fits all devices)
  const PILL_W = Math.min(width - 32, 560);

  // One animated value per tab for smooth highlight
  const anims = useRef(
    state.routes.map((_, i) => new Animated.Value(i === state.index ? 1 : 0))
  ).current;

  useEffect(() => {
    state.routes.forEach((_, i) => {
      Animated.timing(anims[i], {
        toValue: i === state.index ? 1 : 0,
        duration: 220,
        useNativeDriver: false,
      }).start();
    });
  }, [state.index]);

  return (
    <View
      pointerEvents="box-none"
      style={[
        styles.tabOuter,
        { bottom: Math.max(12, insets.bottom + 8) }, // ✅ safe area aware
      ]}
    >
      <View style={[styles.tabPill, { width: PILL_W, backgroundColor: COLORS.pillBg }]}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel ?? options.title ?? route.name;
          const isFocused = state.index === index;

          const bg = anims[index].interpolate({
            inputRange: [0, 1],
            outputRange: ["rgba(0,0,0,0)", COLORS.activeBg],
          });

          const scale = anims[index].interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.02],
          });

          const color = isFocused ? COLORS.activeTxt : COLORS.inactiveTxt;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const iconName = options.tabBarIconName;

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={[
                styles.tabBtn,
                isFocused ? styles.tabBtnActive : styles.tabBtnInactive,
              ]}
            >
              <Animated.View
                style={[
                  styles.tabBtnInner,
                  isFocused ? styles.tabBtnInnerActive : styles.tabBtnInnerInactive,
                  { backgroundColor: bg, transform: [{ scale }] },
                ]}
              >
                <Feather name={iconName} size={18} color={color} />

                {/* ✅ Active tab shows full label */}
                {isFocused ? (
                  <Animated.Text
                    numberOfLines={1}
                    style={[styles.tabLabel, { color: COLORS.activeTxt }]}
                  >
                    {String(label)}
                  </Animated.Text>
                ) : null}
              </Animated.View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function HeaderRightIcons() {
  const router = useRouter();

  return (
    <View style={styles.headerRight}>
      <Pressable
        onPress={() => router.push("/(modals)/search")}
        hitSlop={10}
        style={styles.iconBtn}
      >
        <Feather name="search" size={18} color="#1b180d" />
      </Pressable>

      <Pressable
        onPress={() => router.push("/(modals)/wishlist")}
        hitSlop={10}
        style={styles.iconBtn}
      >
        <Feather name="heart" size={18} color="#1b180d" />
      </Pressable>

      <Pressable
        onPress={() => router.push("/(tabs)/cart")}
        hitSlop={10}
        style={styles.iconBtn}
      >
        <Feather name="shopping-cart" size={18} color="#1b180d" />
        <View style={styles.badge} />
      </Pressable>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,          // ✅ header band (sirf bottom nav)
        tabBarStyle: { display: "none" }, // ✅ default tabbar hide
        animation: "fade",
      }}
      tabBar={(props) => <AnimatedTabBar {...props} />}
    >
      <Tabs.Screen name="index" options={{ tabBarIconName: "home", tabBarLabel: "Home" }} />
      <Tabs.Screen name="catalog" options={{ tabBarIconName: "grid", tabBarLabel: "Catalog" }} />
      <Tabs.Screen name="products" options={{ tabBarIconName: "shopping-bag", tabBarLabel: "Products" }} />
      <Tabs.Screen name="cart" options={{ tabBarIconName: "shopping-cart", tabBarLabel: "Cart" }} />
      <Tabs.Screen name="profile" options={{ tabBarIconName: "user", tabBarLabel: "Profile" }} />
    </Tabs>
  );
}


const styles = StyleSheet.create({
  tabOuter: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },

  tabPill: {
    flexDirection: "row",
    borderRadius: 999,
    padding: 6,
    gap: 6,
    alignItems: "center",
    backgroundColor: COLORS.pillBg,
    shadowColor: "#000",
    shadowOpacity: 0.22,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
    justifyContent: "space-between",

  },

  tabBtn: {
    borderRadius: 999,
    overflow: "hidden",
  },

  // ✅ Inactive tabs: fixed width icon-only
  tabBtnInactive: {
    width: 48,
  },

  // ✅ Active tab: takes remaining space (but capped) so label shows fully
 tabBtnActive: {
  minWidth: 96,     // enough for "Home"
  maxWidth: 140,    // ✅ controlled (not too long)
},

  tabBtnInner: {
    height: 42,
    width: "100%",
    paddingHorizontal: 12,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  tabBtnInnerInactive: {
    justifyContent: "center",
  },

  tabBtnInnerActive: {
    justifyContent: "flex-start",
    paddingLeft: 14,
    paddingRight: 14,
  },

  tabLabel: {
    flexShrink: 0,
    fontSize: 13,
    fontWeight: "900",
    lineHeight: 16,
    includeFontPadding: false, // ✅ Android crop fix
    paddingTop: 1,
  },

  headerRight: {
    flexDirection: "row",
    gap: 10,
    marginRight: 10,
    alignItems: "center",
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: COLORS.activeBg,
  },
});
