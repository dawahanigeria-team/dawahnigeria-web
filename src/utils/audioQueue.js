const normalizeTrackId = (id) => {
  if (id === null || id === undefined) return null;
  const numericId = Number(id);
  if (!Number.isNaN(numericId)) return numericId;
  return String(id);
};

const resolveTrackId = (track) => {
  if (!track || typeof track !== "object") return null;
  return normalizeTrackId(track.nid ?? track.id);
};

const resolveCurrentTrackId = (currentTrackId) => {
  return normalizeTrackId(currentTrackId);
};

export const getTrackIndex = (pack, currentTrackId) => {
  if (!Array.isArray(pack) || pack.length === 0) return -1;

  const normalizedCurrentTrackId = resolveCurrentTrackId(currentTrackId);
  if (normalizedCurrentTrackId === null) return -1;

  return pack.findIndex((track) => {
    return resolveTrackId(track) === normalizedCurrentTrackId;
  });
};

export const getNextTrackIndex = (pack, currentTrackId) => {
  const currentTrackIndex = getTrackIndex(pack, currentTrackId);
  if (currentTrackIndex === -1) return -1;

  return currentTrackIndex < pack.length - 1 ? currentTrackIndex + 1 : 0;
};
