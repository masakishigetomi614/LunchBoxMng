// app/api/hello/route.ts
import { NextResponse } from 'next/server';

export function GET() {
    return NextResponse.json({ message: 'Hello from App Router API!' });
}