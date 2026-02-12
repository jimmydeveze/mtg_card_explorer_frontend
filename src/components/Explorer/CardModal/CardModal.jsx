import { useEffect, useRef } from "react";

function CardModal({ card, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (card && !dialog.open) dialog.showModal();
    if (!card && dialog.open) dialog.close();
  }, [card]);

  return (
    <dialog ref={dialogRef} className="modal" onClose={onClose}>
      {card && (
        <div className="modal__content">
          <button className="modal__close" onClick={onClose}>
            ✕
          </button>

          <div className="modal__image-container">
            <img src={card.image} alt={card.name} className="modal__image" />
          </div>

          <div className="modal__info">
            <h2 className="modal__title">{card.name}</h2>

            <p className="modal__mana">{card.manaCost}</p>
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
