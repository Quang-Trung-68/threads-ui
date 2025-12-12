import { Avatar, AvatarFallback, AvatarImage } from "@/components/Common/ui/avatar";
import { Button } from "@/components/Common/ui/button";
import { Input } from "@/components/Common/ui/input";
import {
  Camera,
  Instagram,
  Pencil,
  SquareKanban,
  SquarePen,
  UserPlus,
} from "lucide-react";
import { NavLink } from "react-router";

const ThreadActionItem = ({ icon, title, desc, action }) => {
  const Icon = icon;

  return (
    <div className="flex max-w-50 shrink-0 flex-col items-center justify-center gap-3 rounded-3xl bg-gray-100 p-3">
      <div className="flex size-15 items-center justify-center rounded-[50%] bg-white">
        <Icon className="size-5" />
      </div>
      <div className="flex flex-col items-center justify-center gap-1">
        <div className="font-semibold">{title}</div>
        <div className="text-center text-[13px] text-gray-500">{desc}</div>
      </div>
      <div className="w-full">
        <Button className={"w-full cursor-pointer"}>{action}</Button>
      </div>
    </div>
  );
};

export default function Profile({username}) {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col gap-5 p-5">
          <div className={"flex flex-row items-center justify-between"}>
            <div>
              <div className="text-2xl font-bold">Quang Trung</div> 
              <div>dqt_2309</div>
            </div>
            <div>
              <Avatar className={"size-16"}>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@dqt_2309"
                />
                <AvatarFallback>QT</AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div className="flex flex-row items-center justify-between">
            <div className="flex gap-2">
              <div>
                <Avatar className={"size-5"}>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@dqt_2309"
                  />
                  <AvatarFallback>QT</AvatarFallback>
                </Avatar>
              </div>
              <div className="text-gray-400">2 followers</div>
            </div>
            <div className="flex gap-2">
              <div>
                <SquareKanban />
              </div>
              <div>
                <Instagram />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-stretch">
            <Button
              variant="outline"
              className={"w-full cursor-pointer font-bold hover:bg-transparent"}
            >
              Edit profile
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <NavLink
              className={
                "flex flex-1 cursor-pointer items-center justify-center border-0 border-b-1 border-black bg-transparent p-3 font-semibold"
              }
            >
              Threads
            </NavLink>
            <NavLink
              className={
                "flex flex-1 cursor-pointer items-center justify-center border-0 border-b-1 border-black bg-transparent p-3 font-semibold"
              }
            >
              Replies
            </NavLink>
            <NavLink
              className={
                "flex flex-1 cursor-pointer items-center justify-center border-0 border-b-1 border-black bg-transparent p-3 font-semibold"
              }
            >
              Media
            </NavLink>
            <NavLink
              className={
                "flex flex-1 cursor-pointer items-center justify-center border-0 border-b-1 border-black bg-transparent p-3 font-semibold"
              }
            >
              Reposts
            </NavLink>
          </div>
        </div>
        <div className="flex items-center justify-between p-5 pt-0">
          <div className="flex items-center justify-center gap-2">
            <div>
              <Avatar className={"size-9"}>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@dqt_2309"
                />
                <AvatarFallback>QT</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <Input
                type={"text"}
                className={
                  "border-0 p-0.5 text-gray-500 shadow-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                }
                placeholder={`What's news ?`}
              />
            </div>
          </div>
          <div>
            <Button
              variant="ghost"
              className={
                "cursor-pointer rounded-3xl bg-black font-semibold text-white"
              }
            >
              Post
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-4 border-t-1 p-5">
          <div className="flex items-center justify-between">
            <div className="font-semibold">Finish your profile</div>
            <div>4 lefts</div>
          </div>
          <div className="flex flex-nowrap gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <ThreadActionItem
              icon={SquarePen}
              title={"Create thread"}
              desc={"Say what’s on your mind or share a recent highlight."}
              action={"Create"}
            />
            <ThreadActionItem
              icon={UserPlus}
              title={"Follow 10 profiles"}
              desc={"Fill your feed with threads that interest you."}
              action={"See profiles"}
            />
            <ThreadActionItem
              icon={Camera}
              title={"Add profile photo"}
              desc={"Make it easier for people to recognize you."}
              action={"Add"}
            />
            <ThreadActionItem
              icon={Pencil}
              title={"Add bio"}
              desc={"Introduce yourself and tell people what you’re into."}
              action={"Add"}
            />
          </div>
        </div>
      </div>
    </>
  );
}
