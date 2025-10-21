import { createContext, useContext } from 'react';

export enum BookType {
  NOVEL = 'novel',
  EBOOK = 'ebook',
  COMIC = 'comic',
  MANGA = 'manga',
}

export interface Book {
  id: number;
  title: string;
  author: string;
  coverImageURL: string;
  description: string;
  type: BookType;
  tags: string[];
}

export enum UserRole {
    GUEST = 'guest',
    PRO = 'pro',
    HOST = 'host',
}

export interface User {
    email: string;
    role: UserRole;
}

// Centralized Auth Context
export interface IAuthContext {
    user: User | null;
    login: (email: string, password?: string) => { success: boolean; error?: string };
    logout: () => void;
    register: (email: string, password?: string) => { success: boolean; error?: string };
}

export const AuthContext = createContext<IAuthContext | null>(null);
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Centralized Saved Books Context
export interface ISavedBooksContext {
    savedBooks: Book[];
    isSaved: (bookId: number) => boolean;
    toggleSaveBook: (book: Book) => void;
}
export const SavedBooksContext = createContext<ISavedBooksContext | null>(null);
export const useSavedBooks = () => {
    const context = useContext(SavedBooksContext);
    if (!context) {
        throw new Error('useSavedBooks must be used within a SavedBooksProvider');
    }
    return context;
};

// Centralized History Context
export interface IHistoryContext {
    history: Book[];
    addToHistory: (book: Book) => void;
}
export const HistoryContext = createContext<IHistoryContext | null>(null);
export const useHistory = () => {
    const context = useContext(HistoryContext);
    if (!context) {
        throw new Error('useHistory must be used within a HistoryProvider');
    }
    return context;
};