import { Canvas, Circle, interpolateColors } from "@shopify/react-native-skia";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export function CirclesHeader() {
  return (
    <View style={styles.container}>
      <Canvas style={styles.canvas}>
        <AnimatedCircle baseCx={0} baseCy={250} baseRadius={50} />
        <AnimatedCircle baseCx={50} baseCy={50} baseRadius={100} />
        <AnimatedCircle baseCx={200} baseCy={125} baseRadius={10} />
        <AnimatedCircle baseCx={125} baseCy={175} baseRadius={25} />
        <AnimatedCircle baseCx={225} baseCy={225} baseRadius={50} />
        <AnimatedCircle baseCx={350} baseCy={100} baseRadius={75} />
        <AnimatedCircle baseCx={425} baseCy={300} baseRadius={100} />
      </Canvas>
    </View>
  );
}

function AnimatedCircle({
  baseCx,
  baseCy,
  baseRadius,
}: {
  baseCx: number;
  baseCy: number;
  baseRadius: number;
}) {
  const progress = useSharedValue(0);

  useEffect(() => {
    const randomDelay = Math.random() * 1000;
    const randomDuration = 6000 + Math.random() * 6000;

    // Start animation after delay
    setTimeout(() => {
      progress.value = withRepeat(
        withTiming(1, {
          duration: randomDuration,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true // reverse
      );
    }, randomDelay);
  }, [progress]);

  const r = useDerivedValue(() => {
    return baseRadius + Math.sin(progress.value * Math.PI) * 10;
  }, [progress]);

  const cx = useDerivedValue(() => {
    return baseCx + Math.sin(progress.value * Math.PI * 2) * 1;
  }, [progress]);

  const cy = useDerivedValue(() => {
    return baseCy + Math.cos(progress.value * Math.PI * 2) * 1;
  }, [progress]);

  // Color animation
  const color = useDerivedValue(() =>
    interpolateColors(
      progress.value,
      [0, 0.33, 0.66, 1],
      ["#3498DB", "#F39C12", "#9B59B6", "#2ECC71"]
    )
  );

  return <Circle cx={cx} cy={cy} r={r} color={color} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  canvas: {
    width: "100%",
    height: "100%",
  },
});
