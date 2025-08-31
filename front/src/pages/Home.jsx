import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cartId, setCartId] = useState(null);

    const BASE_URL = "http://localhost:3000";

    useEffect(() => {
        const ensureCart = async () => {
            let storedCartId = localStorage.getItem("cartId");
            if (!storedCartId) {
                const res = await api.post("/cart/create");
                storedCartId = res.data.id;
                localStorage.setItem("cartId", storedCartId);
            }
            setCartId(storedCartId); 
            };
            ensureCart();
        }, []);
        
        useEffect(() => {
            api.get("/products")
            .then(res => setProducts(res.data))
            .finally(() => setLoading(false));
        }, []);
        
        const addToCart = async (productId) => {
            if (!cartId) {
            alert("Carrito no está listo, intenta de nuevo.");
            return;
            }
            try {
            await api.post("/cart/add", {
                cartId,
                productId,
                quantity: 1
            });
            alert("Producto agregado al carrito ✅");
            } catch (err) {
            console.error("Error al agregar al carrito:", err);
            alert("No se pudo agregar al carrito ❌");
            }
        };
    
        if (loading || !cartId) return <p>Cargando productos...</p>;

    return (
        <div style={{ padding: "40px" }}>
            <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Tienda</h1>
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "30px"
            }}>
                {products.map(p => (
                    <div key={p.id} style={{
                        border: "1px solid #e0e0e0",
                        borderRadius: "10px",
                        overflow: "hidden",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                        background: "#fff"
                    }}>
                        {p.images && p.images[0] ? (
                            <img
                                src={`${BASE_URL}${p.images[0]}`}
                                alt={p.name}
                                style={{ width: "100%", height: "180px", objectFit: "cover" }}
                            />
                        ) : <div style={{ height: "180px", background: "#f5f5f5" }}>Sin imagen</div>}
                        <div style={{ padding: "15px" }}>
                            <h3 style={{ fontSize: "1.1em", margin: "0 0 10px" }}>{p.name}</h3>
                            <p style={{ margin: "0 0 10px", color: "#555" }}>
                                ${p.basePrice} / {p.unit}
                            </p>
                            <Link to={`/product/${p.id}`} style={{
                                display: "inline-block",
                                padding: "8px 12px",
                                background: "#007bff",
                                color: "#fff",
                                borderRadius: "5px",
                                textDecoration: "none",
                                marginRight: "10px"
                            }}>
                                Ver detalle
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}