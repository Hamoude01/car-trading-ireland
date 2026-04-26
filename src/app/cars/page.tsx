import { Suspense } from "react";
import CarsClient from "./CarsClient";

export default function CarsPage() {
  return (
    <Suspense>
      <CarsClient />
    </Suspense>
  );
}
