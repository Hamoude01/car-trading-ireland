"use client";

import { useState, useEffect } from "react";
import { getCars } from "@/lib/carStore";

export default function CarCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    getCars().then((cars) => setCount(cars.length));
  }, []);

  return <strong className="text-white">{count}</strong>;
}
