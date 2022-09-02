import type { Component } from "solid-js";
import { GameView } from "~/components/GameView";

const App: Component = () => {
  return (
    <div class="p-4 bg-gray-900 h-full">
      <GameView />
    </div>
  );
};

export default App;
