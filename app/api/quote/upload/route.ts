import { NextRequest, NextResponse } from 'next/server';
import { uploadFile } from '@/lib/cloud-storage';

// Allow up to 60 seconds for large file uploads (Vercel Pro)
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const folderPath = request.nextUrl.searchParams.get('folderPath');
    const fileName = request.nextUrl.searchParams.get('fileName');
    const mimeType = request.nextUrl.searchParams.get('mimeType') || 'application/octet-stream';

    if (!folderPath || !fileName) {
      return NextResponse.json(
        { error: 'Missing folderPath or fileName' },
        { status: 400 }
      );
    }

    if (!request.body) {
      return NextResponse.json(
        { error: 'No file data provided' },
        { status: 400 }
      );
    }

    // Buffer the request body
    const chunks: Uint8Array[] = [];
    const reader = request.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) chunks.push(value);
    }
    const buffer = Buffer.concat(chunks);

    // Upload directly to GCS
    const result = await uploadFile(folderPath, fileName, buffer, mimeType);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Failed to upload file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
