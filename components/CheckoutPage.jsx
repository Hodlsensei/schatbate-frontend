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
        minHeight: "100%", background: "#ffffff",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Rajdhani', 'Trebuchet MS', sans-serif",
        flexDirection: "column", gap: 20, padding: 24, textAlign: "center",
      }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(229,57,53,0.06)", border: "2px solid #e53935", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, color: "#e53935" }}>✓</div>
        <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: 4, color: "#1a1a1a", margin: 0 }}>ORDER PLACED</h2>
        <p style={{ color: "#888", fontSize: 14, maxWidth: 320, margin: 0, lineHeight: 1.6 }}>Thank you for your purchase. You'll receive a confirmation email shortly.</p>
        <button
          onClick={() => onBack ? onBack() : router.push("/shop")}
          style={{ background: "#FCA311", color: "#fff", border: "none", borderRadius: 8, padding: "13px 32px", fontWeight: 700, fontSize: 14, cursor: "pointer", marginTop: 8, letterSpacing: 0.5, fontFamily: "inherit" }}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const inputStyle = {
    background: "#f9f9f9", border: "1px solid #e0e0e0", borderRadius: 8,
    padding: "12px 14px", color: "#1a1a1a", fontSize: 13, outline: "none",
    width: "100%", boxSizing: "border-box", fontFamily: "inherit", transition: "border-color 0.2s",
  };
  const labelStyle = {
    fontSize: 11, color: "#888", marginBottom: 7, display: "block",
    letterSpacing: 1, textTransform: "uppercase", fontWeight: 600,
  };
  const sectionTitle = {
    fontSize: 11, fontWeight: 700, letterSpacing: 3, color: "#bbb",
    textTransform: "uppercase", marginBottom: 20, paddingBottom: 12,
    borderBottom: "1px solid #e8e8e8",
  };

  return (
    <div style={{
      minHeight: "100%", background: "#f5f5f5", color: "#1a1a1a",
      fontFamily: "'Rajdhani', 'Trebuchet MS', sans-serif",
      display: "flex", flexDirection: isMobile ? "column" : "row",
    }}>

      {/* LEFT: Form */}
      <div style={{
        flex: 1, padding: isMobile ? "24px 16px" : "48px 60px", overflowY: "auto",
        background: "#ffffff",
        borderRight: isMobile ? "none" : "1px solid #e8e8e8",
        borderBottom: isMobile ? "1px solid #e8e8e8" : "none",
        maxWidth: isMobile ? "100%" : 640,
      }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: isMobile ? 24 : 32, fontWeight: 900, letterSpacing: 6, color: "#1a1a1a", margin: "0 0 4px" }}>CHECKOUT</h1>
          <div style={{ width: 40, height: 2, background: "#FCA311", borderRadius: 2 }} />
        </div>

        {/* Billing Details */}
        <div style={{ marginBottom: 28 }}>
          <div style={sectionTitle}>Billing Details</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div>
              <label style={labelStyle}>First Name</label>
              <input name="firstName" value={form.firstName} onChange={handleChange} style={inputStyle} placeholder="John"
                onFocus={e => e.target.style.borderColor="#FCA311"} onBlur={e => e.target.style.borderColor="#e0e0e0"}/>
            </div>
            <div>
              <label style={labelStyle}>Last Name</label>
              <input name="lastName" value={form.lastName} onChange={handleChange} style={inputStyle} placeholder="Doe"
                onFocus={e => e.target.style.borderColor="#FCA311"} onBlur={e => e.target.style.borderColor="#e0e0e0"}/>
            </div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={labelStyle}>Email Address</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} style={inputStyle} placeholder="john@example.com"
              onFocus={e => e.target.style.borderColor="#e53935"} onBlur={e => e.target.style.borderColor="#e0e0e0"}/>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={labelStyle}>Street Address</label>
            <input name="address" value={form.address} onChange={handleChange} style={inputStyle} placeholder="123 Main Street"
              onFocus={e => e.target.style.borderColor="#FCA311"} onBlur={e => e.target.style.borderColor="#e0e0e0"}/>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={labelStyle}>City</label>
              <input name="city" value={form.city} onChange={handleChange} style={inputStyle} placeholder="London"
                onFocus={e => e.target.style.borderColor="#FCA311"} onBlur={e => e.target.style.borderColor="#e0e0e0"}/>
            </div>
            <div>
              <label style={labelStyle}>Country</label>
              <select name="country" value={form.country} onChange={handleChange}
                style={{ ...inputStyle, cursor: "pointer", color: form.country ? "#1a1a1a" : "#aaa" }}
                onFocus={e => e.target.style.borderColor="#FCA311"} onBlur={e => e.target.style.borderColor="#e0e0e0"}
              >
                <option value="">Select</option>
                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div style={{ marginBottom: 28 }}>
          <div style={sectionTitle}>Payment Method</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[{ id: "credit", label: "Credit Card", icon: "💳" }, { id: "paypal", label: "PayPal", icon: "🅿️" }].map((method) => (
              <div key={method.id} onClick={() => setPaymentMethod(method.id)} style={{
                border: `1px solid ${paymentMethod === method.id ? "#FCA311" : "#e0e0e0"}`,
                borderRadius: 10, padding: "14px 16px", cursor: "pointer",
                background: paymentMethod === method.id ? "rgba(229,57,53,0.04)" : "#f9f9f9",
                display: "flex", alignItems: "center", gap: 10, transition: "all 0.2s",
              }}>
                <div style={{
                  width: 18, height: 18, borderRadius: "50%",
                  border: `2px solid ${paymentMethod === method.id ? "#FCA311" : "#d0d0d0"}`,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  {paymentMethod === method.id && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#e53935" }} />}
                </div>
                <span style={{ fontSize: 13, color: paymentMethod === method.id ? "#1a1a1a" : "#888", fontWeight: 600 }}>
                  {method.icon} {method.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <button onClick={handleSubmit} style={{
          background: "#FCA311", color: "#fff", border: "none", borderRadius: 10,
          padding: "16px", fontSize: 15, fontWeight: 800, cursor: "pointer",
          letterSpacing: 1, width: "100%", fontFamily: "inherit",
          boxShadow: "0 4px 16px rgba(229,57,53,0.25)",
        }}
          onMouseEnter={e => e.currentTarget.style.background="#FCA311"}
          onMouseLeave={e => e.currentTarget.style.background="#FCA311"}
        >PLACE ORDER</button>

        <button
          onClick={() => onBack ? onBack() : router.push("/shop")}
          style={{ background: "transparent", color: "#aaa", border: "none", width: "100%", padding: "14px", fontSize: 13, cursor: "pointer", fontFamily: "inherit", marginTop: 8 }}
        >
          ← Back to Shop
        </button>
      </div>

      {/* RIGHT: Order Summary */}
      <div style={{
        width: isMobile ? "100%" : 380, flexShrink: 0,
        background: "#fafafa", padding: isMobile ? "24px 16px" : "48px 40px",
        overflowY: "auto", borderLeft: "1px solid #e8e8e8",
      }}>
        <div style={{ marginBottom: 28 }}>
          <div style={sectionTitle}>Order Summary</div>
          {orderItems.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16, paddingBottom: 16, borderBottom: "1px solid #e8e8e8" }}>
              <div style={{ width: 52, height: 52, borderRadius: 8, background: "#f0f0f0", overflow: "hidden", flexShrink: 0, border: "1px solid #e0e0e0" }}>
                <img
                  src={item.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThraG_zasU3rWm-JApmnIzbmVCpDdGS26DXQ&s"}
                  alt={item.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: "#1a1a1a", fontWeight: 600, marginBottom: 3 }}>{item.name}</div>
                <div style={{ fontSize: 12, color: "#aaa" }}>
                  Qty: {item.qty || 1}
                  {item.selectedSize && <span style={{ marginLeft: 8 }}>Size: {item.selectedSize}</span>}
                </div>
              </div>
              <div style={{ fontSize: 14, color: "#1a1a1a", fontWeight: 700 }}>{item.price.toLocaleString()}{item.currency}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 28 }}>
          {[["Subtotal", `${total.toLocaleString()}${currency}`], ["Shipping", "Free"], ["Tax", "Included"]].map(([label, val]) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#888", marginBottom: 12 }}>
              <span>{label}</span>
              <span style={{ color: "#aaa" }}>{val}</span>
            </div>
          ))}
          <div style={{ height: 1, background: "#e8e8e8", margin: "16px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, fontWeight: 800, color: "#1a1a1a" }}>
            <span>Total</span>
            <span style={{ color: "#FCA311" }}>{total.toLocaleString()}{currency}</span>
          </div>
        </div>

        <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 10, padding: "16px 20px" }}>
          {[
            { icon: "🔒", text: "Secure 256-bit SSL encryption" },
            { icon: "📦", text: "Discreet packaging guaranteed" },
            { icon: "↩️", text: "Easy returns within 7 days" },
          ].map((b, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: i < 2 ? 12 : 0, fontSize: 12, color: "#999" }}>
              <span style={{ fontSize: 14 }}>{b.icon}</span>
              <span>{b.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}