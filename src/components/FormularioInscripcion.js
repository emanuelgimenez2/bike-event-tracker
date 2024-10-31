import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import {  Button } from '../components/ui/Button';

const FormularioInscripcion = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    email: '',
    telefono: '',
    categoria: '',
    documento: '',
    fechaNacimiento: '',
    direccion: '',
    experiencia: 'principiante',
    emergenciaContacto: '',
    emergenciaTelefono: '',
    remera: false, // Nueva propiedad para la remera
    talle: '',
    comprobante: null // Nueva propiedad para el comprobante
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombreCompleto) newErrors.nombreCompleto = 'El nombre es requerido';
    if (!formData.email) newErrors.email = 'El email es requerido';
    if (!formData.telefono) newErrors.telefono = 'El teléfono es requerido';
    if (!formData.documento) newErrors.documento = 'El documento es requerido';
    if (!formData.fechaNacimiento) newErrors.fechaNacimiento = 'La fecha de nacimiento es requerida';
    if (formData.remera && !formData.talle) newErrors.talle = 'El talle es requerido'; // Validación del talle
    if (!formData.comprobante) newErrors.comprobante = 'El comprobante de pago es requerido'; // Validación del comprobante

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Aquí iría la lógica para enviar los datos
      console.log('Datos del formulario:', formData);
      alert('Inscripción enviada con éxito');
      navigate('/eventos'); // Volver a la lista de eventos
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      comprobante: e.target.files[0] // Guardar el archivo del comprobante
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* <Button
        variant="ghost"
        className="mb-4"
        onClick={() => navigate('/eventos')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Volver a Eventos
      </Button> */}

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Formulario de Inscripción</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Información Personal */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Información Personal</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    name="nombreCompleto"
                    value={formData.nombreCompleto}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-md ${
                      errors.nombreCompleto ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.nombreCompleto && (
                    <p className="text-red-500 text-sm mt-1">{errors.nombreCompleto}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-md ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-md ${
                      errors.telefono ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.telefono && (
                    <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Documento de Identidad *
                  </label>
                  <input
                    type="text"
                    name="documento"
                    value={formData.documento}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-md ${
                      errors.documento ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.documento && (
                    <p className="text-red-500 text-sm mt-1">{errors.documento}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Información del Ciclista */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Información del Ciclista</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Categoría
                  </label>
                  <select
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md border-gray-300"
                  >
                    <option value="">Seleccione una categoría</option>
                    <option value="elite">Elite</option>
                    <option value="masterA">Master A</option>
                    <option value="masterB">Master B</option>
                    <option value="recreativa">Recreativa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Nivel de Experiencia
                  </label>
                  <select
                    name="experiencia"
                    value={formData.experiencia}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md border-gray-300"
                  >
                    <option value="principiante">Principiante</option>
                    <option value="intermedio">Intermedio</option>
                    <option value="avanzado">Avanzado</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Selección de Remera */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Remera del Evento</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="remera"
                      checked={formData.remera}
                      onChange={(e) => setFormData({ ...formData, remera: e.target.checked })}
                      className="mr-2"
                    />
                    ¿Desea la remera?
                  </label>
                </div>

                {formData.remera && (
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Talle *
                    </label>
                    <select
                      name="talle"
                      value={formData.talle}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded-md ${
                        errors.talle ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Seleccione un talle</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                    </select>
                    {errors.talle && (
                      <p className="text-red-500 text-sm mt-1">{errors.talle}</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Comprobante de Pago */}
            <div className="space-y-4">
              <label className="block text-sm font-medium mb-1">
                Cargar Comprobante de Pago *
              </label>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className={`w-full p-2 border rounded-md ${
                  errors.comprobante ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.comprobante && (
                <p className="text-red-500 text-sm mt-1">{errors.comprobante}</p>
              )}
            </div>

            {/* Información de Emergencia */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contacto en Emergencia</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Nombre de Emergencia *
                  </label>
                  <input
                    type="text"
                    name="emergenciaContacto"
                    value={formData.emergenciaContacto}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-md ${
                      errors.emergenciaContacto ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.emergenciaContacto && (
                    <p className="text-red-500 text-sm mt-1">{errors.emergenciaContacto}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Teléfono de Emergencia *
                  </label>
                  <input
                    type="tel"
                    name="emergenciaTelefono"
                    value={formData.emergenciaTelefono}
                    onChange={handleInputChange}
                    className={`w-full p-2 border rounded-md ${
                      errors.emergenciaTelefono ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.emergenciaTelefono && (
                    <p className="text-red-500 text-sm mt-1">{errors.emergenciaTelefono}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Botón de Envío */}
            <CardFooter>
              <Button type="submit" variant="primary" className="w-full">
                Enviar Inscripción
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormularioInscripcion;
