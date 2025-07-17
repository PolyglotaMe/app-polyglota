import { GoogleLogoIcon } from "@phosphor-icons/react/dist/ssr";
import React from "react";

export default function GoogleBox() {
  return (
    <div className="flex items-center justify-center gap-2 w-full rounded-md bg-primary py-3">
      <GoogleLogoIcon weight="bold" size={18} />
      <span className="text-base">Entrar com Google</span>
    </div>
  );
}
