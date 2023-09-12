interface ProductType {
  _id: number;
  name: string;
  details: string;
  price: number;
  image: any;
  quantity: number;
  slug: { current: string };
}

interface HeroBannerType {
  smallText: string;
  saleTime: string;
  product: string;
  largeText2: string;
  discount: string;
  midText: string;
  largeText1: string;
  buttonText: string;
  image: { _type: string; asset: object };
  desc: string;
}
