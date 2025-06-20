import { Image } from "expo-image";
import { Pressable, StyleSheet } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedText type="subtitle">Theme day: Animations</ThemedText>
      <Pressable onPress={() => router.push(`/reanimated-demo`)}>
        <ThemedView style={styles.demoContainer}>
          <ThemedText type="subtitle">Demo 1: Reanimated </ThemedText>
          <ThemedText>
            Animate a box’s opacity and position using shared values and timing
            transitions.
          </ThemedText>
        </ThemedView>
      </Pressable>
      <Pressable onPress={() => router.push(`/skia-demo`)}>
        <ThemedView style={styles.demoContainer}>
          <ThemedText type="subtitle">Demo 2: Skia</ThemedText>
          <ThemedText>
            Animate a custom circle graphic using Skia and shared values.
          </ThemedText>
        </ThemedView>
      </Pressable>
      <Pressable onPress={() => router.push(`/advanced-demo`)}>
        <ThemedView style={styles.demoContainer}>
          <ThemedText type="subtitle">Demo 3: Advanced Animations</ThemedText>
          <ThemedText>
            This demo showcases a swipe-to-dismiss animation by combining
            multiple libraries for advanced interactions.
          </ThemedText>
        </ThemedView>
      </Pressable>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  demoContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
