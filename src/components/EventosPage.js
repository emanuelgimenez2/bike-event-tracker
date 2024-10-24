import React, { useState } from 'react';
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/Card";
import { Calendar, MapPin, Trophy, Users, Clock, Bike } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Lista de eventos con un recorrido
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
    categorias: ["Elite", "Master A", "Master B", "Recreativa"],
    coordenadas: { lat:-32.4833, lng:  -58.2333 },
    // Ejemplo de coordenadas para un recorrido en la Sierra Nevada
    recorrido: [
      [-32.48824892550995, -58.260863756547764],
      [-32.48651134891571, -58.309701414814995],
      [37.0950, -3.4200],
      [37.1000, -3.4300],
      [37.1050, -3.4400]
    ]
  },
  // Puedes añadir más eventos con sus respectivos recorridos aquí
];

// Componente del mapa con el recorrido
const MapaRecorrido = ({ coordenadas, recorrido }) => {
  return (
    <MapContainer center={[coordenadas.lat, coordenadas.lng]} zoom={13} className="h-64 rounded-md mt-4">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {/* Marcador de la ubicación del evento */}
      <Marker position={[coordenadas.lat, coordenadas.lng]}>
        <Popup>
          Ubicación del evento: {coordenadas.lat}, {coordenadas.lng}
        </Popup>
      </Marker>
      
      {/* Polyline para mostrar el recorrido */}
      <Polyline
        positions={recorrido}
        color="blue" // Color azul para el recorrido
        weight={4} // Grosor de la línea
      />
    </MapContainer>
  );
};

// Componente principal de la tarjeta del evento
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
          
          {/* Mapa del recorrido */}
          <MapaRecorrido coordenadas={evento.coordenadas} recorrido={evento.recorrido} />
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

// Formulario de inscripción
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

// Página de eventos
const EventosPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Eventos Disponibles</h1>
      <div className="space-y-6">
        {eventos.map(evento => (
          <EventoCard key={evento.id} evento={evento} />
        ))}
      </div>
    </div>
  );
};

export default EventosPage;
