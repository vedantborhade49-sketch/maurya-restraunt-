import { createClient } from "@supabase/supabase-js";
import menuData from "../maurya_menu.json";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const isSupabaseConfigured = supabaseUrl && supabaseAnonKey;
export const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null;

// Mock database state for client-side fallback
const MOCK_STORAGE_KEY = "maurya_mock_db";

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
      // Map some signature/bestsellers for aesthetics
      const isSignature = dish.name.toLowerCase().includes("maratha") || 
                           dish.name.toLowerCase().includes("biryani") ||
                           dish.name.toLowerCase().includes("special");
      const isBestseller = dish.price > 200 && Math.random() > 0.6;
      const isSpicy = dish.name.toLowerCase().includes("chilli") || 
                      dish.name.toLowerCase().includes("spring") ||
                      dish.name.toLowerCase().includes("maratha");

      const itemTags: string[] = [];
      if (isSpicy) itemTags.push("spicy");
      if (isSignature || isBestseller) itemTags.push("maurya_favourite");
      
      const lowerName = dish.name.toLowerCase();
      const lowerDesc = (dish.description || "").toLowerCase();
      
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

      const dishImage =
        dish.image_url && dish.image_url.trim() !== ""
          ? dish.image_url
          : catName.toUpperCase().includes("STARTER") || catName.toUpperCase().includes("SOUP")
          ? "/editorial-food-starters.png"
          : catName.toUpperCase().includes("DOSA") || catName.toUpperCase().includes("UTTAPAM")
          ? "/editorial-food-dosa.png"
          : catName.toUpperCase().includes("MAIN")
          ? "/editorial-food-mains.png"
          : catName.toUpperCase().includes("RICE")
          ? "/editorial-food-rice.png"
          : catName.toUpperCase().includes("DESSERT")
          ? "/editorial-food-desserts.png"
          : catName.toUpperCase().includes("BEVERAGE")
          ? "/editorial-food-beverages.png"
          : "/editorial-food-starters.png";

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
      if (!error) return data;
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
      if (!error) return data;
    }
    const dbData = getMockDB();
    return dbData.items;
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
