import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { UserResource } from "@clerk/types";
import useAppStore from "@/store/useAppStore";

export async function createUserInFirebase(user: UserResource) {
  const userRef = doc(db, "users", user.id);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    const userData = {
      name: user.fullName,
      id: user.id,
      email: user.emailAddresses[0].emailAddress,
      followers: [],
      following: [],
      profileImg: user.imageUrl,
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
  user: UserResource,
  content: unknown
) {
  const userRef = doc(db, "users", user.id);
  const postsCollection = collection(db, "posts");
  const postRef = await addDoc(postsCollection, {
    userId: user.id,
    userName: user.fullName,
    content,
    createdAt: new Date(),
    mentions: [],
    likes: [],
    timeStamp: serverTimestamp(),
  });

  await updateDoc(userRef, {
    posts: [postRef.id],
  });

  return postRef.id;
}

export async function followUser(currentUserId, targetUserId) {
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

export async function unfollowUser(currentUserId, targetUserId) {
  const currentUserRef = doc(db, "users", currentUserId);
  const targetUserRef = doc(db, "users", targetUserId);

  await updateDoc(currentUserRef, {
    following: arrayRemove(targetUserId),
  });
  await updateDoc(targetUserRef, {
    followers: arrayRemove(currentUserId),
  });
}
