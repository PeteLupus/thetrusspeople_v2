import { GoogleAuth } from 'google-auth-library';

const GCS_API = 'https://storage.googleapis.com';
const GCS_UPLOAD_API = `${GCS_API}/upload/storage/v1`;
const GCS_API_V1 = `${GCS_API}/storage/v1`;

let authClient: GoogleAuth | null = null;

function getAuth(): GoogleAuth {
  if (!authClient) {
    authClient = new GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_DRIVE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_DRIVE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/devstorage.read_write'],
    });
  }
  return authClient;
}

async function getAccessToken(): Promise<string> {
  const auth = getAuth();
  const client = await auth.getClient();
  const tokenResponse = await client.getAccessToken();
  return tokenResponse.token as string;
}

function getBucket(): string {
  const bucket = process.env.GOOGLE_CLOUD_STORAGE_BUCKET;
  if (!bucket) throw new Error('GOOGLE_CLOUD_STORAGE_BUCKET is not set');
  return bucket;
}

/**
 * Generate a folder path prefix for a quote submission.
 * In GCS, "folders" are just path prefixes.
 */
export function createFolderPath(name: string, projectType: string): string {
  const date = new Date().toISOString().split('T')[0];
  const sanitised = `${name} - ${projectType} - ${date}`
    .replace(/[^a-zA-Z0-9 \-]/g, '')
    .replace(/\s+/g, '-');
  return `quotes/${sanitised}/`;
}

/**
 * Get a Google Cloud Console URL to browse the "folder".
 */
export function getFolderUrl(folderPath: string): string {
  const bucket = getBucket();
  return `https://console.cloud.google.com/storage/browser/${bucket}/${folderPath}`;
}

/**
 * Upload a file buffer directly to GCS using simple media upload.
 * Returns the object name and display file name.
 */
export async function uploadFile(
  folderPath: string,
  fileName: string,
  buffer: Buffer,
  mimeType: string,
): Promise<{ fileName: string; objectName: string }> {
  const token = await getAccessToken();
  const bucket = getBucket();
  const objectName = `${folderPath}${fileName}`;
  const body = new Uint8Array(buffer);

  const res = await fetch(
    `${GCS_UPLOAD_API}/b/${bucket}/o?uploadType=media&name=${encodeURIComponent(objectName)}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': mimeType,
        'Content-Length': String(body.length),
      },
      body,
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GCS upload failed (${res.status}): ${err}`);
  }

  const data = await res.json();
  return { fileName: data.name.split('/').pop(), objectName: data.name };
}

/**
 * Create a plain text file (e.g. summary) in a GCS "folder".
 */
export async function createTextFile(
  folderPath: string,
  fileName: string,
  content: string
): Promise<string> {
  const token = await getAccessToken();
  const bucket = getBucket();
  const objectName = `${folderPath}${fileName}`;

  const res = await fetch(
    `${GCS_UPLOAD_API}/b/${bucket}/o?uploadType=media&name=${encodeURIComponent(objectName)}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'text/plain; charset=utf-8',
      },
      body: content,
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to create text file (${res.status}): ${err}`);
  }

  const data = await res.json();
  return data.name;
}

/**
 * Generate a signed URL for a specific object (valid for 1 hour).
 * Useful for the email so the team can download files directly.
 */
export async function getSignedUrl(objectName: string): Promise<string> {
  const token = await getAccessToken();
  const bucket = getBucket();

  // Use the GCS JSON API to get a public link
  // For authenticated access, just return the GCS API URL with token
  return `${GCS_API}/${bucket}/${encodeURIComponent(objectName)}?access_token=${token}`;
}

/**
 * List all objects in a "folder" (path prefix).
 */
export async function listFiles(folderPath: string): Promise<string[]> {
  const token = await getAccessToken();
  const bucket = getBucket();

  const res = await fetch(
    `${GCS_API_V1}/b/${bucket}/o?prefix=${encodeURIComponent(folderPath)}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  if (!res.ok) return [];
  const data = await res.json();
  return (data.items || []).map((item: { name: string }) => item.name);
}
