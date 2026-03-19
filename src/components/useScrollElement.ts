import { MotionValue, useTransform } from "framer-motion";

type Direction = "left" | "right" | "bottom" | "scale";

/**
 * Returns scroll-driven motion style with both enter AND exit animations.
 * `enter` = progress where element starts appearing
 * `full`  = progress where element is fully visible
 * `exitStart` = progress where element starts exiting
 * `exitEnd`   = progress where element is fully gone
 */
export function useScrollElement(
  progress: MotionValue<number>,
  direction: Direction,
  enter: number,
  full: number,
  exitStart: number = 0.7,
  exitEnd: number = 0.92
) {
  const distance = direction === "bottom" ? 60 : 120;

  // Enter: 0 -> 1, Hold: 1, Exit: 1 -> 0
  const opacity = useTransform(
    progress,
    [enter, full, exitStart, exitEnd],
    [0, 1, 1, 0]
  );

  const blur = useTransform(
    progress,
    [enter, full, exitStart, exitEnd],
    [10, 0, 0, 10]
  );

  const enterX =
    direction === "left" ? -distance : direction === "right" ? distance : 0;
  const exitX =
    direction === "left" ? -distance * 0.6 : direction === "right" ? distance * 0.6 : 0;

  const x = useTransform(
    progress,
    [enter, full, exitStart, exitEnd],
    [enterX, 0, 0, exitX]
  );

  const enterY =
    direction === "bottom" ? distance : direction === "scale" ? 20 : 0;
  const exitY = direction === "bottom" ? -40 : direction === "scale" ? -20 : -15;

  const y = useTransform(
    progress,
    [enter, full, exitStart, exitEnd],
    [enterY, 0, 0, exitY]
  );

  const scale = useTransform(
    progress,
    [enter, full, exitStart, exitEnd],
    [direction === "scale" ? 0.85 : 1, 1, 1, direction === "scale" ? 0.9 : 0.97]
  );

  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  return { opacity, x, y, scale, filter };
}
