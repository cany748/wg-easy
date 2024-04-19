import { compareSync, hashSync } from "bcrypt";
import type { H3Event } from "h3";
import { PASSWORD } from "../config";

export function useAuth(event: H3Event) {
  if (!PASSWORD || event.context.session.data.authenticated) return;

  const authorization = getRequestHeader(event, "authorization");

  if (authorization) {
    if (compareSync(authorization, hashSync(PASSWORD, 10))) return;
    throw createError({ statusCode: 401, message: "Incorrect Password" });
  }

  throw createError({ statusCode: 401, message: "Not Logged In" });
}
