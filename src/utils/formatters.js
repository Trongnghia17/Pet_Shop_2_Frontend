// src/utils/formatters.js
export const formatPrice = (price) => {
    if (!price && price !== 0) return '';
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};