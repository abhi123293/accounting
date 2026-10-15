import { getStorage } from "firebase-admin/storage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log('=== Upload API called ===');
  try {
    const formData = await request.formData();
    console.log('FormData received');
    const file = formData.get("file") as File;
    const userId = formData.get("userId") as string;
    
    console.log('Upload request:', { file: file?.name, type: file?.type, size: file?.size, userId });
    
    if (!file || !userId) {
      console.log('Missing file or userId');
      return NextResponse.json({ error: "Missing file or userId" }, { status: 400 });
    }
    
    if (!file.type.startsWith("image/")) {
      console.log('Not an image');
      return NextResponse.json({ error: "File must be an image" }, { status: 400 });
    }
    
    if (file.size > 2 * 1024 * 1024) {
      console.log('File too large');
      return NextResponse.json({ error: "File size must be less than 2MB" }, { status: 400 });
    }
    
    console.log('Getting storage bucket...');
    // Use default bucket from app initialization (now with storageBucket config)
    const bucket = getStorage().bucket();
    console.log('Bucket:', bucket.name);
    
    const fileName = `avatars/${userId}/${Date.now()}-${file.name}`;
    console.log('File name:', fileName);
    const blob = bucket.file(fileName);
    
    console.log('Converting file to buffer...');
    const arrayBuffer = await file.arrayBuffer();
    console.log('Buffer size:', arrayBuffer.byteLength);
    
    console.log('Saving to storage...');
    await blob.save(Buffer.from(arrayBuffer), {
      contentType: file.type,
      metadata: { cacheControl: 'public, max-age=31536000' }
    });
    console.log('Saved successfully');
    
    console.log('Generating signed URL...');
    const [url] = await blob.getSignedUrl({ 
      action: 'read', 
      expires: '03-09-2491'
    });
    console.log('Signed URL generated');
    
    console.log('Upload success:', { downloadURL: url, path: fileName });
    return NextResponse.json({ downloadURL: url, path: fileName });
  } catch (error) {
    console.error("=== Upload error ===");
    console.error("Error:", error);
    console.error("Error message:", error instanceof Error ? error.message : String(error));
    console.error("Error stack:", error instanceof Error ? error.stack : 'no stack');
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}