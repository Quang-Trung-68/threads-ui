import UserAvatar from "@/components/Common/ui/UserAvatar";
import { Button } from "@/components/Common/ui/button";

const FollowSuggestionCard = ({
  name,
  username,
  avatar_url,
  followers_count,
  verified,
  bio,
  is_following,
}) => {
  return (
    <div className="flex items-start justify-between py-3">
      <div className="flex flex-1 items-start gap-3">
        <UserAvatar 
          user={{ username, avatar_url }} 
          className="size-10 border border-border mt-0.5" 
        />
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex items-center gap-1 overflow-hidden">
            <span className="truncate text-sm font-semibold text-foreground">
              {username}
            </span>
            {verified && (
              <span className="flex h-3 w-3 shrink-0 items-center justify-center rounded-full bg-blue-500">
                <svg viewBox="0 0 24 24" fill="white" className="h-2 w-2">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                </svg>
              </span>
            )}
          </div>
          <span className="truncate text-[14px] leading-tight text-muted-foreground">
            {name}
          </span>
          {bio && (
            <p className="mt-1 line-clamp-1 text-sm text-[15px] leading-normal text-foreground">
              {bio}
            </p>
          )}
          <span className="mt-1 text-sm text-[15px] text-muted-foreground">
            {followers_count} followers
          </span>
        </div>
      </div>
      <div className="pl-3">
        <Button
          variant={is_following ? "outline" : "default"}
          className={`h-[34px] rounded-xl px-5 text-sm font-bold ${
            is_following
              ? "border-border text-foreground hover:bg-accent"
              : "bg-foreground text-background hover:bg-foreground/90"
          }`}
        >
          {is_following ? "Following" : "Follow"}
        </Button>
      </div>
    </div>
  );
};

export default FollowSuggestionCard;
