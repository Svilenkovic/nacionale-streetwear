import { Product, Collection } from './types';

export const mockCollections: Collection[] = [
  {
    id: 1,
    name: "Aetherea",
    slug: "aetherea",
    description: "Apstraktna geometrija svetla pretočena u tkaninu — primarna kolekcija.",
    image_url: "",
    is_active: 1
  }
];

export const mockProducts: Product[] = [
  {
    id: 101, collection_id: 1, name: "AETHER", slug: "obelisk-aether",
    description: "Mat crna sa gradijentom u dubini. Forma koja apsorbuje svetlost i pretvara je u tišinu.",
    price: 8500, discount_price: null, sizes: JSON.stringify(["S", "M", "L", "XL"]), colors: JSON.stringify(["#111111"]), design_image: "AETHER", is_featured: 1, stock_status: "in_stock",
    image_url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 102, collection_id: 1, name: "ZENITH", slug: "obelisk-zenith",
    description: "Krem ton — referenca na trenutak najvišeg svetla. Suva, otvorena pamučna tekstura.",
    price: 9000, discount_price: null, sizes: JSON.stringify(["M", "L", "XL"]), colors: JSON.stringify(["#f0ece4"]),  design_image: "ZENITH", is_featured: 1, stock_status: "in_stock",
    image_url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 103, collection_id: 1, name: "AURORA", slug: "obelisk-aurora",
    description: "Zlatni preplet, robustna tekstura. Limitirani komad iz primarne edicije — broj komada svedoči o nameri.",
    price: 11000, discount_price: 9500, sizes: JSON.stringify(["S", "M", "L"]), colors: JSON.stringify(["#c9a84c"]), design_image: "AURORA", is_featured: 1, stock_status: "in_stock",
    image_url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 104, collection_id: 1, name: "ECLIPSE", slug: "obelisk-eclipse",
    description: "Tamni zemljani ton. Svakodnevna forma sa komandnom prisutnošću.",
    price: 8500, discount_price: null, sizes: JSON.stringify(["S", "M", "L", "XL", "XXL"]), colors: JSON.stringify(["#3d301b"]), design_image: "ECLIPSE", is_featured: 0, stock_status: "in_stock",
    image_url: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 105, collection_id: 1, name: "SOLSTICE", slug: "obelisk-solstice",
    description: "Maslinasti podtonovi. Lagani organski pamuk — namenjen prelaznim dnevnim trenucima.",
    price: 9000, discount_price: null, sizes: JSON.stringify(["M", "L"]), colors: JSON.stringify(["#4a503d"]), design_image: "SOLSTICE", is_featured: 0, stock_status: "in_stock",
    image_url: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 106, collection_id: 1, name: "ONYX", slug: "obelisk-onyx",
    description: "Najgušća tkanina iz palete. Hladni grafit kao standard — bez kompromisa po pitanju forme.",
    price: 12000, discount_price: 10000, sizes: JSON.stringify(["S", "L", "XL"]), colors: JSON.stringify(["#1a1c29"]), design_image: "ONYX", is_featured: 0, stock_status: "out_of_stock",
    image_url: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 107, collection_id: 1, name: "ORACLE", slug: "obelisk-oracle",
    description: "Apsolutno belo. Klasičan kroj bez modernih kompromisa po pitanju kvaliteta tkanja.",
    price: 8500, discount_price: null, sizes: JSON.stringify(["S", "M", "L"]), colors: JSON.stringify(["#ffffff"]), design_image: "ORACLE", is_featured: 0, stock_status: "in_stock",
    image_url: "https://images.unsplash.com/photo-1527719327859-c6ce80353573?q=80&w=800&auto=format&fit=crop"
  }
];
