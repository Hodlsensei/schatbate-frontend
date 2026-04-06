"use client";
import { useState, useEffect } from "react";

const ALL_ITEMS = [
  { id: 1,  name: "Exclusive Photoset",  price: 500,  currency: "tk",       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThraG_zasU3rWm-JApmnIzbmVCpDdGS26DXQ&s" },
  { id: 2,  name: "Fan Club Membership", price: 1500, currency: "tk/month", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDhXnQ-6Xp63R4ry3-rA4B131N9fyymISxIw&s" },
  { id: 3,  name: "Personalized Video",  price: 2000, currency: "tk",       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1QlXINDQBalpeGAZ__xai51XjT7Z_SfxAuw&s" },
  { id: 4,  name: "Used Lingerie",       price: 3000, currency: "tk",       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThraG_zasU3rWm-JApmnIzbmVCpDdGS26DXQ&s" },
  { id: 5,  name: "New Rose Toy",        price: 2500, currency: "tk",       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7XjPh0g5ho3ijFHPrGFAUsWu5m0Cy2RJLAw&s" },
  { id: 6,  name: "Exclusive Photoset",  price: 500,  currency: "tk",       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Mj_fweJIzOzCQ8a50zMSe1dtokJOLCNPxg&s" },
  { id: 7,  name: "Silk Bra Set",        price: 2500, currency: "tk",       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1QlXINDQBalpeGAZ__xai51XjT7Z_SfxAuw&s" },
  { id: 8,  name: "Lace Bodysuit",       price: 4200, currency: "tk",       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Mj_fweJIzOzCQ8a50zMSe1dtokJOLCNPxg&s" },
  { id: 9,  name: "Thong Collection",    price: 1800, currency: "tk",       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDhXnQ-6Xp63R4ry3-rA4B131N9fyymISxIw&s" },
  { id: 10, name: "Fishnet Stockings",   price: 1200, currency: "tk",       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7XjPh0g5ho3ijFHPrGFAUsWu5m0Cy2RJLAw&s" },
  { id: 11, name: "Corset Set",          price: 5500, currency: "tk",       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThraG_zasU3rWm-JApmnIzbmVCpDdGS26DXQ&s" },
  { id: 12, name: "Satin Chemise",       price: 2800, currency: "tk",       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1QlXINDQBalpeGAZ__xai51XjT7Z_SfxAuw&s" },
  { id: 13, name: "Halter Babydoll",     price: 1900, currency: "tk",       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Mj_fweJIzOzCQ8a50zMSe1dtokJOLCNPxg&s" },
  { id: 14, name: "Garter Belt Set",     price: 2600, currency: "tk",       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDhXnQ-6Xp63R4ry3-rA4B131N9fyymISxIw&s" },
  { id: 15, name: "Open Back Teddy",     price: 3100, currency: "tk",       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7XjPh0g5ho3ijFHPrGFAUsWu5m0Cy2RJLAw&s" },
  { id: 16, name: "Floral Lace Set",     price: 2900, currency: "tk",       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThraG_zasU3rWm-JApmnIzbmVCpDdGS26DXQ&s" },
  { id: 17, name: "Sheer Robe",          price: 1700, currency: "tk",       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1QlXINDQBalpeGAZ__xai51XjT7Z_SfxAuw&s" },
  { id: 18, name: "Cutout Bodysuit",     price: 3400, currency: "tk",       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Mj_fweJIzOzCQ8a50zMSe1dtokJOLCNPxg&s" },
  { id: 19, name: "Ribbon Bra Set",      price: 2100, currency: "tk",       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDhXnQ-6Xp63R4ry3-rA4B131N9fyymISxIw&s" },
  { id: 20, name: "Deep V Nightgown",    price: 2400, currency: "tk",       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7XjPh0g5ho3ijFHPrGFAUsWu5m0Cy2RJLAw&s" },
  { id: 21, name: "Cage Bralette",       price: 1600, currency: "tk",       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThraG_zasU3rWm-JApmnIzbmVCpDdGS26DXQ&s" },
  { id: 22, name: "Lace Kimono",         price: 2000, currency: "tk",       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1QlXINDQBalpeGAZ__xai51XjT7Z_SfxAuw&s" },
  { id: 23, name: "Satin Slip Dress",    price: 3300, currency: "tk",       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Mj_fweJIzOzCQ8a50zMSe1dtokJOLCNPxg&s" },
  { id: 24, name: "Cupless Bra Set",     price: 2700, currency: "tk",       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDhXnQ-6Xp63R4ry3-rA4B131N9fyymISxIw&s" },
  { id: 25, name: "Teddy Bodysuit",      price: 3600, currency: "tk",       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7XjPh0g5ho3ijFHPrGFAUsWu5m0Cy2RJLAw&s" },
  { id: 26, name: "String Bikini Set",   price: 1400, currency: "tk",       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThraG_zasU3rWm-JApmnIzbmVCpDdGS26DXQ&s" },
  { id: 27, name: "Plunge Bodysuit",     price: 3900, currency: "tk",       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1QlXINDQBalpeGAZ__xai51XjT7Z_SfxAuw&s" },
  { id: 28, name: "Wrap Lingerie Set",   price: 2300, currency: "tk",       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Mj_fweJIzOzCQ8a50zMSe1dtokJOLCNPxg&s" },
  { id: 29, name: "Floral Babydoll",     price: 1800, currency: "tk",       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDhXnQ-6Xp63R4ry3-rA4B131N9fyymISxIw&s" },
  { id: 30, name: "Chain Detail Set",    price: 4100, currency: "tk",       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7XjPh0g5ho3ijFHPrGFAUsWu5m0Cy2RJLAw&s" },
  { id: 31, name: "Satin Bra Set",       price: 2800, currency: "tk",       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThraG_zasU3rWm-JApmnIzbmVCpDdGS26DXQ&s" },
  { id: 32, name: "Lace Teddies",        price: 3200, currency: "tk",       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1QlXINDQBalpeGAZ__xai51XjT7Z_SfxAuw&s" },
  { id: 33, name: "Boudoir Set",         price: 4800, currency: "tk",       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9Mj_fweJIzOzCQ8a50zMSe1dtokJOLCNPxg&s" },
  { id: 34, name: "Peek-a-boo Bra",      price: 2500, currency: "tk",       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDhXnQ-6Xp63R4ry3-rA4B131N9fyymISxIw&s" },
  { id: 35, name: "Ruffle Chemise",      price: 2200, currency: "tk",       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7XjPh0g5ho3ijFHPrGFAUsWu5m0Cy2RJLAw&s" },
  { id: 36, name: "Bridal Lingerie Set", price: 5200, currency: "tk",       image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThraG_zasU3rWm-JApmnIzbmVCpDdGS26DXQ&s" },
];

function ProductCard({ product, onBuy }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ background: "#141414", border: `1px solid ${hov ? "#333" : "#1e1e1e"}`, borderRadius: 8, overflow: "hidden", transition: "border-color 0.2s, transform 0.15s", transform: hov ? "translateY(-2px)" : "none", cursor: "pointer" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={{ aspectRatio: "1", background: "#1a1a1a", overflow: "hidden" }}>
        <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s", transform: hov ? "scale(1.05)" : "scale(1)" }}/>
      </div>
      <div style={{ padding: "8px 8px 4px" }}>
        <div style={{ fontSize: 10, color: "#ddd", fontWeight: 600, marginBottom: 2, lineHeight: 1.3 }}>{product.name}</div>
        <div style={{ fontSize: 10, color: "#e53935", fontWeight: 700, marginBottom: 5 }}>{product.price.toLocaleString()}{product.currency}</div>
      </div>
      <div style={{ padding: "0 8px 8px" }}>
        <button onClick={(e) => { e.stopPropagation(); onBuy(product); }} style={{ background: "#e53935", color: "#fff", border: "none", borderRadius: 6, padding: "6px", fontSize: 9, fontWeight: 700, cursor: "pointer", width: "100%", fontFamily: "inherit", letterSpacing: 0.5, transition: "background 0.15s" }}
          onMouseEnter={e => e.currentTarget.style.background="#c62828"}
          onMouseLeave={e => e.currentTarget.style.background="#e53935"}
        >BUY NOW</button>
      </div>
    </div>
  );
}

export default function ModelStorefront({ onBack, onBuy }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#0d0d0d", color: "#fff", fontFamily: "'Rajdhani','Trebuchet MS',sans-serif" }}>

      <style>{`
        .store-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px; }
        @media (max-width: 1100px) { .store-grid { grid-template-columns: repeat(4, 1fr); } }
        @media (max-width: 768px)  { .store-grid { grid-template-columns: repeat(3, 1fr); gap: 8px; } }
        @media (max-width: 480px)  { .store-grid { grid-template-columns: repeat(2, 1fr); gap: 6px; } }
        .store-content { padding: 16px 20px 40px; }
        @media (max-width: 600px) { .store-content { padding: 12px 14px 40px; } }
      `}</style>

      {/* Sticky header */}
      <div style={{ flexShrink: 0, background: "#0d0d0d", borderBottom: "1px solid #1a1a1a", position: "relative" }}>
        <div style={{ height: 100, overflow: "hidden", position: "relative" }}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThraG_zasU3rWm-JApmnIzbmVCpDdGS26DXQ&s" alt="cover"
            style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.3, filter: "blur(4px)" }}/>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 20%, #0d0d0d 100%)" }}/>
        </div>

        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", alignItems: "center", padding: "0 14px", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={onBack} style={{ background: "rgba(0,0,0,0.5)", border: "1px solid #333", borderRadius: 8, color: "#aaa", fontSize: 11, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, padding: "5px 8px", fontFamily: "inherit", flexShrink: 0 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              Back
            </button>
            <div style={{ width: 52, height: 52, borderRadius: "50%", border: "3px solid #e53935", overflow: "hidden", background: "#1a1a1a", flexShrink: 0 }}>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThraG_zasU3rWm-JApmnIzbmVCpDdGS26DXQ&s" alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>Alexa_Villia</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4caf50", display: "inline-block" }}/>
                Online Now
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            {[["128", "Items"], ["4.9★", "Rating"], ["2.3k", "Sales"]].map(([val, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{val}</div>
                <div style={{ fontSize: 9, color: "#aaa" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="store-content" style={{ flex: 1, overflowY: "auto" }}>
        <h2 style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: "#555", marginBottom: 12, textTransform: "uppercase" }}>All Items</h2>
        <div className="store-grid" style={{ marginBottom: 24 }}>
          {ALL_ITEMS.map(p => <ProductCard key={p.id} product={p} onBuy={onBuy} />)}
        </div>
        <h2 style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, color: "#555", marginBottom: 12, textTransform: "uppercase" }}>Top Selling Items</h2>
        <div className="store-grid">
          {ALL_ITEMS.slice(0, 36).map((p, i) => <ProductCard key={`top-${i}`} product={p} onBuy={onBuy} />)}
        </div>
      </div>
    </div>
  );
}