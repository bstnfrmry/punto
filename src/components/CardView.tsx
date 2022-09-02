import { Component, For } from "solid-js";
import { Color, Position, Card } from "~/core/game";

const CardColors: Record<Color, string> = {
  blue: "bg-blue-500",
  green: "bg-green-500",
  red: "bg-red-500",
  yellow: "bg-yellow-500",
};

const CardSizes = {
  sm: "w-10 h-10 text-lg",
  md: "w-20 h-20 text-xl",
};

const LOW = 0.2;
const MID = 0.5;
const HIGH = 0.8;

const DotsPosition: Record<number, Position[]> = {
  1: [{ x: MID, y: MID }],
  2: [
    { x: LOW, y: LOW },
    { x: HIGH, y: HIGH },
  ],
  3: [
    { x: LOW, y: LOW },
    { x: MID, y: MID },
    { x: HIGH, y: HIGH },
  ],
  4: [
    { x: LOW, y: LOW },
    { x: LOW, y: HIGH },
    { x: HIGH, y: LOW },
    { x: HIGH, y: HIGH },
  ],
  5: [
    { x: LOW, y: LOW },
    { x: LOW, y: HIGH },
    { x: MID, y: MID },
    { x: HIGH, y: LOW },
    { x: HIGH, y: HIGH },
  ],
  6: [
    { x: LOW, y: LOW },
    { x: LOW, y: MID },
    { x: LOW, y: HIGH },
    { x: HIGH, y: LOW },
    { x: HIGH, y: MID },
    { x: HIGH, y: HIGH },
  ],
  7: [
    { x: LOW, y: LOW },
    { x: LOW, y: MID },
    { x: LOW, y: HIGH },
    { x: MID, y: MID },
    { x: HIGH, y: LOW },
    { x: HIGH, y: MID },
    { x: HIGH, y: HIGH },
  ],
  8: [
    { x: LOW, y: LOW },
    { x: LOW, y: MID },
    { x: LOW, y: HIGH },
    { x: MID, y: LOW },
    { x: MID, y: HIGH },
    { x: HIGH, y: LOW },
    { x: HIGH, y: MID },
    { x: HIGH, y: HIGH },
  ],
  9: [
    { x: LOW, y: LOW },
    { x: LOW, y: MID },
    { x: LOW, y: HIGH },
    { x: MID, y: LOW },
    { x: MID, y: MID },
    { x: MID, y: HIGH },
    { x: HIGH, y: LOW },
    { x: HIGH, y: MID },
    { x: HIGH, y: HIGH },
  ],
};

export const CardView: Component<{
  card: Card;
  size: keyof typeof CardSizes;
}> = (props) => {
  const positions = () => DotsPosition[props.card.value]!;

  return (
    <div
      classList={{
        [CardSizes[props.size]]: true,
        "bg-black relative flex flex-wrap justify-center items-center rounded border gap-2":
          true,
      }}
    >
      <For each={positions()}>
        {(position) => (
          <div
            classList={{
              [CardColors[props.card.color]]: true,
              "w-[0.8rem] h-[0.8rem] rounded-full absolute -translate-x-1/2 -translate-y-1/2":
                true,
            }}
            style={{
              left: `${position.x * 100}%`,
              top: `${position.y * 100}%`,
            }}
          />
        )}
      </For>
    </div>
  );
};
