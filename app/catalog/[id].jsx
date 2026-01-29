import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";
import InnerHeader from "../../components/InnerHeader";
import { Text, View } from "../../components/Themed";

const BG = "#FBFAF9";

export default function CatalogDetail() {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.screen} lightColor={BG}>
      <Stack.Screen
        options={{
          header: () => (
            <InnerHeader
              title="Handbags"
              subtitle="124 ITEMS"
              rightIcon="search"
              onPressRight={() => {}}
            />
          ),
        }}
      />

      <View style={styles.inner}>
        <Text style={styles.h1}>Category: {String(id)}</Text>
        <Text style={styles.p}>Dummy detail screen.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },
  inner: { flex: 1, paddingHorizontal: 18, paddingTop: 18, paddingBottom: 110 },
  h1: { fontSize: 24, fontWeight: "900", color: "#191510" },
  p: { marginTop: 10, fontSize: 14, color: "rgba(27,24,13,0.6)" },
});
