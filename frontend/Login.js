import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isRegistering
      ? "http://localhost:5000/register"
      : "http://localhost:5000/login";

    try {
      const res = await axios.post(endpoint, { email, password });

      if (isRegistering) {
        alert("Registration successful! Please log in.");
        setIsRegistering(false);
      } else {
        localStorage.setItem("token", res.data.token);
        window.location.href = "/dashboard";
      }
    } catch (err) {
      alert("Error: " + err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{isRegistering ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">
          {isRegistering ? "Register" : "Login"}
        </button>
      </form>

      <p>
        {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          onClick={() => setIsRegistering(!isRegistering)}
          style={{ marginLeft: "5px" }}
        >
          {isRegistering ? "Login" : "Register"}
        </button>
      </p>
    </div>
  );
}

export default Login;
