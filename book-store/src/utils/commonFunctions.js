export const truncateString = (string, length = 50) => {
  if (!string) return "";
  if (string.length <= length) {
    return string;
  }
  return string.slice(0, length) + "...";
};

export const calculateDiscount = (price, discount = 0) => {
  if (!discount) return price;
  return (price - (price * discount) / 100).toFixed(2);
};
