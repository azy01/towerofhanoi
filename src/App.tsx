import { useState } from "react";
import { useHanoi } from "./hooks/useHanoi";
import { useDemoHanoi } from "./hooks/useDemoHanoi";
import HanoiBoard from "./components/HanoiBoard";
import Controls from "./components/Controls";
import WinMessage from "./components/WinMessage";
import DemoModal from "./components/DemoModal";
import "./App.css";

function App() {
	const {
		numDiscs,
		setNumDiscs,
		towers,
		selected,
		moves,
		selectTower,
		reset,
		undo,
		isComplete,
	} = useHanoi(3);

	const [demoOpen, setDemoOpen] = useState(false);
	const [demoType, setDemoType] = useState<"text" | "live" | null>(null);
	const [speed, setSpeed] = useState(700);

	const {
		demoMoves,
		demoTowers,
		demoStep,
		animating,
		currentMoveLabel,
		resetDemo,
		paused,
		pause,
		play,
		movingDisc,
	} = useDemoHanoi(numDiscs, demoType, demoOpen, speed);

	const handleDemo = () => setDemoOpen(true);

	const handleDemoType = (type: "text" | "live") => {
		setDemoType(type);
	};

	const handleCloseDemo = () => {
		setDemoOpen(false);
		setDemoType(null);
		resetDemo();
	};

	return (
		<div className="hanoi-app" style={{ textAlign: "center" }}>
			<h1>Tower of Hanoi</h1>
			<Controls
				numDiscs={numDiscs}
				setNumDiscs={setNumDiscs}
				reset={reset}
				undo={undo}
				moves={moves}
				onDemo={handleDemo}
			/>
			<HanoiBoard
				towers={towers}
				selected={selected}
				onTowerClick={selectTower}
				maxDiscs={numDiscs}
			/>
			{isComplete && <WinMessage moves={moves} numDiscs={numDiscs} />}
			{demoOpen && demoType === null && (
				<div className="demo-modal" onClick={handleCloseDemo}>
					<div className="demo-content" onClick={(e) => e.stopPropagation()}>
						<h2>Choose Demo Type</h2>
						<button onClick={() => handleDemoType("text")}>Text Demo</button>
						<button
							onClick={() => handleDemoType("live")}
							style={{ marginLeft: 12 }}
						>
							Live Animation Demo
						</button>
						<button onClick={handleCloseDemo} style={{ marginLeft: 12 }}>
							Cancel
						</button>
					</div>
				</div>
			)}
			{demoOpen && demoType !== null && (
				<DemoModal
					demoType={demoType}
					demoMoves={demoMoves}
					demoTowers={demoTowers}
					demoStep={demoStep}
					numDiscs={numDiscs}
					onClose={handleCloseDemo}
					currentMoveLabel={currentMoveLabel}
					speed={speed}
					setSpeed={setSpeed}
					animating={animating}
					paused={paused}
					pause={pause}
					play={play}
					movingDisc={movingDisc}
					maxDiscs={numDiscs}
				/>
			)}
		</div>
	);
}

export default App;
