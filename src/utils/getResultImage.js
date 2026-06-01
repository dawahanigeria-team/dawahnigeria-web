import { IMAGE_PLACEHOLDERS } from "./imagePlaceholders";

const PLACEHOLDER_BY_TYPE = {
  lecturer: IMAGE_PLACEHOLDERS.lecturer,
  resource_person: IMAGE_PLACEHOLDERS.lecturer,
  rp: IMAGE_PLACEHOLDERS.lecturer,
  album: IMAGE_PLACEHOLDERS.albumWidget,
  playlist: IMAGE_PLACEHOLDERS.albumWidget,
};

export function getResultImage(item) {
  if (!item) return IMAGE_PLACEHOLDERS.lecture;

  const url =
    item.img ||
    item.img_url ||
    item.lecturer_image ||
    item.album_image ||
    item.image ||
    item.thumbnail;

  if (url) return url;

  const type = (item.type || "").toLowerCase();
  return PLACEHOLDER_BY_TYPE[type] || IMAGE_PLACEHOLDERS.lecture;
}

export function getResultPlaceholder(type) {
  return PLACEHOLDER_BY_TYPE[(type || "").toLowerCase()] || IMAGE_PLACEHOLDERS.lecture;
}
