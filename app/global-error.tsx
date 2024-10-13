"use client";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import { useRouter } from "next/router";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <PrimaryButton
          onClick={() => reset()}
          text="Try Again"
          loading={false}
          disabled={false}
        />
        <PrimaryButton
          onClick={() => router.push("/")}
          text="Back to Home Page"
          loading={false}
          disabled={false}
        />
      </body>
    </html>
  );
}
