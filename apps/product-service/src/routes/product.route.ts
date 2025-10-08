import { Router } from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProduct,
} from "../controllers/product.controller"; // Import controller functions

const router: Router = Router();

// Define routes and link them to the controller functions
router.get("/", getProducts); // GET all products
router.get("/:id", getProduct); // GET a single product by ID
router.post("/", createProduct); // POST to create a new product
router.put("/:id", updateProduct); // PUT to update an existing product
router.delete("/:id", deleteProduct); // DELETE a product by ID

export default router;
