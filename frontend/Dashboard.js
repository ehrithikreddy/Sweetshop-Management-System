import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [sweets, setSweets] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [token] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    fetchSweets();
  }, []);

  const fetchSweets = async () => {
    try {
      const res = await axios.get("http://localhost:5000/sweets");
      setSweets(res.data);
    } catch (err) {
      console.error("Error fetching sweets:", err);
    }
  };

  const addSweet = async () => {
    try {
      await axios.post(
        "http://localhost:5000/sweets",
        { name, category, price: parseFloat(price), quantity: parseInt(quantity) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchSweets();
      setName("");
      setCategory("");
      setPrice("");
      setQuantity("");
    } catch (err) {
      console.error("Error adding sweet:", err);
    }
  };

  const purchaseSweet = async (id) => {
    try {
      await axios.post(
        `http://localhost:5000/purchase/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchSweets();
    } catch (err) {
      console.error("Error purchasing sweet:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🍬 Sweet Shop Dashboard</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button onClick={addSweet}>Add Sweet</button>
      </div>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Purchase</th>
          </tr>
        </thead>
        <tbody>
          {sweets.map((sweet) => (
            <tr key={sweet.id}>
              <td>{sweet.name}</td>
              <td>{sweet.category}</td>
              <td>${sweet.price}</td>
              <td>{sweet.quantity}</td>
              <td>
                <button
                  onClick={() => purchaseSweet(sweet.id)}
                  disabled={sweet.quantity <= 0}
                >
                  {sweet.quantity > 0 ? "Purchase" : "Out of Stock"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
