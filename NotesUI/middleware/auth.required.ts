export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const token = localStorage.getItem("auth_token");

    // If user is not authenticated, redirect to login page
    if (!token) {
      return navigateTo("/login");
    }
  }
});
