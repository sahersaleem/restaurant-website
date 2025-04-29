import React from 'react';
import { Lock } from 'lucide-react'; // optional: using lucide icon for a nice lock symbol

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <div className="flex justify-center mb-4 text-red-500">
          <Lock size={48} />
        </div>
        <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-6">You are not authorized to view this page. Please login with the appropriate credentials.</p>
        <a
          href="/"
          className="inline-block px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full transition"
        >
          Go to Homepage
        </a>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
