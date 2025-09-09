import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  id: string;
  role: string;
  iat: number;
  exp: number;
  
}

export function getUserFromToken(): TokenPayload | null {
  const token = localStorage.getItem("access_token");
  if (!token) return null;

  try {
    const decoded = jwtDecode<TokenPayload>(token);

    
    const now = Date.now() / 1000;
    if (decoded.exp < now) {
      return null;
    }

    return decoded;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
}
