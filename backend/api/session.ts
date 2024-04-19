import makeDebug from "debug";
import { PASSWORD } from "../config";

const debug = makeDebug("Server");

export default defineEventHandler(async (event) => {
  const session = event.context.session;

  if (event.method === "GET") {
    const requiresPassword = !!process.env.PASSWORD;
    const authenticated = requiresPassword ? !!session.data.authenticated : true;

    return {
      requiresPassword,
      authenticated,
    };
  }

  if (event.method === "POST") {
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

    await session.update({
      authenticated: true,
    });

    debug(`New Session: ${session.id}`);

    return { succcess: true };
  }

  if (event.method === "DELETE") {
    debug(`Deleted Session: ${session.id}`);
    await session.clear();

    return { success: true };
  }
});
