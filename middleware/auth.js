export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path.startsWith('/admin')) {
    const isAuthenticated = false;
    
    if (!isAuthenticated) {
      console.log('Access denied - redirecting to home');
      return navigateTo('/');
    }
  }

  if (import.meta.client) {
    console.log(`Navigating from ${from.path} to ${to.path}`);
  }

  return;
});
