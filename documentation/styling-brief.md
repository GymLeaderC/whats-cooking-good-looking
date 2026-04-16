# Styling Brief — What's Cooking, Good Looking

## Overview
Apply a consistent design system across the entire app. The app is built with **Next.js App Router**, **React**, and **Tailwind CSS**. Use inline `style` props for the custom hex colors below since they are not in the Tailwind config.

---

## Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| Dark Green | `#2F4A3A` | Primary actions, headings, nav background, button backgrounds |
| Mid Green | `#5F7C68` | Secondary buttons, nav bar accents, week navigator background |
| Muted Green | `#9FB3A6` | Borders, inactive states, cancel buttons, card borders |
| Light Green | `#EEF1EA` | Card backgrounds, modal backgrounds, surface color |
| Sand | `#D7B98E` | Warm highlights, selected states, accent buttons (e.g. Add Meal) |
| Light Sand | `#F5ECD9` | Page background (body), all page wrapper divs |

### globals.css
Make sure `app/globals.css` has:
```css
body {
  background-color: #F5ECD9;
}
```

---

## Typography
- All headings: `font-bold`, color `#2F4A3A`
- Page titles: `text-2xl font-bold mb-6`
- Section titles: `text-lg font-semibold`
- Body/labels: `text-sm`, color `#2F4A3A`
- Muted text: `text-sm`, color `#5F7C68`

---

## Component Patterns

### Page Wrapper
Every protected page should use this outer wrapper:
```jsx
<div className="min-h-screen p-6" style={{ backgroundColor: "#F5ECD9" }}>
  <div className="max-w-2xl mx-auto">
    <h1 className="text-2xl font-bold mb-6" style={{ color: "#2F4A3A" }}>
      Page Title
    </h1>
    {/* content */}
  </div>
</div>
```

### Cards / List Items
```jsx
<div
  className="flex items-center justify-between px-4 py-3 rounded-lg border"
  style={{ backgroundColor: "#EEF1EA", borderColor: "#9FB3A6" }}
>
```

### Primary Button (e.g. Save, Confirm, Add)
```jsx
<button
  className="px-4 py-2 text-sm rounded hover:opacity-80 transition"
  style={{ backgroundColor: "#2F4A3A", color: "#EEF1EA" }}
>
```

### Secondary Button (e.g. Cancel)
```jsx
<button
  className="px-4 py-2 text-sm rounded hover:opacity-80 transition"
  style={{ backgroundColor: "#9FB3A6", color: "#2F4A3A" }}
>
```

### Accent Button (e.g. + Add Item, + Add Meal)
```jsx
<button
  className="px-4 py-2 text-sm rounded hover:opacity-80 transition"
  style={{ backgroundColor: "#D7B98E", color: "#2F4A3A" }}
>
```

### Modals
```jsx
{/* Overlay */}
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  {/* Modal Box */}
  <div className="rounded-lg p-6 w-80 space-y-4" style={{ backgroundColor: "#EEF1EA" }}>
    <h2 className="text-lg font-semibold" style={{ color: "#2F4A3A" }}>
      Modal Title
    </h2>
    {/* content */}
    <div className="flex justify-end gap-2 pt-2">
      {/* Cancel = secondary button, Confirm = primary button */}
    </div>
  </div>
</div>
```

### Form Inputs
```jsx
<input
  className="w-full border rounded p-2 text-sm focus:outline-none focus:ring-2"
  style={{ borderColor: "#9FB3A6", backgroundColor: "#F5ECD9", color: "#2F4A3A" }}
/>

<select
  className="w-full border rounded p-2 text-sm focus:outline-none focus:ring-2"
  style={{ borderColor: "#9FB3A6", backgroundColor: "#F5ECD9", color: "#2F4A3A" }}
/>
```

### Tab Navigation (e.g. Inventory tabs: All / Fridge / Freezer / Pantry)
```jsx
<div className="flex gap-2 mb-6 border-b" style={{ borderColor: "#9FB3A6" }}>
  {/* Active tab */}
  <button
    className="px-4 py-2 text-sm font-medium border-b-2"
    style={{ color: "#2F4A3A", borderColor: "#2F4A3A" }}
  >
    Active Tab
  </button>
  {/* Inactive tab */}
  <button
    className="px-4 py-2 text-sm font-medium"
    style={{ color: "#5F7C68" }}
  >
    Inactive Tab
  </button>
</div>
```

### Section Headers (e.g. category groupings in Inventory and Grocery List)
```jsx
<div className="mb-4">
  <h2 className="text-sm font-semibold uppercase tracking-wide mb-2" style={{ color: "#5F7C68" }}>
    Category Name
  </h2>
  <div className="flex flex-col gap-2">
    {/* items */}
  </div>
</div>
```

---

## Navbar
The Navbar lives at `components/layout/Navbar.js`. Apply these styles:

- Navbar background: `#2F4A3A`
- App title / logo text: `#EEF1EA`, `font-bold`
- Nav links (active): `#D7B98E`, `font-semibold`
- Nav links (inactive): `#9FB3A6`, hover to `#EEF1EA`
- Hamburger icon: `#EEF1EA`
- Drawer background: `#2F4A3A`
- Drawer overlay: `bg-black bg-opacity-40`
- Sign out button in drawer: secondary button style (`#9FB3A6` bg, `#2F4A3A` text)

---

## Page-by-Page Notes

### Home / Dashboard (`app/(protected)/home/page.js`)
- Show a welcome message using `user.displayName` from `useAuth()`
- Show the household name using `householdData.name` from `useHousehold()`
- Display summary cards linking to each main section (Inventory, Recipes, Meal Planner, Grocery List)
- Summary cards use the card pattern above with a `#2F4A3A` icon or label and `#5F7C68` subtitle

### Inventory (`app/(protected)/inventory/page.js`)
- Page background: `#F5ECD9`
- Tabs: All / Fridge / Freezer / Pantry — use tab pattern above
- Each inventory item card: card pattern above
- Category section headers: section header pattern above
- Add Item button (floating or top-right): accent button style

### Recipes (`app/(protected)/recipes/page.js`)
- Page background: `#F5ECD9`
- Recipe cards in a `flex flex-col gap-3` list
- Each recipe card: card pattern, show recipe title and tag/category
- Add Recipe button: accent button style

### Grocery List (`app/(protected)/grocery-list/page.js`)
- Page background: `#F5ECD9`
- Items grouped by category using section header pattern
- Each grocery item: card pattern, with a checkbox on the left
- Checked items: `line-through`, muted text color `#9FB3A6`
- Add Item button: accent button style

### Meal Planner (`app/(protected)/meal-planner/page.js`)
- Already styled — do not change
- Background: `#F5ECD9`

### Settings (`app/(protected)/settings/page.js`)
- Page background: `#F5ECD9`
- Show household name, member list
- Dietary preferences as tag-style chips:
```jsx
<span
  className="px-3 py-1 rounded-full text-sm font-medium"
  style={{ backgroundColor: "#9FB3A6", color: "#2F4A3A" }}
>
  gluten-free
</span>
```

---

## Mood & Intent
- **Focused, tidy, confident** — like a well-organized kitchen
- No drop shadows, no gradients — flat and clean
- Rounded corners everywhere (`rounded-lg`)
- Consistent spacing: `gap-3` between list items, `p-4` or `p-6` for page padding
- Mobile-first: `max-w-2xl mx-auto` keeps content centered on desktop

---

## What NOT to Change
- Do not change any JavaScript logic, state, props, or function names
- Do not change import paths
- Do not add new dependencies
- Only modify `className` and `style` props
- The Meal Planner page and its components are already styled — only touch them if something looks inconsistent with this guide
