export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  emoji: string;
  isNew?: boolean;
}

export const CATEGORIES = ['Аудио', 'Периферия', 'Свет', 'Аксессуары'] as const;

export const PRODUCTS: Product[] = [
  { id: 1, title: 'Беспроводные наушники', category: 'Аудио', price: 7990, emoji: '🎧', isNew: true },
  { id: 2, title: 'Портативная колонка', category: 'Аудио', price: 5490, emoji: '🔊' },
  { id: 3, title: 'Механическая клавиатура', category: 'Периферия', price: 11490, emoji: '⌨️', isNew: true },
  { id: 4, title: 'Беспроводная мышь', category: 'Периферия', price: 3290, emoji: '🖱️' },
  { id: 5, title: 'Настольная лампа', category: 'Свет', price: 2590, emoji: '💡' },
  { id: 6, title: 'Светодиодная лента', category: 'Свет', price: 1890, emoji: '✨' },
  { id: 7, title: 'Чехол для ноутбука', category: 'Аксессуары', price: 2190, emoji: '💻' },
  { id: 8, title: 'Подставка для телефона', category: 'Аксессуары', price: 990, emoji: '📱', isNew: true },
];

export const formatPrice = (value: number) =>
  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(value);
