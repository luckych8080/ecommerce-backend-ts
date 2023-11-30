import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const allProduct = await prisma.product.findMany();
  return NextResponse.json(allProduct);
}
