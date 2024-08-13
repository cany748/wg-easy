export default defineEventHandler(async (event) => {
  useAuth(event);
  const clientId = getRouterParam(event, "clientId");
  const { name } = await readBody(event);
  if (clientId && typeof name === "string") {
    await WireGuard.updateClientName(clientId, name);
    return { success: true };
  }
});
