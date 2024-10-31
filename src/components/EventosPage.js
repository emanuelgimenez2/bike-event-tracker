import React, { useState } from 'react';
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/Card";
import { Calendar, MapPin, Trophy, Users, Clock, Bike } from 'lucide-react';
import { MapContainer, TileLayer,  Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import FormularioInscripcion from './FormularioInscripcion';

const eventos = [
  {
    id: 1,
    titulo: "Gran Fondo Mountain Bike 2024",
    fecha: "15 de Julio, 2024",
    ubicacion: "Concepcion del Uruguay",
    distancia: "50km",
    dificultad: "Intermedia",
    precio: "$50.00",
    capacidad: "200 ciclistas",
    descripcion: "Una emocionante carrera de mountain bike a través de los senderos más desafiantes de Sierra Nevada. Ideal para ciclistas que buscan poner a prueba sus habilidades en terreno montañoso.",
    categorias: ["Elite", "Recreativa"],
    coordenadas: { lat:-32.4833, lng: -58.2333 },
    recorrido: [
      [-32.48824892550995, -58.260863756547764],
      [-32.467924, -58.263902],
      [-32.464680, -58.255122],
      [-32.465241, -58.252376],
      [-32.464734, -58.246099],
      [-32.465404, -58.244737],
      [-32.466861, -58.243986],
      [-32.471270, -58.238053],
      [-32.472953, -58.236401],
      [-32.464734, -58.246099],
    ]
  },
];

const MapaRecorrido = ({ coordenadas, recorrido }) => {
  return (
    <MapContainer center={[coordenadas.lat, coordenadas.lng]} zoom={13} className="h-64 rounded-md mt-4">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Polyline
        positions={recorrido}
        color="blue"
        weight={4}
      />
    </MapContainer>
  );
};

const EventoCard = ({ evento, onInscribirse }) => {
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
          <MapaRecorrido coordenadas={evento.coordenadas} recorrido={evento.recorrido} />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="text-xl font-bold">{evento.precio}</div>
        <Button onClick={onInscribirse}>
          Inscribirse
        </Button>
      </CardFooter>
    </Card>
  );
};

const EventosPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedEvento, setSelectedEvento] = useState(null);

  const handleInscribirse = (evento) => {
    setSelectedEvento(evento);
    setShowForm(true);
  };

  const handleVolverEventos = () => {
    setShowForm(false);
    setSelectedEvento(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {!showForm ? (
        <>
          <h1 className="text-3xl font-bold mb-6">Eventos Disponibles</h1>
          <div className="space-y-6">
            {eventos.map(evento => (
              <EventoCard 
                key={evento.id} 
                evento={evento} 
                onInscribirse={() => handleInscribirse(evento)}
              />
            ))}
          </div>
        </>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-6">
          
            <Button 
              variant="outline"
              onClick={handleVolverEventos}
            >
              Volver a Eventos
            </Button>
          </div>
          <Card>
            <CardContent className="pt-6">
              <FormularioInscripcion evento={selectedEvento} />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default EventosPage;