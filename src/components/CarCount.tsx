"use client";

import { useState } from "react";
import { getCars } from "@/lib/carStore";

export default function CarCount() {
  const [count] = useState(() => {
    if (typeof window === "undefined") return 0;
    return getCars().length;
  });

  return <strong className="text-white">{count}</strong>;
}
