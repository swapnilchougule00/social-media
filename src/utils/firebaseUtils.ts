import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { Post, User } from "@/types/types";

export async function createUserInFirebase(user: User) {
  const userRef = doc(db, "users", user.id);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    const userData = {
      name: user?.name,
      id: user.id,
      email: user.email,
      followers: [],
      following: [],
      profileImg: user.profileImg,
      posts: [],
      mentioned: [],
      timeStamp: serverTimestamp(),
    };
    await setDoc(userRef, userData);
    return userData;
  }
  return userSnap.data();
}

export async function createPostInFirebase(
  user: User,
  content: string,
  mentioned: string[] = []
): Promise<Post[]> {
  const postsCollection = collection(db, "posts");
  const userId = user.id;
  const postRef = await addDoc(postsCollection, {
    userId: user.id,
    userName: user.name,
    userImg: user.profileImg,
    content,
    createdAt: new Date(),
    mentions: [],
    likes: [],
    comments: [],
  });

  const postId = postRef.id;
  const currentUserRef = doc(db, "users", userId);

  await updateDoc(currentUserRef, {
    posts: arrayUnion(postId),
  });

  for (const mentionedUserId of mentioned) {
    const userDocRef = doc(db, "users", mentionedUserId);
    await updateDoc(userDocRef, {
      mentioned: arrayUnion(postId),
    });
  }
  const postSnapshots = await getDocs(postsCollection);
  const posts: Post[] = postSnapshots.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Post[];
  return posts;
}

export async function followUser(currentUserId: string, targetUserId: string) {
  const currentUserRef = doc(db, "users", currentUserId);
  const targetUserRef = doc(db, "users", targetUserId);

  await updateDoc(currentUserRef, {
    following: arrayUnion(targetUserId),
  });
  await updateDoc(targetUserRef, {
    followers: arrayUnion(currentUserId),
  });

  const userSnap = await getDoc(currentUserRef);
  const userData = userSnap.data();
  return userData;
}

export async function unfollowUser(
  currentUserId: string,
  targetUserId: string
) {
  const currentUserRef = doc(db, "users", currentUserId);
  const targetUserRef = doc(db, "users", targetUserId);

  await updateDoc(currentUserRef, {
    following: arrayRemove(targetUserId),
  });
  await updateDoc(targetUserRef, {
    followers: arrayRemove(currentUserId),
  });
}
