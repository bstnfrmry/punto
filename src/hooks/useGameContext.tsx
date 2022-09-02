import { createImmerSignal } from "solid-immer";
import { createContext, ParentComponent, useContext } from "solid-js";
import { playCard } from "~/core/actions";
import { createGame, Game, Position } from "~/core/game";

export type GameSnapshot = ReturnType<
  ReturnType<typeof createImmerSignal<Game>>[0]
>;

export const createGameContextModel = () => {
  const [game, setGame] = createImmerSignal<Game>(
    createGame({
      players: [
        { name: "Audrey", color: "blue" },
        { name: "Bastien", color: "red" },
        { name: "Charlie", color: "green" },
        { name: "Dallas", color: "yellow" },
      ],
    })
  );

  return {
    game,

    playCard: (position: Position) => {
      setGame((game) => playCard(game, position));
    },
  };
};

const GameContext = createContext<ReturnType<typeof createGameContextModel>>();

export const GameContextProvider: ParentComponent = (props) => {
  const value = createGameContextModel();

  return (
    <GameContext.Provider value={value}>{props.children}</GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("Not within a GameContext");
  }

  return context;
};
