import React from "react";

interface ControlsProps {
	numDiscs: number;
	setNumDiscs: (n: number) => void;
	reset: (n?: number) => void;
	undo: () => void;
	moves: number;
	onDemo: () => void; // Add this
}

const Controls: React.FC<ControlsProps> = ({
	numDiscs,
	setNumDiscs,
	reset,
	undo,
	moves,
	onDemo, // Add this
}) => (
	<div>
		<label>
			Number of Discs:{" "}
			<select
				value={numDiscs}
				onChange={(e) => {
					const n = parseInt(e.target.value, 10);
					setNumDiscs(n);
					reset(n);
				}}
			>
				{[1, 2, 3, 4, 5, 6, 7].map((n) => (
					<option key={n} value={n}>
						{n}
					</option>
				))}
			</select>
		</label>
		<button onClick={() => reset()} style={{ marginLeft: 16 }}>
			Reset
		</button>
		<button onClick={undo} style={{ marginLeft: 8 }}>
			Undo
		</button>
		<button onClick={onDemo} style={{ marginLeft: 8 }}>
			Demo
		</button>
		<span style={{ marginLeft: 24 }}>
			<strong>Moves:</strong> {moves}
		</span>
	</div>
);

export default Controls;
