"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChatsTeardropIcon } from "@phosphor-icons/react/dist/ssr";
import GoogleBox from "../google-box";

export default function LoginBox() {
  return (
    <motion.div
      className="md:p-12 p-6 py-4 md:py-12 flex flex-col rounded-3xl gradient-border-corners z-10 md:mr-[600px] md:mb-28 max-w-[500px]"
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
        Vença a barreira da linguagem usando A.I
      </span>

      <span className="font-medium text-base mt-4 text-gray-400">
        Junte-se ao Polyglota e tenha conversas em vários idiomas, em tempo
        real.
      </span>

      <div className="cursor-pointer  mt-10 ">
        <GoogleBox />
      </div>

      <span className="font-medium text-xs md:text-base mt-6 text-gray-400 text-center ">
        Ao entrar na Polyglota você concorda com nossos termos e condições.
      </span>
    </motion.div>
  );
}
