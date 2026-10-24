import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * Runs the files in /api locally during `npm run dev`, exactly like Vercel runs them online.
 * You don't need to touch this.
 */
function localApi() {
  return {
    name: "local-api",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url.startsWith("/api/")) return next();
        const url = new URL(req.url, "http://localhost");
        const file = `/api/${url.pathname.slice(5).replace(/\/$/, "")}.js`;
        let mod;
        try {
          mod = await server.ssrLoadModule(file);
        } catch {
          res.statusCode = 404;
          return res.end(JSON.stringify({ error: "Not found" }));
        }
        let raw = "";
        for await (const chunk of req) raw += chunk;
        req.query = Object.fromEntries(url.searchParams);
        try {
          req.body = raw ? JSON.parse(raw) : undefined;
        } catch {
          req.body = raw;
        }
        res.status = (code) => ((res.statusCode = code), res);
        res.json = (data) => {
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(data));
        };
        try {
          await mod.default(req, res);
        } catch (e) {
          console.error(e);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: e.message }));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ""));
  return { plugins: [react(), tailwindcss(), localApi()] };
});
