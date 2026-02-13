import { useEffect, useRef } from "react";

function renderManaCost(manaCost) {
  if (!manaCost) return null;

  const symbols = manaCost.match(/{(.*?)}/g);
  if (!symbols) return manaCost;

  return symbols.map((symbol, index) => {
    const clean = symbol.replace(/[{}]/g, "");

    return (
      <img
        key={index}
        src={`https://svgs.scryfall.io/card-symbols/${clean}.svg`}
        alt={clean}
        className="mana-icon"
      />
    );
  });
}

function CardModal({ card, onClose }) {
  const dialogRef = useRef(null);

  function handleClose() {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.classList.add("closing");

    setTimeout(() => {
      dialog.close();
      dialog.classList.remove("closing");
      onClose();
    }, 200);
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (card && !dialog.open) {
      dialog.showModal();
    }
  }, [card]);

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      onCancel={(e) => {
        e.preventDefault();
        handleClose();
      }}
    >
      {card && (
        <div className="modal__content">
          <button className="modal__close" onClick={() => handleClose()}>
            ✕
          </button>

          <div className="modal__image-container">
            <img src={card.image} alt={card.name} className="modal__image" />
          </div>

          <div className="modal__info">
            <h2 className="modal__title">{card.name}</h2>

            <div className="modal__mana">{renderManaCost(card.manaCost)}</div>
            <p className="modal__type">{card.type}</p>
            <p className="modal__text">{card.text}</p>

            <div className="modal__stats">
              <span>
                {card.power}/{card.toughness}
              </span>
              <span>{card.rarity}</span>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}

export default CardModal;
