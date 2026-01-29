import { useEffect, useRef } from "react";
import { Animated, Modal, Pressable, View as RNView, StyleSheet } from "react-native";
import { Text } from "./Themed";

export default function BottomSheet({ visible, title, onClose, children }) {
  const translateY = useRef(new Animated.Value(340)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 180, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: 0, duration: 220, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 0, duration: 140, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: 340, duration: 160, useNativeDriver: true }),
      ]).start();
    }
  }, [visible]);

  return (
    <Modal transparent visible={visible} animationType="none" onRequestClose={onClose}>
      <RNView style={styles.root}>
        <Animated.View style={[styles.backdrop, { opacity }]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        </Animated.View>

        <Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
          <RNView style={styles.handle} />
          {!!title && <Text style={styles.title}>{title}</Text>}
          <RNView style={styles.content}>{children}</RNView>
        </Animated.View>
      </RNView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, justifyContent: "flex-end" },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.35)" },

  sheet: {
    backgroundColor: "#FBFAF9",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingTop: 10,
    paddingBottom: 18,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "rgba(226,220,212,0.55)",
  },

  handle: {
    width: 44,
    height: 5,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.12)",
    alignSelf: "center",
    marginBottom: 10,
  },

  title: { fontSize: 16, fontWeight: "900", color: "#181510", textAlign: "center" },
  content: { marginTop: 12 },
});
