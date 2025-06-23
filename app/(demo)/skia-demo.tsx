import { ThemedView } from "@/components/ThemedView";
import { Canvas, Circle, interpolateColors } from "@shopify/react-native-skia";
import { Button, StyleSheet } from "react-native";
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function SkiaDemoScreen() {
  const radius = useSharedValue(50);
  const colorProgress = useSharedValue(0);

  const color = useDerivedValue(
    () =>
      interpolateColors(colorProgress.value, [0, 1], ["#3498DB", "#9B59B6"]),
    [colorProgress]
  );

  const handleIncreaseRadiusPress = () => {
    radius.value = withTiming(radius.value + 20, { duration: 500 });
  };

  const handleDecreaseRadiusPress = () => {
    radius.value = withTiming(Math.max(10, radius.value - 20), {
      duration: 500,
    });
  };

  const handleChangeColorPress = () => {
    colorProgress.value = withTiming(colorProgress.value === 0 ? 1 : 0, {
      duration: 500,
    });
  };

  return (
    <ThemedView style={styles.container}>
      <Canvas style={styles.canvas}>
        <Circle cx={150} cy={150} r={radius} color={color} />
      </Canvas>
      <ThemedView style={styles.buttonRow}>
        <Button title="Increase Radius" onPress={handleIncreaseRadiusPress} />
        <Button title="Decrease Radius" onPress={handleDecreaseRadiusPress} />
      </ThemedView>
      <ThemedView style={styles.buttonRow}>
        <Button title="Change Color" onPress={handleChangeColorPress} />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  canvas: {
    width: 300,
    height: 300,
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 10,
    gap: 10,
  },
});
