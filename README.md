# Structure Overview

src/
├── \_components/
│ ├── \_shared/
│ │ ├── helpers/
│ │ │ └── formatPrice.js
│ │ ├── hooks/
│ │ │ ├── useFetch.js
│ │ │ └── useCart.js
│ │ └── ui/
│ │ └── Layout/
│ │ ├── Layout.jsx ← Wrapper
│ │ ├── Navbar.jsx
│ │ └── Footer.jsx
│ │
│ └── \_components/
│ ├── HomePage/
│ │ ├── HomePage.jsx
│ │ ├── HeroSlider.jsx
│ │ ├── BannerSection.jsx
│ │ ├── ProductTabs.jsx
│ │ ├── DealOfWeek.jsx
│ │ └── homePage.utils.js
│ │
│ ├── ShopPage/
│ │ ├── ShopPage.jsx
│ │ ├── ProductCard.jsx
│ │ ├── ProductGrid.jsx
│ │ ├── QuantitySelector.jsx
│ │ └── shopPage.utils.js
│ ├
│ ├── Contact/
│ │ ├── Contactpage.jsx
│ │
│ └── CartPage/
│ ├── CartPage.jsx
│ ├── CartItem.jsx
│ ├── CartSummary.jsx
│ └── cartPage.utils.js
│
├── context/
│ └── CartContext.jsx
├── router/
│ └── AppRouter.jsx
├── theme/
│ └── muiTheme.js
├── App.jsx
└── main.jsx
# Male-Fashion
