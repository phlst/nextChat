declare global {
  type User = {
    $id: string;
    name: string;
    email: string;
    avatar_url: string;
    friends: string[];
  };
  type Friend = {
    $id: string;
    name: string;
    avatar_url: string;
  };
}

export {};
