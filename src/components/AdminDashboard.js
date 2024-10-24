import React, { useState } from 'react';
import { Calendar, MapPin, Trophy, Users, Eye } from 'lucide-react';

// Button Component
const Button = ({ children, onClick, className = '', variant = 'default', ...props }) => {
  const baseStyles = 'px-4 py-2 rounded-md text-white transition-colors';
  const variantStyles = {
    default: 'bg-blue-600 hover:bg-blue-700',
    outline: 'border border-blue-600 text-blue-600 hover:bg-blue-100',
  };

  return (
    <button 
      onClick={onClick} 
      className={`${baseStyles} ${variantStyles[variant]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

// Card Component
const Card = ({ children, className = '' }) => (
  <div className={`border rounded-lg shadow p-4 ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="mb-4">
    {children}
  </div>
);

const CardTitle = ({ children, className = '' }) => (
  <h2 className={`text-xl font-bold ${className}`}>
    {children}
  </h2>
);

const CardContent = ({ children }) => (
  <div>
    {children}
  </div>
);

// Input Component
const Input = ({ id, value, onChange, type = 'text', className = '', ...props }) => (
  <input
    id={id}
    value={value}
    onChange={onChange}
    type={type}
    className={`border rounded px-3 py-2 w-full ${className}`}
    {...props}
  />
);

// Label Component
const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="font-semibold">
    {children}
  </label>
);

// Tabs Component
const Tabs = ({ value, onValueChange, children }) => (
  <div>
    {children}
  </div>
);

const TabsList = ({ children, className = '' }) => (
  <div className={`flex space-x-4 ${className}`}>
    {children}
  </div>
);

const TabsTrigger = ({ value, children, onClick }) => (
  <button
    onClick={() => onClick(value)}
    className={`px-4 py-2 rounded-md ${value ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
  >
    {children}
  </button>
);

const TabsContent = ({ value, children }) => (
  <div>
    {children}
  </div>
);

// Table Component
const Table = ({ children }) => (
  <table className="min-w-full bg-white">
    {children}
  </table>
);

const TableHead = ({ children }) => (
  <th className="px-4 py-2 text-left border-b font-semibold">
    {children}
  </th>
);

const TableRow = ({ children }) => (
  <tr>
    {children}
  </tr>
);

const TableCell = ({ children }) => (
  <td className="px-4 py-2 border-b">
    {children}
  </td>
);

const TableBody = ({ children }) => (
  <tbody>
    {children}
  </tbody>
);

// Select Component
const Select = ({ onValueChange, children }) => (
  <select
    onChange={(e) => onValueChange(e.target.value)}
    className="border rounded px-3 py-2 w-full"
  >
    {children}
  </select>
);

const SelectItem = ({ value, children }) => (
  <option value={value}>
    {children}
  </option>
);

// Textarea Component
const Textarea = ({ id, value, onChange, className = '', ...props }) => (
  <textarea
    id={id}
    value={value}
    onChange={onChange}
    className={`border rounded px-3 py-2 w-full ${className}`}
    {...props}
  />
);

// Main Component - AdminDashboard
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("mis-eventos");
  const [eventosAdmin, setEventosAdmin] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const crearNuevoEvento = (nuevoEvento) => {
    setEventos([...eventos, { ...nuevoEvento, id: eventos.length + 1, inscritos: [] }]);
    setMostrarFormulario(false);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="mis-eventos" onClick={setActiveTab}>Mis Eventos</TabsTrigger>
          <TabsTrigger value="crear-evento" onClick={setActiveTab}>Crear Evento</TabsTrigger>
        </TabsList>

        <TabsContent value="mis-eventos">
          <div className="space-y-4">
            {eventos.map(evento => (
              <EventoAdminCard 
                key={evento.id} 
                evento={evento}
                onVerDetalles={() => setEventoSeleccionado(evento)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="crear-evento">
          <CrearEventoForm onCrearEvento={crearNuevoEvento} />
        </TabsContent>
      </Tabs>

      {/* {eventoSeleccionado && (
        <DetallesEvento 
          evento={eventoSeleccionado} 
          onCerrar={() => setEventoSeleccionado(null)}
        />
      )} */}
    </div>
  );
};

const EventoAdminCard = ({ evento, onVerDetalles }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex justify-between items-center">
        <span>{evento.titulo}</span>
        <Button onClick={onVerDetalles}>
          <Eye className="mr-2 h-4 w-4" /> Ver Detalles
        </Button>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center">
          <Calendar className="mr-2 h-4 w-4" />
          <span>{evento.fecha}</span>
        </div>
        <div className="flex items-center">
          <Users className="mr-2 h-4 w-4" />
          <span>{evento.inscritos.length} / {evento.capacidad}</span>
        </div>
        <div className="flex items-center">
          <MapPin className="mr-2 h-4 w-4" />
          <span>{evento.ubicacion}</span>
        </div>
        <div className="flex items-center">
          <Trophy className="mr-2 h-4 w-4" />
          <span>{evento.dificultad}</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

const CrearEventoForm = ({ onCrearEvento }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    fecha: '',
    ubicacion: '',
    distancia: '',
    dificultad: '',
    precio: '',
    capacidad: '',
    descripcion: '',
    categorias: ['Elite', 'Master A', 'Master B', 'Recreativa']
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onCrearEvento(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="titulo">Título del Evento</Label>
          <Input
            id="titulo"
            value={formData.titulo}
            onChange={(e) => setFormData({...formData, titulo: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fecha">Fecha</Label>
          <Input
            id="fecha"
            type="date"
            value={formData.fecha}
            onChange={(e) => setFormData({...formData, fecha: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ubicacion">Ubicación</Label>
          <Input
            id="ubicacion"
            value={formData.ubicacion}
            onChange={(e) => setFormData({...formData, ubicacion: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="distancia">Distancia</Label>
          <Input
            id="distancia"
            value={formData.distancia}
            onChange={(e) => setFormData({...formData, distancia: e.target.value})}
            required
          />
        </div>
      </div>
      {/* Add more inputs for capacidad, dificultad, etc. */}
      <Button type="submit">Crear Evento</Button>
    </form>
  );
};

export default AdminDashboard;