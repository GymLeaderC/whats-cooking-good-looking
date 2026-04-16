/**
 * @fileoverview Tab navigation for Inventory page.
 * Displays buttons for All, Fridge, Freezer, Pantry.
 * Active tab is highlighted; clicking a tab calls onTabChange callback.
 * @author Joshua Couto
 * @version 1.0.0
 */

export default function InventoryTabs({ tabs, activeTab, onTabChange }) {
  return (
    <div className="flex gap-2 mb-6 border-b" style={{ borderColor: "#9FB3A6" }}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-4 py-2 text-sm font-medium transition ${
            activeTab === tab.id ? "border-b-2" : ""
          }`}
          style={
            activeTab === tab.id
              ? { color: "#2F4A3A", borderColor: "#2F4A3A" }
              : { color: "#5F7C68" }
          }
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}