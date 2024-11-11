"use client";
import React, { useEffect, useMemo } from "react";
import Post from "./Post";
import { ScrollArea } from "@/components/ui/scroll-area";
import useAppStore from "@/store/useAppStore";
import { Post as PostType } from "@/types/types";

const AllPosts: React.FC = () => {
  const { fetchPosts, setPosts, posts, userData } = useAppStore();

  useEffect(() => {
    const getPosts = async () => {
      const allPosts: PostType[] = await fetchPosts();
      setPosts(allPosts);
    };
    getPosts();
  }, [fetchPosts, setPosts]);

  const followedUsersPosts = useMemo(() => {
    if (!userData?.name) return [];
    return posts
      .filter((post) =>
        [...userData.following, userData.id].includes(post.userId)
      )
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }, [posts, userData]);

  return (
    <ScrollArea className="h-[calc(100vh-16rem)]">
      {followedUsersPosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      {followedUsersPosts.length < 1 && (
        <h3 className="text-center font-bold">
          No Posts, Start following users..
        </h3>
      )}
    </ScrollArea>
  );
};

export default AllPosts;
