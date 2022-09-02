import { Component, For } from "solid-js";
import { useGameContext } from "~/hooks/useGameContext";
import { TileView } from "~/components/TileView";

export const GridView: Component = () => {
  const { game } = useGameContext();

  return (
    <div class="flex flex-col justify-center items-center space-y-2 w-[35rem] h-[35rem]">
      <For each={game().grid}>
        {(row) => (
          <div class="flex space-x-2">
            <For each={row}>{(tile) => <TileView tile={tile} />}</For>
          </div>
        )}
      </For>
    </div>
  );
};
