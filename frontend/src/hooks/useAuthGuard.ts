// src/hooks/useAuthGuard.ts
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function useAuthGuard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const accessToken = Cookies.get("access_token");

  useEffect(() => {
    if (!accessToken) {
      toast.error("Devi effettuare il login per accedere");
      router.replace("/login");
    } else {
      setLoading(false);
    }
  }, [accessToken, router]);

  return { loading };
}