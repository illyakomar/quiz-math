import { NextRequest, NextResponse } from 'next/server';

export type NextHandler = (req: NextRequest, res?: NextResponse) => Promise<any> | any;

export type NextParamsHandler = (
  req: NextRequest,
  { params }: { params: { id: string } },
) => Promise<any> | any;
