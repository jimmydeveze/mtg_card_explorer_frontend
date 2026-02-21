const cardsCache = new Map();

const TTL = 1000 * 60 * 10;

export function getCached(queryKey) {
  const cached = cardsCache.get(queryKey);

  if (!cached) return null;

  const isExpired = Date.now() - cached.time > TTL;

  if (isExpired) {
    cardsCache.delete(queryKey);
    return null;
  }

  return cached.data;
}

export function setCache(queryKey, data) {
  cardsCache.set(queryKey, {
    data,
    time: Date.now(),
  });
}
