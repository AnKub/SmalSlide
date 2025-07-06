import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key';


export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  );
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401, headers: { 'Access-Control-Allow-Origin': '*' } }
      );
    }
    const token = authHeader.replace('Bearer ', '');

    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET) as { userId: string };
    } catch {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401, headers: { 'Access-Control-Allow-Origin': '*' } }
      );
    }

    const formData = await req.formData();
    const file = formData.get('avatar') as File;
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400, headers: { 'Access-Control-Allow-Origin': '*' } }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${payload.userId}_${Date.now()}.jpg`;
    const filePath = path.join(process.cwd(), 'public', 'avatars', fileName);

    await writeFile(filePath, buffer);

    return NextResponse.json(
      { url: `/avatars/${fileName}` },
      { status: 200, headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  }
}