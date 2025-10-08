import Fastify from "fastify";
import Clerk from "@clerk/fastify";
import { shouldBeUser } from "../middleware/authMiddleware.js";
const fastify = Fastify();

fastify.register(Clerk.clerkPlugin);

fastify.get("/health", (request, reply) => {
  return reply.status(200).send({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});

fastify.get("/test", { preHandler: shouldBeUser }, async (request, reply) => {
  try {
    return reply.send({
      message: "Order retrieved successfully",
      userId: request.userId,
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
