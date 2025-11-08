export interface CategoryItem {
  category_title:
    | "All"
    | "Spaghetti"
    | "Pizza"
    | "Rice"
    | "Noodles"
    | "Chicken"
    | "Drinks";
}

export interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  category: CategoryItem["category_title"];
}

export declare const categoryItem: CategoryItem[];
export declare const product: Product[];
