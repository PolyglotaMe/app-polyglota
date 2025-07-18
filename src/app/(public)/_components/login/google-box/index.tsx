"use client";

import { GoogleLogoIcon } from "@phosphor-icons/react/dist/ssr";
import React from "react";

const popupCenter = (url: string, title: string) => {
  const dualScreenLeft = window.screenLeft ?? window.screenX;
  const dualScreenTop = window.screenTop ?? window.screenY;

  const width =
    window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

  const height =
    window.innerHeight ??
    document.documentElement.clientHeight ??
    screen.height;

  const systemZoom = width / window.screen.availWidth;

  const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
  const top = (height - 550) / 2 / systemZoom + dualScreenTop;

  const newWindow = window.open(
    url,
    title,
    `width=${500 / systemZoom},height=${
      550 / systemZoom
    },top=${top},left=${left}`
  );

  newWindow?.focus();
};

export default function GoogleBox() {
  return (
    <button
      onClick={() => popupCenter("/google-signin", "Sample Sign In")}
      className="flex items-center justify-center gap-2 w-full rounded-md bg-primary py-3 cursor-pointer"
    >
      <GoogleLogoIcon weight="bold" size={18} />
      <span className="text-base">Entrar com Google</span>
    </button>
  );
}
