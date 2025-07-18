"use client";

import React from "react";
import { useSession } from "next-auth/react";
import JoinRoom from "./join-room";
import Login from "./login";

export default function HomeFlows() {
  const { status } = useSession();

  return status === "authenticated" ? <JoinRoom /> : <Login />;
}
