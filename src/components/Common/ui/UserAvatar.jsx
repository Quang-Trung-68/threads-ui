import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import avatarPlaceholder from "@/assets/avatar-placeholder.png";

const UserAvatar = ({ user, className, ...props }) => {
  const [imgSrc, setImgSrc] = useState(user?.avatar_url || avatarPlaceholder);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(user?.avatar_url || avatarPlaceholder);
    setHasError(false);
  }, [user?.avatar_url]);

  const handleError = () => {
    if (imgSrc === user?.avatar_url) {
      setImgSrc(avatarPlaceholder);
    } else {
      setHasError(true);
    }
  };

  return (
    <Avatar className={className} {...props}>
      {!hasError && (
        <AvatarImage
          src={imgSrc}
          alt={user?.username || "Avatar"}
          onError={handleError}
        />
      )}
      <AvatarFallback>
        {user?.username?.charAt(0)?.toUpperCase() || "?"}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
