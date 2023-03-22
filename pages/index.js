import { useRouter } from "next/router";
import Link from "next/link";
import dynamic from "next/dynamic";

const DynamicAbout = dynamic(() => import("./About"), {
  loading: () => <p>Loading...</p>,
});
Home.title = "Homepage";
export default function Home() {
  return (
    <div>
      <main className="h-screen w-screen flex flex-col items-center justify-center  bg-white dark:bg-black">
        <h1 className="text-3xl font-bold text-blue-500 dark:text-red-500">
          <DynamicAbout />
        </h1>
      </main>
    </div>
  );
}
