import { getStorage } from "firebase-admin/storage";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let path = searchParams.get("path");
  
  if (!path) return new Response("Missing path", { status: 400 });
  
  // Handle metadata URL format: ?name=avatars%2Fuid%2Ffile.jpg
  if (path.startsWith('?name=') || path.startsWith('name=')) {
    path = path.replace(/^\?name=/, '').replace(/^name=/, '');
  }
  
  try {
    const bucketName = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET?.replace('.firebasestorage.app', '.appspot.com') || 'accounting-software-505d5.appspot.com';
    const bucket = getStorage().bucket(bucketName);
    const file = bucket.file(path);
    const [url] = await file.getSignedUrl({ 
      action: 'read', 
      expires: '03-09-2491'
    });
    
    return Response.redirect(url);
  } catch (error) {
    console.error("Avatar proxy error:", error);
    return new Response("Not found", { status: 404 });
  }
}