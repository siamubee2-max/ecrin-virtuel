/**
 * Despia Native Helper
 * Wrapper pour les fonctionnalités natives Despia
 * Fonctionne en mode web (fallback) et en mode app native
 * 
 * Note: En production avec Despia, window.despia est injecté automatiquement
 * par le runtime natif. Pas besoin du package npm.
 */

// Check if running in Despia native app
export const isNativeApp = () => {
  return typeof window !== 'undefined' && typeof window.despia !== 'undefined';
};

// Safe wrapper for despia calls using window.despia
const safeDespia = (command) => {
  if (!isNativeApp()) {
    console.log('[Despia] Not in native app, skipping:', command);
    return Promise.resolve(null);
  }
  
  try {
    // Use window.despia directly (injected by Despia runtime)
    window.despia = command;
    return Promise.resolve(true);
  } catch (error) {
    console.error('[Despia] Error:', error);
    return Promise.resolve(null);
  }
};

// For commands that return data, we need to watch variables
const safeDespiaWithResponse = (command, variableName) => {
  return new Promise((resolve) => {
    if (!isNativeApp()) {
      console.log('[Despia] Not in native app, skipping:', command);
      resolve(null);
      return;
    }
    
    try {
      // Set up watcher for the response variable
      const checkVariable = () => {
        if (window[variableName] !== undefined) {
          const value = window[variableName];
          resolve(value);
        } else {
          setTimeout(checkVariable, 100);
        }
      };
      
      // Send the command
      window.despia = command;
      
      // Start watching for response (timeout after 5 seconds)
      const timeout = setTimeout(() => resolve(null), 5000);
      checkVariable();
      
    } catch (error) {
      console.error('[Despia] Error:', error);
      resolve(null);
    }
  });
};

// ============================================
// HAPTICS - Retour tactile
// ============================================

export const haptics = {
  light: () => safeDespia('lighthaptic://'),
  medium: () => safeDespia('mediumhaptic://'),
  heavy: () => safeDespia('heavyhaptic://'),
  success: () => safeDespia('successhaptic://'),
  warning: () => safeDespia('warninghaptic://'),
  error: () => safeDespia('errorhaptic://'),
};

// ============================================
// CAMERA - Appareil photo
// ============================================

export const camera = {
  requestPermission: () => safeDespia('requestcamerapermission://'),
  takePhoto: () => safeDespiaWithResponse('takephoto://', 'photoData'),
  pickFromGallery: () => safeDespiaWithResponse('pickimage://', 'imageData'),
};

// ============================================
// SHARING - Partage natif
// ============================================

export const share = {
  app: (message, url) => {
    const encodedMessage = encodeURIComponent(message);
    const encodedUrl = encodeURIComponent(url);
    return safeDespia(`shareapp://message?=${encodedMessage}&url=${encodedUrl}`);
  },
  image: (imageUrl) => safeDespia(`shareimage://?url=${encodeURIComponent(imageUrl)}`),
  text: (text) => safeDespia(`sharetext://?text=${encodeURIComponent(text)}`),
};

// ============================================
// STORAGE - Sauvegarde
// ============================================

export const storage = {
  saveImage: (imageUrl) => safeDespia(`savethisimage://?url=${encodeURIComponent(imageUrl)}`),
  takeScreenshot: () => safeDespia('takescreenshot://'),
};

// ============================================
// NOTIFICATIONS - Push
// ============================================

export const notifications = {
  getPlayerId: () => safeDespiaWithResponse('getonesignalplayerid://', 'onesignalplayerid'),
  requestPermission: () => safeDespia('requestnotificationpermission://'),
};

// ============================================
// BIOMETRICS - Face ID / Touch ID
// ============================================

export const biometrics = {
  authenticate: () => safeDespia('bioauth://'),
  isAvailable: () => safeDespiaWithResponse('bioauthavailable://', 'available'),
};

// ============================================
// IN-APP PURCHASES - RevenueCat
// ============================================

export const purchases = {
  buy: (userId, productId) => {
    return safeDespia(`revenuecat://purchase?external_id=${userId}&product=${productId}`);
  },
  restore: (userId) => {
    return safeDespia(`revenuecat://restore?external_id=${userId}`);
  },
  getSubscriptionStatus: (userId) => {
    return safeDespiaWithResponse(`revenuecat://status?external_id=${userId}`, 'status');
  },
};

// ============================================
// DEVICE INFO
// ============================================

export const device = {
  getInfo: () => safeDespiaWithResponse('getdeviceinfo://', 'deviceInfo'),
  getAppVersion: () => safeDespiaWithResponse('getappversion://', 'versionNumber'),
  getPlatform: () => {
    if (!isNativeApp()) return 'web';
    // Check user agent for platform
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('iphone') || ua.includes('ipad')) return 'ios';
    if (ua.includes('android')) return 'android';
    return 'unknown';
  },
};

// ============================================
// SAFE AREA - Pour les notch iPhone
// ============================================

export const getSafeAreaInsets = () => {
  if (typeof window === 'undefined') {
    return { top: 0, bottom: 0, left: 0, right: 0 };
  }
  
  const root = document.documentElement;
  return {
    top: parseInt(getComputedStyle(root).getPropertyValue('--safe-area-top') || '0'),
    bottom: parseInt(getComputedStyle(root).getPropertyValue('--safe-area-bottom') || '0'),
    left: parseInt(getComputedStyle(root).getPropertyValue('--safe-area-left') || '0'),
    right: parseInt(getComputedStyle(root).getPropertyValue('--safe-area-right') || '0'),
  };
};

// ============================================
// EXPORT PAR DÉFAUT
// ============================================

export default {
  isNativeApp,
  haptics,
  camera,
  share,
  storage,
  notifications,
  biometrics,
  purchases,
  device,
  getSafeAreaInsets,
};
