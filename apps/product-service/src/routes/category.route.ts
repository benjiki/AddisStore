// routes/category.route.ts

import { Router } from "express";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
} from "../controllers/category.controller"; // Import controller functions
import { shouldBeAdmin } from "../../middleware/authMiddleware";

const router: Router = Router();

// Define routes and link them to the controller functions
router.get("/", getCategories); // GET all categories
router.post("/", shouldBeAdmin, createCategory); // POST to create a new category
router.put("/:id", shouldBeAdmin, updateCategory); // PUT to update an existing category
router.delete("/:id", shouldBeAdmin, deleteCategory); // DELETE a category by ID

export default router;
