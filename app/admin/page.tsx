"use client";

import React, { useState, useEffect } from "react";
import { db } from "../../lib/db";
import { MenuItem } from "../../stores/table-store";
import { 
  TrendingUp, 
  ShoppingBag, 
  Calendar, 
  Plus, 
  Edit2, 
  Trash2, 
  LogOut, 
  Grid, 
  BookOpen,
  DollarSign, 
  Eye, 
  ShieldAlert,
  Save,
  X,
  CheckCircle,
  Clock,
  Sparkles
} from "lucide-react";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  
  // Navigation
  const [activeTab, setActiveTab] = useState<"dashboard" | "menu" | "categories">("dashboard");
  
  // Database States
  const [orders, setOrders] = useState<any[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  
  // UI Modals / Form States
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  
  // Item Form Fields
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState(0);
  const [itemDesc, setItemDesc] = useState("");
  const [itemImg, setItemImg] = useState("");
  const [itemCat, setItemCat] = useState("");
  const [itemVeg, setItemVeg] = useState(true);
  const [itemAvailable, setItemAvailable] = useState(true);
  const [itemBestseller, setItemBestseller] = useState(false);
  const [itemSignature, setItemSignature] = useState(false);
  const [itemSpicy, setItemSpicy] = useState(false);
  
  // Category Form Fields
  const [newCatName, setNewCatName] = useState("");

  useEffect(() => {
    const logged = sessionStorage.getItem("maurya_admin_logged_in") === "true";
    if (logged) {
      setIsLoggedIn(true);
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    const fetchedOrders = await db.getOrders();
    const fetchedReservations = await db.getReservations();
    const fetchedCategories = await db.getCategories();
    const fetchedMenuItems = await db.getMenuItems();

    setOrders(fetchedOrders);
    setReservations(fetchedReservations);
    setCategories(fetchedCategories);
    setMenuItems(fetchedMenuItems);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await db.adminLogin(password);
    if (success) {
      setIsLoggedIn(true);
      sessionStorage.setItem("maurya_admin_logged_in", "true");
      fetchData();
    } else {
      setLoginError("Invalid password. Try 'maurya123'");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("maurya_admin_logged_in");
  };

  // Status Modifiers
  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    await db.updateOrderStatus(orderId, status);
    fetchData();
  };

  const handleUpdateReservationStatus = async (resId: string, status: string) => {
    await db.updateReservationStatus(resId, status);
    fetchData();
  };

  // Menu Modifiers
  const resetItemForm = () => {
    setItemName("");
    setItemPrice(0);
    setItemDesc("");
    setItemImg("");
    setItemCat(categories[0]?.name || "");
    setItemVeg(true);
    setItemAvailable(true);
    setItemBestseller(false);
    setItemSignature(false);
    setItemSpicy(false);
    setEditingItem(null);
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: itemName,
      price: itemPrice,
      description: itemDesc,
      image_url: itemImg,
      category: itemCat || categories[0]?.name || "Recommended",
      is_veg: itemVeg,
      is_available: itemAvailable,
      is_bestseller: itemBestseller,
      is_signature: itemSignature,
      is_spicy: itemSpicy,
      display_order: menuItems.length + 1
    };

    await db.createMenuItem(payload);
    setIsAddingItem(false);
    resetItemForm();
    fetchData();
  };

  const handleStartEdit = (item: MenuItem) => {
    setEditingItem(item);
    setItemName(item.name);
    setItemPrice(item.price);
    setItemDesc(item.description);
    setItemImg(item.image_url);
    setItemCat(item.category || "");
    setItemVeg(item.is_veg ?? true);
    setItemAvailable(item.is_available ?? true);
    setItemBestseller(item.is_bestseller ?? false);
    setItemSignature(item.is_signature ?? false);
    setItemSpicy(item.is_spicy ?? false);
    setIsAddingItem(true);
  };

  const handleEditItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    
    const updates = {
      name: itemName,
      price: itemPrice,
      description: itemDesc,
      image_url: itemImg,
      category: itemCat,
      is_veg: itemVeg,
      is_available: itemAvailable,
      is_bestseller: itemBestseller,
      is_signature: itemSignature,
      is_spicy: itemSpicy,
    };

    await db.updateMenuItem(editingItem.id, updates);
    setIsAddingItem(false);
    resetItemForm();
    fetchData();
  };

  const handleDeleteItem = async (itemId: string) => {
    if (confirm("Are you sure you want to delete this dish?")) {
      await db.deleteMenuItem(itemId);
      fetchData();
    }
  };

  // Category Modifiers
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newCatName.trim().length > 0) {
      await db.createCategory(newCatName);
      setNewCatName("");
      setIsAddingCategory(false);
      fetchData();
    }
  };

  // Analytics Stats calculations
  const stats = React.useMemo(() => {
    const totalOrders = orders.length;
    const whatsAppOpens = orders.filter(o => o.status === "whatsapp_opened" || o.whatsapp_opened).length;
    const estIntentValue = orders.reduce((acc, o) => acc + o.total, 0);
    
    // Find top dish by scanning order item lists
    const dishCounts: Record<string, number> = {};
    orders.forEach(o => {
      if (o.items) {
        o.items.forEach((i: any) => {
          dishCounts[i.item_name] = (dishCounts[i.item_name] || 0) + i.quantity;
        });
      }
    });
    let topDish = "None";
    let maxQty = 0;
    Object.entries(dishCounts).forEach(([name, qty]) => {
      if (qty > maxQty) {
        maxQty = qty;
        topDish = name;
      }
    });

    return { totalOrders, whatsAppOpens, estIntentValue, topDish };
  }, [orders]);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-midnight flex items-center justify-center px-4 relative">
        <div className="absolute inset-0 noise-bg" />
        <div className="max-w-sm w-full bg-wine/10 border border-white/10 p-8 rounded-2xl relative z-10 text-center">
          <div className="w-12 h-12 bg-gold/10 border border-gold/30 text-gold rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-6 h-6" />
          </div>
          <h1 className="font-heading text-2xl text-gold mb-2">Maurya Admin Portal</h1>
          <p className="text-xs text-soft-ivory/50 uppercase tracking-widest mb-6">Secure Gateway</p>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-soft-ivory/60 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-midnight border border-white/10 text-soft-ivory focus:outline-none focus:border-gold/40 text-sm transition-colors"
                placeholder="Password (demo: maurya123)"
              />
            </div>
            {loginError && (
              <span className="text-xs text-crimson block">{loginError}</span>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-crimson hover:bg-crimson/90 text-white rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-md active:translate-y-px"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-midnight text-soft-ivory flex">
      {/* Sidebar navigation */}
      <aside className="w-64 bg-wine/5 border-r border-white/5 flex flex-col justify-between p-6 shrink-0 hidden md:flex">
        <div className="space-y-8">
          <div>
            <h2 className="font-heading text-2xl text-gold tracking-widest uppercase">MAURYA</h2>
            <span className="text-[9px] uppercase tracking-widest text-soft-ivory/40">Owner Dashboard</span>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === "dashboard" ? "bg-gold text-midnight" : "text-soft-ivory/60 hover:bg-white/5 hover:text-soft-ivory"
              }`}
            >
              <TrendingUp className="w-4 h-4" /> Dashboard
            </button>
            <button
              onClick={() => setActiveTab("menu")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === "menu" ? "bg-gold text-midnight" : "text-soft-ivory/60 hover:bg-white/5 hover:text-soft-ivory"
              }`}
            >
              <BookOpen className="w-4 h-4" /> Menu Manager
            </button>
            <button
              onClick={() => setActiveTab("categories")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                activeTab === "categories" ? "bg-gold text-midnight" : "text-soft-ivory/60 hover:bg-white/5 hover:text-soft-ivory"
              }`}
            >
              <Grid className="w-4 h-4" /> Categories
            </button>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-crimson hover:text-white p-4 hover:bg-white/5 rounded-xl transition-all"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </aside>

      {/* Main body content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto max-h-screen">
        {/* Mobile Header */}
        <div className="flex md:hidden items-center justify-between mb-8 pb-4 border-b border-white/5">
          <h2 className="font-heading text-xl text-gold tracking-widest">MAURYA</h2>
          <div className="flex gap-2">
            <button 
              onClick={() => setActiveTab("dashboard")} 
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest ${
                activeTab === "dashboard" ? "bg-gold text-midnight" : "bg-white/5"
              }`}
            >
              Dash
            </button>
            <button 
              onClick={() => setActiveTab("menu")} 
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest ${
                activeTab === "menu" ? "bg-gold text-midnight" : "bg-white/5"
              }`}
            >
              Menu
            </button>
            <button onClick={handleLogout} className="p-2 text-crimson"><LogOut className="w-4 h-4" /></button>
          </div>
        </div>

        {/* ACTIVE TAB: DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            <h1 className="font-heading text-3xl text-soft-ivory tracking-wide">Overview & Operations</h1>
            
            {/* Stats grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-wine/5 border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-soft-ivory/50 block">Orders Initiated</span>
                  <span className="text-3xl font-heading font-bold text-gold mt-2 block">{stats.totalOrders}</span>
                </div>
                <ShoppingBag className="w-8 h-8 text-gold/30" />
              </div>

              <div className="p-6 rounded-2xl bg-wine/5 border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-soft-ivory/50 block">WhatsApp Opens</span>
                  <span className="text-3xl font-heading font-bold text-gold mt-2 block">{stats.whatsAppOpens}</span>
                </div>
                <CheckCircle className="w-8 h-8 text-gold/30" />
              </div>

              <div className="p-6 rounded-2xl bg-wine/5 border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-soft-ivory/50 block">Estimated Intent Value</span>
                  <span className="text-3xl font-mono font-bold text-gold mt-2 block">₹{stats.estIntentValue}</span>
                </div>
                <DollarSign className="w-8 h-8 text-gold/30" />
              </div>

              <div className="p-6 rounded-2xl bg-wine/5 border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-soft-ivory/50 block">Top Dish</span>
                  <span className="text-base font-semibold text-soft-ivory truncate mt-3 block max-w-[150px]">{stats.topDish}</span>
                </div>
                <Sparkles className="w-8 h-8 text-gold/30" />
              </div>
            </div>

            {/* Orders & Bookings lists */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Orders */}
              <div className="p-6 rounded-2xl bg-wine/5 border border-white/5">
                <h3 className="font-heading text-xl text-gold mb-6 tracking-wide">Recent Order Intentions</h3>
                <div className="space-y-4 max-h-96 overflow-y-auto no-scrollbar">
                  {orders.length === 0 ? (
                    <p className="text-xs text-soft-ivory/40">No orders recorded yet.</p>
                  ) : (
                    orders.map((o) => (
                      <div key={o.id} className="p-4 rounded-xl bg-midnight border border-white/5 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[10px] font-mono text-gold font-bold">{o.order_number}</span>
                            <h4 className="text-sm font-bold text-soft-ivory mt-1">{o.customer_name} ({o.customer_phone})</h4>
                          </div>
                          <select
                            value={o.status}
                            onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                            className="bg-wine/20 text-gold text-xs border border-white/10 p-1.5 rounded-lg focus:outline-none"
                          >
                            <option value="initiated">Initiated</option>
                            <option value="whatsapp_opened">WhatsApp Opened</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="preparing">Preparing</option>
                            <option value="out_for_delivery">Out for Delivery</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                        <div className="text-xs text-soft-ivory/60 space-y-1">
                          <p>{o.order_type} • {o.payment_preference} • Total: <span className="font-bold text-gold font-mono">₹{o.total}</span></p>
                          {o.address && <p className="truncate">Addr: {o.address}</p>}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Reservations */}
              <div className="p-6 rounded-2xl bg-wine/5 border border-white/5">
                <h3 className="font-heading text-xl text-gold mb-6 tracking-wide">Booking Requests</h3>
                <div className="space-y-4 max-h-96 overflow-y-auto no-scrollbar">
                  {reservations.length === 0 ? (
                    <p className="text-xs text-soft-ivory/40">No table bookings recorded yet.</p>
                  ) : (
                    reservations.map((r) => (
                      <div key={r.id} className="p-4 rounded-xl bg-midnight border border-white/5 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-sm font-bold text-soft-ivory">{r.customer_name}</h4>
                            <p className="text-[10px] text-soft-ivory/50 mt-0.5">{r.phone}</p>
                          </div>
                          <select
                            value={r.status}
                            onChange={(e) => handleUpdateReservationStatus(r.id, e.target.value)}
                            className="bg-wine/20 text-gold text-xs border border-white/10 p-1.5 rounded-lg focus:outline-none"
                          >
                            <option value="requested">Requested</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </div>
                        <div className="text-xs text-soft-ivory/60 flex flex-wrap gap-x-4">
                          <span>Date: {r.reservation_date}</span>
                          <span>Time: {r.reservation_time}</span>
                          <span>Guests: {r.guest_count}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ACTIVE TAB: MENU MANAGER */}
        {activeTab === "menu" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h1 className="font-heading text-3xl text-soft-ivory tracking-wide">Menu Manager</h1>
              <button
                onClick={() => { resetItemForm(); setIsAddingItem(true); }}
                className="flex items-center gap-2 px-4 py-2 bg-crimson hover:bg-crimson/90 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
              >
                <Plus className="w-4 h-4" /> Add Dish
              </button>
            </div>

            {/* Menu Forms (Overlay Drawer Modal) */}
            {isAddingItem && (
              <div className="fixed inset-0 z-[1000] bg-black/80 flex items-center justify-center p-4">
                <div className="bg-midnight border border-white/10 max-w-lg w-full rounded-2xl p-6 relative max-h-[90vh] overflow-y-auto no-scrollbar">
                  <button 
                    onClick={() => { resetItemForm(); setIsAddingItem(false); }}
                    className="absolute top-4 right-4 p-2 text-soft-ivory/60 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <h3 className="font-heading text-xl text-gold mb-6">
                    {editingItem ? "Edit Dish" : "Add New Dish"}
                  </h3>
                  
                  <form onSubmit={editingItem ? handleEditItem : handleAddItem} className="space-y-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-soft-ivory/60 mb-2">Dish Name</label>
                      <input 
                        type="text" 
                        required 
                        value={itemName} 
                        onChange={(e) => setItemName(e.target.value)}
                        className="w-full px-4 py-2 bg-wine/5 border border-white/10 text-soft-ivory focus:outline-none rounded-xl text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-soft-ivory/60 mb-2">Price (₹)</label>
                        <input 
                          type="number" 
                          required 
                          value={itemPrice} 
                          onChange={(e) => setItemPrice(parseFloat(e.target.value))}
                          className="w-full px-4 py-2 bg-wine/5 border border-white/10 text-soft-ivory focus:outline-none rounded-xl text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-widest text-soft-ivory/60 mb-2">Category</label>
                        <select 
                          value={itemCat} 
                          onChange={(e) => setItemCat(e.target.value)}
                          className="w-full px-4 py-2 bg-wine/5 border border-white/10 text-soft-ivory focus:outline-none rounded-xl text-sm"
                        >
                          {categories.map((c) => (
                            <option key={c.id} value={c.name}>{c.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-soft-ivory/60 mb-2">Description</label>
                      <textarea 
                        rows={2} 
                        value={itemDesc} 
                        onChange={(e) => setItemDesc(e.target.value)}
                        className="w-full px-4 py-2 bg-wine/5 border border-white/10 text-soft-ivory focus:outline-none rounded-xl text-sm resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-soft-ivory/60 mb-2">Image URL</label>
                      <input 
                        type="text" 
                        value={itemImg} 
                        onChange={(e) => setItemImg(e.target.value)}
                        className="w-full px-4 py-2 bg-wine/5 border border-white/10 text-soft-ivory focus:outline-none rounded-xl text-sm"
                        placeholder="https://images.com/dish.jpg"
                      />
                    </div>

                    {/* Flags grid */}
                    <div className="grid grid-cols-2 gap-4 py-2">
                      <label className="flex items-center gap-2 text-xs cursor-pointer text-soft-ivory/80">
                        <input type="checkbox" checked={itemAvailable} onChange={(e) => setItemAvailable(e.target.checked)} />
                        Is Available
                      </label>
                      <label className="flex items-center gap-2 text-xs cursor-pointer text-soft-ivory/80">
                        <input type="checkbox" checked={itemVeg} onChange={(e) => setItemVeg(e.target.checked)} />
                        Is Veg
                      </label>
                      <label className="flex items-center gap-2 text-xs cursor-pointer text-soft-ivory/80">
                        <input type="checkbox" checked={itemBestseller} onChange={(e) => setItemBestseller(e.target.checked)} />
                        Is Bestseller
                      </label>
                      <label className="flex items-center gap-2 text-xs cursor-pointer text-soft-ivory/80">
                        <input type="checkbox" checked={itemSignature} onChange={(e) => setItemSignature(e.target.checked)} />
                        Is Signature
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-gold text-midnight font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-gold/90 transition-all flex items-center justify-center gap-2"
                    >
                      <Save className="w-4 h-4" /> {editingItem ? "Update Dish" : "Create Dish"}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Menu List Table */}
            <div className="bg-wine/5 border border-white/5 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-wine/20 text-gold uppercase tracking-wider border-b border-white/10">
                      <th className="p-4 font-bold">Image</th>
                      <th className="p-4 font-bold">Name</th>
                      <th className="p-4 font-bold">Category</th>
                      <th className="p-4 font-bold">Price</th>
                      <th className="p-4 font-bold">Status</th>
                      <th className="p-4 font-bold text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-sans">
                    {menuItems.map((item) => (
                      <tr key={`${item.id}-${item.category}`} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 shrink-0">
                          {item.image_url ? (
                            <img src={item.image_url} alt={item.name} className="w-12 h-12 object-cover rounded-lg border border-white/10" />
                          ) : (
                            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center font-heading text-gold text-lg border border-white/10">{item.name[0]}</div>
                          )}
                        </td>
                        <td className="p-4 font-semibold text-soft-ivory">
                          <div>
                            <span className="text-sm font-semibold block">{item.name}</span>
                            <div className="flex gap-1.5 mt-1">
                              {item.is_signature && <span className="px-1.5 py-0.5 rounded bg-gold/10 text-gold text-[7px] font-bold uppercase">Sig</span>}
                              {item.is_bestseller && <span className="px-1.5 py-0.5 rounded bg-crimson/10 text-crimson text-[7px] font-bold uppercase">Best</span>}
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-soft-ivory/60 uppercase text-[10px] tracking-wider">{item.category}</td>
                        <td className="p-4 font-mono font-semibold text-gold">₹{item.price}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded-md text-[8px] font-bold uppercase ${
                            item.is_available === false ? "bg-red-500/10 text-red-500" : "bg-veg-green/10 text-veg-green"
                          }`}>
                            {item.is_available === false ? "Unavailable" : "Available"}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleStartEdit(item)}
                              className="p-2 text-gold/60 hover:text-gold hover:bg-white/5 rounded-lg transition-all"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem(item.id)}
                              className="p-2 text-crimson/60 hover:text-crimson hover:bg-white/5 rounded-lg transition-all"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ACTIVE TAB: CATEGORIES */}
        {activeTab === "categories" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h1 className="font-heading text-3xl text-soft-ivory tracking-wide">Category Manager</h1>
              <button
                onClick={() => setIsAddingCategory(true)}
                className="flex items-center gap-2 px-4 py-2 bg-crimson hover:bg-crimson/90 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
              >
                <Plus className="w-4 h-4" /> Add Category
              </button>
            </div>

            {/* Add Category Modal */}
            {isAddingCategory && (
              <div className="fixed inset-0 z-[1000] bg-black/80 flex items-center justify-center p-4">
                <div className="bg-midnight border border-white/10 max-w-sm w-full rounded-2xl p-6 relative">
                  <button 
                    onClick={() => setIsAddingCategory(false)}
                    className="absolute top-4 right-4 p-2 text-soft-ivory/60 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <h3 className="font-heading text-xl text-gold mb-6">New Category</h3>
                  
                  <form onSubmit={handleAddCategory} className="space-y-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-soft-ivory/60 mb-2">Category Name</label>
                      <input 
                        type="text" 
                        required 
                        value={newCatName} 
                        onChange={(e) => setNewCatName(e.target.value)}
                        className="w-full px-4 py-2 bg-wine/5 border border-white/10 text-soft-ivory focus:outline-none rounded-xl text-sm"
                        placeholder="e.g. Desserts"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-gold text-midnight font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-gold/90 transition-all flex items-center justify-center gap-2"
                    >
                      <Save className="w-4 h-4" /> Save Category
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Categories List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((c) => (
                <div key={c.id} className="p-6 rounded-2xl bg-wine/5 border border-white/5 flex items-center justify-between">
                  <div>
                    <h3 className="font-heading text-lg text-gold tracking-wide">{c.name}</h3>
                    <span className="text-[10px] text-soft-ivory/40 uppercase tracking-widest mt-1 block">ID: {c.id}</span>
                  </div>
                  <Grid className="w-6 h-6 text-gold/30" />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
