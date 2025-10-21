import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { NAV_LINKS, Logo } from '../constants';
import { useAuth } from '../types';
import { Settings, X, LogOut, Phone, FileText, Menu, User } from './common/Icons';
import { UserRole } from '../types';

export const Header: React.FC<{ onSettingsClick: () => void; onMobileMenuClick: () => void; }> = React.memo(({ onSettingsClick, onMobileMenuClick }) => {
    const { user } = useAuth();
    const showCreateLink = user && (user.role === UserRole.PRO || user.role === UserRole.HOST);

    return (
        <header className="fixed top-0 left-0 right-0 bg-[#111111] bg-opacity-90 backdrop-blur-sm z-50 shadow-md shadow-black/20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center">
                         <button onClick={onMobileMenuClick} className="lg:hidden text-[#D4AF37] hover:text-[#FFD700] p-2 -ml-2 mr-2 transition-colors">
                            <Menu className="h-7 w-7"/>
                        </button>
                        <NavLink to="/" className="flex-shrink-0">
                            <Logo />
                        </NavLink>
                    </div>
                    <nav className="hidden lg:flex items-center space-x-6">
                        {NAV_LINKS.map(link => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) =>
                                    `text-lg font-medium transition-colors duration-300 ${isActive ? 'text-[#D4AF37]' : 'text-gray-300 hover:text-[#FFD700]'}`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                        {showCreateLink && (
                             <NavLink
                                to="/create"
                                className={({ isActive }) =>
                                    `text-lg font-medium transition-colors duration-300 ${isActive ? 'text-[#D4AF37]' : 'text-gray-300 hover:text-[#FFD700]'}`
                                }
                            >
                                Create
                            </NavLink>
                        )}
                    </nav>
                    <div className="flex items-center gap-4">
                        <NavLink
                             to="/profile"
                             title="Profile"
                             className={({ isActive }) =>
                                 `text-[#D4AF37] hover:text-[#FFD700] transition-colors duration-300 ${isActive ? 'p-1.5 bg-[#D4AF37]/20 rounded-full' : ''}`
                             }
                        >
                            <User className="h-7 w-7" />
                        </NavLink>
                        <button onClick={onSettingsClick} title="Settings" className="text-[#D4AF37] hover:text-[#FFD700] transition-colors duration-300">
                            <Settings className="h-7 w-7" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
});

export const SettingsPanel: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        onClose();
        logout();
        navigate('/login');
    };
    
    const handleNavigation = (path: string) => {
        onClose();
        navigate(path);
    }

    return (
        <>
            <div
                className={`fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 ${
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={onClose}
            />
            <div
                className={`fixed top-0 right-0 h-full w-80 bg-[#111111] border-l-2 border-[#D4AF37] shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex flex-col h-full p-6">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-[#D4AF37] text-2xl font-serif">Settings</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-[#FFD700]">
                            <X className="h-7 w-7" />
                        </button>
                    </div>
                    <div className="flex-grow space-y-4">
                         <button onClick={() => handleNavigation('/contact')} className="w-full flex items-center gap-4 text-left text-gray-300 hover:text-[#FFD700] bg-black/20 hover:bg-[#D4AF37]/10 p-3 rounded-lg transition-all duration-200">
                            <Phone className="w-6 h-6 text-[#D4AF37]"/>
                            <span className="text-lg">Contact Us</span>
                        </button>
                         <button onClick={() => handleNavigation('/terms')} className="w-full flex items-center gap-4 text-left text-gray-300 hover:text-[#FFD700] bg-black/20 hover:bg-[#D4AF37]/10 p-3 rounded-lg transition-all duration-200">
                            <FileText className="w-6 h-6 text-[#D4AF37]"/>
                            <span className="text-lg">Terms & Conditions</span>
                        </button>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-3 text-black bg-[#D4AF37] hover:bg-[#FFD700] font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                    >
                        <LogOut className="w-6 h-6"/>
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export const MobileMenu: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const { user } = useAuth();
    const showCreateLink = user && (user.role === UserRole.PRO || user.role === UserRole.HOST);

    return (
        <>
            <div 
                className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />
            <div 
                className={`fixed top-0 left-0 h-full w-4/5 max-w-sm bg-[#111111] border-r-2 border-[#D4AF37] shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex flex-col h-full p-6">
                    <div className="flex justify-between items-center mb-10">
                         <h2 className="text-[#D4AF37] text-2xl font-serif">Menu</h2>
                         <button onClick={onClose} className="text-gray-400 hover:text-[#FFD700]">
                             <X className="h-7 w-7" />
                         </button>
                    </div>
                    <nav className="flex flex-col space-y-4">
                        {NAV_LINKS.map(link => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                onClick={onClose}
                                className={({ isActive }) =>
                                    `text-xl p-3 rounded-lg font-medium transition-all duration-300 ${isActive ? 'text-black bg-[#D4AF37]' : 'text-gray-300 hover:text-[#FFD700] hover:bg-[#D4AF37]/10'}`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                        {showCreateLink && (
                             <NavLink
                                to="/create"
                                onClick={onClose}
                                className={({ isActive }) =>
                                    `text-xl p-3 rounded-lg font-medium transition-all duration-300 ${isActive ? 'text-black bg-[#D4AF37]' : 'text-gray-300 hover:text-[#FFD700] hover:bg-[#D4AF37]/10'}`
                                }
                            >
                                Create
                            </NavLink>
                        )}
                    </nav>
                </div>
            </div>
        </>
    );
};


export const MainLayout: React.FC = () => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#111111] text-white font-sans">
            <Header 
                onSettingsClick={() => setIsSettingsOpen(true)} 
                onMobileMenuClick={() => setIsMobileMenuOpen(true)}
            />
            <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
            <main className="pt-20">
                <Outlet />
            </main>
        </div>
    );
};
