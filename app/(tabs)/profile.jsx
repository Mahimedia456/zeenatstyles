import { Feather } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useRouter } from "expo-router";
import { Image, Pressable, View as RNView, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AppHeader from "../../components/AppHeader";
import ShinyButton from "../../components/ShinyButton";
import { Text, View } from "../../components/Themed";

const BG = "#FBFAF9";
const PRIMARY = "#B8803C";

function SectionTitle({ children }) {
  return <Text style={styles.sectionTitle}>{children}</Text>;
}

function RowItem({ icon, label, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.rowItem}>
      <RNView style={styles.rowIconWrap}>
        <Feather name={icon} size={18} color={PRIMARY} />
      </RNView>

      <Text style={styles.rowLabel} numberOfLines={1}>
        {label}
      </Text>

      <Feather name="chevron-right" size={20} color="rgba(138,117,92,0.9)" />
    </Pressable>
  );
}

export default function ProfileTab() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();

  const bottomActionHeight = 12 + 18 + 52;
  const scrollBottomPadding = tabBarHeight + insets.bottom + bottomActionHeight + 24;

  return (
    <View style={styles.screen} lightColor={BG}>
      <AppHeader
        title="Account"
        onPressSearch={() => {}}
        onPressWishlist={() => router.push("/(modals)/wishlist")}
        onPressCart={() => router.push("/(tabs)/cart")}
        cartBadge={2}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: scrollBottomPadding }}
      >
        <RNView style={styles.profileCard}>
          <RNView style={{ alignItems: "center" }}>
            <Image
              source={{
                uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgUVAfZIT0oNpUj40inaZrDYbQsXgKfyLa1UPxw4MCaLMWrG1DyfpUecwPJyP2ZVoE8V0f88Fs0MuOgGHxtoHF5e7jftQVqv4XXE4mH39jEvbTkQCeRq6fwpzhexOem0FAeVMBZPUGWyTJEkzawnHNSf1P7eNI1d9DDoXG6__u0Mty_mMIgjG4evcwFD4CqllEJXdoHUuEnz-2Lb6LH--B1fD5k31hXkxu_RJkayXA5IUScjmLd1JXxnU0cqwODy5e-V7z2DX0sg",
              }}
              style={styles.avatar}
            />

            <Text style={styles.name}>Sarah Jenkins</Text>
            <Text style={styles.email}>sarah.jenkins@example.com</Text>

            <Pressable
              onPress={() => router.push("/(modals)/edit-profile")}
              style={styles.editBtn}
            >
              <Text style={styles.editTxt}>Edit Profile</Text>
            </Pressable>
          </RNView>
        </RNView>

        <SectionTitle>ACTIVITY</SectionTitle>
        <RNView style={styles.block}>
          {/* ✅ My Orders (inner screen modal) */}
          <RowItem
            label="My Orders"
            icon="shopping-bag"
            onPress={() => router.push("/(modals)/orders")}
          />

          {/* ✅ Addresses (inner screen modal) */}
          <RowItem
            label="Addresses"
            icon="map-pin"
            onPress={() => router.push("/(modals)/addresses")}
          />

          {/* ✅ Wishlist (inner screen modal) */}
          <RowItem
            label="Wishlist"
            icon="heart"
            onPress={() => router.push("/(modals)/wishlist")}
          />
        </RNView>

        <SectionTitle>SUPPORT & LEGAL</SectionTitle>
        <RNView style={styles.block}>
       <RowItem
  label="Help & Support"
  icon="help-circle"
  onPress={() => router.push("/(modals)/help-support")}
/>

<RowItem
  label="Privacy Policy"
  icon="shield"
  onPress={() =>
    router.push({
      pathname: "/(modals)/webview",
      params: {
        title: "Privacy Policy",
        url: "https://www.zeenatstyles.pk/pages/privacy-policy",
      },
    })
  }
/>

<RowItem
  label="Terms & Conditions"
  icon="file-text"
  onPress={() =>
    router.push({
      pathname: "/(modals)/webview",
      params: {
        title: "Terms & Conditions",
        url: "https://www.zeenatstyles.pk/pages/term-condition",
      },
    })
  }
/>
        </RNView>

        <Text style={styles.version}>Version 2.4.0 (2024)</Text>
      </ScrollView>

      {/* ✅ Logout fixed ABOVE TAB BAR */}
      <RNView style={[styles.bottomBar, { bottom: tabBarHeight }]}>
        <RNView style={[styles.bottomInner, { paddingBottom: Math.max(12, insets.bottom) }]}>
<ShinyButton
  title="Log Out"
  leftIcon="log-out"
  variant="solid"   // ✅ soft ki jagah solid (pehle solid test kar lo)
  onPress={() => router.replace("/(auth)/login")}
/>
        </RNView>
      </RNView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },

  profileCard: {
    marginTop: 10,
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 22,
    paddingVertical: 22,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "rgba(226,220,212,0.75)",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 10 },
    elevation: 1,
  },

  avatar: {
    width: 96,
    height: 96,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "rgba(184,128,60,0.18)",
    backgroundColor: "#f1eeea",
    marginBottom: 12,
  },

  name: { fontSize: 22, fontWeight: "900", color: "#181510" },
  email: { marginTop: 4, fontSize: 13, fontWeight: "700", color: "rgba(138,117,92,1)" },

  editBtn: {
    marginTop: 14,
    height: 42,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: PRIMARY,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  editTxt: { fontSize: 14, fontWeight: "900", color: PRIMARY },

  sectionTitle: {
    marginTop: 18,
    marginBottom: 10,
    marginHorizontal: 18,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 2,
    color: "rgba(138,117,92,1)",
  },

  block: { marginHorizontal: 16, gap: 12 },

  rowItem: {
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "rgba(226,220,212,0.75)",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  rowIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "rgba(184,128,60,0.10)",
    alignItems: "center",
    justifyContent: "center",
  },
  rowLabel: { flex: 1, fontSize: 16, fontWeight: "800", color: "#181510" },

  version: {
    marginTop: 18,
    textAlign: "center",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
    color: "rgba(138,117,92,1)",
    textTransform: "uppercase",
  },

  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: "rgba(255,255,255,0.92)",
    borderTopWidth: 1,
    borderTopColor: "rgba(226,220,212,0.7)",
  },
  bottomInner: { paddingHorizontal: 16, paddingTop: 12 },
});
