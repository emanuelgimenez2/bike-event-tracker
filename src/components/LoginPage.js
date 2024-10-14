import React, { useState } from 'react';
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/Card";
import { auth } from '../firebase/config';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/config'; // Import Firestore
import { doc, setDoc } from 'firebase/firestore'; // Firestore functions

const LoginPage = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Define the user reference in the 'roles' collection
      const userRef = doc(db, 'roles', user.uid);

      // Save user in Firestore with default role
      await setDoc(userRef, { 
        email: user.email, 
        role: 'user', // Default role
        displayName: user.displayName || '', // Optional: store display name
        photoURL: user.photoURL || '' // Optional: store user photo URL
      }, { merge: true }); // Use merge to update if exists

      navigate('/dashboard'); // Adjust the route as per your application
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Iniciar Sesión</CardTitle>
            <CardDescription>
              Inicia sesión con tu cuenta de Google para acceder a la aplicación
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}
            <Button 
              onClick={handleGoogleSignIn} 
              className="w-full flex items-center justify-center"
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
                />
              </svg>
              Iniciar sesión con Google
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;