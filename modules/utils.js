export const random = (low, high) => (Math.random() * (high - low) + low)
export const valmap = (v, a, b, x, y) => {
  return ((v - a) / (b - a)) * (y - x) + x
}

export const easeOutElastic = (x) => {
  const c4 = (2 * Math.PI) / 3;  
  return x === 0
    ? 0
    : x === 1
    ? 1
    : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;  
}