import { useRouter } from "next/router";
import Link from "next/link";
import About from "./About";
import dynamic from "next/dynamic";
Home.title = "Homepage";

const DynamicAbout = dynamic(() => import("./About"), {
  loading: () => <p>Loading...</p>,
});
export default function Home() {
  return (
    <div>
      <main className="h-screen w-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">
          <DynamicAbout />
        </h1>
      </main>
    </div>
  );
}
