export default defineEventHandler(async (event) => {
  useAuth(event);
  return await WireGuard.getClients();
});
