export default defineEventHandler(async (event) => {
  useAuth(event);
  const { name } = await readBody(event);
  if (typeof name === "string") {
    await WireGuard.createClient(name);
    return { success: true };
  }
});
