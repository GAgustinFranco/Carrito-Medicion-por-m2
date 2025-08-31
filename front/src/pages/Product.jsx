import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1); 
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [length, setLength] = useState(""); 
    const [waste, setWaste] = useState(10); 
    const [variationId, setVariationId] = useState("");
    const [cartId, setCartId] = useState(null);
    const [calculated, setCalculated] = useState({
        measurement: 0,
        requiredMeasurement: 0,
        quantity: 1,
        totalPurchased: 0, 
        totalPrice: 0
    });

    const handleQuantityChange = (e) => {
        setQuantity(Number(e.target.value));
    };

    const BASE_URL = "http://localhost:3000";

    
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
            alert("Error al inicializar el carrito");
            }
        }
        setCartId(storedCartId);
        };
        ensureCart();
    }, []);

    
    useEffect(() => {
        api.get(`/products/${id}`)
        .then(res => setProduct(res.data))
        .catch(err => {
            console.error("Error al cargar producto:", err);
            alert("Error al cargar el producto");
        });
    }, [id]);

    useEffect(() => {
        if (!product) return;

        let basePrice = Number(product.basePrice);
        let measurement = 0;
        let requiredMeasurement = 0;
        let calcQuantity = 1;
        let totalPurchased = 0;

        if (product.unit === "m2" && width && height) {
        measurement = Number(width) * Number(height);
        } else if (product.unit === "m" && length) {
        measurement = Number(length);
        } else if (product.unit === "unit") {
        calcQuantity = Number(quantity); 
        }

        if (product.unit === "m2" || product.unit === "m") {
        requiredMeasurement = measurement * (1 + waste / 100);
        if (product.packArea) {
            calcQuantity = Math.ceil(requiredMeasurement / product.packArea);
        }
        totalPurchased = calcQuantity * (product.packArea || 0);
        }

        if (variationId) {
        const variation = product.variations.find(v => v.id === variationId);
        if (variation) basePrice += Number(variation.priceModifier);
        }

        const totalPrice = Number(basePrice) * (product.packArea ? product.packArea * calcQuantity : calcQuantity);

        setCalculated({
            measurement,
            requiredMeasurement,
            quantity: calcQuantity,
            totalPurchased,
            totalPrice: Number(totalPrice)
        });

        setQuantity(calcQuantity); 
    }, [width, height, length, waste, variationId, product, quantity]);

    const handleAddToCart = async () => {
        if (!product || !cartId) {
        alert("Carrito o producto no está listo, intenta de nuevo.");
        return;
        }

        const payload = {
            cartId,
            productId: product.id,
            quantity: Number(quantity), 
            waste: Number(waste),
            price: Number(calculated.totalPrice)
        };

        if (product.unit === "m2") {
        if (!width || !height) {
            alert("Debes ingresar ancho y alto");
            return;
        }
        payload.width = Number(width);
        payload.height = Number(height);
        } else if (product.unit === "m") {
        if (!length) {
            alert("Debes ingresar largo");
            return;
        }
        payload.length = Number(length);
        }

        if (variationId) payload.variationId = variationId;

        try {
        await api.post("/cart/add", payload);
        alert("Producto agregado al carrito!");
        } catch (err) {
        console.error("Error al agregar al carrito:", err);
        alert("Error al agregar al carrito");
        }
    };

    if (!product || !cartId) return <p>Cargando producto...</p>;

    return (
        <div style={{ padding: "40px", maxWidth: "700px", margin: "0 auto" }}>
        <h1 style={{ marginBottom: "20px" }}>{product.name}</h1>

        {product.images && product.images.length > 0 && (
            <img
            src={`${BASE_URL}${product.images[0]}`}
            alt={product.name}
            style={{ width: "100%", height: "350px", objectFit: "cover", borderRadius: "10px" }}
            />
        )}

        <p style={{ fontSize: "1.2em", marginTop: "15px" }}>
            Precio base: ${product.basePrice} / {product.unit}
        </p>

        {(product.unit === "m2" || product.unit === "m") && (
            <div style={{ marginTop: "20px" }}>
            {product.unit === "m2" && (
                <>
                <label>Ancho (m):
                    <input
                    type="number"
                    value={width}
                    onChange={e => setWidth(e.target.value)}
                    style={{ marginLeft: "10px", width: "80px" }}
                    step="0.01"
                    />
                </label>
                <label style={{ marginLeft: "20px" }}>Alto (m):
                    <input
                    type="number"
                    value={height}
                    onChange={e => setHeight(e.target.value)}
                    style={{ marginLeft: "10px", width: "80px" }}
                    step="0.01"
                    />
                </label>
                </>
            )}
            {product.unit === "m" && (
                <label>Largo (m):
                <input
                    type="number"
                    value={length}
                    onChange={e => setLength(e.target.value)}
                    style={{ marginLeft: "10px", width: "80px" }}
                    step="0.01"
                />
                </label>
            )}
            <label style={{ marginLeft: "20px" }}>Material extra para cortes o errores al instalar. Recomendado 10%:
                <input
                type="number"
                value={waste}
                onChange={e => setWaste(e.target.value)}
                style={{ marginLeft: "10px", width: "60px" }}
                min="0"
                />
            </label>
            </div>
        )}

        {product.variations && product.variations.length > 0 && (
            <div style={{ marginTop: "20px" }}>
            <label>Color / Modelo:
                <select
                value={variationId}
                onChange={e => setVariationId(e.target.value)}
                style={{ marginLeft: "10px", padding: "5px" }}
                >
                <option value="">Selecciona</option>
                {product.variations.map(v => (
                    <option key={v.id} value={v.id}>
                    {v.attribute} (+${v.priceModifier})
                    </option>
                ))}
                </select>
            </label>
            </div>
        )}

        <div style={{ marginTop: "20px" }}>
            <label>Cantidad de cajas/unidades:
            <input
                type="number"
                min={1}
                value={quantity}
                onChange={handleQuantityChange}
                style={{ marginLeft: "10px", width: "60px" }}
            />
            </label>
        </div>

        {(product.unit === "m2" || product.unit === "m") && calculated.measurement > 0 && (
            <div style={{ marginTop: "20px", border: "1px solid #ddd", padding: "15px", borderRadius: "5px" }}>
            <h3>Resumen de cálculo</h3>
            <p>{product.unit === "m2" ? "Área" : "Largo"} medida: {calculated.measurement.toFixed(2)} {product.unit}</p>
            <p>Requerido (con {waste}% desperdicio): {calculated.requiredMeasurement.toFixed(2)} {product.unit}</p>
            <p>Cajas necesarias: {calculated.quantity}</p>
            <p>Total {product.unit} comprados: {calculated.totalPurchased.toFixed(2)} {product.unit}</p>
            </div>
        )}

        <p style={{ fontWeight: "bold", marginTop: "20px" }}>
            Precio estimado: ${calculated.totalPrice.toFixed(2)}
        </p>

        <button
            onClick={handleAddToCart}
            disabled={(product.unit === "m2" || product.unit === "m") && !calculated.measurement}
            style={{
            background: "#28a745",
            color: "#fff",
            padding: "12px 20px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "1em",
            opacity: (product.unit === "m2" || product.unit === "m") && !calculated.measurement ? 0.5 : 1
            }}
        >
            Agregar al carrito
        </button>
        </div>
    );
}