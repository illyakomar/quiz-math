import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

import connect from '@/database/connection';
import User from '@/database/models/User';

export const POST = async (request: NextRequest) => {
  const { firstName, lastName, email, password } = await request.json();

  await connect();

  const user = await User.findOne({ email });
  if (user) {
    return new NextResponse('Цей email вже зайнятий', {
      status: 400,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 5);

  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return new NextResponse('User has been created', {
      status: 201,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
};
