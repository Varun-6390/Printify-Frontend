// src/pages/admin/AdminUsers.jsx
import React, { useEffect, useState } from "react";
import { Trash2, Search } from "lucide-react";
import axios from "axios";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/user`);
    setUsers(res.data);
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/user/${id}`);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 text-white relative">

      {/* Search */}
      <div className="flex items-center gap-3 mb-6 max-w-md">
        <Search className="text-indigo-300" />
        <input
          className="w-full px-3 py-2 rounded-lg bg-indigo-900/30 border border-indigo-800/40
                     backdrop-blur-xl outline-none text-white"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="rounded-2xl p-6 backdrop-blur-xl bg-indigo-900/20 border border-indigo-800/40 shadow-xl">
        <h2 className="text-2xl font-medium mb-4">All Users</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-indigo-200 border-b border-indigo-800/40">
                <th className="py-3">Name</th>
                <th className="py-3">Email</th>
                <th className="py-3">Mobile</th>
                <th className="py-3">Created</th>
                <th className="py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u._id} className="border-b border-indigo-800/20">
                  <td className="py-3">{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.mobile}</td>
                  <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => deleteUser(u._id)}
                      className="p-2 rounded-lg hover:bg-red-600/40 transition"
                    >
                      <Trash2 size={18} className="text-red-300" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
