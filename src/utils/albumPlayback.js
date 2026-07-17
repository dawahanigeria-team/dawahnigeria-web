const trackTitle = (track) =>
  track?.lectitle || track?.Title || track?.title || track?.mp3_title || "";

const trackId = (track) => String(track?.nid ?? track?.id ?? "");

const sequenceFromTitle = (title) => {
  const match = title.match(
    /\b(?:dars|lesson|part|episode|ep|lecture|hadith|class)\s*(?:no\.?\s*)?[-:#]?\s*(\d+)\b/i
  );
  return match ? Number(match[1]) : null;
};

const dateFromTitle = (title) => {
  const match = title.match(
    /(?:^|\D)(\d{1,2})[-/](\d{1,2})[-/](\d{2}|\d{4})(?:\D|$)/
  );
  if (!match) return null;
  const year = Number(match[3]) < 100 ? 2000 + Number(match[3]) : Number(match[3]);
  const timestamp = Date.UTC(year, Number(match[2]) - 1, Number(match[1]));
  return Number.isFinite(timestamp) ? timestamp : null;
};

export const parseTrackDuration = (duration) => {
  if (typeof duration === "number") {
    return Number.isFinite(duration) ? Math.max(0, duration) : 0;
  }
  if (typeof duration !== "string" || !duration.trim()) return 0;
  const value = duration.trim();
  if (/^0+(?::0+){0,2}$/.test(value)) return 0;
  const parts = value.split(":").map(Number);
  if (parts.some((part) => !Number.isFinite(part))) return 0;
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  const seconds = Number(value);
  return Number.isFinite(seconds) ? Math.max(0, seconds) : 0;
};

export const formatTrackDuration = (duration) => {
  const seconds = parseTrackDuration(duration);
  if (seconds <= 0) return "Duration updating";
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return hours > 0
    ? `${hours}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
    : `${minutes}:${String(secs).padStart(2, "0")}`;
};

export const orderAlbumTracks = (tracks = []) => {
  const unique = tracks.filter((track, index, source) => {
    const id = trackId(track);
    const title = trackTitle(track);
    return source.findIndex(
      (candidate) => trackId(candidate) === id && trackTitle(candidate) === title
    ) === index;
  });

  return unique
    .map((track, sourceIndex) => ({ track, sourceIndex }))
    .sort((left, right) => {
      const a = left.track;
      const b = right.track;
      const aTrackNumber = Number(a.track_number ?? a.trackNumber);
      const bTrackNumber = Number(b.track_number ?? b.trackNumber);
      if (
        Number.isFinite(aTrackNumber) &&
        Number.isFinite(bTrackNumber) &&
        aTrackNumber !== bTrackNumber
      ) return aTrackNumber - bTrackNumber;

      const aSequence = sequenceFromTitle(trackTitle(a));
      const bSequence = sequenceFromTitle(trackTitle(b));
      if (aSequence != null && bSequence != null && aSequence !== bSequence) {
        return aSequence - bSequence;
      }

      const aDate = dateFromTitle(trackTitle(a));
      const bDate = dateFromTitle(trackTitle(b));
      if (aDate != null && bDate != null && aDate !== bDate) return aDate - bDate;

      const aId = Number(a.nid ?? a.id);
      const bId = Number(b.nid ?? b.id);
      if (Number.isFinite(aId) && Number.isFinite(bId) && aId !== bId) {
        return aId - bId;
      }
      return left.sourceIndex - right.sourceIndex;
    })
    .map(({ track }) => track);
};

export const shuffleAlbumTracks = (tracks = [], random = Math.random) => {
  const shuffled = [...tracks];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
};
