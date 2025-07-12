import { useState, useMemo } from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";

/**
 * Admin Panel – Users • Orders • Listings
 * ------------------------------------------------------------------
 * • Full‑screen, sticky header, dark gradient theme
 * • Live search adapts to each tab
 * • Users: approve / remove with visual feedback
 * • Orders: dropdown to set status (Placed • Shipped • Delivered)
 * • Listings: same items array, cycle button rotates status
 * ------------------------------------------------------------------
 */
export const Admin = () => {
  /* ───────────────────────── Global UI state ───────────────────────── */
  const [activeTab, setActiveTab] = useState("users");
  const [searchTerm, setSearchTerm] = useState("");

  /* ================================================================== */
  /*  USERS  */
  /* ================================================================== */
  const [approvedUsers, setApprovedUsers] = useState([]);
  const [removedUsers, setRemovedUsers] = useState([]);
  const OrderStatus = ["Placed", "Shipped", "Delivered"];

  const users = [
    { id: 1, name: "Aarav Sharma", email: "aarav@example.com" },
    { id: 2, name: "Diya Patel", email: "diya@example.com" },
    { id: 3, name: "Rohan Gupta", email: "rohan@example.com" },
    { id: 4, name: "Sanvi Nair", email: "sanvi@example.com" },
    { id: 5, name: "Kabir Singh", email: "kabir@example.com" },
  ];

  const filteredUsers = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }, [searchTerm, users]);

  const approveUser = (id) => setApprovedUsers((p) => [...p, id]);
  const removeUser = (id) => setRemovedUsers((p) => [...p, id]);

  /* ================================================================== */
  /*  ITEMS  (shared by Orders & Listings)                              */
  /* ================================================================== */
  const [items, setItems] = useState([
    {
      id: 101,
      title: "Vintage Denim Jacket",
      category: "Clothing",
      size: "M",
      status: "Placed",
    },
    {
      id: 102,
      title: "Wooden Coffee Table",
      category: "Furniture",
      size: "4x2 ft",
      status: "Shipped",
    },
    {
      id: 103,
      title: "Kindle Paperwhite",
      category: "Electronics",
      size: "6‑inch",
      status: "Delivered",
    },
  ]);

  /* ➡️ helper for dropdown in Orders */
  const updateOrderStatus = (id, newStatus) =>
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, status: newStatus } : it))
    );

  /* ↻ helper for Cycle button in Listings */
  const cycleStatus = (id) =>
    setItems((prev) =>
      prev.map((it) =>
        it.id === id
          ? {
              ...it,
              status:
                it.status === "Placed"
                  ? "Shipped"
                  : it.status === "Shipped"
                  ? "Delivered"
                  : "Placed",
            }
          : it
      )
    );

  const removeItem = (id) =>
    setItems((prev) => prev.filter((it) => it.id !== id));

  /* Quick‑add form (Listings tab) */
  const [newProduct, setNewProduct] = useState({
    title: "",
    category: "",
    size: "",
  });

  const handleNewChange = (e) =>
    setNewProduct((p) => ({ ...p, [e.target.name]: e.target.value }));

  const addProduct = () => {
    if (!newProduct.title.trim() || !newProduct.category.trim()) return;
    setItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...newProduct,
        status: "Placed",
      },
    ]);
    setNewProduct({ title: "", category: "", size: "" });
  };

  /* ================================================================== */
  /*  Helpers  */
  /* ================================================================== */
  const searchPlaceholder =
    activeTab === "users"
      ? "Search users…"
      : activeTab === "orders"
      ? "Search orders…"
      : "Search listings…";

  /* ================================================================== */
  /*  JSX  */
  /* ================================================================== */
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-850 to-gray-800 text-gray-100 font-inter overflow-hidden flex flex-col">
      {/* ───────── HEADER ───────── */}
      <header className="sticky top-0 z-20 border-b border-white/10 backdrop-blur-md bg-slate-900/80 px-6 py-6 lg:py-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <h1 className="text-3xl font-bold tracking-wide text-indigo-200 select-none">
          Admin Panel
        </h1>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-6 w-full lg:w-auto">
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 lg:flex-none bg-white/5 focus:bg-white/10 placeholder:text-gray-400 rounded-lg px-4 py-2 outline-none transition"
          />

          <nav className="flex flex-wrap gap-2">
            {[
              { key: "users", label: "Manage Users" },
              { key: "orders", label: "Manage Orders" },
              { key: "listings", label: "Manage Listings" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key);
                  setSearchTerm("");
                }}
                className={`px-4 py-2 rounded-md text-sm font-medium transition shadow focus:outline-none ${
                  activeTab === tab.key
                    ? "bg-indigo-500 text-gray-100 ring-2 ring-indigo-300"
                    : "bg-white/5 hover:bg-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* ───────── MAIN ───────── */}
      <main className="flex-grow overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 space-y-8">
        {/* ========== USERS TAB ========== */}
        {activeTab === "users" && (
          <section className="space-y-6">
            <h2 className="text-xl font-semibold tracking-widest text-center uppercase text-gray-200 select-none">
              Manage Users
            </h2>

            {filteredUsers.length === 0 ? (
              <p className="text-center text-gray-400">No users found.</p>
            ) : (
              filteredUsers.map((u) => (
                <div
                  key={u.id}
                  className={`flex flex-col sm:flex-row items-center gap-6 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm shadow-lg ${
                    removedUsers.includes(u.id)
                      ? "opacity-40 line-through"
                      : ""
                  }`}
                >
                  <div className="h-24 w-24 rounded-full bg-white/10 ring-2 ring-indigo-400 shrink-0" />

                  <div className="flex-1 w-full">
                    <div className="text-lg font-semibold text-indigo-200">
                      {u.name}
                    </div>
                    <div className="text-sm text-gray-300">{u.email}</div>
                    {approvedUsers.includes(u.id) && (
                      <div className="text-sm text-emerald-400 mt-1">
                        Approved
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 w-full sm:w-auto">
                    <button
                      disabled={
                        approvedUsers.includes(u.id) ||
                        removedUsers.includes(u.id)
                      }
                      onClick={() => approveUser(u.id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-emerald-600/90 hover:bg-emerald-500 disabled:bg-gray-500 text-gray-100 font-semibold px-4 py-2 rounded-lg transition"
                    >
                      <CheckCircleIcon className="h-5 w-5" /> Approve
                    </button>
                    <button
                      disabled={removedUsers.includes(u.id)}
                      onClick={() => removeUser(u.id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-rose-600/90 hover:bg-rose-500 disabled:bg-gray-500 text-gray-100 font-semibold px-4 py-2 rounded-lg transition"
                    >
                      <XCircleIcon className="h-5 w-5" /> Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </section>
        )}

        {/* ========== ORDERS TAB ========== */}
        {activeTab === "orders" && (
          <section className="space-y-6">
            <h2 className="text-xl font-semibold tracking-widest text-center uppercase text-gray-200 select-none">
              Manage Orders
            </h2>

            {items.length === 0 ? (
              <p className="text-center text-gray-400">No orders found.</p>
            ) : (
              items.map((it) => (
                <div
                  key={it.id}
                  className="flex flex-col sm:flex-row items-center gap-6 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm shadow-lg"
                >
                  <div className="h-24 w-24 rounded-lg bg-white/10 ring-2 ring-indigo-400 shrink-0 flex items-center justify-center text-xs text-gray-400">
                    IMG
                  </div>

                  <div className="flex-1 w-full space-y-1">
                    <div className="text-lg font-semibold text-indigo-200 capitalize">
                      {it.title}
                    </div>
                    <div className="text-sm text-gray-300">
                      Category: {it.category} • Size: {it.size}
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-300">Status:</span>
                      <select
                        value={it.status}
                        onChange={(e) =>
                          updateOrderStatus(it.id, e.target.value)
                        }
                        className="bg-gray-700 text-white rounded px-2 py-1 text-sm capitalize"
                      >
                        {OrderStatus.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ))
            )}
          </section>
        )}

        {/* ========== LISTINGS TAB ========== */}
        {activeTab === "listings" && (
          <section className="space-y-10">
            <h2 className="text-xl font-semibold tracking-widest text-center uppercase text-gray-200 select-none">
              All Listings
            </h2>

            {/* Quick‑add form */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm shadow-lg max-w-xl mx-auto space-y-4">
              <h3 className="text-lg font-semibold text-indigo-200 flex items-center gap-2">
                <PlusCircleIcon className="h-6 w-6" /> Add New Product
              </h3>

              <div className="grid sm:grid-cols-3 gap-4">
                <input
                  name="title"
                  value={newProduct.title}
                  onChange={handleNewChange}
                  placeholder="Title"
                  className="col-span-3 sm:col-span-1 bg-white/10 rounded-lg px-3 py-2 outline-none placeholder:text-gray-400 focus:bg-white/20"
                />
                <input
                  name="category"
                  value={newProduct.category}
                  onChange={handleNewChange}
                  placeholder="Category"
                  className="col-span-3 sm:col-span-1 bg-white/10 rounded-lg px-3 py-2 outline-none placeholder:text-gray-400 focus:bg-white/20"
                />
                <input
                  name="size"
                  value={newProduct.size}
                  onChange={handleNewChange}
                  placeholder="Size"
                  className="col-span-3 sm:col-span-1 bg-white/10 rounded-lg px-3 py-2 outline-none placeholder:text-gray-400 focus:bg-white/20"
                />
              </div>

              <button
                onClick={addProduct}
                className="w-full bg-emerald-600/90 hover:bg-emerald-500 text-gray-100 font-semibold px-4 py-3 rounded-lg transition"
              >
                Add Listing
              </button>
            </div>

            {/* Product list */}
            {items.length === 0 ? (
              <p className="text-center text-gray-400">No listings found.</p>
            ) : (
              items.map((it) => (
                <div
                  key={it.id}
                  className="flex flex-col sm:flex-row items-center gap-6 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm shadow-lg"
                >
                  <div className="h-24 w-24 rounded-lg bg-white/10 ring-2 ring-indigo-400 shrink-0 flex items-center justify-center text-xs text-gray-400">
                    IMG
                  </div>

                  <div className="flex-1 w-full space-y-1">
                    <div className="text-lg font-semibold text-indigo-200 capitalize">
                      {it.title}
                    </div>
                    <div className="text-sm text-gray-300">
                      Category: {it.category} • Size: {it.size} • Status:{" "}
                      <span className="capitalize">{it.status}</span>
                    </div>
                  </div>

                  <div className="flex gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => cycleStatus(it.id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-sky-600/90 hover:bg-sky-500 text-gray-100 font-semibold px-4 py-2 rounded-lg transition"
                    >
                      <ArrowPathIcon className="h-5 w-5" /> Cycle
                    </button>

                    <button
                      onClick={() => removeItem(it.id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-rose-600/90 hover:bg-rose-500 text-gray-100 font-semibold px-4 py-2 rounded-lg transition"
                    >
                      <XCircleIcon className="h-5 w-5" /> Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </section>
        )}
      </main>
    </div>
  );
};
