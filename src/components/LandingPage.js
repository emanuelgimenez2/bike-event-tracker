import React, { useState } from 'react';
import { Button } from "../components/ui/Button";
import { Calendar, MapPin, Trophy, Users, Clock, Bike } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/Card";

// Importa los datos de eventos y componentes relacionados
const eventos = [
  {
    id: 1,
    titulo: "Gran Fondo Mountain Bike 2024",
    fecha: "15 de Julio, 2024",
    ubicacion: "Sierra Nevada",
    distancia: "50km",
    dificultad: "Intermedia",
    precio: "$50.00",
    capacidad: "200 ciclistas",
    descripcion: "Una emocionante carrera de mountain bike a través de los senderos más desafiantes de Sierra Nevada. Ideal para ciclistas que buscan poner a prueba sus habilidades en terreno montañoso.",
    categorias: ["Elite", "Master A", "Master B", "Recreativa"]
  },
  {
    id: 2,
    titulo: "Desafío Ruta Costera",
    fecha: "5 de Agosto, 2024",
    ubicacion: "Costa del Sol",
    distancia: "100km",
    dificultad: "Avanzada",
    precio: "$75.00",
    capacidad: "300 ciclistas",
    descripcion: "Recorre la pintoresca Costa del Sol en esta desafiante carrera de ruta. Con vistas espectaculares al mar y exigentes subidas, esta competencia pondrá a prueba tu resistencia.",
    categorias: ["Elite", "Master A", "Master B", "Recreativa"]
  }
];

const LandingPage = () => {
  const [mostrarEventos, setMostrarEventos] = useState(false);

  // Función para alternar la visualización de eventos
  const toggleEventos = () => {
    setMostrarEventos(!mostrarEventos);
    // Si se muestran los eventos, hacer scroll hacia ellos
    if (!mostrarEventos) {
      setTimeout(() => {
        document.getElementById('eventos-section').scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  if (mostrarEventos) {
    return (
      <div className="container mx-auto px-4 py-8" id="eventos-section">
        <Button 
          onClick={toggleEventos}
          className="mb-6"
        >
          Volver a Inicio
        </Button>
        <EventosPage />
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Descubre Tu Próxima Aventura en Bicicleta
            </h1>
            <p className="text-xl mb-8">
              Participa en las mejores competencias de ciclismo organizadas profesionalmente
            </p>
            <Button size="lg" variant="secondary" onClick={toggleEventos}>
              Ver Eventos
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">¿Por qué elegirnos?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Calendar />}
              title="Eventos Todo el Año"
              description="Organizamos competencias durante todas las temporadas"
            />
            <FeatureCard 
              icon={<MapPin />}
              title="Rutas Increíbles"
              description="Recorridos cuidadosamente seleccionados y señalizados"
            />
            <FeatureCard 
              icon={<Trophy />}
              title="Premios Atractivos"
              description="Reconocimientos y premios para los ganadores"
            />
            <FeatureCard 
              icon={<Users />}
              title="Comunidad Activa"
              description="Únete a una comunidad apasionada por el ciclismo"
            />
          </div>
        </div>
      </section>

      {/* Próximos Eventos Preview */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Próximos Eventos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <EventPreviewCard 
              title="Gran Fondo Mountain Bike 2024"
              date="15 de Julio, 2024"
              location="Sierra Nevada"
              image="/api/placeholder/400/250"
              onClickVerDetalles={toggleEventos}
            />
            <EventPreviewCard 
              title="Desafío Ruta Costera"
              date="5 de Agosto, 2024"
              location="Costa del Sol"
              image="/api/placeholder/400/250"
              onClickVerDetalles={toggleEventos}
            />
            <EventPreviewCard 
              title="Crono Escalada Montaña"
              date="20 de Septiembre, 2024"
              location="Picos de Europa"
              image="/api/placeholder/400/250"
              onClickVerDetalles={toggleEventos}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

// Componentes auxiliares
const FeatureCard = ({ icon, title, description }) => (
  <div className="text-center p-6">
    <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-blue-100 text-blue-600 rounded-full">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const EventPreviewCard = ({ title, date, location, image, onClickVerDetalles }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-md">
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="flex items-center text-gray-600 mb-2">
        <Calendar className="mr-2 h-4 w-4" /> {date}
      </p>
      <p className="flex items-center text-gray-600">
        <MapPin className="mr-2 h-4 w-4" /> {location}
      </p>
      <Button className="w-full mt-4" onClick={onClickVerDetalles}>Ver Detalles</Button>
    </div>
  </div>
);

// Componente EventosPage y componentes relacionados
const EventoCard = ({ evento }) => {
  const [showForm, setShowForm] = useState(false);

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-2xl">{evento.titulo}</CardTitle>
        <CardDescription>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              <span>{evento.fecha}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              <span>{evento.ubicacion}</span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              <span>{evento.distancia}</span>
            </div>
            <div className="flex items-center">
              <Trophy className="mr-2 h-4 w-4" />
              <span>{evento.dificultad}</span>
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>{evento.descripcion}</p>
          <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-md">
            <div>
              <h4 className="font-semibold flex items-center">
                <Users className="mr-2 h-4 w-4" /> Capacidad
              </h4>
              <p>{evento.capacidad}</p>
            </div>
            <div>
              <h4 className="font-semibold flex items-center">
                <Bike className="mr-2 h-4 w-4" /> Categorías
              </h4>
              <p>{evento.categorias.join(", ")}</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="text-xl font-bold">{evento.precio}</div>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cerrar formulario' : 'Inscribirse'}
        </Button>
      </CardFooter>

      {showForm && (
        <CardContent>
          <FormularioInscripcion evento={evento} />
        </CardContent>
      )}
    </Card>
  );
};

const FormularioInscripcion = ({ evento }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    categoria: '',
    documento: '',
    comprobante: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    alert('Inscripción enviada con éxito');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <h3 className="text-lg font-semibold mb-4">Formulario de Inscripción - {evento.titulo}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nombre Completo</label>
          <input 
            type="text" 
            className="w-full p-2 border rounded" 
            required
            onChange={(e) => setFormData({...formData, nombre: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input 
            type="email" 
            className="w-full p-2 border rounded"
            required
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Teléfono</label>
          <input 
            type="tel" 
            className="w-full p-2 border rounded"
            required
            onChange={(e) => setFormData({...formData, telefono: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Documento de Identidad</label>
          <input 
            type="text" 
            className="w-full p-2 border rounded"
            required
            onChange={(e) => setFormData({...formData, documento: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Categoría</label>
          <select 
            className="w-full p-2 border rounded"
            required
            onChange={(e) => setFormData({...formData, categoria: e.target.value})}
          >
            <option value="">Seleccione una categoría</option>
            {evento.categorias.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Comprobante de Pago</label>
          <input 
            type="file" 
            className="w-full p-2 border rounded"
            required
            onChange={(e) => setFormData({...formData, comprobante: e.target.files[0]})}
          />
        </div>
      </div>
      <Button type="submit" className="w-full mt-6">
        Enviar Inscripción
      </Button>
    </form>
  );
};

const EventosPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Eventos Disponibles</h1>
      <div className="space-y-6">
        {eventos.map(evento => (
          <EventoCard key={evento.id} evento={evento} />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;