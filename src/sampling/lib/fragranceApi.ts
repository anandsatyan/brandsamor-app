export interface PublicFragrance {
  number: number;
  slug: string;
  name: string;
  descriptionShort: string | null;
  primaryFamily: string | null;
  tags: string[];
  notes: {
    top: string[];
    heart: string[];
    base: string[];
    hero: string[];
  };
}

export async function fetchPublicFragrance(slug: string): Promise<PublicFragrance | null> {
  try {
    const res = await fetch(`/api/fragrances/public/${encodeURIComponent(slug)}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.fragrance ?? null;
  } catch {
    return null;
  }
}

export async function fetchPublicFragrances(slugs: string[]): Promise<Map<string, PublicFragrance>> {
  const results = await Promise.all(
    slugs.map(async (slug) => {
      const fragrance = await fetchPublicFragrance(slug);
      return [slug, fragrance] as const;
    }),
  );
  const map = new Map<string, PublicFragrance>();
  for (const [slug, fragrance] of results) {
    if (fragrance) map.set(slug, fragrance);
  }
  return map;
}
