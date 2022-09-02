import { Component, createSignal, Show } from "solid-js";
import { CardView } from "~/components/CardView";
import {
  canPlayNextCard,
  getGridHeight,
  getGridWidth,
  getNextCard,
  Tile,
} from "~/core/game";
import { MAX_GRID_SIZE } from "~/core/grid";
import { useGameContext } from "~/hooks/useGameContext";

export const TileView: Component<{ tile: Tile }> = (props) => {
  const { game, playCard } = useGameContext();

  const [isHovered, setIsHovered] = createSignal(false);

  const handleClick = () => {
    if (canPlayNextCard(game(), props.tile)) {
      playCard(props.tile.position);
    }
  };

  const isVerticalEdge =
    getGridHeight(game()) === MAX_GRID_SIZE + 2 &&
    props.tile.status === "edge" &&
    (props.tile.position.y === 0 ||
      props.tile.position.y === MAX_GRID_SIZE + 1);

  const isHorizontalEdge =
    getGridWidth(game()) === MAX_GRID_SIZE + 2 &&
    props.tile.status === "edge" &&
    (props.tile.position.x === 0 ||
      props.tile.position.x === MAX_GRID_SIZE + 1);

  const isEdge = isVerticalEdge || isHorizontalEdge;

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={props.tile.status !== "live"}
      classList={{
        "relative flex items-center justify-center transition-opacity": true,
        "bg-gray-800 border border-gray-700 rounded": !isEdge,
        "bg-black": isEdge,
        "w-4": isHorizontalEdge,
        "w-20": !isHorizontalEdge,
        "h-4": isVerticalEdge,
        "h-20": !isVerticalEdge,
        "opacity-50": props.tile.status === "disabled",
      }}
      onClick={handleClick}
    >
      <Show when={props.tile.card}>
        <CardView size="md" card={props.tile.card!} />
      </Show>

      <Show when={isHovered() && canPlayNextCard(game(), props.tile)}>
        <div class="absolute inset-0 -mt-px rounded backdrop-blur-lg bg-white/30 scale-75">
          <CardView size="md" card={getNextCard(game())!} />
        </div>
      </Show>
    </button>
  );
};
