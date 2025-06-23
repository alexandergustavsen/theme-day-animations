import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <GestureHandlerRootView>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerBackButtonDisplayMode: "minimal" }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(demo)/advanced-demo"
            options={{ headerTitle: "Advanced Demo" }}
          />
          <Stack.Screen
            name="(demo)/reanimated-demo"
            options={{ headerTitle: "Reanimated Demo" }}
          />
          <Stack.Screen
            name="(demo)/skia-demo"
            options={{ headerTitle: "Skia Demo" }}
          />
          <Stack.Screen
            name="(explore)/explore-buttons"
            options={{ headerTitle: "Buttons" }}
          />
          <Stack.Screen
            name="(explore)/explore-layouts"
            options={{ headerTitle: "Layouts" }}
          />
          <Stack.Screen
            name="(explore)/explore-gestures"
            options={{ headerTitle: "Gestures" }}
          />
          <Stack.Screen
            name="(explore)/explore-sandbox"
            options={{ headerTitle: "Sandbox" }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
