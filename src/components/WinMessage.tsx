import React from "react";

interface WinMessageProps {
  moves: number;
  numDiscs: number;
}

const WinMessage: React.FC<WinMessageProps> = ({ moves, numDiscs }) => {
  const minMoves = Math.pow(2, numDiscs) - 1;
  return (
    <div style={{ marginTop: 24, color: "green", fontWeight: "bold", fontSize: 20 }}>
      🎉 Congratulations! You solved the puzzle in {moves} moves!
      <br />
      {moves === minMoves ? (
        <span>Perfect! That's the minimum possible moves.</span>
      ) : (
        <span>
          You can solve it in as few as <strong>{minMoves}</strong> moves. Try again for a better score!
        </span>
      )}
    </div>
  );
};

export default WinMessage;