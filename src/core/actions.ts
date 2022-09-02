import { Game, Position, getActivePlayer, Player } from "~/core/game";
import { updateGrid } from "~/core/grid";

export const playCard = (game: Game, position: Position) => {
  const activePlayer = getActivePlayer(game) as Player;

  const card = activePlayer.deck.shift();
  if (!card) {
    throw new Error("Deck is empty");
  }

  const tile = game.grid[position.y]?.[position.x] ?? null;
  if (!tile) {
    throw new Error("Tile not found");
  }

  if (tile.card && tile.card.value >= card.value) {
    throw new Error("Cannot play card here");
  }

  tile.card = card;
  game.turn += 1;
  updateGrid(game.grid, tile);
};
