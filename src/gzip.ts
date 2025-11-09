export function gzipResponse(req: Request, content: string, contentType: string): Response {
    const headers = new Headers({ "content-type": contentType });
    if (req.headers.get("accept-encoding")?.includes("gzip")) {
        const cs = new CompressionStream("gzip");
        const writer = cs.writable.getWriter();
        writer.write(new TextEncoder().encode(content));
        writer.close();
        headers.set("content-encoding", "gzip");
        return new Response(cs.readable, { headers });
    }

    return new Response(content, { headers });
}