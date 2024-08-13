import { randomBytes } from "node:crypto";

const sessionPassword = randomBytes(256).toString("hex");

declare module "h3" {
  interface H3EventContext {
    session: Awaited<ReturnType<typeof useSession>>;
  }
}

export default defineEventHandler(async (event) => {
  event.context.session = await useSession(event, {
    password: sessionPassword,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
});
