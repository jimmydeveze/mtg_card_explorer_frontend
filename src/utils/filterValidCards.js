export function filterValidCards(cards = []) {
  return cards.filter(
    (card) =>
      card.image_uris?.normal || card.card_faces?.[0]?.image_uris?.normal,
  );
}
