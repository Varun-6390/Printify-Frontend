import React, { useEffect, useState } from "react";
import axios from "axios";
import { Save } from "lucide-react";

export default function AdminManagePricing() {
  const [settings, setSettings] = useState({
    bwSingle: 1,
    bwDouble: 1.5,
    colorSingle: 2,
    colorDouble: 3,
    maxFileSizeMB: 50,
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/settings`).then((res) => {
      if (res.data) setSettings(res.data);
    });
  }, []);

  const updateField = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const saveSettings = async () => {
    setIsSaving(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/settings`, settings);
      alert("Pricing updated successfully!");
    } catch (err) {
      alert("Error saving settings.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-8 text-white">

      <h2 className="text-3xl font-light mb-10 tracking-wide">
        Manage <span className="text-teal-300">Print Pricing</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        <div className="p-8 rounded-xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg">
          <h3 className="text-2xl font-light mb-6">Black & White Pricing</h3>

          <div className="space-y-6">

            <div>
              <label className="text-sm text-gray-300">Single-Side (₹ per page)</label>
              <input
                type="number"
                name="bwSingle"
                value={settings.bwSingle}
                onChange={updateField}
                className="w-full mt-1 bg-white/10 border border-white/20 p-3 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">Double-Side (₹ per sheet)</label>
              <input
                type="number"
                name="bwDouble"
                value={settings.bwDouble}
                onChange={updateField}
                className="w-full mt-1 bg-white/10 border border-white/20 p-3 rounded-lg text-white"
              />
            </div>

          </div>
        </div>

        <div className="p-8 rounded-xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg">
          <h3 className="text-2xl font-light mb-6">Color Printing Pricing</h3>

          <div className="space-y-6">

            <div>
              <label className="text-sm text-gray-300">Single-Side (₹ per page)</label>
              <input
                type="number"
                name="colorSingle"
                value={settings.colorSingle}
                onChange={updateField}
                className="w-full mt-1 bg-white/10 border border-white/20 p-3 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="text-sm text-gray-300">Double-Side (₹ per sheet)</label>
              <input
                type="number"
                name="colorDouble"
                value={settings.colorDouble}
                onChange={updateField}
                className="w-full mt-1 bg-white/10 border border-white/20 p-3 rounded-lg text-white"
              />
            </div>

          </div>
        </div>

        <div className="p-8 rounded-xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg md:col-span-2">
          <h3 className="text-2xl font-light mb-6">File Upload Settings</h3>

          <div className="space-y-6">

            <div>
              <label className="text-sm text-gray-300">Max File Size (MB)</label>
              <input
                type="number"
                name="maxFileSizeMB"
                value={settings.maxFileSizeMB}
                onChange={updateField}
                className="w-full mt-1 bg-white/10 border border-white/20 p-3 rounded-lg text-white"
              />
            </div>

          </div>
        </div>

      </div>

      <button
        onClick={saveSettings}
        disabled={isSaving}
        className="mt-10 flex items-center gap-2 px-8 py-3 rounded-lg bg-teal-400 text-black font-semibold hover:bg-teal-300 transition disabled:bg-gray-500"
      >
        <Save size={20} />
        {isSaving ? "Saving..." : "Save Settings"}
      </button>

    </div>
  );
}
