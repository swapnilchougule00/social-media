// store/useAppStore.ts
import { create } from "zustand";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { AppState, User, Post } from "@/types/types";

const useAppStore = create<AppState>((set) => ({
  users: [],
  posts: [],
  userData: null,
  setUserData: (userData: User | null) => set({ userData }),
  setUsers: (users: User[]) => set({ users }),
  setPosts: (posts: Post[]) => set({ posts }),

  fetchUsers: async (): Promise<User[]> => {
    const usersCollection = collection(db, "users");
    const userSnapshots = await getDocs(usersCollection);
    const users: User[] = userSnapshots.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as User[];
    return users;
  },

  fetchPosts: async (): Promise<Post[]> => {
    const postsCollection = collection(db, "posts");
    const postSnapshots = await getDocs(postsCollection);
    const posts = postSnapshots.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
      } as Post;
    });
    return posts;
  },
}));

export default useAppStore;
