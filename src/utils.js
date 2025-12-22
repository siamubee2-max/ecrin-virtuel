export function createPageUrl(pageName) {
  // Convert page name to URL path
  const routes = {
    'Gallery': '/',
    'StyleFeed': '/feed',
    'Studio': '/studio',
    'Wardrobe': '/wardrobe',
    'Closet': '/closet',
    'JewelryBox': '/jewelry',
    'Profile': '/profile',
    'Orders': '/orders',
    'BrandPartnerships': '/partnerships',
    'AdminOrders': '/admin/orders',
    'AdminPartnerships': '/admin/partnerships',
    'Checkout': '/checkout',
    'Stylists': '/stylists',
    'Lookbook': '/lookbook',
    'CreatorOnboarding': '/creator-onboarding',
  }
  
  // Check if it's a route with query params
  if (pageName.includes('?')) {
    const [page, query] = pageName.split('?')
    const basePath = routes[page] || `/${page.toLowerCase()}`
    return `${basePath}?${query}`
  }
  
  return routes[pageName] || `/${pageName.toLowerCase()}`
}

export function formatPrice(price, currency = 'EUR') {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency
  }).format(price)
}