import React from 'react';
import { Button } from "../components/ui/Button";
import { User, Menu, X } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';


const Layout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">
      {children}
    </main>
    <Footer />
  </div>
);

export default Layout;