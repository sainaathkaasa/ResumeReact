import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  sub: string;
  roles: { authority: string }[];
  exp: number;
  iat: number;
}

export const decodeToken = (token: string): JwtPayload => {
  return jwtDecode<JwtPayload>(token);
};
