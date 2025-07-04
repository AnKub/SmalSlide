import {NextRequest, NextResponse} from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET ||  'dev_secret_key';

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      return NextResponse.json({error: 'No tken provaded'}, {status:401});
    }
    const token = authHeader.replace('Bearer ', '');

    let payload;
    try{
        payload = jwt.verify(token, JWT_SECRET) as {userId:string};
    } catch {}
  }
}