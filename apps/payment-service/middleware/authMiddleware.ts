import { getAuth } from "@hono/clerk-auth";
import { createMiddleware } from "hono/factory";
import type { CustomJwtSesssionClaims } from "@repo/types";
export const shouldBeUser = createMiddleware<{
  Variables: {
    userId: string;
  };
}>(async (c, next) => {
  const auth = getAuth(c);

  if (!auth?.userId) {
    return c.json({
      message: "Payment You are not logged in.",
    });
  }

  c.set("userId", auth?.userId);
  await next();
});

export const shouldBeAdmin = createMiddleware<{
  Variables: {
    userId: string;
  };
}>(async (c, next) => {
  const auth = getAuth(c);

  if (!auth?.userId) {
    return c.json({
      message: "Payment You are not logged in.",
    });
  }
  const claims = auth.sessionClaims as CustomJwtSesssionClaims;
  if (claims?.metadata?.role !== "admin") {
    return c.json({ error: "Unautorized!" });
  }
  c.set("userId", auth?.userId);
  await next();
});
