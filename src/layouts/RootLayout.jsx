import { Outlet, ScrollRestoration } from 'react-router';
import AnnouncementBar from '../components/layout/AnnouncementBar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function RootLayout() {
  return (
    <>
      <a href="#main" className="skip-link">मुख्य सामग्री पर जाएं</a>
      <AnnouncementBar />
      <Navbar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </>
  );
}
