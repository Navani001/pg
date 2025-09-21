import { LandingNavBar } from "@/component/landingHeader";
import Landing from "./landing/page";

export default async function Home() {
  return <div className="h-[100dvh] w-[100dvw] overflow-hidden">
    <div className="h-[10%] w-full">
      <LandingNavBar />
      {/* <LandingNavBar/> */}
    </div>
    <div className="h-full w-full flex">

      <div className="h-full w-full lg:w-5/6 overflow-y-scroll scrollbar-hide">
        <Landing />
      </div>
    </div>
  </div>
}

