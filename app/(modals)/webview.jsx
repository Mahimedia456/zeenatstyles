import { useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, View as RNView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

import InnerHeader from "../../components/InnerHeader";
import { Text, View } from "../../components/Themed";

const BG = "#FBFAF9";

export default function WebviewScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();

  const title = typeof params.title === "string" ? params.title : "Details";
  const url = typeof params.url === "string" ? params.url : "";

  if (!url) {
    return (
      <View style={[styles.screen, { paddingTop: insets.top }]} lightColor={BG}>
        <InnerHeader title={title} onBack={() => router.back()} />
        <RNView style={{ padding: 16 }}>
          <Text style={{ fontWeight: "900", fontSize: 16 }}>Invalid URL</Text>
          <Text style={{ marginTop: 6, color: "rgba(138,117,92,1)", fontWeight: "700" }}>
            Please provide a valid link.
          </Text>
        </RNView>
      </View>
    );
  }

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]} lightColor={BG}>
      <InnerHeader title={title} onBack={() => router.back()} />

      <WebView
        source={{ uri: url }}
        startInLoadingState
        renderLoading={() => (
          <RNView style={styles.loader}>
            <ActivityIndicator />
            <Text style={styles.loaderTxt}>Loading...</Text>
          </RNView>
        )}
        // helpful settings
        allowsBackForwardNavigationGestures
        javaScriptEnabled
        domStorageEnabled
        setSupportMultipleWindows={false}
        // Android safe
        mixedContentMode="compatibility"
        originWhitelist={["*"]}
        // avoid white flash on iOS
        style={{ backgroundColor: BG }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },
  loader: { flex: 1, alignItems: "center", justifyContent: "center", gap: 10 },
  loaderTxt: { fontSize: 12, fontWeight: "800", color: "rgba(138,117,92,1)" },
});
