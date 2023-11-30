import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export const POST = async (req: NextRequest) => {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password)
      return NextResponse.json({ message: "Invalid Data" }, { status: 422 });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json({ newUser });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Server Error" }, { status: 201 });
  }
};
