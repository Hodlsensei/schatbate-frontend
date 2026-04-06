"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProductDetailPage from "./ProductDetailPage";
import ModelStorefront from "./ModelStorefront";

const PRODUCTS = [
  { id: 1,  name: "Used Lingerie Set",   price: 3000, currency: "tk", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThraG_zasU3rWm-JApmnIzbmVCpDdGS26DXQ&s", description: "Premium used lingerie set" },
  { id: 2,  name: "Silk Bra & Panty",    price: 2500, currency: "tk", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1QlXINDQBalpeGAZ__xai51XjT7Z_SfxAuw&s", description: "Soft silk bra and panty set" },
  { id: 3,  name: "Lace Bodysuit",       price: 4200, currency: "tk", image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcS7ikNgel-FjLnsENncOg6k4UhdpC9TOWJXkkF2h16HGhkLDBbUZs4pLo-0eBPtSRiecyWVHYxe96v1phjEXCBFaB2SM6L2jsa9KtfGNjpk7e7rQE_GbQHabr-BUqJ1pmSHYNZgwakQh9U&usqp=CAc", description: "Elegant lace bodysuit" },
  { id: 4,  name: "Thong Collection",    price: 1800, currency: "tk", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDhXnQ-6Xp63R4ry3-rA4B131N9fyymISxIw&s", description: "Sexy thong collection" },
  { id: 5,  name: "Fishnet Stockings",   price: 1200, currency: "tk", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7XjPh0g5ho3ijFHPrGFAUsWu5m0Cy2RJLAw&s", description: "Classic fishnet stockings" },
  { id: 6,  name: "Corset Set",          price: 5500, currency: "tk", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Mj_fweJIzOzCQ8a50zMSe1dtokJOLCNPxg&s", description: "Vintage style corset set" },
  { id: 7,  name: "Satin Chemise",       price: 2800, currency: "tk", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThraG_zasU3rWm-JApmnIzbmVCpDdGS26DXQ&s", description: "Silky satin chemise" },
  { id: 8,  name: "Lace Bralette",       price: 1500, currency: "tk", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1QlXINDQBalpeGAZ__xai51XjT7Z_SfxAuw&s", description: "Delicate lace bralette" },
  { id: 9,  name: "Strappy Bodysuit",    price: 3200, currency: "tk", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDhXnQ-6Xp63R4ry3-rA4B131N9fyymISxIw&s", description: "Strappy open back bodysuit" },
  { id: 10, name: "Mesh Lingerie Set",   price: 2200, currency: "tk", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7XjPh0g5ho3ijFHPrGFAUsWu5m0Cy2RJLAw&s", description: "Sheer mesh lingerie set" },
  { id: 11, name: "Embroidered Bra Set", price: 3800, currency: "tk", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Mj_fweJIzOzCQ8a50zMSe1dtokJOLCNPxg&s", description: "Floral embroidered bra set" },
  { id: 12, name: "Velvet Bustier",      price: 4500, currency: "tk", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThraG_zasU3rWm-JApmnIzbmVCpDdGS26DXQ&s", description: "Luxurious velvet bustier" },
  { id: 13, name: "Halter Babydoll",     price: 1900, currency: "tk", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1QlXINDQBalpeGAZ__xai51XjT7Z_SfxAuw&s", description: "Flirty halter babydoll" },
  { id: 14, name: "Garter Belt Set",     price: 2600, currency: "tk", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDhXnQ-6Xp63R4ry3-rA4B131N9fyymISxIw&s", description: "Garter belt with stockings" },
  { id: 15, name: "Open Back Teddy",     price: 3100, currency: "tk", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7XjPh0g5ho3ijFHPrGFAUsWu5m0Cy2RJLAw&s", description: "Seductive open back teddy" },
  { id: 16, name: "Floral Lace Set",     price: 2900, currency: "tk", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Mj_fweJIzOzCQ8a50zMSe1dtokJOLCNPxg&s", description: "Romantic floral lace set" },
  { id: 17, name: "Sheer Robe",          price: 1700, currency: "tk", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThraG_zasU3rWm-JApmnIzbmVCpDdGS26DXQ&s", description: "Elegant sheer robe" },
  { id: 18, name: "Cutout Bodysuit",     price: 3400, currency: "tk", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1QlXINDQBalpeGAZ__xai51XjT7Z_SfxAuw&s", description: "Daring cutout bodysuit" },
  { id: 19, name: "Ribbon Bra Set",      price: 2100, currency: "tk", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDhXnQ-6Xp63R4ry3-rA4B131N9fyymISxIw&s", description: "Playful ribbon detail bra set" },
  { id: 20, name: "Deep V Nightgown",    price: 2400, currency: "tk", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7XjPh0g5ho3ijFHPrGFAUsWu5m0Cy2RJLAw&s", description: "Sultry deep V nightgown" },
  { id: 21, name: "Cage Bralette",       price: 1600, currency: "tk", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Mj_fweJIzOzCQ8a50zMSe1dtokJOLCNPxg&s", description: "Edgy cage style bralette" },
  { id: 22, name: "Lace Kimono",         price: 2000, currency: "tk", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThraG_zasU3rWm-JApmnIzbmVCpDdGS26DXQ&s", description: "Delicate lace kimono robe" },
  { id: 23, name: "Satin Slip Dress",    price: 3300, currency: "tk", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1QlXINDQBalpeGAZ__xai51XjT7Z_SfxAuw&s", description: "Classic satin slip dress" },
  { id: 24, name: "Cupless Bra Set",     price: 2700, currency: "tk", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDhXnQ-6Xp63R4ry3-rA4B131N9fyymISxIw&s", description: "Bold cupless bra set" },
  { id: 25, name: "Teddy Bodysuit",      price: 3600, currency: "tk", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7XjPh0g5ho3ijFHPrGFAUsWu5m0Cy2RJLAw&s", description: "Alluring teddy bodysuit" },
  { id: 26, name: "String Bikini Set",   price: 1400, currency: "tk", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Mj_fweJIzOzCQ8a50zMSe1dtokJOLCNPxg&s", description: "Minimal string bikini set" },
  { id: 27, name: "Plunge Bodysuit",     price: 3900, currency: "tk", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThraG_zasU3rWm-JApmnIzbmVCpDdGS26DXQ&s", description: "Deep plunge bodysuit" },
  { id: 28, name: "Wrap Lingerie Set",   price: 2300, currency: "tk", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1QlXINDQBalpeGAZ__xai51XjT7Z_SfxAuw&s", description: "Wrap style lingerie set" },
  { id: 29, name: "Floral Babydoll",     price: 1800, currency: "tk", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDhXnQ-6Xp63R4ry3-rA4B131N9fyymISxIw&s", description: "Pretty floral babydoll" },
  { id: 30, name: "Chain Detail Set",    price: 4100, currency: "tk", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7XjPh0g5ho3ijFHPrGFAUsWu5m0Cy2RJLAw&s", description: "Edgy chain detail lingerie set" },
  { id: 31, name: "Satin Bra Set",       price: 2800, currency: "tk", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Mj_fweJIzOzCQ8a50zMSe1dtokJOLCNPxg&s", description: "Smooth satin bra set" },
  { id: 32, name: "Lace Teddies",        price: 3200, currency: "tk", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThraG_zasU3rWm-JApmnIzbmVCpDdGS26DXQ&s", description: "Lace teddy lingerie" },
  { id: 33, name: "Boudoir Set",         price: 4800, currency: "tk", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1QlXINDQBalpeGAZ__xai51XjT7Z_SfxAuw&s", description: "Luxe boudoir lingerie set" },
  { id: 34, name: "Peek-a-boo Bra",      price: 2500, currency: "tk", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDhXnQ-6Xp63R4ry3-rA4B131N9fyymISxIw&s", description: "Peek-a-boo style bra set" },
  { id: 35, name: "Ruffle Chemise",      price: 2200, currency: "tk", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7XjPh0g5ho3ijFHPrGFAUsWu5m0Cy2RJLAw&s", description: "Flirty ruffle hem chemise" },
  { id: 36, name: "Bridal Lingerie Set", price: 5200, currency: "tk", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Mj_fweJIzOzCQ8a50zMSe1dtokJOLCNPxg&s", description: "Elegant bridal lingerie set" },
];

export default function ShopPage() {
  const router = useRouter();

  // Load cart from localStorage on first render
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("shop_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [view, setView] = useState("shop");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("shop_cart", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setView("product");
  };

  const handleAddToCartFromDetail = (product) => {
    addToCart(product);
  };

  const styles = {
    page: {
      minHeight: "100%",
      background: "#0d0d0d",
      color: "#fff",
      fontFamily: "'Rajdhani', 'Trebuchet MS', sans-serif",
      padding: "32px 40px",
    },
    card: {
      background: "#141414",
      border: "1px solid #222",
      borderRadius: 10,
      overflow: "hidden",
    },
    btnCyan: {
      background: "#00e5ff",
      color: "#000",
      border: "none",
      borderRadius: 8,
      padding: "12px 20px",
      fontSize: 14,
      fontWeight: 700,
      cursor: "pointer",
      width: "100%",
      letterSpacing: 0.5,
    },
    btnOutline: {
      background: "transparent",
      color: "#00e5ff",
      border: "1px solid #333",
      borderRadius: 8,
      padding: "12px 20px",
      fontSize: 14,
      fontWeight: 600,
      cursor: "pointer",
      width: "100%",
    },
  };

  // ── PRODUCT DETAIL VIEW ──
  if (view === "product" && selectedProduct) {
    return (
      <ProductDetailPage
        product={selectedProduct}
        onBack={() => setView("shop")}
        onViewCart={() => setView("cart")}
        onAddToCart={handleAddToCartFromDetail}
        onViewStorefront={() => setView("storefront")}
        onSelectProduct={(item) => { setSelectedProduct(item); setView("product"); }}
      />
    );
  }

  // ── MODEL STOREFRONT VIEW ──
  if (view === "storefront") {
    return (
      <ModelStorefront
        onBack={() => setView("shop")}
        onBuy={(product) => {
          addToCart(product);
          setView("cart");
        }}
      />
    );
  }

  // ── CART VIEW ──
  if (view === "cart") {
    return (
      <div style={{ ...styles.page }}>

        {/* Back button */}
        <button
          onClick={() => setView("shop")}
          style={{
            background: "none", border: "none", color: "#aaa",
            fontSize: 13, cursor: "pointer", display: "flex",
            alignItems: "center", gap: 6, padding: 0,
            fontFamily: "inherit", marginBottom: 24,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Shop
        </button>

        <h2 style={{ fontSize: 20, fontWeight: 700, letterSpacing: 2, marginBottom: 20 }}>YOUR CART</h2>

        {cart.length === 0 ? (
          <div style={{ color: "#555", fontSize: 14, textAlign: "center", padding: "60px 0" }}>
            Your cart is empty.
          </div>
        ) : (
          <>
            <div style={styles.card}>
              <div style={{
                display: "grid", gridTemplateColumns: "2fr 1fr 1fr auto",
                padding: "10px 14px", borderBottom: "1px solid #222",
                fontSize: 12, color: "#666", fontWeight: 700, letterSpacing: 1,
              }}>
                <span>Product</span><span>Price</span><span>Quantity</span><span></span>
              </div>
              {cart.map((item) => (
                <div key={item.id} style={{
                  display: "grid", gridTemplateColumns: "2fr 1fr 1fr auto",
                  padding: "14px", alignItems: "center", gap: 8,
                  borderBottom: "1px solid #1e1e1e",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 48, height: 48, background: "#252525", borderRadius: 6, overflow: "hidden", flexShrink: 0 }}>
                      <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div>
                      <div style={{ fontSize: 13, color: "#ddd", fontWeight: 600 }}>{item.name}</div>
                      {item.selectedSize && item.selectedSize !== "One Size" && (
                        <div style={{ fontSize: 11, color: "#666" }}>Size: {item.selectedSize}</div>
                      )}
                    </div>
                  </div>
                  <span style={{ fontSize: 13, color: "#e53935", fontWeight: 700 }}>{item.price.toLocaleString()}{item.currency}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 0, width: "fit-content" }}>
                    <button
                      onClick={() => setCart(prev => prev.map(i => i.id === item.id ? { ...i, qty: Math.max(1, i.qty - 1) } : i))}
                      style={{ width: 28, height: 28, background: "#1a1a1a", border: "1px solid #333", borderRadius: "4px 0 0 4px", color: "#fff", fontSize: 14, cursor: "pointer" }}
                    >−</button>
                    <div style={{ width: 36, height: 28, background: "#141414", border: "1px solid #333", borderLeft: "none", borderRight: "none", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#fff", fontWeight: 700 }}>{item.qty}</div>
                    <button
                      onClick={() => setCart(prev => prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i))}
                      style={{ width: 28, height: 28, background: "#1a1a1a", border: "1px solid #333", borderRadius: "0 4px 4px 0", color: "#fff", fontSize: 14, cursor: "pointer" }}
                    >+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} style={{
                    background: "transparent", color: "#ff4444", border: "1px solid #ff4444",
                    borderRadius: 6, padding: "4px 10px", fontSize: 12, cursor: "pointer", fontFamily: "inherit",
                  }}>Remove</button>
                </div>
              ))}
              <div style={{ padding: "16px 14px", maxWidth: 320 }}>
                <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, color: "#fff" }}>Cart Summary</div>
                {[
                  ["Subtotal:", `${subtotal.toLocaleString()}tk`],
                  ["Shipping:", "Free"],
                  ["Total:", `${subtotal.toLocaleString()}tk`],
                ].map(([label, val]) => (
                  <div key={label} style={{
                    display: "flex", justifyContent: "space-between",
                    fontSize: 13, color: label === "Total:" ? "#fff" : "#aaa",
                    fontWeight: label === "Total:" ? 700 : 400, marginBottom: 6,
                  }}>
                    <span>{label}</span>
                    <span style={{ color: label === "Total:" ? "#e53935" : undefined }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
              <button
                style={{ background: "#e53935", color: "#fff", border: "none", borderRadius: 8, padding: "13px 28px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", letterSpacing: 0.5 }}
                onClick={() => router.push("/checkout")}
              >Checkout</button>
              <button
                style={{ background: "transparent", color: "#aaa", border: "1px solid #333", borderRadius: 8, padding: "13px 28px", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
                onClick={() => setView("shop")}
              >Continue Shopping</button>
            </div>
          </>
        )}
      </div>
    );
  }

  // ── MAIN SHOP VIEW ──
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#0d0d0d", fontFamily: "'Rajdhani', 'Trebuchet MS', sans-serif" }}>

      <style>{`
        .shop-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 14px;
        }
        @media (max-width: 1100px) { .shop-grid { grid-template-columns: repeat(4, 1fr); } }
        @media (max-width: 768px)  { .shop-grid { grid-template-columns: repeat(3, 1fr); gap: 10px; } }
        @media (max-width: 500px)  { .shop-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; } }

        .shop-header { padding: 24px 40px 16px; }
        @media (max-width: 600px) { .shop-header { padding: 16px 16px 12px; } }

        .shop-scroll { padding: 20px 40px 40px; }
        @media (max-width: 600px) { .shop-scroll { padding: 12px 16px 32px; } }

        .product-card { transition: border-color 0.2s, transform 0.15s; }
        .product-card:hover { border-color: #333 !important; transform: translateY(-2px); }
        .product-card:hover img { transform: scale(1.05) !important; }

        .store-link { opacity: 0; transition: opacity 0.2s; }
        .product-card:hover .store-link { opacity: 1; }

        .buy-btn:hover { background: #c62828 !important; }
      `}</style>

      {/* Fixed shop header */}
      <div className="shop-header" style={{ flexShrink: 0, borderBottom: "1px solid #1a1a1a" }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: 3, marginBottom: 4, color: "#fff" }}>SHOP</h1>
        <p style={{ color: "#666", fontSize: 13, margin: 0 }}>Exclusive items from your favorite models</p>
      </div>

      {/* Scrollable grid */}
      <div className="shop-scroll" style={{ flex: 1, overflowY: "auto" }}>
        <div className="shop-grid">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="product-card"
              style={{ ...styles.card, padding: 0, cursor: "pointer", overflow: "hidden" }}
              onClick={() => handleProductClick(product)}
            >
              {/* Product image */}
              <div style={{
                width: "100%", aspectRatio: "1", background: "#1a1a1a",
                overflow: "hidden", position: "relative",
              }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s" }}
                  onError={(e) => { e.target.parentElement.style.background = "#252525"; }}
                />
              </div>

              {/* Card body */}
              <div style={{ padding: "12px 12px 10px" }}>

                {/* Model avatar + Visit Store */}
                <div
                  className="store-link"
                  style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}
                  onClick={(e) => { e.stopPropagation(); setView("storefront"); }}
                >
                  <div style={{
                    width: 20, height: 20, borderRadius: "50%",
                    background: "linear-gradient(135deg,#e53935,#8e24aa)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 9, fontWeight: 700, color: "#fff", flexShrink: 0,
                  }}>A</div>
                  <span style={{
                    fontSize: 10, color: "#aaa",
                    textDecoration: "underline", whiteSpace: "nowrap",
                    overflow: "hidden", textOverflow: "ellipsis",
                  }}>Alexa_Villia's Store</span>
                </div>

                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 3, color: "#fff", lineHeight: 1.3 }}>
                  {product.name}
                </div>
                <div style={{ color: "#555", fontSize: 11, marginBottom: 6, lineHeight: 1.3 }}>
                  {product.description}
                </div>
                <div style={{ color: "#e53935", fontSize: 14, fontWeight: 700, marginBottom: 10 }}>
                  🪙 {product.price.toLocaleString()}{product.currency}
                </div>
                <button
                  className="buy-btn"
                  style={{
                    width: "100%", padding: "9px", fontSize: 12,
                    background: "#e53935", color: "#fff", border: "none",
                    borderRadius: 6, fontWeight: 700, cursor: "pointer",
                    fontFamily: "inherit", letterSpacing: 0.5,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProductClick(product);
                  }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}