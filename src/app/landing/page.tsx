"use client";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function Landing() {
  const router = useRouter();

  return (
    <div>
      hi
      <Button onPress={() => router.push("/login")}>hi</Button>
    </div>
  );
}
