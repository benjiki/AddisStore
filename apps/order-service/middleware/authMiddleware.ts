import { FastifyReply, FastifyRequest } from "fastify";
import Clerk from "@clerk/fastify";
import type { CustomJwtSesssionClaims } from "@repo/types";
declare module "Fastify" {
  interface FastifyRequest {
    userId?: string;
  }
}
export const shouldBeUser = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  // Use `getAuth()` to access `isAuthenticated` and the user's ID
  const { isAuthenticated, userId } = Clerk.getAuth(request);

  // If user isn't authenticated, return a 401 error
  if (!isAuthenticated) {
    return reply.code(401).send({ error: "User not authenticated" });
  }
  request.userId = userId;
};

export const shouldBeAdmin = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  // Use `getAuth()` to access `isAuthenticated` and the user's ID
  const { isAuthenticated, userId } = Clerk.getAuth(request);
  const auth = Clerk.getAuth(request);
  // If user isn't authenticated, return a 401 error
  if (!isAuthenticated) {
    return reply.code(401).send({ error: "User not authenticated" });
  }

  const claims = auth.sessionClaims as CustomJwtSesssionClaims;
  if (claims?.metadata?.role !== "admin") {
    return reply.code(403).send({ error: "Unautorized!" });
  }
  request.userId = userId;
};
