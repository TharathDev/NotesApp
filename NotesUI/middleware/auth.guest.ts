export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const token = localStorage.getItem("auth_token");

    // If user is authenticated, redirect to notes page
    if (token) {
      return navigateTo("/notes");
    }
  }
});
