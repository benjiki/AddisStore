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

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data: Prisma.ProductUpdateInput = req.body;

  const updatedProduct = await prisma.product.update({
    where: {
      id: Number(id),
    },
    data,
  });

  if (!updatedProduct) {
    return res
      .status(400)
      .json({ message: "error updating product", updatedProduct });
  }
  return res.status(201).json({ message: "product updated", updatedProduct });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedProduct = await prisma.product.delete({
    where: {
      id: Number(id),
    },
  });
  if (!deletedProduct) {
    return res.status(400).json({ message: "error deleting product" });
  }
  return res.status(200).json({ message: "product deleted" });
};

export const getProducts = async (req: Request, res: Response) => {
  const { sort, category, search, limit } = req.query;
  const orderBy = (() => {
    switch (sort) {
      case "asc":
        return { price: Prisma.SortOrder.asc };
        break;
      case "desc":
        return { price: Prisma.SortOrder.desc };
        break;
      case "oldest":
        return { createdAt: Prisma.SortOrder.asc };
        break;

      default:
        return { createdAt: Prisma.SortOrder.desc };
        break;
    }
  })();

  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category as string,
      },
      name: {
        contains: search as string,
        mode: "insensitive",
      },
    },
    orderBy,
    take: limit ? Number(limit) : undefined,
  });
  res.status(200).json({ message: "All products", products });
};
export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await prisma.product.findUnique({
    where: {
      id: Number(id),
    },
  });
  return res.status(200).json({ message: "single Product", product });
};
