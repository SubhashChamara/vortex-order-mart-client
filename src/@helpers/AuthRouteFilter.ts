export const nonAuthRoutes = ["/sign-in", "/sign-up", "/password-reset"];

export const isNonAuthRoutes = (path: string) => {
    if (nonAuthRoutes.includes(path) || path.includes("/external/")) {
        return true;
    }
    return false;
}
