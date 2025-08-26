import React from "react";
import {
  ChefHat,
  Clock,
  DollarSign,
  Users,
  BookOpen,
  Star,
  ArrowRight,
  Heart,
} from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const features = [
    {
      icon: <Clock className="w-8 h-8 text-orange-500" />,
      title: "Recetas Rápidas",
      description:
        "Platos deliciosos en menos de 30 minutos, perfectos para tu horario de estudiante.",
    },
    {
      icon: <DollarSign className="w-8 h-8 text-green-500" />,
      title: "Económicas",
      description:
        "Ingredientes accesibles y baratos que se ajustan a tu presupuesto estudiantil.",
    },
    {
      icon: <BookOpen className="w-8 h-8 text-blue-500" />,
      title: "Fáciles de Seguir",
      description:
        "Instrucciones paso a paso claras, incluso si nunca has cocinado antes.",
    },
    {
      icon: <Users className="w-8 h-8 text-purple-500" />,
      title: "Comunidad",
      description:
        "Comparte experiencias y descubre nuevas recetas con otros estudiantes.",
    },
  ];

  const testimonials = [
    {
      name: "María González",
      university: "Universidad Nacional",
      comment:
        "¡Esta app cambió mi vida! Ahora puedo cocinar comidas deliciosas y baratas en mi apartamento.",
      rating: 5,
      avatar: "MG",
    },
    {
      name: "Carlos Rodríguez",
      university: "Tecnológico de Monterrey",
      comment:
        "Las recetas son súper fáciles de seguir. Perfecto para alguien que nunca había cocinado.",
      rating: 5,
      avatar: "CR",
    },
    {
      name: "Ana Martínez",
      university: "Universidad de los Andes",
      comment:
        "Me encanta poder compartir mis propias recetas y ver las de otros estudiantes.",
      rating: 4,
      avatar: "AM",
    },
  ];

  const categories = [
    { name: "Desayunos", color: "bg-yellow-100 text-yellow-800", count: "15+" },
    { name: "Almuerzos", color: "bg-orange-100 text-orange-800", count: "25+" },
    { name: "Cenas", color: "bg-red-100 text-red-800", count: "20+" },
    { name: "Snacks", color: "bg-green-100 text-green-800", count: "12+" },
    { name: "Postres", color: "bg-pink-100 text-pink-800", count: "8+" },
    { name: "Bebidas", color: "bg-blue-100 text-blue-800", count: "10+" },
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-green-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-lg">
                <ChefHat size={64} className="text-white" />
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                RecetasU
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto">
              La plataforma de recetas diseñada especialmente para
              <span className="font-semibold text-orange-600">
                {" "}
                estudiantes foráneos
              </span>
            </p>

            <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto">
              Descubre recetas fáciles, económicas y deliciosas que se adaptan a
              tu vida universitaria. Cocina como un chef, incluso con
              presupuesto de estudiante.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onGetStarted}
                className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span className="flex items-center justify-center gap-2">
                  Explorar Recetas
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </span>
              </button>

              <button className="px-8 py-4 border-2 border-orange-500 text-orange-600 rounded-xl font-semibold text-lg hover:bg-orange-50 transition-all duration-300">
                Ver Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir RecetasU?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Entendemos los desafíos de ser estudiante foráneo. Por eso creamos
              una plataforma que se adapta a tu estilo de vida.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group text-center p-6 rounded-2xl hover:bg-gray-50 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Explora por Categorías
            </h2>
            <p className="text-xl text-gray-600">
              Encuentra exactamente lo que necesitas para cada momento del día
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                  <div
                    className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-3 ${category.color}`}
                  >
                    {category.count}
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                    {category.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Lo que dicen nuestros usuarios
            </h2>
            <p className="text-xl text-gray-600">
              Miles de estudiantes ya están cocinando mejor con RecetasU
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.university}
                    </p>
                  </div>
                </div>

                <div className="mb-4">{renderStars(testimonial.rating)}</div>

                <p className="text-gray-700 italic leading-relaxed">
                  "{testimonial.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-green-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <Heart size={48} className="text-white" />
          </div>

          <h2 className="text-4xl font-bold text-white mb-6">
            ¿Listo para transformar tu experiencia culinaria?
          </h2>

          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Únete a miles de estudiantes que ya están disfrutando de comidas
            deliciosas y económicas todos los días.
          </p>

          <button
            onClick={onGetStarted}
            className="group px-10 py-5 bg-white text-orange-600 rounded-xl font-bold text-xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span className="flex items-center justify-center gap-3">
              Comenzar Ahora
              <ChefHat
                size={24}
                className="group-hover:rotate-12 transition-transform"
              />
            </span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center gap-3 mb-4">
              <ChefHat size={32} className="text-orange-500" />
              <h3 className="text-2xl font-bold">RecetasU</h3>
            </div>

            <p className="text-gray-400 mb-6">
              Cocinando sueños, un plato a la vez
            </p>

            <div className="flex justify-center gap-8 text-sm text-gray-400">
              <span>© 2024 RecetasU</span>
              <span>•</span>
              <span>Hecho con ❤️ para estudiantes</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
