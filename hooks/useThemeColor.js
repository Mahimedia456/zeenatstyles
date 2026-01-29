import { Colors } from "../constants/Colors";
import { useColorScheme } from "./useColorScheme";

export function useThemeColor(props, colorName) {
  const theme = useColorScheme();
  const fromProps = props?.[theme];
  if (fromProps) return fromProps;
  return Colors[theme][colorName];
}
