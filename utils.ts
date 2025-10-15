
export function formatCurrency(n: number): string {
  return n.toLocaleString('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).replace('NGN', '₦');
}
