
import type { Transaction } from './types';

export const sampleTransactions: Transaction[] = [
  { id: 't1', title: 'UberNG', subtitle: 'Ride', amount: -2540, time: '2h ago', icon: '🚗' },
  { id: 't2', title: 'Salary', subtitle: 'Acme Corp', amount: 120000, time: '2 days ago', icon: '💼' },
  { id: 't3', title: 'Groceries', subtitle: 'Market', amount: -6420, time: '3 days ago', icon: '🛒' },
  { id: 't4', title: 'Netflix', subtitle: 'Subscription', amount: -1500, time: '5 days ago', icon: '🎬' },
  { id: 't5', title: 'Transfer', subtitle: 'To Ade', amount: -5000, time: '1 week ago', icon: '📤' },
  { id: 't6', title: 'Airtime Top-up', subtitle: 'MTN', amount: -2000, time: '1 week ago', icon: '📱' },
];
