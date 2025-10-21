
import type { Book, User } from './types';
import { BookType, UserRole } from './types';
import { BookOpen } from './components/common/Icons';

export const Logo: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center gap-3 text-[#D4AF37] ${className}`}>
    <BookOpen className="h-8 w-8 sm:h-10 sm:w-10" />
    <span className="text-xl sm:text-2xl font-serif font-bold tracking-wider">
      The Golden Library
    </span>
  </div>
);

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Novels', path: '/novels' },
  { name: 'E-Books', path: '/ebooks' },
  { name: 'Comics', path: '/comics' },
  { name: 'Manga', path: '/manga' },
  { name: 'Saved List', path: '/saved' },
  { name: 'Community', path: '/community' },
];

export const MOCK_USERS: Record<string, User> = {
    "sumukh3322@gmail.com": { email: "sumukh3322@gmail.com", role: UserRole.HOST },
    "pro@example.com": { email: "pro@example.com", role: UserRole.PRO },
    "guest@example.com": { email: "guest@example.com", role: UserRole.GUEST },
}

export const MOCK_BOOKS: Book[] = Array.from({ length: 50 }, (_, i) => {
  const types = [BookType.NOVEL, BookType.EBOOK, BookType.COMIC, BookType.MANGA];
  const type = types[i % types.length];
  let category;
  switch(type) {
      case BookType.NOVEL: category = 'abstract'; break;
      case BookType.EBOOK: category = 'technics'; break;
      case BookType.COMIC: category = 'people'; break;
      case BookType.MANGA: category = 'animals'; break;
      default: category = 'nature';
  }

  return {
    id: i + 1,
    title: `${type.charAt(0).toUpperCase() + type.slice(1)} Title ${i + 1}`,
    author: `Author ${i + 1}`,
    coverImageURL: `https://picsum.photos/400/600?random=${i + 1}&category=${category}`,
    description: `This is a mock description for book ${i + 1}. It is a captivating story that will keep you on the edge of your seat.`,
    type: type,
    tags: ['Fantasy', 'Sci-Fi', 'Adventure'],
  };
});


export const CREATION_TOOLS = [
    {
      category: "Writing & Story Development",
      icon: 'Edit3',
      tools: ["Scrivener", "Notion / Obsidian", "Google Docs / MS Word", "Campfire / Plottr", "Milanote"],
    },
    {
      category: "Art & Illustration",
      icon: 'Palette',
      tools: ["Clip Studio Paint EX", "Adobe Photoshop / Illustrator", "Krita (free)", "Procreate (iPad)", "Medibang Paint (free)", "PaintTool SAI / FireAlpaca"],
    },
    {
      category: "Lettering & Layout",
      icon: 'Type',
      tools: ["Clip Studio Paint EX", "Affinity Publisher / Adobe InDesign", "Canva / Figma", "Comic Life"],
    },
    {
      category: "3D & Reference",
      icon: 'Box',
      tools: ["DesignDoll / MagicPoser", "Blender", "Daz3D", "Clip Studio 3D Models"],
    },
    {
      category: "Publishing & Distribution",
      icon: 'Globe',
      tools: ["Kindle Direct Publishing (KDP)", "Webtoon / Tapas", "Itch.io", "Lulu / IngramSpark", "Reedsy / Draft2Digital"],
    },
    {
      category: "Visual Novel & Interactive Story",
      icon: 'PlayCircle',
      tools: ["Ren’Py", "TyranoBuilder / Naninovel", "Twine", "Ink by Inkle"],
    },
];