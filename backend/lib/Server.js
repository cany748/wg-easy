"use strict";

const crypto = require("node:crypto");
const { createServer } = require("node:http");
const { stat, readFile } = require("node:fs/promises");
const { join } = require("node:path");
const bcrypt = require("bcryptjs");

const debug = require("debug")("Server");

const {
  createApp,
  createError,
  createRouter,
  getRequestURL,
  getRequestHeader,
  defineEventHandler,
  getRouterParam,
  toNodeListener,
  readBody,
  setHeader,
  serveStatic,
  useSession,
} = require("h3");

const WireGuard = require("../services/WireGuard");

const { PORT, WEBUI_HOST, RELEASE, PASSWORD, LANG, UI_TRAFFIC_STATS, UI_CHART_TYPE } = require("../config");

const sessionPassword = crypto.randomBytes(256).toString("hex");

module.exports = class Server {
  constructor() {
    const app = createApp();
    this.app = app;

    const router = createRouter();
    app.use(router);

    router
      .get(
        "/api/release",
        defineEventHandler((event) => {
          setHeader(event, "Content-Type", "application/json");
          return RELEASE;
        }),
      )

      .get(
        "/api/lang",
        defineEventHandler((event) => {
          setHeader(event, "Content-Type", "application/json");
          return `"${LANG}"`;
        }),
      )

      .get(
        "/api/ui-traffic-stats",
        defineEventHandler((event) => {
          setHeader(event, "Content-Type", "application/json");
          return `"${UI_TRAFFIC_STATS}"`;
        }),
      )

      .get(
        "/api/ui-chart-type",
        defineEventHandler((event) => {
          setHeader(event, "Content-Type", "application/json");
          return `"${UI_CHART_TYPE}"`;
        }),
      )

      // Authentication
      .get(
        "/api/session",
        defineEventHandler(async (event) => {
          const requiresPassword = !!process.env.PASSWORD;
          const session = await useSession(event, {
            password: sessionPassword,
            maxAge: 60 * 60 * 24 * 7, // 7 days
          });

          const authenticated = requiresPassword ? !!session.data.authenticated : true;

          return {
            requiresPassword,
            authenticated,
          };
        }),
      )
      .post(
        "/api/session",
        defineEventHandler(async (event) => {
          const { password } = await readBody(event);

          if (typeof password !== "string") {
            throw createError({
              status: 401,
              message: "Missing: Password",
            });
          }

          if (password !== PASSWORD) {
            throw createError({
              status: 401,
              message: "Incorrect Password",
            });
          }

          const session = await useSession(event, {
            password: sessionPassword,
            maxAge: 60 * 60 * 24 * 7, // 7 days
          });

          await session.update({
            authenticated: true,
          });

          debug(`New Session: ${session.id}`);

          return { succcess: true };
        }),
      );

    // WireGuard
    app.use(async (event) => {
      if (!PASSWORD || !getRequestURL(event).pathname.startsWith("/api/")) return;

      const session = await useSession(event, {
        password: sessionPassword,
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      if (session.data.authenticated) return;

      const authorization = getRequestHeader(event, "authorization");

      if (authorization) {
        if (bcrypt.compareSync(authorization, bcrypt.hashSync(PASSWORD, 10))) return;
        throw createError({ statusCode: 401, message: "Incorrect Password" });
      }

      throw createError({ statusCode: 401, message: "Not Logged In" });
    });

    const router2 = createRouter();
    app.use(router2);

    router2
      .delete(
        "/api/session",
        defineEventHandler(async (event) => {
          const session = await useSession(event, {
            password: sessionPassword,
            maxAge: 60 * 60 * 24 * 7, // 7 days
          });

          debug(`Deleted Session: ${session.id}`);
          await session.clear();

          return { success: true };
        }),
      )
      .get(
        "/api/wireguard/client",
        defineEventHandler(() => {
          return WireGuard.getClients();
        }),
      )
      .get(
        "/api/wireguard/client/:clientId/qrcode.svg",
        defineEventHandler(async (event) => {
          const clientId = getRouterParam(event, "clientId");
          const svg = await WireGuard.getClientQRCodeSVG({ clientId });
          setHeader(event, "Content-Type", "image/svg+xml");
          return svg;
        }),
      )
      .get(
        "/api/wireguard/client/:clientId/configuration",
        defineEventHandler(async (event) => {
          const clientId = getRouterParam(event, "clientId");
          const client = await WireGuard.getClient({ clientId });
          const config = await WireGuard.getClientConfiguration({ clientId });
          const configName = client.name
            .replace(/[^\w+.=-]/g, "-")
            .replace(/(-{2,}|-$)/g, "-")
            .replace(/-$/, "")
            .slice(0, 32);
          setHeader(event, "Content-Disposition", `attachment; filename="${configName || clientId}.conf"`);
          setHeader(event, "Content-Type", "text/plain");
          return config;
        }),
      )
      .post(
        "/api/wireguard/client",
        defineEventHandler(async (event) => {
          const { name } = await readBody(event);
          await WireGuard.createClient({ name });
          return { success: true };
        }),
      )
      .delete(
        "/api/wireguard/client/:clientId",
        defineEventHandler(async (event) => {
          const clientId = getRouterParam(event, "clientId");
          await WireGuard.deleteClient({ clientId });
          return { success: true };
        }),
      )
      .post(
        "/api/wireguard/client/:clientId/enable",
        defineEventHandler(async (event) => {
          const clientId = getRouterParam(event, "clientId");
          if (clientId === "__proto__" || clientId === "constructor" || clientId === "prototype") {
            throw createError({ status: 403 });
          }
          await WireGuard.enableClient({ clientId });
          return { success: true };
        }),
      )
      .post(
        "/api/wireguard/client/:clientId/disable",
        defineEventHandler(async (event) => {
          const clientId = getRouterParam(event, "clientId");
          if (clientId === "__proto__" || clientId === "constructor" || clientId === "prototype") {
            throw createError({ status: 403 });
          }
          await WireGuard.disableClient({ clientId });
          return { success: true };
        }),
      )
      .put(
        "/api/wireguard/client/:clientId/name",
        defineEventHandler(async (event) => {
          const clientId = getRouterParam(event, "clientId");
          if (clientId === "__proto__" || clientId === "constructor" || clientId === "prototype") {
            throw createError({ status: 403 });
          }
          const { name } = await readBody(event);
          await WireGuard.updateClientName({ clientId, name });
          return { success: true };
        }),
      )
      .put(
        "/api/wireguard/client/:clientId/address",
        defineEventHandler(async (event) => {
          const clientId = getRouterParam(event, "clientId");
          if (clientId === "__proto__" || clientId === "constructor" || clientId === "prototype") {
            throw createError({ status: 403 });
          }
          const { address } = await readBody(event);
          await WireGuard.updateClientAddress({ clientId, address });
          return { success: true };
        }),
      );

    // Static assets
    const publicDir = join(__dirname, "../../frontend");
    app.use(
      defineEventHandler((event) => {
        return serveStatic(event, {
          getContents: (id) => readFile(join(publicDir, id)),
          getMeta: async (id) => {
            const stats = await stat(join(publicDir, id)).catch(() => {});

            if (!stats || !stats.isFile()) {
              return;
            }

            if (id.endsWith(".html")) setHeader(event, "Content-Type", "text/html");
            if (id.endsWith(".js")) setHeader(event, "Content-Type", "application/javascript");
            if (id.endsWith(".json")) setHeader(event, "Content-Type", "application/json");
            if (id.endsWith(".css")) setHeader(event, "Content-Type", "text/css");
            if (id.endsWith(".png")) setHeader(event, "Content-Type", "image/png");

            return {
              size: stats.size,
              mtime: stats.mtimeMs,
            };
          },
        });
      }),
    );

    createServer(toNodeListener(app)).listen(PORT, WEBUI_HOST);
    debug(`Listening on http://${WEBUI_HOST}:${PORT}`);
  }
};
