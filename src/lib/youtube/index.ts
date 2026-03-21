const YOUTUBE_API = 'https://www.googleapis.com/youtube/v3';

export interface YouTubeVideo {
  videoId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  channelTitle: string;
  publishedAt: string;
  embedUrl: string;
  watchUrl: string;
}

export async function searchYouTubeVideos(query: string, maxResults = 5): Promise<YouTubeVideo[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!apiKey) {
    return searchYouTubeOEmbed(query);
  }

  const params = new URLSearchParams({
    part: 'snippet',
    q: `${query} católico santo`,
    type: 'video',
    maxResults: maxResults.toString(),
    relevanceLanguage: 'pt',
    videoEmbeddable: 'true',
    key: apiKey,
  });

  const response = await fetch(`${YOUTUBE_API}/search?${params}`);
  if (!response.ok) return [];

  const data = await response.json();

  return (data.items ?? []).map((item: Record<string, unknown>) => {
    const snippet = item.snippet as Record<string, unknown>;
    const id = item.id as Record<string, string>;
    const thumbnails = snippet.thumbnails as Record<string, { url: string }>;

    return {
      videoId: id.videoId,
      title: snippet.title as string,
      description: snippet.description as string,
      thumbnailUrl: thumbnails?.high?.url ?? thumbnails?.medium?.url ?? '',
      channelTitle: snippet.channelTitle as string,
      publishedAt: snippet.publishedAt as string,
      embedUrl: `https://www.youtube.com/embed/${id.videoId}`,
      watchUrl: `https://www.youtube.com/watch?v=${id.videoId}`,
    };
  });
}

async function searchYouTubeOEmbed(query: string): Promise<YouTubeVideo[]> {
  // Fallback: use Invidious API (no key needed)
  const encodedQuery = encodeURIComponent(`${query} santo católico`);
  const response = await fetch(
    `https://vid.puffyan.us/api/v1/search?q=${encodedQuery}&type=video&sort_by=relevance&region=BR`,
    { signal: AbortSignal.timeout(5000) },
  ).catch(() => null);

  if (!response?.ok) return [];

  const data = await response.json().catch(() => []);

  return (data as Array<Record<string, unknown>>).slice(0, 5).map((item) => ({
    videoId: item.videoId as string,
    title: item.title as string,
    description: (item.description as string) ?? '',
    thumbnailUrl: `https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg`,
    channelTitle: (item.author as string) ?? '',
    publishedAt: '',
    embedUrl: `https://www.youtube.com/embed/${item.videoId}`,
    watchUrl: `https://www.youtube.com/watch?v=${item.videoId}`,
  }));
}

// Pre-curated videos for famous saints (guaranteed quality content)
export const CURATED_SAINT_VIDEOS: Record<string, YouTubeVideo[]> = {
  'sao-joao-paulo-ii': [
    {
      videoId: 'NeXMHuGy4k0',
      title: 'São João Paulo II - A vida do Papa que mudou o mundo',
      description: 'Documentário completo sobre a vida de Karol Wojtyła',
      thumbnailUrl: 'https://i.ytimg.com/vi/NeXMHuGy4k0/hqdefault.jpg',
      channelTitle: 'Documentários Católicos',
      publishedAt: '',
      embedUrl: 'https://www.youtube.com/embed/NeXMHuGy4k0',
      watchUrl: 'https://www.youtube.com/watch?v=NeXMHuGy4k0',
    },
  ],
  'sao-francisco-de-assis': [
    {
      videoId: 'QvRmz3K08Ec',
      title: 'São Francisco de Assis - O Poverello de Deus',
      description: 'A história do santo mais amado da Igreja',
      thumbnailUrl: 'https://i.ytimg.com/vi/QvRmz3K08Ec/hqdefault.jpg',
      channelTitle: 'Igreja Católica',
      publishedAt: '',
      embedUrl: 'https://www.youtube.com/embed/QvRmz3K08Ec',
      watchUrl: 'https://www.youtube.com/watch?v=QvRmz3K08Ec',
    },
  ],
  'santa-teresinha-do-menino-jesus': [
    {
      videoId: 'KqW0-FRwWr4',
      title: 'Santa Teresinha do Menino Jesus - A Pequena Via',
      description: 'A vida da Doutora da Igreja e sua espiritualidade',
      thumbnailUrl: 'https://i.ytimg.com/vi/KqW0-FRwWr4/hqdefault.jpg',
      channelTitle: 'Santos Católicos',
      publishedAt: '',
      embedUrl: 'https://www.youtube.com/embed/KqW0-FRwWr4',
      watchUrl: 'https://www.youtube.com/watch?v=KqW0-FRwWr4',
    },
  ],
  'sao-pio-de-pietrelcina': [
    {
      videoId: 'i9Y_gR0RWDk',
      title: 'Padre Pio - O santo dos estigmas',
      description: 'A incrível vida de São Pio de Pietrelcina',
      thumbnailUrl: 'https://i.ytimg.com/vi/i9Y_gR0RWDk/hqdefault.jpg',
      channelTitle: 'Documentários Católicos',
      publishedAt: '',
      embedUrl: 'https://www.youtube.com/embed/i9Y_gR0RWDk',
      watchUrl: 'https://www.youtube.com/watch?v=i9Y_gR0RWDk',
    },
  ],
  'santa-teresa-de-calcuta': [
    {
      videoId: 'XsU3BqU3gJE',
      title: 'Madre Teresa de Calcutá - Uma vida de amor',
      description: 'A história da santa da caridade',
      thumbnailUrl: 'https://i.ytimg.com/vi/XsU3BqU3gJE/hqdefault.jpg',
      channelTitle: 'Igreja Católica',
      publishedAt: '',
      embedUrl: 'https://www.youtube.com/embed/XsU3BqU3gJE',
      watchUrl: 'https://www.youtube.com/watch?v=XsU3BqU3gJE',
    },
  ],
};
