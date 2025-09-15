import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
    // usecontext api
  const { login } = useContext(AuthContext);
//   usestate components
  const [form, setForm] = useState({ username: "", password: "" });
  const [err, setErr] = useState(null);
//   navigation
  const navigate = useNavigate();

//   submit handler function
  const submit = (e) => {
    e.preventDefault();
    const res = login(form);
    if (res.ok) {
      navigate("/");
    } else {
      setErr(res.message || "Login failed");
    }
  };

  return (
    // login page form
    <div className="min-h-screen flex items-center justify-center  bg-gray-400 p-4 ">
      <form className="w-full max-w-md bg-gray-200 shadow-md rounded p-6 shadow-2xl" onSubmit={submit}>
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <label className="block mb-2">
            {/* for username */}
          <span className="text-sm">Username</span>
          <input
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="mt-1 block w-full border rounded p-2"
            required
          />
        </label>
        {/* for password */}
        <label className="block mb-4">
          <span className="text-sm">Password</span>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="mt-1 block w-full border rounded p-2"
            required
          />
          <p className="text-xs mt-1 text-gray-500">Use password: <strong>test123</strong></p>
        </label>
        {err && <div className="text-red-600 mb-2">{err}</div>}
        {/* login button */}
        <button className="w-full py-2 rounded bg-indigo-600 text-white">Login</button>
      </form>
    </div>
  );
}
