import { range, shuffle } from "lodash";
import { updateGrid } from "~/core/grid";
import { GameSnapshot } from "~/hooks/useGameContext";

export type Color = "blue" | "red" | "green" | "yellow";

export type Player = {
  name: string;
  color: Color;
  deck: Card[];
};

export type Position = {
  x: number;
  y: number;
};

export type Tile = {
  position: Position;
  status: "live" | "edge" | "disabled";
  card: Card | null;
};

export type Grid = Tile[][];

export type Card = {
  value: number;
  color: Color;
};

export type Game = {
  players: Player[];
  grid: Grid;
  turn: number;
};

type PlayerInput = {
  name: string;
  color: Color;
};

export const createGame = (options: { players: PlayerInput[] }): Game => {
  // @todo: check if no players have the same name or color.
  const players = options.players.map((player) => {
    const cards = range(9).map((index) => {
      const value = index + 1;

      return {
        color: player.color,
        value,
      };
    });

    const deck = shuffle(cards);

    return {
      ...player,
      deck,
    };
  });

  // Start the grid with one empty tile
  const grid: Grid = range(3).map((rowIndex) =>
    range(3).map((columnIndex) => {
      return {
        position: {
          y: rowIndex,
          x: columnIndex,
        },
        // Only enable the center tile
        status: columnIndex === 1 && rowIndex === 1 ? "live" : "disabled",
        card: null,
      };
    })
  ) as Grid;

  const turn = 0;

  return {
    players,
    grid,
    turn,
  };
};

export const getGridWidth = (game: GameSnapshot) => {
  return game.grid[0]!.length;
};

export const getGridHeight = (game: GameSnapshot) => {
  return game.grid[0]?.length;
};

export const getActivePlayer = (game: GameSnapshot) => {
  const index = game.turn % game.players.length;

  return game.players[index]!;
};

export const getNextCard = (game: GameSnapshot) => {
  return getActivePlayer(game).deck[0];
};

export const canPlayNextCard = (game: GameSnapshot, tile: Tile) => {
  const card = getNextCard(game);

  return card && (!tile.card || card.value > tile.card.value);
};
