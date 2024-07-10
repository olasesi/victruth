// Decode the token (base64 to JSON)
export function decodeToken(token) {
  const tokenParts = token.split(".");
  if (tokenParts.length === 3) {
    const payload = tokenParts[1];
    return JSON.parse(atob(payload));
  }
  return null;
}
