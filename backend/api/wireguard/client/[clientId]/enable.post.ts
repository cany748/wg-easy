export default defineEventHandler(async (event) => {
  useAuth(event);
  const clientId = getRouterParam(event, "clientId");
  if (clientId) {
    await WireGuard.enableClient(clientId);
    return { success: true };
  }
});
