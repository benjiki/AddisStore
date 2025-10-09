export interface CustomJwtSesssionClaims {
  metadata?: {
    role?: "user" | "admin";
  };
}
