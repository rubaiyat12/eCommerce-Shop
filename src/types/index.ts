export interface IReview {
    rating: number;
    comment: string;
    date: string; 
    reviewerName: string;
    reviewerEmail: string;
  }
  export type Theme = 'light' | 'dark';

export interface ThemeState {
  mode: Theme;
}
export type FormValues = {
  title: string;
  description: string;
  price: number | null;
  stock: number | null;
  brand: string;
  category: string;
};