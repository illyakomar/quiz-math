import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

import connect from '@/database/config';
import User from '@/database/schemas/user.schema';
import UserService from '@/database/services/user.service';

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

    const newUser = await UserService.createOne({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    console.log(newUser);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
};
