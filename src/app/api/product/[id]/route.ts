import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { title } from "process";

const updateProductSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  description: z.string().min(1).optional(),
});

// get one product
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!product) {
    return NextResponse.json(
      { error: "Product doesn't exist!" },
      { status: 400 }
    );
  }

  return NextResponse.json(product);
}

// delete a product
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!product) {
    return NextResponse.json(
      { error: "Product doesn't exist!" },
      { status: 400 }
    );
  }

  const deleteProduct = await prisma.product.delete({
    where: { id: parseInt(params.id) },
  });

  return NextResponse.json(deleteProduct);
}

// update a product
export async function PATCH(
  req: NextResponse,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const valid = updateProductSchema.safeParse(body);

  if (!valid.success) {
    return NextResponse.json(valid.error.format(), { status: 400 });
  }

  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!product) {
    return NextResponse.json(
      { error: "Product doesn't exist!" },
      { status: 400 }
    );
  }

  const updateData: { title?: string; description?: string } = {};

  if (body.title) updateData.title = body.title;
  if (body.description) updateData.description = body.description;

  const updateProduct = await prisma.product.update({
    where: { id: parseInt(params.id) },
    data: {
      ...updateData,
    },
  });

  return NextResponse.json(updateProduct);
}
