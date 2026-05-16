# Sass Architecture - Furniro Project

## 📁 Folder Structure

```
assets/sass/
├── abstracts/              # Variables, mixins, functions
│   ├── _variables.scss     # CSS custom properties (colors, fonts, spacing, etc.)
│   ├── _mixins.scss        # Reusable mixins
│   └── _base.scss          # Base abstract utilities
├── base/                   # Base/element styles
│   ├── _reset.scss         # Global reset (*, a, button)
│   ├── _typography.scss    # Headings, text styles, utilities
│   ├── _animations.scss    # Keyframes and animations
│   ├── _global.scss        # Global base styles
│   ├── _root.scss          # Root styles
│   └── _utilities.scss     # Utility classes
├── components/             # Reusable UI components
│   ├── _buttons.scss       # Button styles (filled, outlined, sizes)
│   ├── _icons.scss         # Icon button styles
│   ├── _search-dialog.scss # Search modal/dialog
│   ├── _toast.scss         # Toast notification system
│   ├── _cards.scss         # Card components
│   ├── _icon-button.scss   # Icon buttons
│   ├── _inputs.scss        # Form inputs
│   └── _shimmer.scss       # Shimmer loading effect
├── layout/                 # Layout components
│   ├── _header.scss        # Header and navigation
│   ├── _footer.scss        # Footer
│   └── _navbar.scss        # Navigation bar
├── pages/                  # Page-specific styles
│   ├── _hero.scss          # Hero/banner section
│   ├── _categories.scss    # Category cards
│   ├── _products.scss      # Product grid and cards
│   ├── _room-inspiration.scss # Room inspiration section
│   ├── _auth-form.scss     # Auth form styles (login/signup)
│   └── _split-layout.scss  # Split layout for auth pages
├── main.scss               # Entry point for main/index page
├── login.scss              # Entry point for login page
├── signup.scss             # Entry point for signup page
└── forgot-password.scss    # Entry point for forgot password page
```

## 🚀 Usage

### Watch Mode (Development)
Run this command to automatically compile Sass files when changes are detected:

```bash
npm run sass
```

This watches `assets/sass/` and compiles to `assets/css/`.

### Build (Production)
Compile all page CSS files at once:

```bash
npm run sass:build
```

## 📄 Entry Points

Each page has its own entry point that imports only the styles it needs:

### 1. `main.scss` → `css/main.css`
For the main/index page. Imports:
- Variables, reset, typography, animations
- Buttons, icons, search dialog, toast
- Header layout
- Hero, categories, products, room inspiration pages

### 2. `login.scss` → `css/login.css`
For the login page. Imports:
- Variables, reset, typography
- Icons
- Header (optional)
- Login-specific styles (split layout, auth form, background image)

### 3. `signup.scss` → `css/signup.css`
For the signup page. Same structure as login.scss with different background image.

### 4. `forgot-password.scss` → `css/forgot-password.css`
For the forgot password page. Same structure as login.scss with different background image.

## 🎨 Sass Features Used

- **`@use`**: Modern Sass module system (replaces old `@import`)
- **Nesting**: Child selectors nested inside parent selectors
- **Variables**: CSS custom properties defined in `_variables.scss`
- **Parent Selector (`&`)**: For pseudo-classes, modifiers, and BEM-style naming
- **Partials**: Files starting with `_` that are imported into entry points

## 📝 Import Order

Each entry file follows this import order:
1. **Abstracts** (variables first)
2. **Base** (reset, typography)
3. **Components** (only needed components)
4. **Layout** (header, etc.)
5. **Page-specific styles** (inline)

## 🔧 CSS Output

Each Sass entry point compiles to a separate CSS file:

| Sass Entry Point | CSS Output |
|-----------------|------------|
| `assets/sass/main.scss` | `assets/css/main.css` |
| `assets/sass/login.scss` | `assets/css/login.css` |
| `assets/sass/signup.scss` | `assets/css/signup.css` |
| `assets/sass/forgot-password.scss` | `assets/css/forgot-password.css` |

## 📌 Notes

- Each page only imports the styles it needs, keeping CSS output small and optimized
- Shared styles (variables, base, components) are defined once and reused via `@use`
- No old `@import` statements are used - only modern `@use` syntax