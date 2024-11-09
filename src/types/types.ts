export interface User {
  id: string;
  name: string;
  email: string;
  followers: string[];
  following: string[];
  posts: string[];
  mentioned: string[];
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
  mentions: string[];
  likes: string[];
}
