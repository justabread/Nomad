"use client";

import { GameMasterContextProvider } from "@/Contexts/GameMasterContextProvider";
import StartPage from "./startPage";

export default function Home() {
  return (
    <GameMasterContextProvider>
      <div>
        <StartPage />
      </div>
    </GameMasterContextProvider>
  );
}
