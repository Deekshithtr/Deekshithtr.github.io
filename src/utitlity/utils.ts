export const checkIsPrime = (n: number) => {
  let isPrime = true;

  for (let i = 2; i < n; i++) {
    if (n % i == 0) {
      isPrime = false;
      break;
    }
  }

  return isPrime;
};

export const getDiscountedPrice = (price: number, offer: number) => {
  return parseFloat(`${price - price * (offer / 100)}`).toFixed(2);
};
