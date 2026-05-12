import { getSupabase } from "./supabase";

const BUCKET = "car-images";

export async function uploadCarImage(file: File, carId: string): Promise<string> {
  const ext = file.name.split(".").pop() || "jpg";
  const fileName = `${carId}/${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${ext}`;

  const { error } = await getSupabase().storage
    .from(BUCKET)
    .upload(fileName, file, { upsert: false });

  if (error) {
    console.error("Error uploading image:", error);
    throw error;
  }

  const { data: urlData } = getSupabase().storage
    .from(BUCKET)
    .getPublicUrl(fileName);

  return urlData.publicUrl;
}

export async function deleteCarImage(imageUrl: string): Promise<void> {
  const bucketPath = `${BUCKET}/`;
  const idx = imageUrl.indexOf(bucketPath);
  if (idx === -1) return;

  const filePath = imageUrl.slice(idx + bucketPath.length);
  const { error } = await getSupabase().storage
    .from(BUCKET)
    .remove([filePath]);

  if (error) {
    console.error("Error deleting image:", error);
  }
}
