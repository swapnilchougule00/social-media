import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Repeat2, Share } from "lucide-react";
import { Post as PostType } from "@/types/types";

interface PostProps {
  post: PostType;
}
const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <Card key={post.id} className="mb-6 bg-white dark:bg-gray-800 shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={post.profileImg} alt={post.userName} />
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
        <p className="text-gray-800 dark:text-gray-200">{post.content}</p>
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
  );
};

export default Post;
