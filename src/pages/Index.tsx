import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  sizes: string[];
}

const products: Product[] = [
  {
    id: 1,
    name: "Минималистичная футболка",
    price: 2990,
    originalPrice: 3990,
    image: "/img/4942ca11-66b2-4794-85e5-62465a5c1cf4.jpg",
    rating: 4.8,
    reviews: 127,
    category: "Футболки",
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 2,
    name: "Элегантное платье",
    price: 7990,
    image: "/img/9d940ba2-d46a-4f36-951a-62ac2193a1a9.jpg",
    rating: 4.9,
    reviews: 89,
    category: "Платья",
    sizes: ["XS", "S", "M", "L"]
  },
  {
    id: 3,
    name: "Белые кроссовки",
    price: 8990,
    image: "/img/bb99f7c6-0451-4022-8b29-4c535ef1cd42.jpg",
    rating: 4.7,
    reviews: 203,
    category: "Обувь",
    sizes: ["36", "37", "38", "39", "40", "41", "42"]
  },
  {
    id: 4,
    name: "Классические джинсы",
    price: 5990,
    originalPrice: 7990,
    image: "/img/4942ca11-66b2-4794-85e5-62465a5c1cf4.jpg",
    rating: 4.6,
    reviews: 156,
    category: "Джинсы",
    sizes: ["26", "28", "30", "32", "34"]
  },
  {
    id: 5,
    name: "Базовый свитер",
    price: 4990,
    image: "/img/9d940ba2-d46a-4f36-951a-62ac2193a1a9.jpg",
    rating: 4.8,
    reviews: 92,
    category: "Свитеры",
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 6,
    name: "Лаконичная куртка",
    price: 12990,
    image: "/img/bb99f7c6-0451-4022-8b29-4c535ef1cd42.jpg",
    rating: 4.9,
    reviews: 74,
    category: "Куртки",
    sizes: ["S", "M", "L", "XL"]
  }
];

const categories = ["Все", "Футболки", "Платья", "Обувь", "Джинсы", "Свитеры", "Куртки"];

const ProductCard = ({ product }: { product: Product }) => {
  const [isLiked, setIsLiked] = useState(false);
  
  return (
    <Card className="group overflow-hidden border-0 shadow-none hover:shadow-lg transition-all duration-300 bg-white">
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm hover:bg-white"
          onClick={() => setIsLiked(!isLiked)}
        >
          <Icon 
            name="Heart" 
            size={18} 
            className={isLiked ? "fill-red-500 text-red-500" : "text-gray-600"} 
          />
        </Button>
        {product.originalPrice && (
          <Badge variant="destructive" className="absolute top-4 left-4">
            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
          </Badge>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="font-montserrat font-medium text-lg mb-2 text-black">{product.name}</h3>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Icon name="Star" size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-black">{product.rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">({product.reviews} отзывов)</span>
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <span className="font-montserrat font-semibold text-xl text-black">{product.price.toLocaleString()} ₽</span>
          {product.originalPrice && (
            <span className="text-muted-foreground line-through">{product.originalPrice.toLocaleString()} ₽</span>
          )}
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {product.sizes.slice(0, 4).map((size) => (
            <Badge key={size} variant="outline" className="text-xs">
              {size}
            </Badge>
          ))}
          {product.sizes.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{product.sizes.length - 4}
            </Badge>
          )}
        </div>
        
        <Button className="w-full font-montserrat bg-black text-white hover:bg-gray-800">
          В корзину
        </Button>
      </div>
    </Card>
  );
};

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Все");
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Все" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="font-montserrat font-bold text-2xl text-black">CLOTHING STORE</h1>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Input
                  placeholder="Поиск товаров..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-80 pl-10 border-gray-200 focus:border-black"
                />
                <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              
              <Button size="icon" variant="ghost" className="relative">
                <Icon name="ShoppingBag" size={20} className="text-black" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs bg-black text-white">
                  3
                </Badge>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="font-montserrat font-bold text-5xl text-black mb-6">
            Минималистичная мода
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Откройте для себя коллекцию чистых линий и безупречного качества. 
            Каждая вещь создана с вниманием к деталям.
          </p>
          <Button size="lg" className="font-montserrat bg-black text-white hover:bg-gray-800 px-8">
            Смотреть коллекцию
          </Button>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap font-montserrat ${
                  selectedCategory === category 
                    ? "bg-black text-white hover:bg-gray-800" 
                    : "border-gray-200 text-black hover:bg-gray-50"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-montserrat font-semibold text-2xl text-black">
              {selectedCategory === "Все" ? "Все товары" : selectedCategory}
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Найдено: {filteredProducts.length}</span>
              <Button variant="outline" size="sm" className="border-gray-200">
                <Icon name="SlidersHorizontal" size={16} className="mr-2" />
                Фильтры
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <Icon name="Search" size={48} className="mx-auto text-gray-300 mb-4" />
              <h4 className="font-montserrat font-medium text-xl text-black mb-2">
                Товары не найдены
              </h4>
              <p className="text-muted-foreground">
                Попробуйте изменить поисковый запрос или выбрать другую категорию
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-montserrat font-bold text-lg mb-4">CLOTHING STORE</h4>
              <p className="text-gray-300 text-sm">
                Магазин минималистичной одежды для тех, кто ценит качество и стиль.
              </p>
            </div>
            
            <div>
              <h5 className="font-montserrat font-medium mb-4">Покупателям</h5>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Доставка</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Возврат</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Размеры</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Отзывы</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-montserrat font-medium mb-4">Компания</h5>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Карьера</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Пресса</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-montserrat font-medium mb-4">Социальные сети</h5>
              <div className="flex gap-3">
                <Button size="icon" variant="ghost" className="text-gray-300 hover:text-white">
                  <Icon name="Instagram" size={20} />
                </Button>
                <Button size="icon" variant="ghost" className="text-gray-300 hover:text-white">
                  <Icon name="Facebook" size={20} />
                </Button>
                <Button size="icon" variant="ghost" className="text-gray-300 hover:text-white">
                  <Icon name="Twitter" size={20} />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
            © 2024 Clothing Store. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;