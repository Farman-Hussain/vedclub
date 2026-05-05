import { MetadataRoute } from 'next';
import { client } from "@/sanity/client";

// This tells Next.js to refresh the sitemap automatically every 1 hour
export const revalidate = 3600; 

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://vedclub.com";

  // 1. Fetch all dynamic content from Sanity
  // We grab diseases, herbs, diets, medicines, and treatments at the same time
  const query = `*[_type in["disease", "herb", "diet", "medicine", "treatment"] && defined(slug.current)] {
    _type,
    "slug": slug.current,
    _updatedAt,
    language
  }`;
  
  const data = await client.fetch(query);

  // 2. Map through Sanity data to create dynamic URLs
  const dynamicRoutes = data.map((doc: any) => {
    // Automatically make the plural prefix (e.g., "disease" -> "diseases")
    const prefix = `${doc._type}s`; 
    
    // Clean up the slug just in case "-hi" was typed in the CMS
    const cleanSlug = doc.slug.replace(/-hi$/, ''); 
    
    // If the language is Hindi, route to /hi/..., otherwise use default English route
    const path = doc.language === 'hi' 
      ? `/hi/${prefix}/${cleanSlug}` 
      : `/${prefix}/${cleanSlug}`;

    return {
      url: `${baseUrl}${path}`,
      lastModified: new Date(doc._updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    };
  });

  // 3. Define all your Static Pages (Including English & Hindi)
  const staticPaths =[
    "",
    "/hi",
    "/consultation",
    "/hi/consultation",
    "/diseases",
    "/hi/diseases",
    "/herbs",
    "/hi/herbs",
    "/diets",
    "/hi/diets",
    "/medicines",
    "/hi/medicines",
    "/treatments",
    "/hi/treatments",
    "/health-tips",
    "/hi/health-tips",
    "/news",
    "/hi/news"
  ];

  const staticRoutes = staticPaths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    // Give homepage the highest SEO priority (1.0), and main categories (0.9)
    priority: path === "" || path === "/hi" ? 1.0 : 0.9, 
  }));

  // 4. Combine Static Pages and Dynamic CMS Pages into one big sitemap
  return [...staticRoutes, ...dynamicRoutes];
}