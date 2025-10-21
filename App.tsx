import React, { useState, useMemo, useCallback } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import type { Book, User } from './types';
import { BookType, AuthContext, useAuth, SavedBooksContext, UserRole, HistoryContext } from './types';
import { MOCK_BOOKS, MOCK_USERS } from './constants';
import { MainLayout } from './components/Layout';
import { HomePage, CategoryPage, SavedListPage, CommunityPage, CreatePage, ProfilePage } from './pages/MainPages';
import { LoginPage, RegistrationPage, StaticPage, NotFoundPage } from './pages/AuthAndStatic';

// --- PROVIDERS ---
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [users, setUsers] = useState<Record<string, User>>(MOCK_USERS);

    const login = (email: string, password?: string) => {
        const existingUser = users[email];
        if (!existingUser) {
            return { success: false, error: 'Account not found. Please register.' };
        }
        
        // Mock password check for host
        if (existingUser.role === UserRole.HOST && password !== 'sumukhchandra') {
            return { success: false, error: 'Invalid password for host account.' };
        }

        setUser(existingUser);
        return { success: true };
    };
    
    const register = (email: string) => {
        if (users[email]) {
            return { success: false, error: 'An account with this email already exists.' };
        }
        
        // New users are registered as PRO users
        const newUser: User = { email, role: UserRole.PRO }; 
        setUsers(prev => ({ ...prev, [email]: newUser }));
        setUser(newUser); // Auto-login after registration
        return { success: true };
    };

    const logout = () => setUser(null);
    
    const value = useMemo(() => ({ user, login, logout, register }), [user, users]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const SavedBooksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [savedBooks, setSavedBooks] = useState<Book[]>([]);

    const toggleSaveBook = useCallback((book: Book) => {
        setSavedBooks(prev =>
            prev.find(b => b.id === book.id)
                ? prev.filter(b => b.id !== book.id)
                : [...prev, book]
        );
    }, []);

    const isSaved = useCallback((bookId: number) => {
        return savedBooks.some(b => b.id === bookId);
    }, [savedBooks]);
    
    const value = useMemo(() => ({ savedBooks, isSaved, toggleSaveBook }), [savedBooks, isSaved, toggleSaveBook]);

    return (
        <SavedBooksContext.Provider value={value}>
            {children}
        </SavedBooksContext.Provider>
    );
};

const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [history, setHistory] = useState<Book[]>([]);

    const addToHistory = useCallback((book: Book) => {
        setHistory(prev => {
            const filtered = prev.filter(b => b.id !== book.id);
            return [book, ...filtered];
        });
    }, []);

    const value = useMemo(() => ({ history, addToHistory }), [history, addToHistory]);

    return (
        <HistoryContext.Provider value={value}>
            {children}
        </HistoryContext.Provider>
    );
};

// --- ROUTE GUARDS ---
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
};

const ProRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    if (!user || !['pro', 'host'].includes(user.role)) {
        return <Navigate to="/" replace />;
    }
    return <>{children}</>;
};


// --- APP ---
function App() {
  const books = MOCK_BOOKS;

  return (
    <AuthProvider>
      <SavedBooksProvider>
        <HistoryProvider>
            <HashRouter>
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/contact" element={<StaticPage type="contact" />} />
                <Route path="/terms" element={<StaticPage type="terms" />} />
                
                <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
                  <Route path="/" element={<HomePage books={books} />} />
                  <Route path="/novels" element={<CategoryPage books={books} type={BookType.NOVEL} title="Novels" />} />
                  <Route path="/ebooks" element={<CategoryPage books={books} type={BookType.EBOOK} title="E-Books" />} />
                  <Route path="/comics" element={<CategoryPage books={books} type={BookType.COMIC} title="Comics" />} />
                  <Route path="/manga" element={<CategoryPage books={books} type={BookType.MANGA} title="Manga" />} />
                  <Route path="/saved" element={<SavedListPage />} />
                  <Route path="/community" element={<CommunityPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/create" element={<ProRoute><CreatePage /></ProRoute>} />
                </Route>

                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </HashRouter>
        </HistoryProvider>
      </SavedBooksProvider>
    </AuthProvider>
  );
}

export default App;