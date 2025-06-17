const BASE_URL = "https://skazoknet.com";

const formEndpoints = {
  registerForm: {
    endpoint: `${BASE_URL}/register`,
    method: "POST",
    redirectPath: "/dashboard",
  },
  loginForm: {
    endpoint: `${BASE_URL}/login`,
    method: "POST",
    redirectPath: "/dashboard",
  },
  recoveryPasswordForm: {
    endpoint: `${BASE_URL}/recover-password`,
    method: "POST",
    redirectPath: "/login",
  },
  editUserForm: {
    endpoint: "https://api.example.com/edit-user",
    method: "PUT",
    redirectPath: "/profile",
  },
};

export default formEndpoints;
