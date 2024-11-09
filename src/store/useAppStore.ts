import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { create } from "zustand";
import { Post, User } from "@/types/types";

interface AppState {
  users: User[];
  posts: Post[];
  userData: User | object;
  setUserData: (userData: User) => void;
  setUsers: (users: User[]) => void;
  setPosts: (posts: Post[]) => void;
}

const useAppStore = create<AppState>((set) => ({
  users: [],
  posts: [],
  userData: {},
  setUserData: (userData) => set({ userData }),
  setUsers: (users) => set({ users }),
  setPosts: (posts) => set({ posts }),

  fetchUsers: async () => {
    const usersCollection = collection(db, "users");
    const userSnapshots = await getDocs(usersCollection);
    const users = userSnapshots.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return users;
  },

  fetchPosts: async () => {
    const postsCollection = collection(db, "posts");
    const postSnapshots = await getDocs(postsCollection);
    const posts = postSnapshots.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return posts;
  },

  //   addPost: async (userId, content) => {
  //     const postId = await createPostInFirebase(userId, content);
  //     set((state) => ({
  //       posts: [...state.posts, { id: postId, userId, content }],
  //     }));
  //   },
}));

export default useAppStore;
