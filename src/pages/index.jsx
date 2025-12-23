import { Link } from 'react-router-dom';
import { Gem, Sparkles, Shirt, User } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-serif font-medium text-neutral-900 mb-4">
          Bienvenue sur L'Écrin Virtuel
        </h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Votre dressing virtuel pour essayer bijoux et vêtements en ligne
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Link to="/jewelry" className="group">
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-all border border-neutral-100">
            <Gem className="w-12 h-12 mx-auto mb-4 text-amber-600" />
            <h3 className="font-medium text-neutral-900">Bijoux</h3>
          </div>
        </Link>
        
        <Link to="/closet" className="group">
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-all border border-neutral-100">
            <Shirt className="w-12 h-12 mx-auto mb-4 text-amber-600" />
            <h3 className="font-medium text-neutral-900">Vêtements</h3>
          </div>
        </Link>
        
        <Link to="/studio" className="group">
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-all border border-neutral-100">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-amber-600" />
            <h3 className="font-medium text-neutral-900">Studio</h3>
          </div>
        </Link>
        
        <Link to="/wardrobe" className="group">
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-all border border-neutral-100">
            <User className="w-12 h-12 mx-auto mb-4 text-amber-600" />
            <h3 className="font-medium text-neutral-900">Ma Garde-robe</h3>
          </div>
        </Link>
      </div>
    </div>
  );
}