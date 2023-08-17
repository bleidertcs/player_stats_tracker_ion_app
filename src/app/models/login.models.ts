export interface Session {
  token: string;
  idUser: number;
  profile: any;
  email: string;
  logged: boolean;
}