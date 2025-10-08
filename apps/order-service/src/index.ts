import Fastify from "fastify";
import Clerk from "@clerk/fastify";
const fastify = Fastify();

fastify.register(Clerk.clerkPlugin);

fastify.get("/health", (request, reply) => {
  return reply.status(200).send({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

fastify.get("/test", async (request, reply) => {
  try {
    // Use `getAuth()` to access `isAuthenticated` and the user's ID
    const { isAuthenticated, userId } = Clerk.getAuth(request);

    // If user isn't authenticated, return a 401 error
    if (!isAuthenticated) {
      return reply.code(401).send({ error: "User not authenticated" });
    }

    // Use `clerkClient` to access Clerk's JS Backend SDK methods
    // and get the user's User object
    const user = await Clerk.clerkClient.users.getUser(userId);

    return reply.send({
      message: "Order retrieved successfully",
      user,
    });
  } catch (error) {
    fastify.log.error(error);
    return reply.code(500).send({ error: "Failed to retrieve order" });
  }
});
const start = async () => {
  try {
    await fastify.listen({ port: 8001 });
    console.log("order service is running on port 8001");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
