import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Search, Download, UserCheck, Users, Calendar, Bike } from 'lucide-react';

const AdminDashboard = () => {
  // Estado para los participantes (simulado)
  const [participants, setParticipants] = useState([
    {
      id: 1,
      nombreCompleto: 'Juan Pérez',
      email: 'juan@example.com',
      categoria: 'elite',
      documento: '12345678',
      experiencia: 'avanzado',
      remera: true,
      talle: 'L',
      estado: 'confirmado',
      fechaInscripcion: '2024-10-15'
    },
    {
      id: 2,
      nombreCompleto: 'María González',
      email: 'maria@example.com',
      categoria: 'masterA',
      documento: '87654321',
      experiencia: 'intermedio',
      remera: true,
      talle: 'M',
      estado: 'pendiente',
      fechaInscripcion: '2024-10-16'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('todos');

  // Estadísticas generales
  const stats = {
    totalInscritos: participants.length,
    confirmados: participants.filter(p => p.estado === 'confirmado').length,
    pendientes: participants.filter(p => p.estado === 'pendiente').length,
    remeras: participants.filter(p => p.remera).length
  };

  // Filtrar participantes
  const filteredParticipants = participants.filter(participant => {
    const matchesSearch = participant.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         participant.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'todos' || participant.categoria === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Cambiar estado de inscripción
  const handleStatusChange = (id) => {
    setParticipants(participants.map(participant => {
      if (participant.id === id) {
        const newStatus = participant.estado === 'confirmado' ? 'pendiente' : 'confirmado';
        return { ...participant, estado: newStatus };
      }
      return participant;
    }));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header con título y botones principales */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold"> Administración</h1>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Exportar Datos
        </Button>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Inscritos</p>
                <p className="text-2xl font-bold">{stats.totalInscritos}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Confirmados</p>
                <p className="text-2xl font-bold">{stats.confirmados}</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pendientes</p>
                <p className="text-2xl font-bold">{stats.pendientes}</p>
              </div>
              <Calendar className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Remeras Solicitadas</p>
                <p className="text-2xl font-bold">{stats.remeras}</p>
              </div>
              <Bike className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros y búsqueda */}
      <Card className="bg-white">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar participante..."
                  className="pl-10 p-2 w-full border rounded-md"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <select
              className="p-2 border rounded-md"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="todos">Todas las categorías</option>
              <option value="elite">Elite</option>
              <option value="masterA">Master A</option>
              <option value="masterB">Master B</option>
              <option value="recreativa">Recreativa</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de participantes */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Lista de Participantes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Nombre</th>
                  <th className="text-left p-3">Email</th>
                  <th className="text-left p-3">Categoría</th>
                  <th className="text-left p-3">Experiencia</th>
                  <th className="text-left p-3">Talle Remera</th>
                  <th className="text-left p-3">Estado</th>
                  <th className="text-left p-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredParticipants.map((participant) => (
                  <tr key={participant.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{participant.nombreCompleto}</td>
                    <td className="p-3">{participant.email}</td>
                    <td className="p-3 capitalize">{participant.categoria}</td>
                    <td className="p-3 capitalize">{participant.experiencia}</td>
                    <td className="p-3">{participant.remera ? participant.talle : 'N/A'}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        participant.estado === 'confirmado' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {participant.estado}
                      </span>
                    </td>
                    <td className="p-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusChange(participant.id)}
                      >
                        {participant.estado === 'confirmado' ? 'Desconfirmar' : 'Confirmar'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;