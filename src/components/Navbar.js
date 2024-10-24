import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "../components/ui/Button";
import { User, Menu, X } from 'lucide-react';
import { auth, db } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        const userDoc = await getDoc(doc(db, 'roles', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setIsAdmin(userData.role === 'admin');
        }
      } else {
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLoginClick = () => {
    navigate('/login');
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const getAvatar = () => {
    if (user) {
      if (user.photoURL) {
        return <img src={user.photoURL} alt="Avatar" className="w-8 h-8 rounded-full" />;
      } else {
        return (
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
            {user.displayName ? user.displayName[0].toUpperCase() : '?'}
          </div>
        );
      }
    }
    return null;
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">CycleEvents</Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-5">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Inicio</Link>
            <Link to="/eventos" className="text-gray-700 hover:text-blue-600">Eventos</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600">Nosotros</Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600">Contacto</Link>
            <Link to="/AdminDashboard" className="text-gray-700 hover:text-blue-600">AdminDashboard</Link>
            {user ? (
              <div className="flex items-center space-x-4">
                {isAdmin && (
                  <Link to="/admin" className="text-gray-700 hover:text-blue-600">
                    Admin
                  </Link>
                )}
                {getAvatar()}
                <Button variant="outline" onClick={handleLogout} className="flex items-center">
                  <User className="mr-2 h-4 w-4" /> Logout
                </Button>
              </div>
            ) : (
              <Button variant="outline" onClick={handleLoginClick} className="flex items-center">
                <User className="mr-2 h-4 w-4" /> Login
              </Button>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Inicio</Link>
              <Link to="/eventos" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Eventos</Link>
              <Link to="/about" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Nosotros</Link>
              <Link to="/contact" className="block px-3 py-2 text-gray-700 hover:text-blue-600">Contacto</Link>
              {user ? (
                <div className="px-3 py-2">
                  {isAdmin && (
                    <Link to="/admin" className="block text-gray-700 mb-2">
                      Admin
                    </Link>
                  )}
                  <div className="flex items-center mb-2">
                    {getAvatar()}
                    <span className="ml-2 text-gray-700">{user.displayName || 'Usuario'}</span>
                  </div>
                  <Button variant="outline" onClick={handleLogout} className="w-full justify-center">
                    <User className="mr-2 h-4 w-4" /> Logout
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  onClick={handleLoginClick} 
                  className="w-full justify-center mt-4"
                >
                  <User className="mr-2 h-4 w-4" /> Login
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;