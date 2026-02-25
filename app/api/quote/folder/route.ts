import { NextRequest, NextResponse } from 'next/server';
import { createFolderPath, getFolderUrl } from '@/lib/cloud-storage';

export async function POST(request: NextRequest) {
  try {
    const { name, projectType } = await request.json();

    if (!name || !projectType) {
      return NextResponse.json(
        { error: 'Name and project type are required' },
        { status: 400 }
      );
    }

    // In GCS, folders are just path prefixes — no API call needed
    const folderPath = createFolderPath(name, projectType);
    const folderUrl = getFolderUrl(folderPath);

    return NextResponse.json({ folderId: folderPath, folderUrl });
  } catch (error) {
    console.error('Failed to create folder path:', error);
    return NextResponse.json(
      { error: 'Failed to create folder' },
      { status: 500 }
    );
  }
}
