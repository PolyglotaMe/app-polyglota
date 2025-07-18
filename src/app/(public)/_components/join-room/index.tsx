import React from "react";
import UserBox from "./user-box";
import VideoBox from "./video-box";

export default function JoinRoom() {
  return (
    <div className="flex w-full h-full items-center justify-center">
      <div className="flex gap-8">
        <UserBox />
        <VideoBox />
      </div>
    </div>
  );
}
