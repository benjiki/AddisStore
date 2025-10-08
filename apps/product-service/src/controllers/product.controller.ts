import { Request, Response } from "express";
import { prisma, Prisma } from "@repo/product-db";

export const createProduct = async (req: Request, res: Response) => {
  const data: Prisma.ProductCreateInput = req.body;
  const { colors, images } = data;
  if (!colors || !Array.isArray(colors) || colors.length === 0) {
    return res.status(400).json({ message: "Colors Array is Required" });
  }
  if (!Array.isArray(images)) {
    return res.status(400).json({ message: "images must be an array" });
  }

  const imageColors = images.map((img: any) => img.color);
  const missingColors = colors.filter(
    (color: string) => !imageColors.includes(color)
  );

  if (missingColors.length > 0) {
    return res.status(400).json({
      message: "Missing images for colors",
      missingColors,
    });
  }

  const product = await prisma.product.create({ data });
  res.status(201).json({ message: "Product Created Successfully!", product });
};
export const updateProduct = async (req: Request, res: Response) => {};
export const deleteProduct = async (req: Request, res: Response) => {};
export const getProducts = async (req: Request, res: Response) => {};
export const getProduct = async (req: Request, res: Response) => {};
