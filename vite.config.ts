import { defineConfig, loadEnv, type Plugin } from "vite";

/**
 * Runs the Vercel-style serverless handler in `api/config.ts` during `vite dev`.
 * Without this, Vite serves the raw TS source for GET /api/config and 404s on
 * POST, so the admin panel can never persist to Postgres locally.
 */
function apiConfigDevPlugin(env: Record<string, string>): Plugin {
  return {
    name: "api-config-dev",
    configureServer(server) {
      // Expose env vars (e.g. DATABASE_URL) to the handler running in Node.
      for (const [key, value] of Object.entries(env)) {
        if (process.env[key] === undefined) process.env[key] = value;
      }

      server.middlewares.use("/api/config", async (req, res) => {
        // Shim the Express/Vercel response helpers the handler expects.
        const r = res as any;
        r.status = (code: number) => {
          res.statusCode = code;
          return r;
        };
        r.json = (body: unknown) => {
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(body));
          return r;
        };

        try {
          const mod = await server.ssrLoadModule("/api/config.ts");
          await mod.default(req, res);
        } catch (error) {
          server.config.logger.error(`[api/config] ${(error as Error).message}`);
          if (!res.writableEnded) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Dev API handler failed." }));
          }
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [apiConfigDevPlugin(env)],
  };
});
