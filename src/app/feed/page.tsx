// import useAppStore from "@/store/useAppStore";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  MessageCircle,
  Repeat2,
  Share,
  Home,
  User,
  Bell,
  Search,
} from "lucide-react";
import UserCard from "@/components/UserCard";
import SuggestionsBox from "@/components/suggestionUsers/SuggestionsBox";
import AddNewPost from "@/components/AddNewPost";

const posts = [
  {
    id: "post1",
    userId: "user2",
    userName: "Jane Smith",
    content: "Just had an amazing day at the beach! 🏖️ #summervibes",
    createdAt: new Date("2023-07-15T10:30:00"),
    mentions: [],
    likes: ["user1", "user3"],
  },
  {
    id: "post2",
    userId: "user3",
    userName: "Mike Johnson",
    content: "Check out my new photo series! 📸 #photography",
    createdAt: new Date("2023-07-14T15:45:00"),
    mentions: ["user1"],
    likes: ["user2"],
  },
];

const Feed = () => {
  // const { userData } = useAppStore();
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
          <ScrollArea className="h-[calc(100vh-16rem)]">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="mb-6 bg-white dark:bg-gray-800 shadow-md"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage
                        src={`/avatars/${post.userId}.jpg`}
                        alt={post.userName}
                      />
                      <AvatarFallback className="bg-purple-500 text-white">
                        {post.userName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {post.userName}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {post.createdAt.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-800 dark:text-gray-200">
                    {post.content}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-pink-500 hover:text-pink-600 hover:bg-pink-50 dark:hover:bg-pink-900"
                  >
                    <Heart className="w-5 h-5 mr-1" />
                    {post.likes.length}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900"
                  >
                    <MessageCircle className="w-5 h-5 mr-1" />
                    Comment
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-green-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900"
                  >
                    <Repeat2 className="w-5 h-5 mr-1" />
                    Repost
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-purple-500 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900"
                  >
                    <Share className="w-5 h-5 mr-1" />
                    Share
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </ScrollArea>
        </section>

        {/* Right sidebar - Suggestions */}
        <SuggestionsBox />
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg">
        <Tabs defaultValue="home" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger
              value="home"
              className="data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-gray-700"
            >
              <Home className="w-5 h-5" />
            </TabsTrigger>
            <TabsTrigger
              value="search"
              className="data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-gray-700"
            >
              <Search className="w-5 h-5" />
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-gray-700"
            >
              <Bell className="w-5 h-5" />
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-gray-700"
            >
              <User className="w-5 h-5" />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </nav>
    </div>
  );
};

export default Feed;
