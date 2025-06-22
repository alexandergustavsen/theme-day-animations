import { Pressable, StyleSheet } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";
import { CirclesHeader } from "@/components/CirclesHeader";

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={<CirclesHeader />}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>
      </ThemedView>
      <ThemedText type="subtitle">Theme day: Animations</ThemedText>
      <ThemedView>
        <Pressable onPress={() => router.push(`/explore-buttons`)}>
          <ThemedView style={styles.categoryContainer}>
            <ThemedText type="subtitle">Buttons</ThemedText>
            <ThemedText>
              Try out button animations that react to user interaction — tap,
              press, and animate.
            </ThemedText>
          </ThemedView>
        </Pressable>
        <Pressable onPress={() => router.push(`/explore-layouts`)}>
          <ThemedView style={styles.categoryContainer}>
            <ThemedText type="subtitle">Layouts</ThemedText>
            <ThemedText>
              Explore various layout animations using Reanimated.
            </ThemedText>
          </ThemedView>
        </Pressable>
        <Pressable onPress={() => router.push(`/explore-gestures`)}>
          <ThemedView style={styles.categoryContainer}>
            <ThemedText type="subtitle">Gestures</ThemedText>
            <ThemedText>
              Combine user input with physics — drag, fling, and swipe using
              gestures.
            </ThemedText>
          </ThemedView>
        </Pressable>
        <Pressable onPress={() => router.push(`/explore-sandbox`)}>
          <ThemedView style={styles.categoryContainer}>
            <ThemedText type="subtitle">Sandbox</ThemedText>
            <ThemedText>
              Test your creativity — build and demo anything fun using
              animations and gestures.
            </ThemedText>
          </ThemedView>
        </Pressable>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  categoryContainer: {
    gap: 8,
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
