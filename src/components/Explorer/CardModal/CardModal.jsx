import { useEffect, useRef, useState } from "react";
import { api } from "../../../utils/api-instance";

import closeIcon from "../../../images/close.svg";

function renderTextWithSymbols(text) {
  if (!text) return null;

  const parts = text.split(/({.*?})/g);

  return parts.map((part, index) => {
    if (part.startsWith("{") && part.endsWith("}")) {
      const clean = part.replace(/[{}]/g, "").trim();
      return (
        <img
          key={index}
          src={`https://svgs.scryfall.io/card-symbols/${clean}.svg`}
          alt={clean}
          className="mana-icon-inline"
        />
      );
    }

    return <span key={index}>{part}</span>;
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
            <img src={closeIcon} alt="Close" />
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

            <div className="modal__header">
              <h2 className="modal__title">{card.name}</h2>
              <div className="modal__mana">
                {renderTextWithSymbols(card.manaCost)}
              </div>
            </div>

            <p className="modal__type">{activeType}</p>
            <p className="modal__text">{renderTextWithSymbols(activeText)}</p>

            <div className="modal__stats">
              <span>
                {card.power}/{card.toughness}
              </span>
              <span className={`rarity rarity--${card.rarity}`}>
                {card.rarity}
              </span>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}

export default CardModal;
