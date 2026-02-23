import { useEffect, useRef, useState } from "react";
import { api } from "../../../utils/api-instance";

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
  const [spanish, setSpanish] = useState(null);
  const [lang, setLang] = useState("en");

  function handleClose() {
    const dialog = dialogRef.current;
    if (!dialog) return;

    dialog.classList.add("closing");

    setTimeout(() => {
      dialog.close();
      dialog.classList.remove("closing");
      onClose();
      setSpanish(null);
    }, 200);
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (card && !dialog.open) {
      dialog.showModal();
    }
  }, [card]);

  useEffect(() => {
    if (!card?.oracleId) return;

    setSpanish(null);
    setLang("en");

    api
      .getSpanishPrint(card.oracleId)
      .then((data) => {
        if (data) setSpanish(data);
      })
      .catch(() => {});
  }, [card?.oracleId]);

  const activeText =
    lang === "es" ? spanish?.printed_text || spanish?.oracle_text : card?.text;

  const activeType =
    lang === "es"
      ? spanish?.printed_type_line || spanish?.type_line
      : card?.type;

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
            <div className="modal__lang-switch">
              <button
                className={lang === "en" ? "active" : ""}
                onClick={() => setLang("en")}
              >
                EN
              </button>

              {spanish && (
                <button
                  className={lang === "es" ? "active" : ""}
                  onClick={() => setLang("es")}
                >
                  ES
                </button>
              )}
            </div>

            <h2 className="modal__title">{card.name}</h2>

            <div className="modal__mana">{renderManaCost(card.manaCost)}</div>

            <p className="modal__type">{activeType}</p>
            <p className="modal__text">{activeText}</p>

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
