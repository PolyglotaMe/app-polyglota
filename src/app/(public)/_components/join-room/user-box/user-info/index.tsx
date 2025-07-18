/* eslint-disable @typescript-eslint/no-explicit-any */
import { SignOutIcon } from "@phosphor-icons/react/dist/ssr";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

export default function UserInfo() {
  const { data: session } = useSession();

  console.log(session);

  return (
    <div className="w-full py-4 px-3 rounded-xl border border-border justify-between flex">
      <div className="flex w-full items-center gap-4">
        <Image
          src={(session?.user as any)?.image as string}
          className="rounded-full w-12 h-12"
          alt="user"
          width={48}
          height={48}
        />

        <div className="flex flex-col items-start">
          <span className="text-white font-semibold text-base">
            {(session?.user as any)?.name as string}
          </span>
          <span className="text-gray-400 font-medium text-xs">
            {(session?.user as any)?.email as string}
          </span>
        </div>
      </div>

      <button
        className="flex items-center gap-2 text-white font-medium cursor-pointer"
        onClick={() => signOut()}
      >
        <SignOutIcon size={24} />
      </button>
    </div>
  );
}
