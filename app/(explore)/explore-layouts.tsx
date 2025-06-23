import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useState } from "react";
import { StyleSheet, Pressable } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  SlideInLeft,
  SlideOutRight,
} from "react-native-reanimated";

export default function ExploreLayoutsScreen() {
  return (
    <ThemedView style={styles.container}>
      <FadeBox />
      <SlideBox />
      <ResizeBox />
      <ExpandableList />
    </ThemedView>
  );
}

const FadeBox = () => {
  const [visible, setVisible] = useState(true);

  return (
    <Pressable onPress={() => setVisible(!visible)} style={styles.block}>
      <ThemedText type="subtitle" style={styles.label}>
        Fade In/Out
      </ThemedText>
      {visible && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          layout={LinearTransition.springify()}
          style={styles.box}
        />
      )}
    </Pressable>
  );
};

const SlideBox = () => {
  const [visible, setVisible] = useState(true);

  return (
    <Pressable onPress={() => setVisible(!visible)} style={styles.block}>
      <ThemedText type="subtitle" style={styles.label}>
        Slide In/Out
      </ThemedText>
      {visible && (
        <Animated.View
          entering={SlideInLeft}
          exiting={SlideOutRight}
          layout={LinearTransition.springify()}
          style={[styles.box, { backgroundColor: "#F39C12" }]}
        />
      )}
    </Pressable>
  );
};

const ResizeBox = () => {
  const [toggled, setToggled] = useState(false);

  return (
    <Pressable onPress={() => setToggled(!toggled)} style={styles.block}>
      <ThemedText type="subtitle" style={styles.label}>
        Resize Box
      </ThemedText>
      <Animated.View
        layout={LinearTransition.springify()}
        style={[
          styles.box,
          {
            height: toggled ? 100 : 60,
            backgroundColor: "#9B59B6",
          },
        ]}
      />
    </Pressable>
  );
};

const ExpandableList = () => {
  const [expanded, setExpanded] = useState(true);
  const data = ["One", "Two"];

  return (
    <Pressable onPress={() => setExpanded(!expanded)} style={styles.block}>
      <ThemedText type="subtitle" style={styles.label}>
        Expandable List
      </ThemedText>
      <Animated.View
        layout={LinearTransition.springify()}
        style={styles.listContainer}
      >
        {expanded &&
          data.map((item) => (
            <Animated.View
              key={item}
              entering={FadeIn}
              exiting={FadeOut}
              style={styles.listItem}
            >
              <ThemedText type="defaultSemiBold">{item}</ThemedText>
            </Animated.View>
          ))}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  block: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#AAA",
  },
  label: {
    position: "absolute",
    top: 10,
    marginBottom: 10,
  },
  box: {
    width: 150,
    height: 60,
    backgroundColor: "#3498DB",
    borderRadius: 12,
  },
  listContainer: {
    width: 200,
    alignItems: "center",
  },
  listItem: {
    backgroundColor: "#2ECC71",
    padding: 10,
    marginVertical: 4,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
});
