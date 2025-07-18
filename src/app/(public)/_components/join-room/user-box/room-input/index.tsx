import { PhoneOutgoingIcon } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function RoomInput() {
  const [roomCode, setRoomCode] = useState("");
  const navigate = useRouter();

  return (
    <div className="w-full flex gap-4">
      <input
        type="text"
        className="w-full p-3 rounded-full bg-border text-white placeholder:text-white outline-none font-medium"
        placeholder="Insira o código da reunião"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
      />

      <button
        className="bg-green py-3 px-7 rounded-full cursor-pointer"
        onClick={() => {
          navigate.push(`/${roomCode}`);
        }}
      >
        <PhoneOutgoingIcon size={22} weight="fill" />
      </button>
    </div>
  );
}
