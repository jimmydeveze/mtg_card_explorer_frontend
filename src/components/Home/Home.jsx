import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../utils/api-instance";

function Home() {
  const [randomCard, setRandomCard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getRandomCard()
      .then((card) => {
        setRandomCard(card);
      })
      .catch(() => {
        setRandomCard(null);
      })
      .finally(() => setLoading(false));
  }, []);

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

          <Link to="/cards" className="home__button">
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

        {/* CARTA RANDOM */}
        <div className="home__card-preview">
          {loading ? (
            <div className="home__card-placeholder">Cargando carta...</div>
          ) : randomCard ? (
            <img
              src={
                randomCard.image_uris?.normal ||
                randomCard.card_faces?.[0]?.image_uris?.normal
              }
              alt={randomCard.name}
              className="home__card-image"
              loading="lazy"
            />
          ) : (
            <div className="home__card-placeholder">
              No se pudo cargar la carta
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Home;
