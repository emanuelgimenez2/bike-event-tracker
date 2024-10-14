const Footer = () => (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">CycleEvents</h3>
            <p className="text-gray-300">Organizando las mejores competencias de ciclismo desde 2024.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="/eventos" className="text-gray-300 hover:text-white">Eventos</a></li>
              <li><a href="/registro" className="text-gray-300 hover:text-white">Registro</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white">Contacto</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Email: info@cycleevents.com</li>
              <li>Teléfono: (123) 456-7890</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
  export default Footer;