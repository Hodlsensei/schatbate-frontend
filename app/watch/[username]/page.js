"use client";
import { useParams } from "next/navigation";
import WatchPage from "@/components/WatchPage";

export default function Page() {
  const { username } = useParams();
  return <WatchPage username={username} />;
}