const WIKIPEDIA_API = 'https://pt.wikipedia.org/w/api.php';

interface WikipediaPage {
  title: string;
  extract: string;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
  originalimage?: {
    source: string;
    width: number;
    height: number;
  };
  content_urls?: {
    desktop: { page: string };
    mobile: { page: string };
  };
}

interface WikipediaSearchResult {
  pages: WikipediaPage[];
}

export async function searchWikipedia(query: string): Promise<WikipediaPage | null> {
  const params = new URLSearchParams({
    action: 'query',
    format: 'json',
    prop: 'extracts|pageimages|info',
    exintro: '0',
    explaintext: '1',
    exlimit: '1',
    piprop: 'original|thumbnail',
    pithumbsize: '800',
    inprop: 'url',
    titles: query,
    redirects: '1',
  });

  const response = await fetch(`${WIKIPEDIA_API}?${params}`, {
    headers: { 'User-Agent': 'SantoDia/1.0 (https://santododia.com.br)' },
  });

  if (!response.ok) return null;

  const data = await response.json();
  const pages = data.query?.pages;
  if (!pages) return null;

  const pageId = Object.keys(pages)[0];
  if (pageId === '-1') return null;

  const page = pages[pageId];
  return {
    title: page.title,
    extract: page.extract ?? '',
    thumbnail: page.thumbnail
      ? {
          source: page.thumbnail.source,
          width: page.thumbnail.width,
          height: page.thumbnail.height,
        }
      : undefined,
    originalimage: page.original
      ? { source: page.original.source, width: page.original.width, height: page.original.height }
      : undefined,
    content_urls: page.fullurl
      ? {
          desktop: { page: page.fullurl },
          mobile: { page: page.fullurl.replace('pt.wikipedia', 'pt.m.wikipedia') },
        }
      : undefined,
  };
}

export async function getWikipediaSummary(
  title: string,
): Promise<{ extract: string; image?: string } | null> {
  const url = `https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;

  const response = await fetch(url, {
    headers: { 'User-Agent': 'SantoDia/1.0 (https://santododia.com.br)' },
  });

  if (!response.ok) return null;

  const data = await response.json();
  return {
    extract: data.extract ?? '',
    image: data.originalimage?.source ?? data.thumbnail?.source,
  };
}

export function splitIntoParagraphs(text: string): string {
  const sentences = text.split(/(?<=[.!?])\s+/);
  const paragraphs: string[] = [];
  let current: string[] = [];

  for (const sentence of sentences) {
    current.push(sentence);
    if (current.length >= 3) {
      paragraphs.push(current.join(' '));
      current = [];
    }
  }

  if (current.length > 0) {
    paragraphs.push(current.join(' '));
  }

  return paragraphs.join('\n\n');
}
