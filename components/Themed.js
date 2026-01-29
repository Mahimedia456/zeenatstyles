import { Text as RNText, View as RNView } from "react-native";
import { Colors } from "../constants/Colors";
import { Fonts } from "../constants/Fonts";

export function Text({ style, ...props }) {
  return (
    <RNText
      {...props}
      style={[{ color: Colors.light.text, fontFamily: Fonts.regular }, style]}
    />
  );
}

export function View({ style, lightColor, ...props }) {
  return (
    <RNView
      {...props}
      style={[
        { backgroundColor: lightColor ?? Colors.light.background },
        style,
      ]}
    />
  );
}
