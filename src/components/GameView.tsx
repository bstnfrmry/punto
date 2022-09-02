import { Component } from "solid-js";
import { ActivePlayerView } from "~/components/ActivePlayerView";
import { GameContextProvider } from "~/hooks/useGameContext";
import { GridView } from "~/components/GridView";

export const GameView: Component = () => {
  return (
    <GameContextProvider>
      <div class="container mx-auto flex flex-col items-center">
        <div class="my-20">
          <GridView />
        </div>
        <div class="mt-4">
          <ActivePlayerView />
        </div>
      </div>
    </GameContextProvider>
  );
};
