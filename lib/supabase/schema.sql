-- Create Categories Table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Menu Items Table
CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  is_available BOOLEAN DEFAULT TRUE,
  is_bestseller BOOLEAN DEFAULT FALSE,
  is_signature BOOLEAN DEFAULT FALSE,
  is_spicy BOOLEAN DEFAULT FALSE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Orders Table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(100) UNIQUE NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50) NOT NULL,
  order_type VARCHAR(50) NOT NULL, -- 'DELIVERY' or 'PICKUP'
  address TEXT,
  landmark VARCHAR(255),
  pincode VARCHAR(20),
  subtotal DECIMAL(10, 2) NOT NULL,
  delivery_charge DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  payment_preference VARCHAR(100) NOT NULL, -- 'COD' or 'UPI'
  special_instructions TEXT,
  status VARCHAR(50) DEFAULT 'initiated', -- 'initiated', 'whatsapp_opened', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'
  whatsapp_opened BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Order Items Table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id UUID REFERENCES menu_items(id) ON DELETE SET NULL,
  item_name VARCHAR(255) NOT NULL,
  item_price DECIMAL(10, 2) NOT NULL,
  quantity INT NOT NULL CHECK (quantity > 0),
  line_total DECIMAL(10, 2) NOT NULL
);

-- Create Reservations Table
CREATE TABLE reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  reservation_date DATE NOT NULL,
  reservation_time TIME NOT NULL,
  guest_count INT NOT NULL,
  occasion VARCHAR(255),
  special_request TEXT,
  status VARCHAR(50) DEFAULT 'requested', -- 'requested', 'confirmed', 'cancelled'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Offers Table
CREATE TABLE offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  code VARCHAR(50) UNIQUE NOT NULL,
  start_date DATE,
  end_date DATE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Site Settings Table
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(255) UNIQUE NOT NULL,
  value TEXT NOT NULL
);

-- Create Media Table
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255),
  type VARCHAR(50), -- 'video', 'image'
  url TEXT NOT NULL,
  alt_text TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Row Level Security (RLS) Configuration
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- Read policies for public
CREATE POLICY "Public Read Categories" ON categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public Read Menu Items" ON menu_items FOR SELECT USING (is_available = true);
CREATE POLICY "Public Read Offers" ON offers FOR SELECT USING (is_active = true);
CREATE POLICY "Public Read Site Settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public Read Media" ON media FOR SELECT USING (true);

-- Insert policies for public (Checkout & Booking)
CREATE POLICY "Public Insert Orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Order Items" ON order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Reservations" ON reservations FOR INSERT WITH CHECK (true);

-- Full access policies for authenticated admin users
CREATE POLICY "Admin Full Access Categories" ON categories FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Menu Items" ON menu_items FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Orders" ON orders FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Order Items" ON order_items FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Reservations" ON reservations FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Offers" ON offers FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Site Settings" ON site_settings FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Access Media" ON media FOR ALL TO authenticated USING (true);

-- Menu Item Tags mapping
CREATE TABLE IF NOT EXISTS menu_item_tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    menu_item_id UUID REFERENCES menu_items(id) ON DELETE CASCADE,
    tag_id TEXT NOT NULL,
    UNIQUE(menu_item_id, tag_id)
);

ALTER TABLE menu_item_tags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Menu Item Tags" ON menu_item_tags FOR SELECT USING (true);
CREATE POLICY "Admin Full Access Menu Item Tags" ON menu_item_tags FOR ALL TO authenticated USING (true);
