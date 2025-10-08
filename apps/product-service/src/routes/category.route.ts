// routes/category.route.ts

import { Router } from "express";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
} from "../controllers/category.controller"; // Import controller functions

const router: Router = Router();

// Define routes and link them to the controller functions
router.get("/", getCategories); // GET all categories
router.post("/", createCategory); // POST to create a new category
router.put("/:id", updateCategory); // PUT to update an existing category
router.delete("/:id", deleteCategory); // DELETE a category by ID

export default router;
