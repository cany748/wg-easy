export default defineEventHandler(async (event) => {
  useAuth(event);
  const clientId = getRouterParam(event, "clientId");
  const { address } = await readBody(event);

  if (clientId && typeof address === "string") {
    await WireGuard.updateClientAddress(clientId, address);
    return { success: true };
  }
});
