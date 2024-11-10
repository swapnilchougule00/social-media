/* eslint-disable @typescript-eslint/no-explicit-any */

export interface User {
  id: string;
  name: string;
  email: string;
  profileImg: string;
  followers: string[];
  following: string[];
  posts: string[];
  mentioned: string[];
  timeStamp: any;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userImg: string;
  content: string;
  createdAt: Date;
  mentions: string[];
  likes: string[];
  comments: string[];
  profileImg?: string;
}

export interface AppState {
  users: User[];
  posts: Post[];
  userData: User | null;
  setUserData: (userData: User | null) => void;
  setUsers: (users: User[]) => void;
  setPosts: (posts: Post[]) => void;

  fetchUsers: () => Promise<User[]>;
  fetchPosts: () => Promise<Post[]>;
}
