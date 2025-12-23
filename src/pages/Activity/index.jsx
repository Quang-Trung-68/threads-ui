import UserAvatar from "@/components/Common/ui/UserAvatar";
import { Button } from "@/components/Common/ui/button";
import { Heart, UserPlus, Zap } from "lucide-react";
import { useState } from "react";

export default function Activity() {
  const [loading, setLoading] = useState(false);

  // Mock Data
  const activities = [
    {
      id: 1,
      type: "like",
      user: {
        username: "johndoe",
        avatar: "https://github.com/shadcn.png",
      },
      content: "liked your post",
      time: "2m",
      message: "Great photo!",
    },
    {
      id: 2,
      type: "follow",
      user: {
        username: "janedoe",
        avatar: "https://github.com/shadcn.png",
      },
      content: "started following you",
      time: "1h",
    },
    {
      id: 3,
      type: "reply",
      user: {
        username: "mike_smith",
        avatar: "https://github.com/shadcn.png",
      },
      content: "replied to your thread",
      time: "3h",
      message: "I totally agree with this point.",
    },
    {
      id: 4,
      type: "mention",
      user: {
        username: "sarah_j",
        avatar: "https://github.com/shadcn.png",
      },
      content: "mentioned you in a post",
      time: "5h",
      message: "Check out this project @dqt_2309",
    },
    {
        id: 5,
        type: "like",
        user: {
          username: "alex_w",
          avatar: "https://github.com/shadcn.png",
        },
        content: "liked your reply",
        time: "1d",
        message: "Thanks for the help!",
      },
  ];

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background">
      <div className="flex w-full flex-col">
        {/* Sticky Header Container */}
        <div className="sticky top-0 z-50 bg-background">
          {/* Header Title Bar */}
          <div className="flex items-center justify-between p-4 text-lg font-bold">
            <div className="w-10"></div>
            <span className="text-[15px] font-bold text-foreground">Activity</span>
            <div className="w-10"></div>
          </div>

           {/* Visible Border connecting the masks */}
           <div className="bg-border absolute right-5 -bottom-px left-5 z-10 h-0.5" />

          {/* Hanging Masks */}
          <div className="pointer-events-none absolute top-full left-0 h-6 w-6">
            <div
              className="h-full w-full"
              style={{
                background:
                  "radial-gradient(circle at bottom right, transparent 70%, var(--border) 70%, var(--border) calc(70% + 1px), var(--background) calc(70% + 1px))",
              }}
            />
          </div>
          <div className="absolute top-full right-6 left-6 h-1 bg-transparent" />
          <div className="pointer-events-none absolute top-full right-0 h-6 w-6">
            <div
              className="h-full w-full"
              style={{
                background:
                  "radial-gradient(circle at bottom left, transparent 70%, var(--border) 70%, var(--border) calc(70% + 1px), var(--background) calc(70% + 1px))",
              }}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-0 flex min-h-screen w-full flex-col bg-background">
          {/* Left Border Line */}
          <div className="bg-border absolute top-0 bottom-0 left-0 z-10 w-px" />
          {/* Right Border Line */}
          <div className="bg-border absolute top-0 bottom-0 right-0 z-10 w-px" />

          <div className="flex flex-col">
            {activities.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between border-b border-border p-4 last:border-0 hover:bg-accent transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <UserAvatar 
                      user={{ 
                        username: item.user.username, 
                        avatar_url: item.user.avatar 
                      }} 
                      className="size-10 border border-border" 
                    />
                    {/* Icon Badge */}
                    <div className={`absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-background text-white ${
                        item.type === 'like' ? 'bg-pink-500' :
                        item.type === 'follow' ? 'bg-purple-500' :
                        item.type === 'reply' ? 'bg-blue-500' : 'bg-green-500'
                    }`}>
                        {item.type === 'like' && <Heart className="h-3 w-3 fill-current" />}
                        {item.type === 'follow' && <UserPlus className="h-3 w-3" />}
                        {item.type === 'reply' && <Zap className="h-3 w-3 fill-current" />}
                        {item.type === 'mention' && <span className="text-[10px] font-bold">@</span>}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <div className="text-sm">
                      <span className="font-semibold text-foreground">{item.user.username}</span>{" "}
                      <span className="text-muted-foreground">{item.content}</span>
                      <span className="ml-2 text-muted-foreground/60 text-xs">{item.time}</span>
                    </div>
                    {item.message && (
                        <div className="text-sm text-muted-foreground line-clamp-2">
                            {item.message}
                        </div>
                    )}
                </div>
              </div>

              {item.type === 'follow' ? (
                   <Button variant="outline" className="h-8 rounded-lg px-4 text-xs font-semibold text-foreground border-border hover:bg-accent">
                   Follow
                 </Button>
              ) : null}
              </div>
            ))}
             
             {/* Load More Placeholder */}
             <div className="p-4 text-center text-sm text-gray-400">
                End of activity
             </div>

          </div>
        </div>
      </div>
    </div>
  );
}
