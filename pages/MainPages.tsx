
import React, { useState } from 'react';
import type { Book } from '../types';
import { BookType, useAuth, useHistory } from '../types';
import { HomeSlideshow, BookCarousel, BookCard } from '../components/BookDisplay';
import { useSavedBooks } from '../types';
import { CREATION_TOOLS } from '../constants';
import { DynamicIcon } from '../components/common/Icons';


export const HomePage: React.FC<{ books: Book[] }> = ({ books }) => {
    return (
        <div>
            <HomeSlideshow books={books} />
            <BookCarousel title="Trending Comics" books={books.filter(b => b.type === BookType.COMIC)} />
            <BookCarousel title="Latest Manga" books={books.filter(b => b.type === BookType.MANGA)} />
            <BookCarousel title="Popular Novels" books={books.filter(b => b.type === BookType.NOVEL)} />
        </div>
    );
};

export const CategoryPage: React.FC<{ books: Book[], type: BookType, title: string }> = ({ books, type, title }) => {
    const categoryBooks = books.filter(b => b.type === type);
    const mostLiked = categoryBooks.slice(0, 10);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-[#D4AF37] font-serif mb-8">{title}</h1>
            <div className="mb-12">
                 <BookCarousel title="Most Liked" books={mostLiked} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">All {title}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                {categoryBooks.map(book => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
        </div>
    );
};

export const SavedListPage: React.FC = () => {
    const { savedBooks, toggleSaveBook } = useSavedBooks();

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-[#D4AF37] font-serif mb-8">My Saved List</h1>
            {savedBooks.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                    {savedBooks.map(book => (
                        <BookCard key={book.id} book={book} onRemove={() => toggleSaveBook(book)} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-xl text-gray-400">Your saved list is empty.</p>
                    <p className="text-gray-500 mt-2">Click the bookmark icon on any book to save it here.</p>
                </div>
            )}
        </div>
    );
};

export const CommunityPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-[#D4AF37] font-serif mb-8">Community Hub</h1>
            <div className="bg-black/30 p-8 rounded-lg border border-[#D4AF37]/20">
                <p className="text-2xl text-center text-gray-300">
                    Real-time chat and community features are coming soon!
                </p>
                <p className="text-lg text-center text-gray-500 mt-4">
                    This is where you'll be able to join discussion channels, chat with other readers, and share your thoughts.
                </p>
            </div>
        </div>
    );
};

export const CreatePage: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState(CREATION_TOOLS[0].category);
    const activeTools = CREATION_TOOLS.find(c => c.category === activeCategory);

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-[#D4AF37] font-serif mb-8">Creation Tools</h1>
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar Navigation */}
                <aside className="w-full md:w-1/4 lg:w-1/5">
                    <nav className="flex flex-col space-y-2">
                        {CREATION_TOOLS.map((tool) => (
                            <button
                                key={tool.category}
                                onClick={() => setActiveCategory(tool.category)}
                                className={`w-full text-left p-3 rounded-lg transition-colors duration-200 flex items-center gap-4 ${
                                    activeCategory === tool.category
                                        ? 'bg-[#D4AF37] text-black font-bold'
                                        : 'text-gray-300 hover:bg-[#D4AF37]/10 hover:text-white'
                                }`}
                            >
                                <DynamicIcon name={tool.icon} className="w-5 h-5" />
                                <span>{tool.category}</span>
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="w-full md:w-3/4 lg:w-4/5">
                    {activeTools && (
                        <div className="bg-black/30 p-8 rounded-lg border border-[#D4AF37]/20">
                            <h2 className="text-3xl font-bold text-[#D4AF37] mb-6 flex items-center gap-4">
                               <DynamicIcon name={activeTools.icon} className="w-8 h-8" />
                               <span>{activeTools.category}</span>
                            </h2>
                            <ul className="list-disc list-inside space-y-3 text-lg text-gray-300">
                                {activeTools.tools.map((toolName) => (
                                    <li key={toolName}>{toolName}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export const ProfilePage: React.FC = () => {
    const { user } = useAuth();
    const { savedBooks, toggleSaveBook } = useSavedBooks();
    const { history } = useHistory();

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-[#D4AF37] font-serif mb-8">My Profile</h1>
            
            <div className="bg-black/30 p-6 rounded-lg border border-[#D4AF37]/20 mb-12">
                 <h2 className="text-2xl font-bold text-white mb-4">Account Details</h2>
                 <div className="space-y-2 text-lg">
                     <p className="text-gray-400">Email: <span className="text-white font-medium">{user?.email}</span></p>
                     <p className="text-gray-400">Role: <span className="text-white font-medium capitalize">{user?.role}</span></p>
                 </div>
            </div>

            <h2 className="text-3xl font-bold text-white mb-6">My Saved Books</h2>
            {savedBooks.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                    {savedBooks.map(book => (
                        <BookCard key={book.id} book={book} onRemove={() => toggleSaveBook(book)} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-black/20 rounded-lg">
                    <p className="text-xl text-gray-400">You haven't saved any books yet.</p>
                    <p className="text-gray-500 mt-2">Click the bookmark icon on any book to add it to your collection.</p>
                </div>
            )}

            <div className="mt-12">
                <h2 className="text-3xl font-bold text-white mb-6">Reading History</h2>
                {history.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                        {history.map(book => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-black/20 rounded-lg">
                        <p className="text-xl text-gray-400">Your reading history is empty.</p>
                        <p className="text-gray-500 mt-2">Click on any book cover to add it to your history.</p>
                    </div>
                )}
            </div>
        </div>
    );
};