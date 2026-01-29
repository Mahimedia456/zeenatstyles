import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import {
    FlatList,
    View as RNView,
    StyleSheet,
    TextInput,
} from "react-native";

import AppHeader from "../../components/AppHeader";
import CatalogCard from "../../components/CatalogCard";
import { Text, View } from "../../components/Themed";

const BG = "#FBFAF9";

export default function Catalog() {
  const router = useRouter();

  const data = useMemo(
    () => [
      {
        title: "Handbags",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCzUP-sT2G-xgii90UNWeSXc0BGSuvJ-hlBXk2OQ5UsG5lLh9EVGaHNhb-vwSjU8z5Lb3mXM-enrVtvQurTFk2IROVSoPSaSqSc8Z9n-9M5RAQ5gzTaYv6219-zXc2ou2lYjMhGlhvtq7kBOCLjQ3ZJ8H9yl6ca1qqB2xtMrF1ufsXeanGgxm-C5sYlwgB70JiRFCZ-2CAgJLzw3ZONlK6tikMQjOtyAVMGW6q7OcHZnnS1tcvCN2COsrpZNE08z8PACPj-loBqeQ",
      },
      {
        title: "Tote Bags",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCYw0QEaxianHBBkUWaiF2RBqhPKbzNMPNDQDNHwiu960akE00Asm4wlmVYykMIwQRJkpy-4IypptiFGTyDeE2nA8JqtTBV3-joiGYQ-EcwPj0rj_D46AoSQe7W6nKU106UyPoSoil2MBf7r2PcQyAjzzMUKrUUvp2FD7bc12XSX3cb2sBcS_lXfmgEPv1EFsd2FXu0YzyU6gpuHTvhViXWpqvWGBNMJ_7uXSeMp2vBblBuIujQIKdnX4M8eeFp34F1M08arS5LYQ",
      },
      {
        title: "Crossbody",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAIYPMsj0agBF5HXoCKv6puzoeqiRQUvBNk-m2dJZ__OdfxWVsLcUSHiZRZXFMN94EKgRS7zGG7_ZYjiMSq3ITUZk_KcMGfn2YRCyEzQtEhBzG_cClwgrVzvCFgPM7F-w2RDz8nRM9kmxVhikt9FRP-PoVzrGUb5S1xQFDZHDMjPfMkZ8enxHMZBTfrQhgFayX-XOHk_9KV76z54GrfXHlQzdHNSAZ5pNIBoYOKa0l4k7rQUITbdkinIyi6N6FxjvGMArRB5Rd33g",
      },
      {
        title: "Clutches",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuD9HEd2r01jDL4B3Rm9zt8wavC4toI-XFaSXv1OE7PeSkXVhYm1SF7-aTT7U8grNjDQRrRyib9zAtSxiKcAW139NMHOjRl0B3t42TQlfH41tsi_0RjhTo2Wlt06nxFXD0LOd3UhYES1jQUmSCprLf_pcfhh6-QNYtJDKA6rCfl3dxieJ-vDoPOLtCKAQiviec7R9tsXH2UFV-D3XUUnO56nUuJjG1XBXNEFokgULSvpvFWiGikP_zQ6x9E0xMVat32R_IFfRi6SOQ",
      },
      {
        title: "Wallets",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAGKerdSvnFu0uMJ_LZjXdXNqCIeF0MCu_iSwHAjM_lqMClupOEG9WXr2gGWuf16IMgQ51QLDQAfi1MGgjPGF9RQPB-6G4FhPjnSF-RZcNFReqSRWtRuIp8ekWi79RdttLxKWh7mqbK0-PQHXSeQHMWsaOCXk7YeiSqcvgdJ-VWetjC0p3GheSStjXpRX9hKPRrfksTNgJIfijV1-59QCAhRH2RWBZZKIMtWh8pdISfEhS4L5QD4ocQ3LIr2Cg48KRxMc-y61LDVg",
      },
      {
        title: "Accessories",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuB-J2EoJC_83jsrA2T8rbUMn0huMGeFQMutjKLNgtSopd4SkQF9dJAW5khoZpol6UVZb96MMmfvw2wTOZzCSaKtBO90m2gPCAq5tDTswlYRL7fnlCH63AJfwHi-v2lMyLQeOEspinvbV2BFAG8vQqJ12L2WraERCl6c_kwOKBXMnRhzrj_hezfFfm_fJ7uCxfZmWssDwP-2dCQIP48WQpJYfWCLqMe0NIPw7qOyvdAJniPtmlQVW8X2llamDq-VpavlI8bTuLucSg",
      },
    ],
    []
  );

  return (
    <View style={styles.screen} lightColor={BG}>
      <AppHeader
        title="ZEENAT STYLES"
        onPressSearch={() => {}}
        onPressWishlist={() => router.push("/(modals)/wishlist")}
        onPressCart={() => router.push("/(tabs)/cart")}
        cartBadge={2}
      />

      <FlatList
        data={data}
        keyExtractor={(item) => item.title}
        numColumns={2} // ✅ ALWAYS 2 in a row
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row} // ✅ spacing between columns
        ListHeaderComponent={
          <>
            {/* Search */}
            <RNView style={styles.searchWrap}>
              <Feather name="search" size={18} color="rgba(138,117,92,1)" />
              <TextInput
                placeholder="Search luxury collections..."
                placeholderTextColor="rgba(138,117,92,1)"
                style={styles.searchInput}
              />
            </RNView>

            {/* Headline */}
            <RNView style={styles.head}>
              <Text style={styles.h1}>Shop by Category</Text>
              <Text style={styles.sub}>Explore our premium selection</Text>
            </RNView>
          </>
        }
        renderItem={({ item }) => (
          <RNView style={styles.cell}>
            <CatalogCard
              title={item.title}
              image={item.image}
              onPress={() =>
                router.push(`/catalog/${encodeURIComponent(item.title)}`)
              }
            />
          </RNView>
        )}
        ListFooterComponent={<RNView style={{ height: 110 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },

  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 0,
  },

  // ✅ column spacing
  row: {
    justifyContent: "space-between",
    marginBottom: 14,
  },

  // ✅ each cell takes half width (no % bugs)
  cell: {
    flex: 1,
    maxWidth: "48.5%",
  },

  searchWrap: {
    marginTop: 10,
    height: 44,
    borderRadius: 999,
    backgroundColor: "#F1EEEA",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.02)",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 13,
    fontWeight: "600",
    color: "#181510",
  },

  head: { paddingTop: 18, paddingBottom: 10 },
  h1: {
    fontSize: 34,
    fontWeight: "900",
    color: "#181510",
    letterSpacing: -0.4,
  },
  sub: {
    marginTop: 6,
    fontSize: 14,
    color: "rgba(138,117,92,1)",
    fontWeight: "600",
  },
});
