import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { StyleSheet, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";

const BUTTON_HEIGHT = 64;
const BACKGROUND_COLOR = "#3498db";

export default function ExploreButtonsScreen() {
  return (
    <ThemedView style={styles.container}>
      <BounceButton />
      <RippleButton />
      <FlashButton />
      <RotateButton />
    </ThemedView>
  );
}

const BounceButton = () => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      backgroundColor: BACKGROUND_COLOR,
    };
  });

  const onPressIn = () => (scale.value = withSpring(0.85));
  const onPressOut = () => (scale.value = withSpring(1));

  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View style={[styles.button, animatedStyle]}>
        <ThemedText style={styles.text}>Bounce</ThemedText>
      </Animated.View>
    </Pressable>
  );
};

const RippleButton = () => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      backgroundColor: BACKGROUND_COLOR,
    };
  });

  const onPressIn = () => (scale.value = withTiming(1.2, { duration: 150 }));
  const onPressOut = () => (scale.value = withSpring(1));

  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View style={[styles.button, animatedStyle]}>
        <ThemedText style={styles.text}>Ripple</ThemedText>
      </Animated.View>
    </Pressable>
  );
};

const FlashButton = () => {
  const bgColor = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        bgColor.value,
        [0, 1],
        ["#3498db", "#2ecc71"]
      ),
    };
  });

  const onPressIn = () => (bgColor.value = withTiming(1, { duration: 150 }));
  const onPressOut = () => (bgColor.value = withTiming(0, { duration: 150 }));

  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View style={[styles.button, animatedStyle]}>
        <ThemedText style={styles.text}>Flash</ThemedText>
      </Animated.View>
    </Pressable>
  );
};

const RotateButton = () => {
  const rotate = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));

  const onPressIn = () => {
    rotate.value = withTiming(30, { duration: 150 });
  };

  const onPressOut = () => {
    rotate.value = withTiming(0, { duration: 150 });
  };

  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View style={[styles.button, animatedStyle]}>
        <ThemedText style={styles.text}>Rotate</ThemedText>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "space-evenly",
  },
  button: {
    height: BUTTON_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3498db",
    borderRadius: 12,
  },
  text: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
});
