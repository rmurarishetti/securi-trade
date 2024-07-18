import Image from "next/image";
import Hero from "./components/Hero";
import SignUpForm from "./components/SignUpForm";
export default function Home() {
  return (
    <main className="flex flex-col min-h-min justify-between bg-transparent pb-10">
      <Hero />
      
    </main>
  );
}
