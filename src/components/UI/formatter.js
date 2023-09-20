export const formatNumber = (number) => {
  if (number === 0) {
    return "0";
  }
  const suffixes = ["", "k", "M", "B", "T"];
  const suffixNum = Math.floor(Math.log10(number) / 3);

  if (suffixNum === 0) {
    return number.toString();
  }

  const shortValue = (number / Math.pow(1000, suffixNum)).toFixed(1);
  return shortValue + suffixes[suffixNum];
};
