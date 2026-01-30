import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Image,
    Platform,
    Pressable,
    View as RNView,
    ScrollView,
    StyleSheet,
    TextInput,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import InnerHeader from "../../components/InnerHeader";
import ShinyButton from "../../components/ShinyButton";
import { Text, View } from "../../components/Themed";

const BG = "#FBFAF9";
const PRIMARY = "#B8803C";

export default function EditProfile() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [fullName, setFullName] = useState("Zeenat Ahmed");
  const [email, setEmail] = useState("zeenat.styles@example.com");
  const [phone, setPhone] = useState("+44 7700 900077");
  const [dob, setDob] = useState("12 January 1995");

  // fixed footer height + safe area
  const FOOTER_PAD = 18 + insets.bottom + (Platform.OS === "android" ? 2 : 0);

  return (
    <View style={styles.screen} lightColor={BG}>
      <InnerHeader title="Edit Profile" onPressBack={() => router.back()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 160 + insets.bottom,
        }}
      >
        {/* Photo */}
        <RNView style={styles.photoWrap}>
          <RNView style={styles.avatarWrap}>
            <Image
              source={{
                uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAljCuitKZbMarxRI_kXapEZ4bpZvlHL6rvj8VWesH0gahxHSOHgP3nrviFLyK2fLzHmPfGjI6FEoNc8XrMbwA4XiQXSJ71FVAtLuy8zjNskZ9fZ6RxDihyOKpV-N5M7xOFf_Twq_mW6n6V6YsOa8oxWVMZnzN8rqdbFNNg5EMIcDmnTPQWXHdWJT2-5PxvJXHQF_Cj7AWEBKAB4ielu80S8fC4kEjXldlT6MKDZ1Hp53GQxAbl7jDiPrcHyjJewWtZbOrRE-CB4w",
              }}
              style={styles.avatar}
            />

            <Pressable onPress={() => {}} style={styles.cameraBtn} hitSlop={10}>
              <Feather name="camera" size={16} color="#fff" />
            </Pressable>
          </RNView>

          <Text style={styles.changePhoto}>CHANGE PHOTO</Text>
        </RNView>

        {/* Fields */}
        <Text style={styles.label}>Full Name</Text>
        <RNView style={styles.inputCard}>
          <TextInput
            value={fullName}
            onChangeText={setFullName}
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor="rgba(138,117,92,0.7)"
          />
        </RNView>

        <Text style={styles.label}>Email Address</Text>
        <RNView style={styles.inputCard}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            placeholder="yourname@email.com"
            placeholderTextColor="rgba(138,117,92,0.7)"
          />
        </RNView>

        <Text style={styles.label}>Phone Number</Text>
        <RNView style={styles.inputCard}>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
            keyboardType="phone-pad"
            placeholder="+1 (555) 000-0000"
            placeholderTextColor="rgba(138,117,92,0.7)"
          />
        </RNView>

        <Text style={styles.label}>Date of Birth</Text>
        <Pressable onPress={() => {}} style={[styles.inputCard, styles.dobCard]}>
          <Text style={styles.dobTxt}>{dob}</Text>
          <Feather name="calendar" size={18} color="rgba(138,117,92,0.9)" />
        </Pressable>
      </ScrollView>

      {/* Fixed footer */}
      <RNView style={styles.footer}>
        <RNView style={[styles.footerInner, { paddingBottom: FOOTER_PAD }]}>
          <ShinyButton
            title="Save Changes"
            onPress={() => {
              // TODO: Save profile to store/api
              router.back();
            }}
          />

          <Pressable onPress={() => router.back()} style={styles.cancelBtn}>
            <Text style={styles.cancelTxt}>Cancel</Text>
          </Pressable>
        </RNView>
      </RNView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: BG },

  photoWrap: { alignItems: "center", paddingTop: 18, paddingBottom: 10 },

  avatarWrap: { position: "relative" },
  avatar: {
    width: 132,
    height: 132,
    borderRadius: 999,
    borderWidth: 4,
    borderColor: "#fff",
    backgroundColor: "#f1eeea",
  },
  cameraBtn: {
    position: "absolute",
    right: 6,
    bottom: 6,
    width: 44,
    height: 44,
    borderRadius: 999,
    backgroundColor: PRIMARY,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  changePhoto: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 1.6,
    color: PRIMARY,
  },

  label: {
    marginTop: 18,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "900",
    color: "#181510",
  },

  inputCard: {
    height: 62,
    borderRadius: 18,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "rgba(226,220,212,0.9)",
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  input: { fontSize: 16, fontWeight: "800", color: "#181510" },

  dobCard: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  dobTxt: { fontSize: 16, fontWeight: "800", color: "#181510" },

  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(251,250,249,0.92)",
    borderTopWidth: 1,
    borderTopColor: "rgba(226,220,212,0.7)",
  },
  footerInner: { paddingHorizontal: 16, paddingTop: 12 },

  cancelBtn: { height: 44, alignItems: "center", justifyContent: "center", marginTop: 6 },
  cancelTxt: { fontSize: 16, fontWeight: "900", color: "rgba(138,117,92,1)" },
});
