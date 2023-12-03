import { NextRequest, NextResponse } from 'next/server';

export type Middleware = (req?: NextRequest, res?: NextResponse) => Promise<unknown> | unknown;
