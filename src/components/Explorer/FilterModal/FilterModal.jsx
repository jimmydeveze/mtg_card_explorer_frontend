import { useEffect, useRef } from "react";

import closeIcon from "../../../images/close.svg";

function FilterModal({ isOpen, onClose, filters, setFilters, onApply }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) dialog.showModal();
    else dialog.close();
  }, [isOpen]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onApply();
    onClose();
  }

  return (
    <dialog ref={dialogRef} className="filterModal" onCancel={onClose}>
      <form className="filterModal__content" onSubmit={handleSubmit}>
        <header className="filterModal__header">
          <h2>Filtros avanzados</h2>
          <button className="modal__close" onClick={onClose}>
            <img src={closeIcon} alt="Close" />
          </button>
        </header>

        <div className="filterModal__grid">
          <label>
            Color
            <select name="color" value={filters.color} onChange={handleChange}>
              <option value="">Todos</option>
              <option value="w">Blanco</option>
              <option value="u">Azul</option>
              <option value="b">Negro</option>
              <option value="r">Rojo</option>
              <option value="g">Verde</option>
            </select>
          </label>

          <label>
            Tipo
            <select name="type" value={filters.type} onChange={handleChange}>
              <option value="">Todos</option>
              <option value="creature">Creature</option>
              <option value="instant">Instant</option>
              <option value="sorcery">Sorcery</option>
              <option value="artifact">Artifact</option>
              <option value="enchantment">Enchantment</option>
              <option value="planeswalker">Planeswalker</option>
              <option value="land">Land</option>
            </select>
          </label>

          <label>
            Rareza
            <select
              name="rarity"
              value={filters.rarity}
              onChange={handleChange}
            >
              <option value="">Todas</option>
              <option value="common">Common</option>
              <option value="uncommon">Uncommon</option>
              <option value="rare">Rare</option>
              <option value="mythic">Mythic</option>
            </select>
          </label>

          <label>
            CMC mínimo
            <input
              type="number"
              name="minMana"
              value={filters.minMana || ""}
              onChange={handleChange}
              min="0"
            />
          </label>

          <label>
            CMC máximo
            <input
              type="number"
              name="maxMana"
              value={filters.maxMana || ""}
              onChange={handleChange}
              min="0"
            />
          </label>

          <label>
            Formato legal
            <select
              name="legal"
              value={filters.legal || ""}
              onChange={handleChange}
            >
              <option value="">Cualquiera</option>
              <option value="standard">Standard</option>
              <option value="modern">Modern</option>
              <option value="commander">Commander</option>
              <option value="legacy">Legacy</option>
              <option value="vintage">Vintage</option>
            </select>
          </label>

          <label className="checkbox">
            <input
              type="checkbox"
              name="creaturesOnly"
              checked={filters.creaturesOnly || false}
              onChange={handleChange}
            />
            Solo criaturas
          </label>
        </div>

        <footer className="filterModal__footer">
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit">Aplicar filtros</button>
        </footer>
      </form>
    </dialog>
  );
}

export default FilterModal;
