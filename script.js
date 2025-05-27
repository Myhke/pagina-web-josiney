// Products Data
const products = [
    {
      id: 1,
      name: "Oud Royal Intense",
      brand: "Maison Alhambra",
      price: 89.99,
      originalPrice: 129.99,
      discount: 31,
      rating: 4.8,
      reviews: 124,
      image: "/placeholder.svg?height=300&width=250",
      category: "arabes",
      bestseller: true,
      new: false,
    },
    {
      id: 2,
      name: "Black Orchid Elegance",
      brand: "Luxury Scents",
      price: 65.99,
      originalPrice: 89.99,
      discount: 27,
      rating: 4.6,
      reviews: 89,
      image: "/placeholder.svg?height=300&width=250",
      category: "mujer",
      bestseller: false,
      new: true,
    },
    {
      id: 3,
      name: "Santal Mysore Premium",
      brand: "Oriental Fragrances",
      price: 95.99,
      originalPrice: 139.99,
      discount: 31,
      rating: 4.9,
      reviews: 156,
      image: "/placeholder.svg?height=300&width=250",
      category: "hombre",
      bestseller: true,
      new: false,
    },
    {
      id: 4,
      name: "Rose de Damas",
      brand: "Floral Collection",
      price: 72.99,
      originalPrice: 99.99,
      discount: 27,
      rating: 4.7,
      reviews: 98,
      image: "/placeholder.svg?height=300&width=250",
      category: "mujer",
      bestseller: false,
      new: false,
    },
    {
      id: 5,
      name: "Amber Noir Intense",
      brand: "Arabian Nights",
      price: 78.99,
      originalPrice: 109.99,
      discount: 28,
      rating: 4.8,
      reviews: 142,
      image: "/placeholder.svg?height=300&width=250",
      category: "arabes",
      bestseller: false,
      new: false,
    },
    {
      id: 6,
      name: "Citrus Fresh Sport",
      brand: "Active Scents",
      price: 45.99,
      originalPrice: 65.99,
      discount: 30,
      rating: 4.5,
      reviews: 76,
      image: "/placeholder.svg?height=300&width=250",
      category: "hombre",
      bestseller: false,
      new: true,
    },
  ]
  
  // Global Variables
  let currentCategory = "todos"
  let cartCount = 0
  
  // DOM Elements
  const productsContainer = document.getElementById("productsContainer")
  const sectionTitle = document.getElementById("sectionTitle")
  const cartCountElement = document.getElementById("cartCount")
  const categoryButtons = document.querySelectorAll(".category-btn")
  const priceFilter = document.getElementById("priceFilter")
  
  // Initialize App
  document.addEventListener("DOMContentLoaded", () => {
    renderProducts()
    setupEventListeners()
  })
  
  // Setup Event Listeners
  function setupEventListeners() {
    // Category buttons
    categoryButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const category = this.getAttribute("data-category")
        setActiveCategory(category)
        filterProducts(category)
      })
    })
  
    // Price filter
    priceFilter.addEventListener("change", () => {
      filterProducts(currentCategory)
    })
  
    // Search functionality
    const searchInput = document.getElementById("searchInput")
    const searchBtn = document.getElementById("searchBtn")
  
    if (searchBtn) {
      searchBtn.addEventListener("click", performSearch)
    }
  
    if (searchInput) {
      searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          performSearch()
        }
      })
    }
  
    // Cart button
    const cartBtn = document.getElementById("cartBtn")
    if (cartBtn) {
      cartBtn.addEventListener("click", () => {
        alert("Funcionalidad del carrito - Próximamente")
      })
    }
  }
  
  // Set Active Category
  function setActiveCategory(category) {
    currentCategory = category
  
    // Update button states
    categoryButtons.forEach((button) => {
      button.classList.remove("active")
      if (button.getAttribute("data-category") === category) {
        button.classList.add("active")
      }
    })
  
    // Update section title
    const categoryNames = {
      todos: "Todos los Productos",
      hombre: "Perfumes para Hombre",
      mujer: "Perfumes para Mujer",
      arabes: "Perfumes Árabes",
      unisex: "Perfumes Unisex",
    }
  
    sectionTitle.textContent = categoryNames[category] || "Productos"
  
    // Close mobile menu
    const navbarCollapse = document.getElementById("navbarNav")
    if (navbarCollapse.classList.contains("show")) {
      const bsCollapse = new bootstrap.Collapse(navbarCollapse)
      bsCollapse.hide()
    }
  }
  
  // Filter Products
  function filterProducts(category) {
    let filteredProducts = products
  
    // Filter by category
    if (category !== "todos") {
      filteredProducts = products.filter((product) => product.category === category)
    }
  
    // Filter by price
    const priceRange = priceFilter.value
    if (priceRange !== "todos") {
      filteredProducts = filteredProducts.filter((product) => {
        switch (priceRange) {
          case "0-50":
            return product.price <= 50
          case "50-100":
            return product.price > 50 && product.price <= 100
          case "100+":
            return product.price > 100
          default:
            return true
        }
      })
    }
  
    renderProducts(filteredProducts)
  }
  
  // Render Products
  function renderProducts(productsToRender = products) {
    if (!productsContainer) return
  
    productsContainer.innerHTML = ""
  
    if (productsToRender.length === 0) {
      productsContainer.innerHTML = `
              <div class="col-12 text-center py-5">
                  <h4 class="text-gold">No se encontraron productos</h4>
                  <p class="text-light-gray">Intenta con otros filtros</p>
              </div>
          `
      return
    }
  
    productsToRender.forEach((product) => {
      const productCard = createProductCard(product)
      productsContainer.appendChild(productCard)
    })
  }
  
  // Create Product Card
  function createProductCard(product) {
    const col = document.createElement("div")
    col.className = "col-lg-3 col-md-4 col-sm-6"
  
    const discountBadge =
      product.discount > 0 ? `<span class="badge bg-danger product-badge">-${product.discount}%</span>` : ""
  
    const specialBadge = product.bestseller
      ? `<span class="badge bg-warning text-dark product-badge" style="top: 10px; left: ${product.discount > 0 ? "80px" : "10px"};">Bestseller</span>`
      : product.new
        ? `<span class="badge bg-success product-badge" style="top: 10px; left: ${product.discount > 0 ? "80px" : "10px"};">Nuevo</span>`
        : ""
  
    const stars = generateStars(product.rating)
  
    col.innerHTML = `
          <div class="product-card">
              <div class="product-image">
                  <img src="${product.image}" alt="${product.name}" loading="lazy">
                  ${discountBadge}
                  ${specialBadge}
                  <button class="btn btn-outline-light btn-sm product-favorite">
                      <i class="bi bi-heart"></i>
                  </button>
              </div>
              <div class="product-info">
                  <div class="product-brand">${product.brand}</div>
                  <h5 class="product-name">${product.name}</h5>
                  <div class="product-rating">
                      ${stars}
                      <small class="text-light-gray ms-2">(${product.reviews})</small>
                  </div>
                  <div class="product-price">
                      <span class="price-current">S/ ${product.price.toFixed(2)}</span>
                      ${product.originalPrice ? `<span class="price-original">S/ ${product.originalPrice.toFixed(2)}</span>` : ""}
                  </div>
                  <button class="btn btn-gold w-100" onclick="addToCart(${product.id})">
                      Agregar al Carrito
                  </button>
              </div>
          </div>
      `
  
    return col
  }
  
  // Generate Stars
  function generateStars(rating) {
    let stars = ""
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars += '<i class="bi bi-star-fill star-filled"></i>'
      } else if (i - 0.5 <= rating) {
        stars += '<i class="bi bi-star-half star-filled"></i>'
      } else {
        stars += '<i class="bi bi-star star-empty"></i>'
      }
    }
    return stars
  }
  
  // Add to Cart
  function addToCart(productId) {
    cartCount++
    updateCartCount()
  
    // Show success message
    showToast("Producto agregado al carrito")
  
    // Add animation to cart button
    const cartBtn = document.getElementById("cartBtn")
    cartBtn.classList.add("animate__animated", "animate__pulse")
    setTimeout(() => {
      cartBtn.classList.remove("animate__animated", "animate__pulse")
    }, 1000)
  }
  
  // Update Cart Count
  function updateCartCount() {
    if (cartCount > 0) {
      cartCountElement.textContent = cartCount
      cartCountElement.style.display = "block"
    } else {
      cartCountElement.style.display = "none"
    }
  }
  
  // Show Toast Message
  function showToast(message) {
    // Create toast element
    const toast = document.createElement("div")
    toast.className = "toast-message"
    toast.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: linear-gradient(135deg, var(--gold), var(--gold-dark));
          color: var(--black);
          padding: 15px 20px;
          border-radius: 8px;
          font-weight: 600;
          z-index: 9999;
          transform: translateX(100%);
          transition: transform 0.3s ease;
          box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
      `
    toast.textContent = message
  
    document.body.appendChild(toast)
  
    // Animate in
    setTimeout(() => {
      toast.style.transform = "translateX(0)"
    }, 100)
  
    // Animate out and remove
    setTimeout(() => {
      toast.style.transform = "translateX(100%)"
      setTimeout(() => {
        document.body.removeChild(toast)
      }, 300)
    }, 3000)
  }
  
  // Perform Search
  function performSearch() {
    const searchInput = document.getElementById("searchInput")
    const query = searchInput.value.toLowerCase().trim()
  
    if (query === "") {
      renderProducts()
      return
    }
  
    const filteredProducts = products.filter(
      (product) => product.name.toLowerCase().includes(query) || product.brand.toLowerCase().includes(query),
    )
  
    renderProducts(filteredProducts)
  
    // Update section title
    sectionTitle.textContent = `Resultados para: "${query}"`
  }
  
  // Smooth scroll to top
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }
  
  // Add scroll to top button
  window.addEventListener("scroll", () => {
    const scrollBtn = document.getElementById("scrollTopBtn")
    if (window.pageYOffset > 300) {
      if (!scrollBtn) {
        createScrollTopButton()
      } else {
        scrollBtn.style.display = "block"
      }
    } else if (scrollBtn) {
      scrollBtn.style.display = "none"
    }
  })
  
  // Create scroll to top button
  function createScrollTopButton() {
    const button = document.createElement("button")
    button.id = "scrollTopBtn"
    button.innerHTML = '<i class="bi bi-arrow-up"></i>'
    button.className = "btn btn-gold position-fixed"
    button.style.cssText = `
          bottom: 20px;
          right: 20px;
          z-index: 1000;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
      `
    button.onclick = scrollToTop
    document.body.appendChild(button)
  }
  
  // Initialize tooltips and popovers
  document.addEventListener("DOMContentLoaded", () => {
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl))
  })
  