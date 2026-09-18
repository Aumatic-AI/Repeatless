"use client";

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import MinimalNavbar from '@/Components/MinimalNavbar';
import Footer from '@/Components/Footer';
import { FaWhatsapp } from 'react-icons/fa';

// Full Navbar pulls in framer-motion (scroll-hide header, mobile menu
// AnimatePresence) that the minimal-nav routes never render — code-split it
// so /webinar, /cohort and /ai-architect don't ship that JS at all.
const Navbar = dynamic(() => import('@/Components/Navbar'));

// These landing pages run their own funnel (payment CTAs, no site nav) —
// they get just the logo, linked home, instead of the full Navbar.
const MINIMAL_NAV_ROUTES = ['/cohort', '/webinar', '/ai-architect'];

export default function SiteChrome({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isMinimalNav = MINIMAL_NAV_ROUTES.some(
        (route) => pathname === route || pathname.startsWith(`${route}/`)
    );

    return (
        <>
            {isMinimalNav ? <MinimalNavbar /> : <Navbar />}
            {children}
            <Footer />
            <a
                href="https://wa.me/919849884501"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with Repeatless on WhatsApp"
                className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#1DA851] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors duration-300"
            >
                <FaWhatsapp className="w-7 h-7" />
            </a>
        </>
    );
}


