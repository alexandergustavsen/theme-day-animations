import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, Dimensions, Button } from "react-native";
import React from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { ThemedText } from "@/components/ThemedText";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.4;

export default function SkiaDemoScreen() {
  const translateX = useSharedValue(0);
  const cardHeight = useSharedValue(400);
  const opacity = useSharedValue(1);

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
    })
    .onEnd(() => {
      if (Math.abs(translateX.value) > SWIPE_THRESHOLD) {
        translateX.value = withSpring(
          Math.sign(translateX.value) * SCREEN_WIDTH
        );
        opacity.value = withSpring(0);
        cardHeight.value = withSpring(0);
      } else {
        translateX.value = withSpring(0);
      }
    });

  const handleRespawnCard = () => {
    translateX.value = 0;
    opacity.value = 1;
    cardHeight.value = 400;
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
    height: cardHeight.value,
  }));

  return (
    <ThemedView style={styles.container}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.card, animatedStyle]}>
          <ThemedText>Swipe me!</ThemedText>
        </Animated.View>
      </GestureDetector>
      <ThemedView style={styles.buttonWrapper}>
        <Button title="Respawn Card" onPress={handleRespawnCard} />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#3498db",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    margin: 24,
  },
  buttonWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 100,
  },
});
