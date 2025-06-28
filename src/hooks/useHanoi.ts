import { useState } from "react";

export type Tower = number[];

function createInitialTowers(numDiscs: number): Tower[] {
  return [Array.from({ length: numDiscs }, (_, i) => numDiscs - i), [], []];
}

export function useHanoi(initialDiscs: number) {
  const [numDiscs, setNumDiscs] = useState(initialDiscs);
  const [towers, setTowers] = useState<Tower[]>(createInitialTowers(initialDiscs));
  const [selected, setSelected] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [history, setHistory] = useState<Tower[][]>([]);

  const reset = (discs = numDiscs) => {
    setNumDiscs(discs);
    setTowers(createInitialTowers(discs));
    setMoves(0);
    setSelected(null);
    setHistory([]);
  };

  const selectTower = (idx: number) => {
    if (selected === null) {
      if (towers[idx].length === 0) return;
      setSelected(idx);
    } else {
      if (selected === idx) {
        setSelected(null);
        return;
      }
      const from = selected;
      const to = idx;
      const fromTower = towers[from];
      const toTower = towers[to];
      if (
        fromTower.length === 0 ||
        (toTower.length > 0 && fromTower[fromTower.length - 1] > toTower[toTower.length - 1])
      ) {
        setSelected(null);
        return;
      }
      // Save history for undo
      setHistory((prev) => [...prev, towers.map((t) => [...t])]);
      // Move disc
      const newTowers = towers.map((tower, i) =>
        i === from
          ? tower.slice(0, -1)
          : i === to
          ? [...tower, fromTower[fromTower.length - 1]]
          : tower
      );
      setTowers(newTowers);
      setMoves((m) => m + 1);
      setSelected(null);
    }
  };

  const undo = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setTowers(prev.map((t) => [...t]));
    setHistory((h) => h.slice(0, -1));
    setMoves((m) => Math.max(0, m - 1));
    setSelected(null);
  };

  const isComplete = towers[2].length === numDiscs;

  return {
    numDiscs,
    setNumDiscs,
    towers,
    selected,
    moves,
    selectTower,
    reset,
    undo,
    isComplete,
    setTowers,
    setMoves,
    setSelected,
  };
}