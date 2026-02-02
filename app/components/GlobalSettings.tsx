"use client";

interface GlobalSettingsProps {
  values: Record<string, string>;
  onChange: (values: Record<string, string>) => void;
}

export default function GlobalSettings({ values, onChange }: GlobalSettingsProps) {
  const handleChange = (key: string, value: string) => {
    onChange({ ...values, [key]: value });
  };

  return (
    <div className="border border-stone-200 bg-white">
      <div className="px-3 py-2 bg-stone-50 border-b border-stone-200">
        <span className="font-mono text-xs text-stone-500 uppercase tracking-widest">
          Your Details
        </span>
      </div>
      <div className="p-3 space-y-3">
        <div>
          <label className="block font-mono text-xs text-stone-500 mb-1">
            GitHub Username
          </label>
          <input
            type="text"
            value={values.username || ""}
            onChange={(e) => handleChange("username", e.target.value)}
            placeholder="octocat"
            className="
              w-full px-2 py-1.5
              font-mono text-sm text-stone-800
              border-b border-stone-200 focus:border-stone-400
              bg-transparent
              outline-none
            "
          />
        </div>
        <div>
          <label className="block font-mono text-xs text-stone-500 mb-1">
            Display Name
          </label>
          <input
            type="text"
            value={values.name || ""}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Your Name"
            className="
              w-full px-2 py-1.5
              font-mono text-sm text-stone-800
              border-b border-stone-200 focus:border-stone-400
              bg-transparent
              outline-none
            "
          />
        </div>
      </div>
    </div>
  );
}
