import React, { useState, useEffect, useRef } from 'react';
import type { Book } from '../types';
import { useSavedBooks, useHistory } from '../types';
import { Bookmark, Trash2, ChevronLeft, ChevronRight } from './common/Icons';

export const BookCard: React.FC<{ book: Book; onRemove?: (bookId: number) => void }> = React.memo(({ book, onRemove }) => {
    const { isSaved, toggleSaveBook } = useSavedBooks();
    const { addToHistory } = useHistory();
    const saved = isSaved(book.id);

    const handleCardClick = () => {
        addToHistory(book);
    };

    return (
        <div 
            className="group relative aspect-[2/3] w-full rounded-lg overflow-hidden shadow-lg shadow-black/40 transition-transform duration-300 hover:scale-105 cursor-pointer"
            onClick={handleCardClick}
        >
            <img src={book.coverImageURL} alt={book.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
            <div className="absolute bottom-0 left-0 p-3 w-full">
                <h3 className="text-white font-bold truncate">{book.title}</h3>
            </div>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {onRemove ? (
                     <button onClick={(e) => { e.stopPropagation(); onRemove(book.id); }} className="p-2 bg-red-600/80 hover:bg-red-500 rounded-full text-white transition-colors">
                        <Trash2 className="w-5 h-5" />
                    </button>
                ) : (
                    <button onClick={(e) => { e.stopPropagation(); toggleSaveBook(book); }} className={`p-2 rounded-full transition-colors ${saved ? 'bg-[#FFD700] text-black' : 'bg-black/50 hover:bg-black/80 text-[#D4AF37]'}`}>
                        <Bookmark className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div>
    );
});

export const BookCarousel: React.FC<{ title: string; books: Book[] }> = ({ title, books }) => {
    const scrollContainer = useRef<HTMLDivElement>(null);
    
    const scroll = (direction: 'left' | 'right') => {
        if(scrollContainer.current){
            const scrollAmount = scrollContainer.current.clientWidth * 0.8;
            scrollContainer.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };
    
    return (
        <div className="py-8 sm:py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#D4AF37] font-serif">{title}</h2>
                     <div className="flex items-center gap-2">
                        <button onClick={() => scroll('left')} className="p-2 bg-black/30 hover:bg-[#D4AF37]/20 rounded-full text-[#D4AF37] transition-colors">
                            <ChevronLeft className="w-6 h-6"/>
                        </button>
                        <button onClick={() => scroll('right')} className="p-2 bg-black/30 hover:bg-[#D4AF37]/20 rounded-full text-[#D4AF37] transition-colors">
                            <ChevronRight className="w-6 h-6"/>
                        </button>
                    </div>
                </div>
                <div ref={scrollContainer} className="flex space-x-4 sm:space-x-6 overflow-x-auto pb-4 -mb-4 scrollbar-hide">
                    {books.map(book => (
                        <div key={book.id} className="flex-shrink-0 w-40 sm:w-48 md:w-56">
                            <BookCard book={book} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const HomeSlideshow: React.FC<{ books: Book[] }> = ({ books }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const featuredBooks = books.slice(0, 5);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % featuredBooks.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [featuredBooks.length]);

    if (!featuredBooks.length) return null;

    const currentBook = featuredBooks[currentIndex];

    return (
        <div className="relative w-full h-[60vh] md:h-[70vh] bg-black overflow-hidden shadow-2xl shadow-black/50">
            <div className="absolute inset-0 w-full h-full">
                {featuredBooks.map((book, index) => (
                    <img
                        key={book.id}
                        src={book.coverImageURL}
                        alt={book.title}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                            index === currentIndex ? 'opacity-30' : 'opacity-0'
                        }`}
                    />
                ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent" />
            <div className="relative h-full flex flex-col justify-end container mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20 text-white">
                 <div className="max-w-2xl">
                    <h1 className="text-4xl md:text-6xl font-bold text-[#FFD700] font-serif drop-shadow-lg transition-all duration-500" key={currentBook.id}>
                        {currentBook.title}
                    </h1>
                    <p className="mt-4 text-lg text-gray-300 max-w-lg">
                        {currentBook.description}
                    </p>
                 </div>
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {featuredBooks.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                            index === currentIndex ? 'bg-[#FFD700]' : 'bg-gray-500/50 hover:bg-gray-400/50'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};