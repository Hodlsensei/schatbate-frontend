"use client";
import { useState } from "react";
import AgeGate from "@/components/AgeGate";
import HomePage from "@/components/HomePage";

export default function Page() {
  const [entered, setEntered] = useState(false);
  const [preference, setPreference] = useState("girls");

  if (!entered) {
    return (
      <AgeGate
        onEnter={(pref) => {
          setPreference(pref);
          setEntered(true);
        }}
      />
    );
  }

  return <HomePage defaultCategory={preference} />;
}