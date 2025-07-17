"use client";

import { RemoteParticipant } from "livekit-client";
import { useEffect, useRef } from "react";

type Props = {
  participant: RemoteParticipant;
  video: HTMLMediaElement;
};

export const UserVideo: React.FC<Props> = ({ participant, video }) => {
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (video && videoRef.current) {
      if (video) {
        videoRef.current.appendChild(video);
      }
    }
  }, [video]);

  return (
    <div className={"relative mb-5 h-[fit-content]"}>
      <div className="absolute bottom-2 left-2 rounded-lg bg-gray-300 px-2 py-1 text-body-sm">
        {participant.identity}
      </div>
      <div ref={videoRef} className="w-full overflow-hidden rounded-xl"></div>
    </div>
  );
};
