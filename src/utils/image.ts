/**
 * Get the full URL for an image path
 * @param imagePath - The relative path or full URL
 * @returns Full URL with backend server prepended if needed
 */
export function getImageUrl(imagePath: string | undefined | null): string | undefined {
  if (!imagePath) return undefined;
  
  // If already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // Get backend base URL (without /api/v1)
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
  // Remove /api/v1 suffix if present
  const baseUrl = apiUrl.replace(/\/api\/v1\/?$/, '');
  
  // Remove leading slash if present to avoid double slashes
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  return `${baseUrl}/${cleanPath}`;
}
