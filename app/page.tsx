import Main from "./main";
import { getServerSession } from "next-auth";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <Main />
    </main>
  );
}
