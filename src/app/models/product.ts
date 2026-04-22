export interface ProductImage {
  src: string;
  alt: string;
}

export interface ProductSpec {
  name: string;
  value: string;
}

export interface Product {
  id: string;
  title: string;
  category: string;
  price: string;
  summary: string;
  description: string;
  image: ProductImage;
  includes: string[];
  specs: ProductSpec[];
}
