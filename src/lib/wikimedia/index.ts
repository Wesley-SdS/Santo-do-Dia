const COMMONS_API = 'https://commons.wikimedia.org/w/api.php';

interface WikimediaImage {
  title: string;
  url: string;
  thumbUrl: string;
  width: number;
  height: number;
  descriptionUrl: string;
  artist?: string;
  license?: string;
}

export async function searchCommonsImages(query: string, limit = 5): Promise<WikimediaImage[]> {
  const params = new URLSearchParams({
    action: 'query',
    format: 'json',
    generator: 'search',
    gsrsearch: `${query} saint catholic`,
    gsrnamespace: '6',
    gsrlimit: limit.toString(),
    prop: 'imageinfo',
    iiprop: 'url|size|extmetadata',
    iiurlwidth: '800',
  });

  const response = await fetch(`${COMMONS_API}?${params}`, {
    headers: { 'User-Agent': 'SantoDia/1.0 (https://santododia.com.br)' },
  });

  if (!response.ok) return [];

  const data = await response.json();
  const pages = data.query?.pages;
  if (!pages) return [];

  const images: WikimediaImage[] = [];

  for (const page of Object.values(pages) as Array<Record<string, unknown>>) {
    const imageinfo = (page.imageinfo as Array<Record<string, unknown>>)?.[0];
    if (!imageinfo) continue;

    const extmetadata = imageinfo.extmetadata as Record<string, { value: string }> | undefined;

    images.push({
      title: page.title as string,
      url: imageinfo.url as string,
      thumbUrl: imageinfo.thumburl as string ?? imageinfo.url as string,
      width: imageinfo.width as number,
      height: imageinfo.height as number,
      descriptionUrl: imageinfo.descriptionurl as string,
      artist: extmetadata?.Artist?.value?.replace(/<[^>]*>/g, ''),
      license: extmetadata?.LicenseShortName?.value,
    });
  }

  return images;
}

export async function getSaintImageFromCommons(saintName: string): Promise<string | null> {
  const searchTerms = [
    saintName,
    saintName.replace(/^(São|Santa|Santo|Santos)\s+/i, 'Saint '),
    saintName.replace(/^(São|Santa|Santo|Santos)\s+/i, ''),
  ];

  for (const term of searchTerms) {
    const images = await searchCommonsImages(term, 3);

    const suitable = images.find(
      (img) =>
        img.width >= 400 &&
        img.height >= 400 &&
        !img.title.toLowerCase().includes('icon') &&
        !img.title.toLowerCase().includes('stamp'),
    );

    if (suitable) return suitable.thumbUrl;
  }

  return null;
}
