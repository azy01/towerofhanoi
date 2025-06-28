import React from "react";
import type { Tower as TowerType } from "../hooks/useHanoi";

interface TowerProps {
	tower: TowerType;
	label: string;
	selected: boolean;
	onClick: () => void;
	isTarget?: boolean;
	highlightDisc?: number;
	maxDiscs?: number;
}

const Tower: React.FC<TowerProps> = ({
	tower,
	label,
	selected,
	onClick,
	isTarget = false,
	highlightDisc,
	maxDiscs = 7,
}) => {
	const discHeight = 24;
	const discMargin = 4;
	const rodWidth = 12;
	const rodHeight =
		discHeight * maxDiscs + discMargin * (maxDiscs - 1) + 24 + 64; // +24px extra, +64px as requested
	const maxDiscWidth = 30 + maxDiscs * 20;

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				boxShadow: isTarget ? "0 0 12px 2px gold" : undefined,
			}}
		>
			<div style={{ marginBottom: 8, fontWeight: "bold" }}>{label}</div>
			<div
				onClick={onClick}
				style={{
					position: "relative",
					cursor: "pointer",
					padding: 10,
					border: selected ? "2px solid #007bff" : "2px solid #ccc",
					minWidth: maxDiscWidth + 20,
					width: maxDiscWidth + 20,
					minHeight: rodHeight + 16,
					background: "#f9f9f9",
					borderRadius: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "flex-end",
					overflow: "visible",
				}}
			>
				{/* Rod */}
				<div
					style={{
						position: "absolute",
						left: "50%",
						transform: "translateX(-50%)",
						bottom: 8,
						width: rodWidth,
						height: rodHeight,
						background: "#888",
						borderRadius: 6,
						zIndex: 0,
					}}
				/>
				{/* Discs */}
				<div
					style={{
						position: "relative",
						zIndex: 1,
						width: maxDiscWidth,
						height: rodHeight,
						display: "flex",
						flexDirection: "column",
						justifyContent: "flex-end",
					}}
				>
					{[...tower].reverse().map((disc, i) => (
						<div
							key={i}
							style={{
								width: 30 + disc * 20,
								height: discHeight,
								background: highlightDisc === disc ? "#ff9800" : "#007bff",
								marginBottom: i !== tower.length - 1 ? discMargin : 0,
								borderRadius: 4,
								color: "white",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								fontWeight: "bold",
								fontSize: 16,
								boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
								border:
									highlightDisc === disc ? "2px solid #ff9800" : undefined,
								transition: "background 0.2s, border 0.2s",
								marginLeft: "auto",
								marginRight: "auto",
							}}
						>
							{disc}
						</div>
					))}
				</div>
				<div style={{ height: 8 }} />
			</div>
		</div>
	);
};

export default Tower;
