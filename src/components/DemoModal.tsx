import React from "react";
import HanoiBoard from "./HanoiBoard";

interface DemoModalProps {
  demoType: "text" | "live" | null;
  demoMoves: string[];
  demoTowers: number[][];
  demoStep: number;
  numDiscs: number;
  onClose: () => void;
  currentMoveLabel?: string;
  speed?: number;
  setSpeed?: (s: number) => void;
  animating?: boolean;
  paused?: boolean;
  pause?: () => void;
  play?: () => void;
  movingDisc?: { disc: number; from: number; to: number } | null;
  maxDiscs?: number;
}

const DemoModal: React.FC<DemoModalProps> = ({
  demoType,
  demoMoves,
  demoTowers,
  demoStep,
  numDiscs,
  onClose,
  currentMoveLabel,
  speed,
  setSpeed,
  animating,
  paused,
  pause,
  play,
  movingDisc,
  maxDiscs,
}) => {
  if (!demoType) return null;

  return (
    <div className="demo-modal" onClick={onClose}>
      <div className="demo-content" onClick={e => e.stopPropagation()}>
        {demoType === "text" && (
          <>
            <h2>Optimal Solution ({demoMoves.length} moves)</h2>
            <ol>
              {demoMoves.map((move, i) => (
                <li key={i}>{move}</li>
              ))}
            </ol>
            <button onClick={onClose}>Close</button>
          </>
        )}
        {demoType === "live" && (
          <>
            <h2>Live Animation Demo</h2>
            <HanoiBoard
              towers={demoTowers}
              selected={null}
              onTowerClick={() => {}}
              movingDisc={movingDisc}
              maxDiscs={maxDiscs}
            />
            <div style={{ margin: "1em 0", fontWeight: "bold", fontSize: "1.1em" }}>
              {currentMoveLabel}
            </div>
            <div style={{ margin: "1em 0" }}>
              Step: {demoStep} / {Math.pow(2, numDiscs) - 1}
            </div>
            <div style={{ margin: "1em 0" }}>
              <label>
                Speed:&nbsp;
                <input
                  type="range"
                  min={200}
                  max={2000}
                  step={100}
                  value={speed}
                  // Enable slider whenever demoType is live and modal is open
                  disabled={false}
                  onChange={e => setSpeed && setSpeed(Number(e.target.value))}
                  style={{ verticalAlign: "middle" }}
                />
                &nbsp;{speed} ms
              </label>
            </div>
            <div style={{ margin: "1em 0" }}>
              {paused ? (
                <button onClick={play}>Play</button>
              ) : (
                <button onClick={pause} disabled={!animating}>Pause</button>
              )}
              <button onClick={onClose} style={{ marginLeft: 12 }}>Close</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DemoModal;