import React, { useEffect, useState } from "react";
import api from "../services/api";

export default function Cart() {
    const [cart, setCart] = useState(null);
    const [cartId, setCartId] = useState(null);
    const [error, setError] = useState(null); 

    const loadCart = async () => {
        if (!cartId) return;
        try {
        const res = await api.get(`/cart/${cartId}`);
        setCart(res.data);
        setError(null);
        } catch (err) {
        console.error("Error al cargar carrito:", err);
        setError("Error al cargar el carrito");
        }
    };

    useEffect(() => {
        const ensureCart = async () => {
        let storedCartId = localStorage.getItem("cartId");
        if (!storedCartId) {
            try {
            const res = await api.post("/cart/create");
            storedCartId = res.data.id;
            localStorage.setItem("cartId", storedCartId);
            } catch (err) {
            console.error("Error al crear carrito:", err);
            setError("Error al inicializar el carrito");
            }
        }
        setCartId(storedCartId);
        };
        ensureCart();
    }, []);

    useEffect(() => {
        loadCart();
    }, [cartId]);

    const handleCheckout = async () => {
        if (!cartId || !cart || cart.items.length === 0) {
            alert("Carrito no está listo o está vacío, intenta de nuevo.");
            return;
            }
        
            const checkoutItems = cart.items.map(item => ({
            productId: item.product.id,
            variationId: item.variation?.id || null,
            quantity: Number(item.quantity) || 1,
            price: Number(item.price) || 1, // Convierte a número, fallback a 1
            measurement: Number(item.measurement) || null,
            requiredMeasurement: Number(item.requiredMeasurement) || null,
            }));
        
            try {
            await api.post(`/cart/checkout/${cartId}`, { items: checkoutItems });
            alert("Compra realizada");
            localStorage.removeItem("cartId");
            setCartId(null);
            setCart(null);
            } catch (err) {
            console.error("Error en checkout:", err);
            alert("Error al finalizar la compra");
            }
        };
        
        const total = cart?.items?.reduce((sum, item) => sum + (Number(item.price) || 1), 0) || 0;
        
        if (error) return <p>{error}</p>;
    if (!cart || !cartId) return <p>Cargando carrito...</p>;

    return (
        <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ marginBottom: "30px" }}>Carrito de compras</h1>
        {cart.items.length === 0 ? <p>El carrito está vacío</p> : (
            <>
            {cart.items.map(item => {
                try {
                return (
                    <div key={item.id} style={{
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "15px",
                    marginBottom: "15px",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                    }}>
                    <div>
                        <h3 style={{ margin: "0 0 10px" }}>{item.product.name}</h3>
                        {item.variation && <p>Variación: {item.variation.attribute}</p>}
                        {item.product.unit === "m2" && typeof item.measurement === 'number' && (
                        <>
                            <p>Área: {item.measurement.toFixed(2)} m²</p>
                            {typeof item.requiredMeasurement === 'number' && (
                            <p>Requerido: {item.requiredMeasurement.toFixed(2)} m²</p>
                            )}
                        </>
                        )}
                        {item.product.unit === "m" && typeof item.measurement === 'number' && (
                        <>
                            <p>Largo: {item.measurement.toFixed(2)} m</p>
                            {typeof item.requiredMeasurement === 'number' && (
                            <p>Requerido: {item.requiredMeasurement.toFixed(2)} m</p>
                            )}
                        </>
                        )}
                        <p>Cantidad: {item.quantity}</p>
                        <p>Precio: ${Number(item.price).toFixed(2)}</p>
                    </div>
                    <button onClick={async () => { 
                        try {
                        await api.delete(`/cart/${cart.id}/item/${item.id}`); 
                        await loadCart(); 
                        } catch (err) {
                        console.error("Error al eliminar ítem:", err);
                        alert("Error al eliminar el ítem");
                        }
                    }} style={{ 
                        background: "#dc3545", 
                        color: "#fff", 
                        border: "none", 
                        padding: "8px 12px", 
                        borderRadius: "5px", 
                        cursor: "pointer" 
                    }}>
                        Eliminar
                    </button>
                    </div>
                );
                } catch (err) {
                console.error("Error renderizando ítem:", err);
                return <p key={item.id}>Error al mostrar el ítem: {item.product.name}</p>;
                }
            })}
            <h2>Total: ${Number(total).toFixed(2)}</h2>
            <button onClick={handleCheckout} style={{
                background: "#28a745", 
                color: "#fff", 
                padding: "12px 20px", 
                borderRadius: "6px", 
                border: "none", 
                cursor: "pointer"
            }}>
                Finalizar compra
            </button>
            </>
        )}
        </div>
    );
}