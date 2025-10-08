import { Request, Response, Router } from "express";

const router: Router = Router();

router.get("/test", (req: Request, res: Response) => {
  res.json({ message: "works fine" });
});
export default router;
