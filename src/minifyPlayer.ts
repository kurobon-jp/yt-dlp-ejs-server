import { preprocessPlayer } from "../vendor/ejs/src/yt/solver/solvers.ts";
import { getSignatureTimestamp } from "./signatureTimestamp.ts";
import * as esbuild from "https://deno.land/x/esbuild@v0.19.2/mod.js";

export async function getMinifyPlayer(player: string): Promise<string> {
    const preprocessedPlayer = preprocessPlayer(player);
    let minifyPlayer;
    const result = await esbuild.transform(preprocessedPlayer, {
        minifyWhitespace: true,
        minifyIdentifiers: false,
        minifySyntax: false,
    });
    minifyPlayer = result.code;
    esbuild.stop();
    const st = getSignatureTimestamp(minifyPlayer);
    return `var _result = {};${minifyPlayer}${st}`;
}