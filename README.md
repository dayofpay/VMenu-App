# V-MENU Frontend Template

A React.js frontend template for building public digital restaurant menus with custom branding, layouts, and guest-facing experiences.

## What Is V-MENU?

V-MENU is a restaurant software ecosystem for digital menus and guest services. It supports QR-based menu access, multilingual content, product customization, cart and ordering flows, waiter calls, promotional campaigns, online payments, and operational tools for restaurants.

This repository contains the public guest-facing frontend template. It is intended as a starting point for creating restaurant-specific themes and user interfaces that connect to the V-MENU API.

It does **not** include the complete V-MENU platform, backend services, restaurant administration tools, or payment infrastructure.

## Features

- QR-based restaurant and table initialization
- Restaurant categories, products, images, prices, and availability
- Product details, variants, add-ons, and quantity selection
- Shopping cart and checkout flow
- Promotional and discount code support
- Stripe card payment integration
- Multilingual guest interface
- Waiter call and guest action support
- Restaurant announcements and campaigns
- Guest profile and review screens
- Responsive layouts for mobile, tablet, and desktop
- Theme-ready component and Sass structure

Available features depend on the connected V-MENU API configuration and the services enabled for the restaurant.

## Tech Stack

- [React 18](https://react.dev/)
- [Vite 5](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [React Bootstrap](https://react-bootstrap.github.io/) and Bootstrap 5
- [Sass](https://sass-lang.com/)
- [Stripe React](https://docs.stripe.com/stripe-js/react)
- [Framer Motion](https://www.framer.com/motion/)
- [Swiper](https://swiperjs.com/)
- [Chart.js](https://www.chartjs.org/)
- [React Icons](https://react-icons.github.io/react-icons/)
- Native Fetch API for HTTP requests
- ESLint

## Getting Started

### Prerequisites

- Node.js, preferably the current LTS release
- npm
- Access to a V-MENU-compatible API
- A valid restaurant ID and table ID for testing the public menu flow

### Installation

```bash
git clone https://github.com/dayofpay/VMenu-App
cd VMenu-App
npm install
```

### Start the Development Server

```bash
npm run dev
```

Vite starts the application on its displayed local URL, normally:

```text
http://localhost:5173
```

To initialize the menu with restaurant and table context, open:

```text
http://localhost:5173/<restaurant-id>/<table-id>
```

The application stores this context locally and redirects the guest to the menu.

### Build for Production

```bash
npm run build
```

The production bundle is generated in `dist/`.

### Preview the Production Build

```bash
npm run preview
```

### Run Lint Checks

```bash
npm run lint
```

## Configuration

The current template selects its API endpoint and Stripe publishable key through:

- `src/utils/appData.js`
- `src/utils/pathList.js`

Review these files before running or deploying a customized theme. The repository does not currently include an `.env.example` file or automatically read Vite environment variables.

For public forks and deployments, moving environment-specific values to Vite variables is recommended. A possible convention is:

```env
VITE_VMENU_API_URL=https://your-api.example.com
VITE_STRIPE_PUBLIC_KEY=pk_test_your_publishable_key
```

To use this convention, update the configuration code to read the values through `import.meta.env`.

Restaurant and table IDs are runtime route parameters, not build-time environment variables. Do not place Stripe secret keys, API secrets, backend credentials, or private tokens in frontend environment variables. Only publishable browser-safe values belong in the client application.

## Project Structure

```text
VMenu-App/
|-- public/                  # Static assets, manifest, and public scripts
|-- src/
|   |-- components/         # Shared UI and page-specific components
|   |   |-- AppMenus/
|   |   |-- Banners/
|   |   |-- Headers/
|   |   |-- Options/
|   |   |-- PageComponents/
|   |   |-- Sidebars/
|   |   `-- Styles/
|   |-- contexts/           # Cart, restaurant state, and cooldown providers
|   |-- handlers/           # Application behavior helpers
|   |-- HOC/                # Higher-order components
|   |-- hooks/              # Reusable React hooks
|   |-- keys/               # Shared application keys and constants
|   |-- lib/                # Request and integration utilities
|   |-- locales/            # Translation and language resources
|   |-- Pages/              # Route-level page components
|   |-- services/           # V-MENU API service modules
|   `-- utils/              # Configuration, storage, routes, and utilities
|-- index.html
|-- package.json
`-- vite.config.js
```

## Building Custom Themes

The template is designed to be adapted to a restaurant's visual identity.

1. Start with the page composition in `src/components/PageComponents/`.
2. Customize reusable navigation, headers, banners, menus, and sidebars in their component directories.
3. Update the Sass and component styles under `src/components/Styles/` and the relevant page folders.
4. Add or update guest-facing translations in `src/locales/`.
5. Replace public images and brand assets with optimized restaurant assets.
6. Test the complete guest journey on mobile, tablet, laptop, and desktop sizes.

When creating a theme, preserve the existing route contracts, API response handling, cart context, payment flow, local-storage keys, and restaurant/table initialization unless the connected backend is changed at the same time.

## API Integration

API requests are made through the shared request utility in `src/lib/request.js`. Domain-specific operations are grouped in `src/services/`, including:

- Restaurant and menu information
- Products, categories, and add-ons
- Discounts and promotional codes
- Orders and checkout
- Payments
- Announcements
- Guest actions and activity

The request layer reads the active restaurant and table context from local storage and sends it with applicable requests. API paths and response formats should remain compatible with the V-MENU backend contract.

For a custom backend integration, update the service modules and shared request utility together. Avoid calling backend endpoints directly from page components when an existing service module can own that responsibility.

## Development Guidelines

- Follow the existing component, context, service, and routing patterns.
- Keep restaurant-specific styling isolated from shared business logic.
- Use service modules for API communication.
- Keep translations out of payment-provider-controlled elements and other third-party widgets.
- Preserve stable React keys when rendering translated or dynamic lists.
- Test cart totals, discounts, add-ons, checkout, and payment behavior after menu changes.
- Verify language switching after navigation between routes.
- Use responsive images and test long product names and translated text.
- Run `npm run lint` and `npm run build` before submitting changes.
- Never commit private credentials or payment secret keys.

## Branding Rules

Custom restaurant themes may change colors, typography, imagery, layout, and guest-facing content.

The V-MENU and V-DEVS names, logos, legal notices, platform attribution, and proprietary service identifiers must not be presented as belonging to another company. Do not imply that this frontend template includes ownership of the V-MENU backend, infrastructure, or commercial platform.

Third-party brands such as Stripe remain subject to their respective usage guidelines.

## Contributing

Contributions are welcome for bug fixes, accessibility improvements, responsive behavior, translations, documentation, and reusable frontend enhancements.

Before opening a contribution:

1. Create a focused branch.
2. Keep changes compatible with the existing V-MENU API contract.
3. Test the affected guest flow across relevant screen sizes.
4. Run the lint and production build commands.
5. Describe the behavior change and testing performed.

Restaurant-specific branding and private credentials should not be included in general-purpose contributions.

## License

License information will be added soon. Until then, all rights are reserved by V-MENU / V-DEVS.

## Support

- Website: [https://v-menu.eu](https://v-menu.eu)
- Company: V-DEVS
- Email: [support@v-menu.eu](mailto:support@v-menu.eu)

For integration access, commercial use, backend services, or restaurant onboarding, contact the V-MENU team.
