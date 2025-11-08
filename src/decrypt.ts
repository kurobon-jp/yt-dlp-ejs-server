import { getFromPrepared, preprocessPlayer } from "../vendor/ejs/src/yt/solver/solvers.ts";

export function decrypt(player: string, params: URLSearchParams): string {
    const n = params.get("n");
    if (n === null || n === "") {
        throw new Error(`Missing n param`);
    }

    const sig = params.get("sig");
    const preprocessedPlayer = preprocessPlayer(player);
    const solvers = getFromPrepared(preprocessedPlayer);
    const result: { [key: string]: string } = {}
    const nSolver = solvers["n"]!;
    const sigSolver = solvers["sig"]!;
    result["n"] = nSolver(n);
    if (sig !== null && sig.length > 0) {
        result["sig"] = sigSolver(sig);
    }

    return JSON.stringify(result);
}