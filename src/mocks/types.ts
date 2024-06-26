export interface SignUpResponse {
  id: string;
  username: string;
  bio: string | null;
  image: string | null;
  email: string;
  token: string;
}
