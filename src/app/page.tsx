import { LandingNavBar } from "@/component/landingHeader";
import Landing from "./landing/page";
import { redirect } from "next/navigation";

export default async function Home() {

  redirect("/login")
  return <div className="h-[100dvh] w-[100dvw] overflow-hidden">
    <div className="h-[10%] w-full">
      <LandingNavBar />
    </div>
    <div className="h-[90%] w-full">
      <div className="h-full w-full  overflow-y-scroll scrollbar-hide">
        <Landing />
      </div>
    </div>
  </div>
}

