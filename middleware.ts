export { default } from "next-auth/middleware";

export const config = {
    matcher: ["/teams", "/teams/join", "/teams/current", "/teams/create", "/challenges"],
};
