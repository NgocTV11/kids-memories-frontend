/**
 * Clear All Cache Script
 * 
 * Run this in browser console to clear all cached data:
 * - localStorage
 * - sessionStorage
 * - cookies
 * - service workers
 * 
 * Use when you have authentication issues or stale data
 */

async function clearAllCache() {
  try {
    console.log('🧹 Starting cache cleanup...');
    
    // Clear localStorage
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
      console.log('✅ localStorage cleared');
    }
    
    // Clear sessionStorage
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.clear();
      console.log('✅ sessionStorage cleared');
    }
    
    // Clear all cookies
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    console.log('✅ Cookies cleared');
    
    // Clear service workers
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
      }
      console.log('✅ Service workers cleared');
    }
    
    // Clear cache storage
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(name => caches.delete(name))
      );
      console.log('✅ Cache storage cleared');
    }
    
    console.log('🎉 All cache cleared successfully!');
    console.log('💡 Tip: Refresh the page (F5) to see changes');
    
    return true;
  } catch (error) {
    console.error('❌ Error clearing cache:', error);
    return false;
  }
}

// Auto-run if in browser
if (typeof window !== 'undefined') {
  console.log('📋 Clear cache script loaded!');
  console.log('📝 Run: clearAllCache()');
}

export { clearAllCache };
