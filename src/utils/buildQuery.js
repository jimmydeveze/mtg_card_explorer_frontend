export function buildQuery(query, filters) {
  let q = query.trim();

  if (filters.color) q += ` color:${filters.color}`;
  if (filters.type) q += ` type:${filters.type}`;
  if (filters.rarity) q += ` rarity:${filters.rarity}`;
  if (filters.minMana) q += ` cmc>=${filters.minMana}`;
  if (filters.maxMana) q += ` cmc<=${filters.maxMana}`;
  if (filters.legal) q += ` legal:${filters.legal}`;
  if (filters.creaturesOnly) q += ` type:creature`;

  q = q.trim();
  if (!q) q = "game:paper";

  return q;
}
