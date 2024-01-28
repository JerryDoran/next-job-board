import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({});

// this middleware is used to protect admin routes
export const config = { matcher: ["/(admin)(.*)"] };
