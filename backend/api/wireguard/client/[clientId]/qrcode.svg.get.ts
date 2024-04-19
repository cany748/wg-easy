export default defineEventHandler(async (event) => {
  useAuth(event);
  const clientId = getRouterParam(event, "clientId");
  if (clientId) {
    const svg = await WireGuard.getClientQRCodeSVG(clientId);
    setHeader(event, "Content-Type", "image/svg+xml");
    return svg;
  }
});
