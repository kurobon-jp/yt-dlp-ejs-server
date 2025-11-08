export function getSignatureTimestamp(player: string): string {
    const regex = /signatureTimestamp:(\d+)/g;
    const match = regex.exec(player);
    if (match === null || match.length <= 1) {
        throw Error("signatureTimestamp not found.");
    }
    return match[1];
}