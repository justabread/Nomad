"use client";

import { GameMasterContextProvider } from "@/Contexts/GameMasterContextProvider";
import GameWindow from "./GameWindow";

export default function Home() {
  return (
    <GameMasterContextProvider>
      <div>
        <GameWindow />
      </div>
    </GameMasterContextProvider>
  );
}
