import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

import connect from '@/database/connection';
import User from '@/database/models/user.model';

export const POST = async (request: NextRequest) => {
  try {
    const { firstName, lastName, email, password } = await request.json();

    await connect();

    const user = await User.findOne({ email });
    if (user) {
      return new NextResponse('Цей email вже зайнятий', {
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    return new NextResponse(JSON.stringify(newUser.toObject()), { status: 201 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
};
