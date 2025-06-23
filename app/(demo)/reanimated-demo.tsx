import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect } from "react";
import { StyleSheet, Button } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function ReanimatedDemoScreen() {
  const opacity = useSharedValue(0);
  const offsetY = useSharedValue(250);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1000 });
  }, [opacity]);

  const handleUpPress = () => {
    offsetY.value = withTiming(offsetY.value - 50, { duration: 300 });
  };

  const handleDownPress = () => {
    offsetY.value = withTiming(offsetY.value + 50, { duration: 300 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: offsetY.value }],
  }));

  return (
    <ThemedView style={styles.container}>
      <Animated.View style={animatedStyle}>
        <ThemedView>
          <ThemedText
            style={styles.text}
            type="title"
          >{`I like to move it,\nmove it!\n🎉🎉`}</ThemedText>
        </ThemedView>
      </Animated.View>
      <ThemedView style={styles.buttonRow}>
        <Button title="Move Up" onPress={handleUpPress} />
        <Button title="Move Down" onPress={handleDownPress} />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  buttonRow: {
    flexDirection: "row",
    position: "absolute",
    bottom: 100,
    gap: 10,
  },
  text: {
    textAlign: "center",
  },
});
