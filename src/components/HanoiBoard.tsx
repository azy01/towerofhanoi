import React from "react";
import Tower from "./Tower";
import type { Tower as TowerType } from "../hooks/useHanoi";

interface HanoiBoardProps {
	towers: TowerType[];
	selected: number | null;
	onTowerClick: (idx: number) => void;
	movingDisc?: { disc: number; from: number; to: number } | null;
	maxDiscs?: number;
}

const labels = ["A", "B", "C"];

const HanoiBoard: React.FC<HanoiBoardProps> = ({
	towers,
	selected,
	onTowerClick,
	movingDisc,
	maxDiscs,
}) => (
	<div
		style={{
			display: "flex",
			justifyContent: "center",
			gap: 40,
			marginTop: 32,
		}}
	>
		{towers.map((tower, idx) => (
			<Tower
				key={idx}
				tower={tower}
				label={idx === 2 ? `${labels[idx]} (Target)` : labels[idx]}
				selected={selected === idx}
				onClick={() => onTowerClick(idx)}
				isTarget={idx === 2}
				// Highlight disc if it's being moved from or to this tower
				highlightDisc={
					movingDisc && (movingDisc.to === idx || movingDisc.from === idx)
						? movingDisc.disc
						: undefined
				}
				maxDiscs={maxDiscs}
			/>
		))}
	</div>
);

export default HanoiBoard;
