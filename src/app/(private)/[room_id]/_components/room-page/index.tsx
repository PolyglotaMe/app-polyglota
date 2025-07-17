"use client";

import { useEffect, useRef, useState } from "react";
import {
  Room,
  RoomEvent,
  RemoteParticipant,
  Track,
  VideoPresets,
} from "livekit-client";
import {
  Microphone,
  MicrophoneSlash,
  VideoCamera,
  VideoCameraSlash,
  X,
} from "@phosphor-icons/react";
import { UserVideo } from "../user-video";

type ParticipantVideo = {
  participant: RemoteParticipant;
  video: HTMLMediaElement;
};

export function VideoRoomPage() {
  const [room, setRoom] = useState<Room | null>(null);
  const [participants, setParticipants] = useState<ParticipantVideo[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideosRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //TODO: get room name and token from url params
    const roomName = "sample";
    const token = "local";

    if (!roomName || !token) {
      console.error("Missing room name or token");
      return;
    }

    const connectToRoom = async () => {
      try {
        const newRoom = new Room({
          adaptiveStream: true,
          dynacast: true,
          videoCaptureDefaults: {
            resolution: VideoPresets.h720.resolution,
          },
        });

        newRoom.on(
          RoomEvent.ParticipantConnected,
          (participant: RemoteParticipant) => {
            console.log("Participant connected: ", participant.name);
          }
        );

        newRoom.on(
          RoomEvent.ParticipantDisconnected,
          (participant: RemoteParticipant) => {
            console.log("Participant disconnected: ", participant.name);
          }
        );

        newRoom.on(
          RoomEvent.TrackSubscribed,
          (track, publication, participant) => {
            if (
              track.kind === Track.Kind.Video ||
              track.kind === Track.Kind.Audio
            ) {
              const element = track.attach();
              setParticipants((prev) => [
                ...prev,
                { participant, video: element },
              ]);
            }
          }
        );

        newRoom.on(RoomEvent.TrackUnsubscribed, (track) => {
          track.detach().forEach((element) => element.remove());
        });

        await newRoom.connect("wss://openvidu.jandersonsouza.com.br", token);
        setRoom(newRoom);
        setIsConnected(true);

        // Enable camera and microphone
        await newRoom.localParticipant.setCameraEnabled(true);
        await newRoom.localParticipant.setMicrophoneEnabled(true);

        const localTrack = newRoom.localParticipant
          .getTrackPublications()
          .find((pub) => pub.kind === Track.Kind.Video);

        if (localTrack?.track && localVideoRef.current) {
          const element = localTrack.track.attach();
          localVideoRef.current.srcObject = element.srcObject;
        }
      } catch (error) {
        console.error("Error connecting to room:", error);
      }
    };

    connectToRoom();

    return () => {
      if (room) {
        room.disconnect();
      }
    };
  }, []);

  const toggleCamera = async () => {
    if (room) {
      await room.localParticipant.setCameraEnabled(!isCameraOn);
      setIsCameraOn(!isCameraOn);
    }
  };

  const toggleMicrophone = async () => {
    if (room) {
      await room.localParticipant.setMicrophoneEnabled(!isMicOn);
      setIsMicOn(!isMicOn);
    }
  };

  const leaveRoom = () => {
    if (room) {
      room.disconnect();
      window.location.href = "/";
    }
  };

  return (
    <div className="flex flex-col max-w-screen h-screen bg-gray-900 text-white">
      <div className="flex-1 max-w-screen">
        <div className="flex flex-row gap-4 flex-wrap">
          {participants.map((participant) => (
            <UserVideo
              key={participant.participant.sid}
              participant={participant.participant}
              video={participant.video}
            />
          ))}
        </div>

        <div className="absolute bottom-20 right-4">
          <video
            ref={localVideoRef}
            className={`w-48 h-36 object-cover rounded-lg border-2 ${
              isConnected ? "border-green-700 " : "border-red-700"
            }`}
            autoPlay
            muted
            playsInline
          />
        </div>
      </div>

      <div className="bg-gray-800 p-4">
        <div className="flex justify-center gap-4">
          <button
            onClick={toggleCamera}
            className={`p-3 rounded-full ${
              isCameraOn ? "bg-blue-500" : "bg-red-500"
            }`}
          >
            {isCameraOn ? <VideoCamera /> : <VideoCameraSlash />}
          </button>
          <button
            onClick={toggleMicrophone}
            className={`p-3 rounded-full ${
              isMicOn ? "bg-blue-500" : "bg-red-500"
            }`}
          >
            {isMicOn ? <Microphone /> : <MicrophoneSlash />}
          </button>
          <button onClick={leaveRoom} className="p-3 rounded-full bg-red-500">
            <X />
          </button>
        </div>
      </div>
    </div>
  );
}
