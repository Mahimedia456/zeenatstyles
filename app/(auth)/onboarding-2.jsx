import { useRouter } from "expo-router";
import { useMemo, useRef, useState } from "react";
import { FlatList, ImageBackground, Pressable, View as RNView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ShinyButton from "../../components/ShinyButton";
import { Text, View } from "../../components/Themed";

const GOLD = "#B8803C";

const DATA = [
  {
    title: "The Everyday Tote",
    tag: "CASUAL & DURABLE",
    uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBAq8p4_ECxYgSMlelDFL3mNZRAOZCIvnViikM7qdfFLIhgzI8IE9I2doDHTA8QGJG5GgToGdBmjVaZWHSNoA5gDJm9n2II1aQDgh11c_JO5EwTQgRAOyoihXHZMSmZp4sgxcBFqCq-vPWsN-rgiL9EvoCXyz93ZyZSQr8HIzVdGAWga5tf1U73KDRFoIlIOwPo2p6vLg-kB8MnUX3NaNqLHQvnUIDC7GbGU6zsxOXP1adKXzLTfQn1Xvbdrvjjpj_NQ78gqNRqg",
    featured: false,
  },
  {
    title: "The Bridal Clutch",
    tag: "PREMIUM SILK & GOLD",
    uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEj51kcGm8TmyY82zS1OuGW9g0vKoTgH5HPQpkskdLf8l5So0jAhjVwjuwUIo5GhTtMH1KGOtYrqMVvr0WzxyGs1l4r30uWW1Rbhk4v8aLx351_AgKnRug9_wKPFJmPrRF4QPTCF4ww5gq4Ed7pPs5x8KBCW9qDUxWsEwJ3yNMmn3Y8lsMsYX5jpt07UOND7dhbgPOGqaAf-osuSAArnxpWxYFOiRJDV2JzwQknGGgL_hipyT-ieEfqYHKvQ7UJYyHi1fM26dzdQ",
    featured: true,
  },
  {
    title: "The Evening Satchel",
    tag: "MODERN ELEGANCE",
    uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjPYO_Q-4eWbF8Vt7eS010I_yX27cIneLpAqULfIEDNv6FEZVtiZSiSDmuXYrYhgUcBXMSmhoZoeWc-EbCxwnzA-Ta4cYCu_oHoKQRYUfvtnYZvucmSBkzDvHMkww8FxAiibxN_H39_lwaqFvgDFStBA6pKJMAMcMwhfzXx7RadtXtEnrGjkc1hKzgu93JzsnJ6hWVbFNtlB3iGr1oIdJ9YMpj-l6o_1mwfb04TA5eszqeTbxPa2lq-jLjUgznEOXzEaruWHX9cA",
    featured: false,
  },
];

export default function Onboarding2() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const CARD_W = 280;
  const GAP = 24;
  const SIDE = 24;
  const snap = CARD_W + GAP;

  const [activeIndex, setActiveIndex] = useState(0);

  const viewConfig = useMemo(() => ({ viewAreaCoveragePercentThreshold: 60 }), []);
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems?.length) setActiveIndex(viewableItems[0].index ?? 0);
  }).current;

  return (
    <View style={styles.screen} lightColor="#FCFBF8">
      {/* ✅ Header with Back */}
      <RNView style={[styles.header, { paddingTop: insets.top + 6 }]}>
        <Pressable onPress={() => router.back()} hitSlop={12} style={styles.headerBtn}>
          <Text style={styles.chev}>‹</Text>
        </Pressable>

        <Text style={styles.headerTitle}>Zeenat Styles</Text>

        <RNView style={{ width: 40, alignItems: "flex-end" }}>
          <Pressable hitSlop={12} onPress={() => router.replace("/(auth)/login")}>
            <Text style={[styles.skipTop, { color: GOLD }]}>Skip</Text>
          </Pressable>
        </RNView>
      </RNView>

      <RNView style={{ flex: 1 }}>
        <Text style={styles.title}>Trendy Bags for Every Occasion</Text>
        <Text style={styles.subtitle}>From everyday totes to elegant bridal bags — all in one place.</Text>

        {/* ✅ FIX: keep carousel strictly one-row by giving a fixed height */}
        <RNView style={styles.carouselWrap}>
          <FlatList
            data={DATA}
            keyExtractor={(item) => item.title}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: SIDE }}
            ItemSeparatorComponent={() => <RNView style={{ width: GAP }} />}
            snapToInterval={snap}
            decelerationRate="fast"
            snapToAlignment="start"
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewConfig}
            renderItem={({ item }) => (
              <RNView style={{ width: CARD_W }}>
                <ImageBackground
                  source={{ uri: item.uri }}
                  resizeMode="cover"
                  style={[styles.cardImage, item.featured ? styles.cardFeatured : styles.cardNormal]}
                  imageStyle={styles.cardImageStyle}
                />
              </RNView>
            )}
          />
        </RNView>

        {/* ✅ Meta below carousel */}
        <RNView style={styles.cardMeta}>
          <Text style={styles.cardTitle}>{DATA[activeIndex]?.title}</Text>
          <RNView style={styles.tagRow}>
            <RNView style={[styles.tagDot, { backgroundColor: GOLD }]} />
            <Text style={[styles.tagText, { color: GOLD }]}>{DATA[activeIndex]?.tag}</Text>
          </RNView>
        </RNView>

        {/* Dots */}
        <RNView style={styles.stepDots}>
          <RNView style={[styles.stepDotLong, { backgroundColor: activeIndex === 0 ? GOLD : "#E7E2CF" }]} />
          <RNView style={[styles.stepDotLong, { backgroundColor: activeIndex === 1 ? GOLD : "#E7E2CF" }]} />
          <RNView style={[styles.stepDotLong, { backgroundColor: activeIndex === 2 ? GOLD : "#E7E2CF" }]} />
        </RNView>
      </RNView>

      {/* Footer */}
      <RNView style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 18) }]}>
        <ShinyButton label="Next" onPress={() => router.push("/(auth)/onboarding-3")} />
        <Text style={styles.stepText}>STEP 2 OF 3</Text>
      </RNView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },

  header: { paddingHorizontal: 16, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: 10 },
  headerBtn: { width: 40, height: 40, borderRadius: 999, backgroundColor: "rgba(255,255,255,0.55)", alignItems: "center", justifyContent: "center" },
  chev: { fontSize: 28, color: "#1b180d", marginTop: -2 },
  headerTitle: { flex: 1, textAlign: "center", fontSize: 17, fontWeight: "900", color: "#1b180d" },
  skipTop: { fontSize: 14, fontWeight: "900" },

  title: { marginTop: 8, paddingHorizontal: 24, textAlign: "center", fontSize: 28, fontWeight: "900", color: "#1b180d", letterSpacing: -0.2 },
  subtitle: { paddingHorizontal: 32, textAlign: "center", marginTop: 8, marginBottom: 12, fontSize: 14, color: "rgba(27,24,13,0.65)", lineHeight: 22 },

  carouselWrap: { width: "100%", height: 360, justifyContent: "center" },

  cardImage: {
    width: "100%",
    height: 340,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "#EEE",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  cardImageStyle: { borderRadius: 18 },
  cardNormal: { borderWidth: 1, borderColor: "rgba(184,128,60,0.10)" },
  cardFeatured: { borderWidth: 2, borderColor: GOLD },

  cardMeta: { paddingHorizontal: 28, marginTop: 8 },
  cardTitle: { fontSize: 16, fontWeight: "900", color: "#1b180d" },
  tagRow: { marginTop: 6, flexDirection: "row", alignItems: "center", gap: 8 },
  tagDot: { width: 8, height: 8, borderRadius: 999 },
  tagText: { fontSize: 12, fontWeight: "900", letterSpacing: 1.2 },

  stepDots: { flexDirection: "row", justifyContent: "center", gap: 10, paddingVertical: 18 },
  stepDotLong: { width: 26, height: 6, borderRadius: 999 },

  footer: { paddingHorizontal: 24, paddingTop: 6 },
  stepText: { marginTop: 16, textAlign: "center", fontSize: 11, fontWeight: "900", color: "rgba(27,24,13,0.40)", letterSpacing: 2 },
});
