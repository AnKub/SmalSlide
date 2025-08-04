export interface Contacts {
  dob?: string;
  country?: string;
  city?: string;
  phone?: string;
  github?: string;
  linkedin?: string;
}

export interface User {
  id: string;
  name?: string;
  email?: string;
  avatar?: string;
  bio?: string;
  slogan?: string;
  contacts?: Contacts;
}
