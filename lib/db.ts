import { createClient } from "@supabase/supabase-js";
import menuData from "../maurya_menu.json";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const isSupabaseConfigured = supabaseUrl && supabaseAnonKey;
export const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null;

// Mock database state for client-side fallback
const MOCK_STORAGE_KEY = "maurya_mock_db_v6_bestsellers_only";

interface Category {
  id: string;
  name: string;
  slug: string;
  display_order: number;
}

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image_url: string;
  category: string;
  is_veg: boolean;
  is_available: boolean;
  is_bestseller: boolean;
  is_signature: boolean;
  is_spicy: boolean;
  tags?: string[];
}

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  order_type: "DELIVERY" | "PICKUP";
  address?: string;
  landmark?: string;
  pincode?: string;
  subtotal: number;
  total: number;
  payment_preference: string;
  special_instructions?: string;
  status: string;
  created_at: string;
  items: any[];
}

interface Reservation {
  id: string;
  customer_name: string;
  phone: string;
  reservation_date: string;
  reservation_time: string;
  guest_count: number;
  occasion?: string;
  special_request?: string;
  status: string;
  created_at: string;
}

// Smart dish image resolver to ensure authentic imagery per dish type
export const resolveDishImage = (dishName?: string, catName?: string, existingUrl?: string) => {
  const lowerName = (dishName || "").toLowerCase();
  const lowerCat = (catName || "").toLowerCase();

  // 1. Green Salad / Salads / Kachumber
  if (lowerName.includes("green salad") || lowerName.includes("tossed salad") || lowerName.includes("salad") || lowerName.includes("kachumber")) {
    return "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80";
  }

  // 2. Roasted Papad / Masala Papad / Fried Papad
  if (lowerName.includes("masala papad")) {
    return "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80";
  }
  if (lowerName.includes("papad") || lowerName.includes("papadum") || lowerName.includes("fryum")) {
    return "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80";
  }

  // 3. Pav Bhaji & Bhaji Variations (Differentiated so all bhaji dishes do NOT look the same!)
  if (lowerName.includes("cheese") && (lowerName.includes("pav") || lowerName.includes("bhaji"))) {
    return "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80";
  }
  if (lowerName.includes("paneer") && (lowerName.includes("pav") || lowerName.includes("bhaji"))) {
    return "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80";
  }
  if ((lowerName.includes("khada") || lowerName.includes("special") || lowerName.includes("jain")) && (lowerName.includes("pav") || lowerName.includes("bhaji"))) {
    return "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80";
  }
  if (lowerName.includes("pav") && lowerName.includes("bhaji")) {
    return "/dish-pav-bhaji.png";
  }
  if (lowerName.includes("bhaji") || lowerName.includes("sabzi") || lowerName.includes("subzi") || lowerName.includes("bharta") || lowerName.includes("fry")) {
    return "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80";
  }

  // 4. Cheese Balls (Must be before Manchurian/65 rule!)
  if (lowerName.includes("cheese ball") || lowerName.includes("cheeseball") || lowerName.includes("cheese-ball")) {
    return "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=600&q=80";
  }

  // 5. Thali / Thalik / Platter
  if (lowerName.includes("thali") || lowerName.includes("thalik") || lowerName.includes("platter")) {
    return "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80";
  }

  // 6. Fried Rice / Schezwan Rice (Must be before Biryani / general Rice!)
  if (lowerName.includes("fried rice") || lowerName.includes("schezwan rice") || lowerName.includes("triple rice") || lowerName.includes("garlic rice") || lowerName.includes("singapore rice") || lowerName.includes("hong kong rice")) {
    return "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80";
  }

  // 7. Dry Fruit Milkshake / Badam Shake / Milkshakes
  if (lowerName.includes("dry fruit") || lowerName.includes("shake") || lowerName.includes("badam milk") || lowerName.includes("smoothie") || lowerName.includes("mastani")) {
    return "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80";
  }

  // 8. Apple Juice / Fresh Juices / Mocktails
  if (lowerName.includes("apple juice") || lowerName.includes("juice") || lowerName.includes("coolers") || lowerName.includes("mocktail") || lowerName.includes("soda") || lowerName.includes("mojito")) {
    return "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80";
  }

  // 9. Hakka Noodles / Chowmein
  if (lowerName.includes("noodle") || lowerName.includes("chowmein") || lowerName.includes("hakka")) {
    return "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=600&q=80";
  }

  // 10. Spring Rolls / Dragon Rolls
  if (lowerName.includes("spring roll") || lowerName.includes("dragon roll")) {
    return "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80";
  }

  // 11. Falooda / Desserts / Ice Cream
  if (lowerName.includes("falooda") || lowerName.includes("kulfi") || lowerName.includes("ice cream") || lowerName.includes("jamun") || lowerName.includes("brownie") || lowerName.includes("sundae") || lowerName.includes("halwa")) {
    return "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80";
  }

  // 12. Tea / Coffee / Chai / Lassi
  if (lowerName.includes("coffee") || lowerName.includes("tea") || lowerName.includes("chai") || lowerName.includes("lassi") || lowerName.includes("taak") || lowerName.includes("buttermilk")) {
    return "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80";
  }

  // 13. Dosa
  if (lowerName.includes("dosa")) return "/dish-masala-dosa.png";

  // 14. Uttapam
  if (lowerName.includes("uttapam")) return "/dish-uttapam.png";

  // 15. Idli / Vada / Medu Vada
  if (lowerName.includes("idli") || lowerName.includes("vada") || lowerName.includes("wada")) return "/dish-idli-vada.png";

  // 16. Biryani / Pulao
  if (lowerName.includes("biryani") || lowerName.includes("pulao")) return "/dish-veg-biryani.png";

  // 17. Paneer / Curries / Mains
  if (lowerName.includes("paneer") || lowerName.includes("maratha") || lowerName.includes("jaipuri") || lowerName.includes("kofta") || lowerName.includes("kadhai") || lowerName.includes("masala") || lowerName.includes("handi") || lowerName.includes("kolhapuri") || lowerName.includes("korma")) return "/dish-paneer-butter-masala.png";

  // 18. Manchurian / Starters
  if (lowerName.includes("manchurian") || lowerName.includes("crispy") || lowerName.includes("65") || lowerName.includes("chilli")) return "/dish-manchurian.png";

  // 19. Breads / Naan / Roti
  if (lowerName.includes("naan") || lowerName.includes("roti") || lowerName.includes("kulcha") || lowerName.includes("paratha") || lowerName.includes("bread") || lowerName.includes("phulka") || lowerName.includes("chapati")) return "/dish-butter-naan.png";

  // 20. Soup
  if (lowerName.includes("soup") || lowerCat.includes("soup")) return "/dish-hot-sour-soup.png";

  // 21. Sandwich
  if (lowerName.includes("sandwich") || lowerName.includes("toast") || lowerCat.includes("sandwich")) return "/dish-club-sandwich.png";

  // 20. Existing valid custom URLs
  if (existingUrl && existingUrl.trim() !== "" && !existingUrl.includes("hashtagloyalty.com")) {
    return existingUrl;
  }

  // 21. Category Fallbacks
  if (lowerCat.includes("starter") || lowerCat.includes("soup")) return "/editorial-food-starters.png";
  if (lowerCat.includes("dosa") || lowerCat.includes("uttapam")) return "/editorial-food-dosa.png";
  if (lowerCat.includes("main")) return "/editorial-food-mains.png";
  if (lowerCat.includes("rice")) return "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80";
  if (lowerCat.includes("dessert")) return "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80";
  if (lowerCat.includes("beverage")) return "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80";

  return "/editorial-food-starters.png";
};

// Seed the mock database
const getInitialMockData = () => {
  const categories: Category[] = Object.keys(menuData).map((catName, idx) => ({
    id: `cat-${idx + 1}`,
    name: catName,
    slug: catName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    display_order: idx + 1,
  }));

  const items: MenuItem[] = [];
  let itemCounter = 1;
  
  Object.entries(menuData).forEach(([catName, dishList]) => {
    (dishList as any[]).forEach((dish) => {
      const lowerName = dish.name.toLowerCase();
      const lowerDesc = (dish.description || "").toLowerCase();

      // Only assign Bestseller / Signature tags to specific popular dishes
      const isPopularBestseller = [
        "paneer butter masala",
        "butter naan",
        "pav bhaji",
        "pavbhaji",
        "veg maratha",
        "hakka noodles",
        "gobi manchurian",
        "maurya veg biryani",
        "veg biryani",
        "mysore cheese masala dosa",
        "cheese ball",
        "spring roll"
      ].some((p) => lowerName.includes(p));

      const isSignature = lowerName.includes("maratha") || lowerName.includes("special");
      const isBestseller = isPopularBestseller;
      const isSpicy = lowerName.includes("chilli") || lowerName.includes("spring") || lowerName.includes("maratha");

      const itemTags: string[] = [];
      if (isSpicy) itemTags.push("spicy");
      if (isSignature || isBestseller) itemTags.push("maurya_favourite");

      if (
        lowerName.includes("paneer") || 
        lowerName.includes("butter") || 
        lowerName.includes("cheese") || 
        lowerName.includes("kofta") || 
        lowerName.includes("kadhai") ||
        lowerDesc.includes("cream") ||
        lowerDesc.includes("rich")
      ) {
        itemTags.push("rich");
      }
      
      if (
        catName.toLowerCase().includes("starter") || 
        catName.toLowerCase().includes("soup") || 
        catName.toLowerCase().includes("beverage") ||
        lowerName.includes("soup") ||
        lowerName.includes("fry") ||
        lowerName.includes("chilli")
      ) {
        itemTags.push("quick");
      }
      
      if (
        catName.toLowerCase().includes("biryani") || 
        catName.toLowerCase().includes("main") ||
        lowerName.includes("platter") || 
        lowerName.includes("thali") ||
        lowerName.includes("family") ||
        lowerDesc.includes("share") ||
        lowerDesc.includes("sharing")
      ) {
        itemTags.push("sharing");
      }
      
      if (
        catName.toLowerCase().includes("beverage") || 
        catName.toLowerCase().includes("soup") || 
        lowerName.includes("salad") || 
        lowerName.includes("roti") || 
        lowerName.includes("phulka") ||
        lowerDesc.includes("light") ||
        lowerDesc.includes("healthy")
      ) {
        itemTags.push("light");
      }

      if (itemTags.length === 0) {
        itemTags.push("quick");
      }

      const dishImage = resolveDishImage(dish.name, catName, dish.image_url);

      items.push({
        id: dish.id || `item-${itemCounter++}`,
        name: dish.name,
        price: dish.price,
        description: dish.description || `${dish.name} - Freshly prepared using signature Maurya ingredients.`,
        image_url: dishImage,
        category: catName,
        is_veg: true,
        is_available: true,
        is_bestseller: isBestseller,
        is_signature: isSignature,
        is_spicy: isSpicy,
        tags: itemTags,
      });
    });
  });

  const orders: Order[] = [];
  const reservations: Reservation[] = [];
  
  return { categories, items, orders, reservations };
};

// Safe helper for client-side storage retrieval
const getMockDB = () => {
  if (typeof window === "undefined") {
    return getInitialMockData();
  }
  
  const saved = localStorage.getItem(MOCK_STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse mock database", e);
    }
  }
  
  const initial = getInitialMockData();
  localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(initial));
  return initial;
};

const saveMockDB = (data: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(data));
  }
};

// Database Service API Wrapper
export const db = {
  isMock: !isSupabaseConfigured,

  // CATEGORIES
  async getCategories() {
    if (supabase) {
      const { data, error } = await supabase.from("categories").select("*").order("display_order");
      if (!error && data && data.length > 0) return data;
    }
    const dbData = getMockDB();
    return dbData.categories;
  },

  async createCategory(name: string) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    if (supabase) {
      const { data, error } = await supabase.from("categories").insert([{ name, slug }]).select().single();
      if (!error) return data;
    }
    
    const dbData = getMockDB();
    const newCat = {
      id: `cat-${Date.now()}`,
      name,
      slug,
      display_order: dbData.categories.length + 1,
    };
    dbData.categories.push(newCat);
    saveMockDB(dbData);
    return newCat;
  },

  // MENU ITEMS
  async getMenuItems() {
    if (supabase) {
      const { data, error } = await supabase.from("menu_items").select("*").order("display_order");
      if (!error && data && data.length > 0) {
        return data.map((item: any) => ({
          ...item,
          image_url: resolveDishImage(item.name, item.category, item.image_url),
        }));
      }
    }
    const dbData = getMockDB();
    return dbData.items.map((item: any) => ({
      ...item,
      image_url: resolveDishImage(item.name, item.category, item.image_url),
    }));
  },

  async updateMenuItem(id: string, updates: Partial<MenuItem>) {
    if (supabase) {
      const { data, error } = await supabase.from("menu_items").update(updates).eq("id", id).select().single();
      if (!error) return data;
    }
    
    const dbData = getMockDB();
    dbData.items = dbData.items.map((item: MenuItem) => 
      item.id === id ? { ...item, ...updates } : item
    );
    saveMockDB(dbData);
    return dbData.items.find((item: MenuItem) => item.id === id);
  },

  async createMenuItem(itemData: Omit<MenuItem, "id">) {
    if (supabase) {
      const { data, error } = await supabase.from("menu_items").insert([itemData]).select().single();
      if (!error) return data;
    }
    
    const dbData = getMockDB();
    const newItem = {
      ...itemData,
      id: `item-${Date.now()}`,
    };
    dbData.items.push(newItem);
    saveMockDB(dbData);
    return newItem;
  },

  async deleteMenuItem(id: string) {
    if (supabase) {
      const { error } = await supabase.from("menu_items").delete().eq("id", id);
      if (!error) return true;
    }
    
    const dbData = getMockDB();
    dbData.items = dbData.items.filter((item: MenuItem) => item.id !== id);
    saveMockDB(dbData);
    return true;
  },

  // ORDERS
  async createOrder(orderData: any, items: any[]) {
    // Generate Order Number: MV-YYYYMM-XXXX
    const now = new Date();
    const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}`;
    const rand = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `MV-${dateStr}-${rand}`;

    const completeOrder = {
      ...orderData,
      order_number: orderNumber,
      status: "initiated",
      whatsapp_opened: false,
      created_at: new Date().toISOString(),
    };

    if (supabase) {
      const { data: order, error: orderErr } = await supabase.from("orders").insert([completeOrder]).select().single();
      if (!orderErr && order) {
        const orderItems = items.map((i) => ({
          order_id: order.id,
          menu_item_id: i.item.id,
          item_name: i.item.name,
          item_price: i.item.price,
          quantity: i.quantity,
          line_total: i.item.price * i.quantity,
        }));
        await supabase.from("order_items").insert(orderItems);
        return order;
      }
    }

    // Mock implementation
    const dbData = getMockDB();
    const newOrder = {
      ...completeOrder,
      id: `order-${Date.now()}`,
      items: items.map((i) => ({
        item_name: i.item.name,
        item_price: i.item.price,
        quantity: i.quantity,
        line_total: i.item.price * i.quantity,
      })),
    };
    dbData.orders.unshift(newOrder);
    saveMockDB(dbData);
    return newOrder;
  },

  async updateOrderStatus(orderId: string, status: string) {
    if (supabase) {
      const { data, error } = await supabase.from("orders").update({ status }).eq("id", orderId).select().single();
      if (!error) return data;
    }
    
    const dbData = getMockDB();
    dbData.orders = dbData.orders.map((o: any) => 
      o.id === orderId ? { ...o, status } : o
    );
    saveMockDB(dbData);
    return dbData.orders.find((o: any) => o.id === orderId);
  },

  async markOrderWhatsAppOpened(orderId: string) {
    if (supabase) {
      await supabase.from("orders").update({ whatsapp_opened: true, status: "whatsapp_opened" }).eq("id", orderId);
      return;
    }
    const dbData = getMockDB();
    dbData.orders = dbData.orders.map((o: any) => 
      o.id === orderId ? { ...o, whatsapp_opened: true, status: "whatsapp_opened" } : o
    );
    saveMockDB(dbData);
  },

  async getOrders() {
    if (supabase) {
      const { data, error } = await supabase.from("orders").select("*, order_items(*)").order("created_at", { ascending: false });
      if (!error) return data;
    }
    const dbData = getMockDB();
    return dbData.orders;
  },

  // RESERVATIONS
  async createReservation(resData: any) {
    const completeRes = {
      ...resData,
      status: "requested",
      created_at: new Date().toISOString(),
    };

    if (supabase) {
      const { data, error } = await supabase.from("reservations").insert([completeRes]).select().single();
      if (!error) return data;
    }

    const dbData = getMockDB();
    const newRes = {
      ...completeRes,
      id: `res-${Date.now()}`,
    };
    dbData.reservations.unshift(newRes);
    saveMockDB(dbData);
    return newRes;
  },

  async updateReservationStatus(resId: string, status: string) {
    if (supabase) {
      const { data, error } = await supabase.from("reservations").update({ status }).eq("id", resId).select().single();
      if (!error) return data;
    }
    
    const dbData = getMockDB();
    dbData.reservations = dbData.reservations.map((r: any) => 
      r.id === resId ? { ...r, status } : r
    );
    saveMockDB(dbData);
    return dbData.reservations.find((r: any) => r.id === resId);
  },

  async getReservations() {
    if (supabase) {
      const { data, error } = await supabase.from("reservations").select("*").order("created_at", { ascending: false });
      if (!error) return data;
    }
    const dbData = getMockDB();
    return dbData.reservations;
  },

  // MOCK LOGIN
  async adminLogin(password: string) {
    // Basic verification password for local demo
    return password === "maurya123";
  },
};
