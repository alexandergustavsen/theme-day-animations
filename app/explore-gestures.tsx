import React from "react";
import { Button, Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDecay,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { ThemedView } from "@/components/ThemedView";

const { width, height } = Dimensions.get("window");
const BALL_SIZE = 80;
const CENTER_X = (width - BALL_SIZE) / 2;
const CENTER_Y = (height - BALL_SIZE) / 2;

export default function ExploreGesturesScreen() {
  const offsetX = useSharedValue(CENTER_X);
  const offsetY = useSharedValue(CENTER_Y);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);

  const pan = Gesture.Pan()
    .onStart(() => {
      startX.value = offsetX.value;
      startY.value = offsetY.value;
    })
    .onUpdate((event) => {
      offsetX.value = startX.value + event.translationX;
      offsetY.value = startY.value + event.translationY;
    })
    .onEnd((event) => {
      const speed = Math.hypot(event.velocityX, event.velocityY);
      if (speed > 1200) {
        offsetX.value = withDecay({ velocity: event.velocityX });
        offsetY.value = withDecay({ velocity: event.velocityY });
      } else {
        offsetX.value = withSpring(CENTER_X);
        offsetY.value = withSpring(CENTER_Y);
      }
    });

  const handleGetBall = () => {
    offsetX.value = withSpring(CENTER_X);
    offsetY.value = withSpring(CENTER_Y);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offsetX.value }, { translateY: offsetY.value }],
  }));

  return (
    <ThemedView style={styles.container}>
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.ball, animatedStyle]} />
      </GestureDetector>
      <ThemedView style={styles.buttonWrapper}>
        <Button title="Get ball" onPress={handleGetBall} />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ball: {
    width: BALL_SIZE,
    height: BALL_SIZE,
    borderRadius: BALL_SIZE / 2,
    backgroundColor: "#9B59B6",
    position: "absolute",
    zIndex: 1,
  },
  buttonWrapper: {
    position: "absolute",
    justifyContent: "center",
    bottom: 100,
    right: 0,
    left: 0,
  },
});
