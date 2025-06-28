import { useState, useEffect, useCallback, useRef } from "react";

function hanoiDemo(
	n: number,
	from: number,
	to: number,
	aux: number,
	moves: [number, number][] = []
) {
	if (n === 0) return moves;
	hanoiDemo(n - 1, from, aux, to, moves);
	moves.push([from, to]);
	hanoiDemo(n - 1, aux, to, from, moves);
	return moves;
}

function hanoiDemoText(
	n: number,
	from: string,
	to: string,
	aux: string,
	moves: string[] = []
) {
	if (n === 0) return moves;
	hanoiDemoText(n - 1, from, aux, to, moves);
	moves.push(`Move disc from ${from} to ${to}`);
	hanoiDemoText(n - 1, aux, to, from, moves);
	return moves;
}

const towerLabels = ["A", "B", "C"];

export function useDemoHanoi(
	numDiscs: number,
	demoType: "text" | "live" | null,
	demoOpen: boolean,
	speed: number
) {
	const [demoMoves, setDemoMoves] = useState<string[]>([]);
	const [demoTowers, setDemoTowers] = useState<number[][]>([]);
	const [demoStep, setDemoStep] = useState(0);
	const [animating, setAnimating] = useState(false);
	const [currentMoveLabel, setCurrentMoveLabel] = useState<string>("");
	const [paused, setPaused] = useState(false);
	const [movingDisc, setMovingDisc] = useState<{
		disc: number;
		from: number;
		to: number;
	} | null>(null);
	const speedRef = useRef(speed);
	speedRef.current = speed;

	const pauseRef = useRef(paused);
	pauseRef.current = paused;

	// Text demo
	useEffect(() => {
		if (demoOpen && demoType === "text") {
			const moves = hanoiDemoText(numDiscs, "A", "C", "B", []);
			setDemoMoves(moves);
		}
	}, [demoOpen, demoType, numDiscs]);

	// Live demo effect (interval-based)
	useEffect(() => {
		if (!(demoOpen && demoType === "live")) return;

		const movesArr = hanoiDemo(numDiscs, 0, 2, 1, []);
		let towersCopy = [
			Array.from({ length: numDiscs }, (_, i) => numDiscs - i),
			[],
			[],
		];
		setDemoTowers(towersCopy.map((t) => [...t]));
		setDemoStep(0);
		setAnimating(true);

		let cancelled = false;

		function doMove(idx: number) {
			if (cancelled || idx >= movesArr.length) {
				setAnimating(false);
				setCurrentMoveLabel("Demo complete!");
				setMovingDisc(null);
				return;
			}
			const [from, to] = movesArr[idx];
			const disc = towersCopy[from][towersCopy[from].length - 1];
			setMovingDisc({ disc, from, to });
			setCurrentMoveLabel(
				`Move disc from ${towerLabels[from]} to ${towerLabels[to]}`
			);

			// Wait for pause
			function waitForUnpause() {
				if (pauseRef.current && !cancelled) {
					setTimeout(waitForUnpause, 100);
				} else if (!cancelled) {
					setTimeout(() => {
						if (cancelled) return;
						towersCopy[from].pop();
						towersCopy[to].push(disc);
						setDemoTowers(towersCopy.map((t) => [...t]));
						setDemoStep(idx + 1);
						setMovingDisc(null);
						doMove(idx + 1);
					}, speedRef.current);
				}
			}
			setTimeout(waitForUnpause, speedRef.current);
		}

		doMove(0);

		return () => {
			cancelled = true;
		};
		// DO NOT include speed in the dependency array!
	}, [demoOpen, demoType, numDiscs]);

	const resetDemo = useCallback(() => {
		setDemoMoves([]);
		setDemoTowers([]);
		setDemoStep(0);
		setAnimating(false);
		setCurrentMoveLabel("");
		setPaused(false);
		setMovingDisc(null);
	}, []);

	const pause = useCallback(() => setPaused(true), []);
	const play = useCallback(() => setPaused(false), []);

	return {
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
	};
}
