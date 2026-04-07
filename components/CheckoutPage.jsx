"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const COUNTRIES = [
  "Nigeria", "United States", "United Kingdom", "Canada",
  "Germany", "France", "Brazil", "India", "Australia", "Other",
];

const ORDER_ITEMS = [{ name: "Used Lingerie Set", price: 3000, currency: "tk" }];

export default function CheckoutPage({ orderItems = ORDER_ITEMS, onBack }) {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", address: "", city: "", country: "" });
  const [success, setSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const total = orderItems.reduce((sum, i) => sum + i.price, 0);
  const currency = orderItems[0]?.currency || "tk";
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    const required = ["firstName", "lastName", "email", "address", "city", "country"];
    if (required.some((k) => !form[k])) return alert("Please fill in all required fields.");
    try { localStorage.removeItem("shop_cart"); } catch {}
    setSuccess(true);
  };

  if (success) {
    return (
      <div style={{
        minHeight: "100%", background: "#0a0a0a",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Rajdhani', 'Trebuchet MS', sans-serif",
        flexDirection: "column", gap: 20, padding: 24, textAlign: "center",
      }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(229,57,53,0.08)", border: "2px solid #e53935", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>✓</div>
        <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: 4, color: "#fff", margin: 0 }}>ORDER PLACED</h2>
        <p style={{ color: "#555", fontSize: 14, maxWidth: 320, margin: 0, lineHeight: 1.6 }}>Thank you for your purchase. You'll receive a confirmation email shortly.</p>
        <button
          onClick={() => onBack ? onBack() : router.push("/shop")}
          style={{ background: "#e53935", color: "#fff", border: "none", borderRadius: 8, padding: "13px 32px", fontWeight: 700, fontSize: 14, cursor: "pointer", marginTop: 8, letterSpacing: 0.5, fontFamily: "inherit" }}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const inputStyle = { background: "#111", border: "1px solid #222", borderRadius: 8, padding: "12px 14px", color: "#fff", fontSize: 13, outline: "none", width: "100%", boxSizing: "border-box", fontFamily: "inherit", transition: "border-color 0.2s" };
  const labelStyle = { fontSize: 11, color: "#555", marginBottom: 7, display: "block", letterSpacing: 1, textTransform: "uppercase", fontWeight: 600 };
  const sectionTitle = { fontSize: 11, fontWeight: 700, letterSpacing: 3, color: "#444", textTransform: "uppercase", marginBottom: 20, paddingBottom: 12, borderBottom: "1px solid #1a1a1a" };

  return (
    <div style={{ minHeight: "100%", background: "#0a0a0a", color: "#fff", fontFamily: "'Rajdhani', 'Trebuchet MS', sans-serif", display: "flex", flexDirection: isMobile ? "column" : "row" }}>

      {/* ── LEFT: Form ── */}
      <div style={{ flex: 1, padding: isMobile ? "24px 16px" : "48px 60px", overflowY: "auto", borderRight: isMobile ? "none" : "1px solid #141414", borderBottom: isMobile ? "1px solid #141414" : "none", maxWidth: isMobile ? "100%" : 640 }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: isMobile ? 24 : 32, fontWeight: 900, letterSpacing: 6, color: "#fff", margin: "0 0 4px" }}>CHECKOUT</h1>
          <div style={{ width: 40, height: 2, background: "#e53935", borderRadius: 2 }} />
        </div>

        <div style={{ marginBottom: 28 }}>
          <div style={sectionTitle}>Billing Details</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div><label style={labelStyle}>First Name</label><input name="firstName" value={form.firstName} onChange={handleChange} style={inputStyle} placeholder="John" onFocus={e => e.target.style.borderColor="#fff"} onBlur={e => e.target.style.borderColor="#222"}/></div>
            <div><label style={labelStyle}>Last Name</label><input name="lastName" value={form.lastName} onChange={handleChange} style={inputStyle} placeholder="Doe" onFocus={e => e.target.style.borderColor="#fff"} onBlur={e => e.target.style.borderColor="#222"}/></div>
          </div>
          <div style={{ marginBottom: 12 }}><label style={labelStyle}>Email Address</label><input name="email" type="email" value={form.email} onChange={handleChange} style={inputStyle} placeholder="john@example.com" onFocus={e => e.target.style.borderColor="#fff"} onBlur={e => e.target.style.borderColor="#222"}/></div>
          <div style={{ marginBottom: 12 }}><label style={labelStyle}>Street Address</label><input name="address" value={form.address} onChange={handleChange} style={inputStyle} placeholder="123 Main Street" onFocus={e => e.target.style.borderColor="#fff"} onBlur={e => e.target.style.borderColor="#222"}/></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div><label style={labelStyle}>City</label><input name="city" value={form.city} onChange={handleChange} style={inputStyle} placeholder="London" onFocus={e => e.target.style.borderColor="#fff"} onBlur={e => e.target.style.borderColor="#222"}/></div>
            <div><label style={labelStyle}>Country</label><select name="country" value={form.country} onChange={handleChange} style={{ ...inputStyle, cursor: "pointer", color: form.country ? "#fff" : "#555" }} onFocus={e => e.target.style.borderColor="#fff"} onBlur={e => e.target.style.borderColor="#222"}><option value="">Select</option>{COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
          </div>
        </div>

        <div style={{ marginBottom: 28 }}>
          <div style={sectionTitle}>Payment Method</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[{ id: "credit", label: "Credit Card", icon: "💳" }, { id: "paypal", label: "PayPal", icon: "🅿️" }].map((method) => (
              <div key={method.id} onClick={() => setPaymentMethod(method.id)} style={{ border: `1px solid ${paymentMethod === method.id ? "#e53935" : "#1e1e1e"}`, borderRadius: 10, padding: "14px 16px", cursor: "pointer", background: paymentMethod === method.id ? "rgba(229,57,53,0.05)" : "#0f0f0f", display: "flex", alignItems: "center", gap: 10, transition: "all 0.2s" }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${paymentMethod === method.id ? "#e53935" : "#333"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {paymentMethod === method.id && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#e53935" }} />}
                </div>
                <span style={{ fontSize: 13, color: paymentMethod === method.id ? "#fff" : "#888", fontWeight: 600 }}>{method.icon} {method.label}</span>
              </div>
            ))}
          </div>
        </div>

        <button onClick={handleSubmit} style={{ background: "#e53935", color: "#fff", border: "none", borderRadius: 10, padding: "16px", fontSize: 15, fontWeight: 800, cursor: "pointer", letterSpacing: 1, width: "100%", fontFamily: "inherit", boxShadow: "0 4px 20px rgba(229,57,53,0.3)" }} onMouseEnter={e => e.currentTarget.style.background="#c62828"} onMouseLeave={e => e.currentTarget.style.background="#e53935"}>PLACE ORDER</button>
        <button
          onClick={() => onBack ? onBack() : router.push("/shop")}
          style={{ background: "transparent", color: "#333", border: "none", width: "100%", padding: "14px", fontSize: 13, cursor: "pointer", fontFamily: "inherit", marginTop: 8 }}
        >
          ← Back to Shop
        </button>
      </div>

      {/* ── RIGHT: Order Summary ── */}
      <div style={{ width: isMobile ? "100%" : 380, flexShrink: 0, background: "#080808", padding: isMobile ? "24px 16px" : "48px 40px", overflowY: "auto" }}>
        <div style={{ marginBottom: 28 }}>
          <div style={sectionTitle}>Order Summary</div>
          {orderItems.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16, paddingBottom: 16, borderBottom: "1px solid #141414" }}>
              <div style={{ width: 52, height: 52, borderRadius: 8, background: "#111", overflow: "hidden", flexShrink: 0, border: "1px solid #1e1e1e" }}>
                <img src={item.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThraG_zasU3rWm-JApmnIzbmVCpDdGS26DXQ&s"} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }}/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: "#ddd", fontWeight: 600, marginBottom: 3 }}>{item.name}</div>
                <div style={{ fontSize: 12, color: "#444" }}>
                  Qty: {item.qty || 1}
                  {item.selectedSize && <span style={{ marginLeft: 8 }}>Size: {item.selectedSize}</span>}
                </div>
              </div>
              <div style={{ fontSize: 14, color: "#fff", fontWeight: 700 }}>{item.price.toLocaleString()}{item.currency}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 28 }}>
          {[["Subtotal", `${total.toLocaleString()}${currency}`], ["Shipping", "Free"], ["Tax", "Included"]].map(([label, val]) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#444", marginBottom: 12 }}><span>{label}</span><span style={{ color: "#666" }}>{val}</span></div>
          ))}
          <div style={{ height: 1, background: "#1a1a1a", margin: "16px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, fontWeight: 800, color: "#fff" }}><span>Total</span><span style={{ color: "#e53935" }}>{total.toLocaleString()}{currency}</span></div>
        </div>

        <div style={{ background: "#0f0f0f", border: "1px solid #1a1a1a", borderRadius: 10, padding: "16px 20px" }}>
          {[{ icon: "🔒", text: "Secure 256-bit SSL encryption" }, { icon: "📦", text: "Discreet packaging guaranteed" }, { icon: "↩️", text: "Easy returns within 7 days" }].map((b, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: i < 2 ? 12 : 0, fontSize: 12, color: "#555" }}><span style={{ fontSize: 14 }}>{b.icon}</span><span>{b.text}</span></div>
          ))}
        </div>
      </div>
    </div>
  );
}