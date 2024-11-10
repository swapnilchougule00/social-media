import React from "react";

import UserCard from "@/components/UserCard";
import SuggestionsBox from "@/components/suggestionUsers/SuggestionsBox";
import AddNewPost from "@/components/AddNewPost";
import AllPosts from "@/components/posts/AllPosts";

const Feed = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 pt-20 grid grid-cols-1 md:grid-cols-7 gap-6">
        {/* Left sidebar */}

        <UserCard />

        {/* Middle - Posts feed */}
        <section className="md:col-span-3 space-y-6">
          {/* New post*/}
          <AddNewPost />

          {/* Posts */}
          <AllPosts />
        </section>

        {/* Right sidebar - Suggestions */}
        <SuggestionsBox />
      </main>
    </div>
  );
};

export default Feed;
