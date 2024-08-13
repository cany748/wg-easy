export default defineEventHandler((event) => {
  useAuth(event);
  const clientId = getRouterParam(event, "clientId");
  if (clientId) {
    const client = WireGuard.getClient(clientId);
    const config = WireGuard.getClientConfiguration(clientId);
    const configName = client.name
      .replace(/[^\w+.=-]/g, "-")
      .replace(/(-{2,}|-$)/g, "-")
      .replace(/-$/, "")
      .slice(0, 32);
    setHeader(event, "Content-Disposition", `attachment; filename="${configName || clientId}.conf"`);
    setHeader(event, "Content-Type", "text/plain");
    return config;
  }
});
