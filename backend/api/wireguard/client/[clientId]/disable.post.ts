export default defineEventHandler(async (event) => {
  useAuth(event);
  const clientId = getRouterParam(event, "clientId");
  if (clientId) {
    await WireGuard.disableClient(clientId);
    return { success: true };
  }
});
