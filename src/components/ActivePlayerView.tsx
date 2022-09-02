import { Component, Show } from "solid-js";
import { CardView } from "~/components/CardView";
import { getActivePlayer, getNextCard } from "~/core/game";
import { useGameContext } from "~/hooks/useGameContext";

export const ActivePlayerView: Component = () => {
  const { game } = useGameContext();

  const deckSize = () => getActivePlayer(game()).deck.length - 1;

  return (
    <div class="flex flex-col items-center">
      <span class="text-xl">{getActivePlayer(game()).name}</span>
      <div class="flex space-x-2 mt-2">
        <div class="w-20 h-20 rounded bg-gray-800 border border-gray-700 flex items-center justify-center">
          ({deckSize()})
        </div>
        <Show when={getNextCard(game())}>
          <CardView size="md" card={getNextCard(game())!} />
        </Show>
      </div>
    </div>
  );
};
