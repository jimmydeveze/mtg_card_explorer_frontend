import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="home">
      <div className="home__hero">
        <div className="home__content">
          <h1 className="home__title">Explora el Multiverso de Magic</h1>

          <p className="home__description">
            Descubre cartas al instante o busca tus hechizos favoritos. Explora
            criaturas, artefactos y más sin necesidad de saber exactamente qué
            buscar.
          </p>

          <Link to="/explorer" className="home__button">
            Comenzar exploración
          </Link>

          <div className="home__how">
            <h2 className="home__subtitle">¿Qué puedes hacer?</h2>
            <ul className="home__steps">
              <li>Explorar cartas destacadas.</li>
              <li>Buscar por nombre.</li>
              <li>Consultar detalles e imágenes al instante.</li>
            </ul>
          </div>
        </div>

        {/* Carta destacada (por ahora placeholder) */}
        <div className="home__card-preview">
          <div className="home__card-placeholder">Carta destacada</div>
        </div>
      </div>
    </section>
  );
}

export default Home;
