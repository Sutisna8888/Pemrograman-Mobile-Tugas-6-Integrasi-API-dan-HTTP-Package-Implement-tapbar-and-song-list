// Tipe data untuk Film
export type Film = {
  id: string;
  title: string;
  original_title: string;
  description: string;
  director: string;
  producer: string;
  release_date: string;
  running_time: string;
  rt_score: string;
  image?: string;
  movie_banner?: string;
};

// Fungsi ambil semua film
export async function getFilms(): Promise<Film[]> {
  const res = await fetch(`https://ghibliapi.vercel.app/films`);
  if (!res.ok) throw new Error('Failed to fetch films');
  return res.json();
}

// Fungsi ambil detail film berdasarkan ID
export async function getFilmById(id: string): Promise<Film> {
  const res = await fetch(`https://ghibliapi.vercel.app/films/${id}`);
  if (!res.ok) throw new Error('Failed to fetch film');
  return res.json();
}


export type Song = {
  id: string;
  name: string;
  artist: string;
  img: string;
  url: string;
  playlist?: string;
  score?: string;
};

// Fungsi ambil semua lagu dari API openwhyd
export async function getSongs(): Promise<Song[]> {
  const res = await fetch(`https://openwhyd.org/hot/electro?format=json`);
  if (!res.ok) throw new Error('Failed to fetch songs');

  const data = await res.json();

  // Map hasil API menjadi struktur Song[]
  const songs: Song[] = data.tracks.map((item: any) => ({
    id: item._id,
    name: item.name,
    artist: item.uNm,
    img: item.img?.startsWith('http') ? item.img : `https:${item.img}`,
    url: item.trackUrl?.startsWith('http') ? item.trackUrl : `https:${item.trackUrl}`,
    playlist: item.pl?.name || 'Unknown',
    score: item.score || "0"
  }));

  return songs;
}

// Fungsi ambil lagu berdasarkan ID
export async function getSongById(id: string): Promise<Song | null> {
  try {
    const songs = await getSongs();
    return songs.find((s) => s.id === id) || null;
  } catch (error) {
    console.error('Failed to fetch song by id:', error);
    return null;
  }
}
