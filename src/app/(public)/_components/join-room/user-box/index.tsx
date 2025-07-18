import React from "react";
import { motion } from "framer-motion";
import { ChatsTeardropIcon } from "@phosphor-icons/react/dist/ssr";
import UserInfo from "./user-info";
import RoomInput from "./room-input";

export default function UserBox() {
  return (
    <motion.div
      className="rounded-3xl bg-box-background border border-border max-w-[504px] p-12 flex flex-col"
      initial={{ scale: 0.98, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.98, opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <ChatsTeardropIcon
        weight="fill"
        className="text-lg text-primary"
        size={38}
      />

      <span className="font-semibold text-3xl mt-6 text-white">
        Insira o código para entrar na reunião.
      </span>

      <span className="font-medium text-base mt-2 text-gray-400">
        Insira o código de 6 dígitos fornecido pelo criador da call para entrar
        na chamada.
      </span>

      <div className="mt-10 w-full">
        <UserInfo />
      </div>

      <div className="mt-10 w-full">
        <RoomInput />
      </div>
    </motion.div>
  );
}
