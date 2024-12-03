export const storeUserInLocalStorage = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
};

export const getTokenFromLocalStorage = () => {
    const { token } = JSON.parse(localStorage.getItem("user"));
    return token;
};

export const setTokenInLocalStorage = (accessToken) => {
    const user = JSON.parse(localStorage.getItem("user"));
    user.accessToken = accessToken;
    storeUserInLocalStorage(user);
};

export const getRefreshTokenFromLocalStorage = () => {
    const { refreshToken } = JSON.parse(localStorage.getItem("user"));
    return refreshToken;
};