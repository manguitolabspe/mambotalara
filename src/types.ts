export type Category = {
  id: string;
  label: string;
};

export type MenuItem = {
  id: number;
  categoryId: string;
  subCategory?: string;
  tag: string;
  isTop: boolean;
  title: string;
  price: string;
  description: string;
  image: string;
};

export type CartItem = {
  cartItemId: string;
  item: MenuItem;
  quantity: number;
  comment: string;
};
