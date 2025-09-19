"use client";
import { Button, Image } from "@heroui/react";
import { useRouter } from "next/navigation";
import React from "react";

// Swiper components (simulated with basic carousel)
const SwiperSlide = ({ children }: { children: any }) => (
  <div className="flex-shrink-0 w-full">{children}</div>
);

export default function Landing() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const accommodationImages = [
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1615873968403-89e068629265?w=600&h=400&fit=crop",
  ];

  // Auto-scroll effect
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % accommodationImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [accommodationImages.length]);

  return (
    <div className="h-full w-full bg-gray-50 p-4 sm:p-6 overflow-y-scroll scrollbar-hide">
      <h1 className="text-xl font-bold text-gray-900">Home</h1>

      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center w-full justify-between lg:px-10 gap-20">
        {/* Left Text */}
        <div className="w-full lg:w-2/3">
          <div className="flex w-full justify-center relative">
            <div className="absolute bottom-0 left-10 xl:left-32 z-0 hidden">
              <Image alt="star" src="/star.png" />
            </div>
            <Image alt="star" src="/redtriangle.png" className="relative" />
          </div>

          <div className="lg:space-y-4 space-y-2 lg:w-[90%] relative">
            <p className="text-2xl sm:text-2xl lg:text-3xl xl:text-[44px] font-bold text-center leading-tight">
              Your <span className="text-blue-500">Home</span> Away From{" "}
              <span className="text-blue-500">Home</span>
            </p>
            <div className="absolute -top-10 lg:top-0 xl:-top-7 right-10 lg:-right-10 hidden sm:block">
              <Image alt="star" src="/shootingstar.png" className="lg:w-16 w-20 xl:w-28" />
            </div>

            <p className="text-base sm:text-lg lg:text-xl text-gray-900 font-semibold text-center">
              Experience comfort and affordable with our PG accommodations.
            </p>

            <p className="text-base sm:text-lg lg:text-xl text-gray-900 font-semibold text-center">
              Enjoy amenities like high-speed wifi and
            </p>
            <div className="flex gap-3 w-full justify-center">
              <Image alt="star" src="/brightstar.png" className="-mb-3 ml-5 hidden" />
              <p className="text-base sm:text-lg lg:text-xl text-gray-900 font-semibold text-center">
                delicious home made meals
              </p>
            </div>
          </div>
          <div className="w-full justify-center flex">
            <Button
              className="bg-blue-500 mt-4 hover:bg-blue-600 text-white px-6 sm:px-12 py-3 sm:py-6 rounded-lg text-base sm:text-xl font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              onPress={() => router.push("/login")}
            >
              Explore More
            </Button>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full lg:w-1/3 h-fit flex justify-center lg:justify-end relative order-1 lg:order-2">
          <div className="absolute -bottom-10 -left-5 lg:-bottom-20 lg:-left-20 z-0">
            <Image alt="Decorative lines" src="/threelines.png" />
          </div>
          <Image
            alt="Historic building accommodation"
            src="/hotal.png"
            removeWrapper
            className="relative z-10 rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Second Section */}
      <div className="flex flex-col-reverse lg:flex-row pt-10 lg:pt-10 gap-10 lg:gap-0 ">
        {/* Carousel */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end lg:mr-16">
          <div className="w-full sm:w-3/4 h-fit lg:w-3/5 flex flex-col items-center ">
            <div className="rounded-2xl w-full h-56 lg:h-64 lg:w-[400px] shadow-2xl overflow-hidden ">
              <div
                className="flex w-full transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {accommodationImages.map((src, index) => (
                  <SwiperSlide key={index}>
                    <div className="h-full w-full">
                      <Image
                        alt={`Modern accommodation ${index + 1}`}
                        src={src}
                        width={700}
                        className="h-60 sm:h-70 lg:h-80 w-full object-cover"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center mt-4 sm:mt-6">
              {accommodationImages.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 ml-2 rounded-full transition-colors ${
                    currentSlide === index
                      ? "bg-red-500 h-3 w-3"
                      : "bg-blue-500"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
            <div className="w-full sm:w-2/3 flex justify-center">
              <Image alt="star" src="/bluetriangle.png" />
            </div>
          </div>
        </div>

        {/* Right Text */}
        <div className="mt-5 lg:mt-10 w-full lg:w-1/2">
          <h2 className="text-2xl sm:text-3xl xl:text-4xl font-bold text-center">
            Affordable living made{" "}
            <span className="text-blue-500">better!</span>
          </h2>

          <p className="text-sm sm:text-lg lg:text-xl my-3 sm:my-5 text-gray-900 font-semibold text-center">
            Comfort, convenience, and care under one roof.
          </p>

          <p className="text-sm sm:text-lg lg:text-xl text-gray-900 font-semibold text-center">
            Enjoy seamless internet and nutritious
          </p>

          <p className="text-sm sm:text-lg lg:text-xl mt-3 sm:mt-5 text-gray-900 font-semibold text-center">
            meals just like home.
          </p>
          <div className="lg:flex hidden justify-end lg:justify-end w-full lg:w-[80%] mt-5">
            <div className="w-24 sm:w-28 lg:w-32 h-32 sm:h-36 lg:h-40 -mt-5">
              <Image alt="star" src="/moon.png" />
              <div className="flex justify-center my-1">
                <div className="h-4 w-4 sm:h-5 sm:w-5 bg-blue-500 rounded-full"></div>
              </div>
              <div className="flex justify-center ml-5 sm:ml-10">
                <div className="h-4 w-4 sm:h-5 sm:w-5 bg-red-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Triangle */}
    </div>
  );
}
