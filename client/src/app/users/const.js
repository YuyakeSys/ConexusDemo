const API_URL = "http://localhost:3000/users/tokens";
let access_token;
let refresh_token =
  typeof window !== "undefined" ? localStorage.getItem("refresh_token") : null;
let resource_owner;

const userSession = async () => {
  // Assuming refreshToken and requestNewAccessToken are available
  await refreshToken();
  await requestNewAccessToken();

  // Update state or context with access_token and resource_owner
  if (nullOrUndefined(access_token)) {
    // Update UI based on user session status
    // For example, show signup and login forms, hide sign out button
  } else {
    // Update UI based on user session status
    // For example, hide signup and login forms, show sign out button
  }

  getUser();
};

const getUser = () => {
  const stored_resource =
    typeof window !== "undefined"
      ? localStorage.getItem("resource_owner")
      : null;
  if (nullOrUndefined(stored_resource)) {
    toggleUserDiv();
    return;
  }
  const parsedResource = JSON.parse(stored_resource);
  setResourceOwner(parsedResource);
  toggleUserDiv();
};
