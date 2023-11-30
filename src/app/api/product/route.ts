import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";

const createProductSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const valid = createProductSchema.safeParse(body);

  if (!valid.success) {
    return NextResponse.json(valid.error.errors, { status: 400 });
  }

  const newProduct = await prisma.product.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(newProduct, { status: 201 });
}

export async function GET(req: NextRequest) {
  const allProduct = await prisma.product.findMany();
  return NextResponse.json(allProduct);
}
