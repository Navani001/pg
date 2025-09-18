// "use client";
// import { Button } from "@heroui/react";

// export default function Landing() {

//   return (
//     <div>
//       hi
//       <Button onPress={() => router.push("/login")}>hi</Button>
//     </div>
//   );
// }
"use client";
import { Image } from "@heroui/react";
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
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-xl font-bold text-gray-900">Home</h1>

      {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center px-10 py-4">
          {/* Left Content */}
          <div className="space-y-8">
            <Image
              alt="Historic building accommodation"
              src=""
              width={500}
              className="rounded-2xl shadow-2xl"
            />

            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Your <span className="text-blue-500">Home</span> Away From{" "}
                <span className="text-blue-500">Home</span>
                <span className="inline-block ml-2">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center transform rotate-12">
                    <span className="text-white text-xl">✨</span>
                  </div>
                </span>
              </h1>

              <p className="text-xl text-gray-700 leading-relaxed">
                Experience comfort and affordable with our PG accommodations.
              </p>

              <div className="flex items-center space-x-3 text-lg text-gray-700">
                <span className="text-3xl">☀️</span>
                <span>Enjoy amenities like high-speed wifi and</span>
              </div>

              <p className="text-lg text-gray-700 ml-12">
                delicious home made meals
              </p>

              <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                Explore More
              </button>
            </div>
          </div>

          {/* Right Content - Building Image */}
          <div className="relative">
            {/* <div className="absolute -top-4 -right-4 w-16 h-16 bg-red-500 rounded-full opacity-20"></div>
            <div className="absolute top-20 -left-8 w-20 h-2 bg-blue-500 rounded-full transform rotate-45"></div>
            <div className="absolute bottom-10 -right-8 w-16 h-2 bg-red-500 rounded-full transform -rotate-45"></div> */}

            <Image
              alt="Historic building accommodation"
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=400&fit=crop"
              width={500}
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>

      {/* Second Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Auto-scrolling Images */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {accommodationImages.map((src, index) => (
                  <SwiperSlide key={index}>
                    <Image
                      alt={`Modern accommodation ${index + 1}`}
                      src={src}
                      width={600}
                      className="w-full h-96 object-cover"
                    />
                  </SwiperSlide>
                ))}
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center space-x-2 mt-6">
              {accommodationImages.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    currentSlide === index ? "bg-blue-500" : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>

            {/* Decorative Arrow */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="w-0 h-0 border-l-[30px] border-r-[30px] border-t-[40px] border-l-transparent border-r-transparent border-t-blue-500"></div>
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-8">
            <h2 className="text-5xl font-bold leading-tight">
              Affordable living made{" "}
              <span className="text-blue-500">better!</span>
            </h2>

            <p className="text-xl text-gray-700 leading-relaxed">
              Comfort, convenience, and care under one roof.
            </p>

            <p className="text-xl text-gray-700 leading-relaxed">
              Enjoy seamless internet and nutritious
            </p>

            <p className="text-xl text-gray-700 leading-relaxed">
              meals just like home.
            </p>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0">
              <div className="w-20 h-20 bg-blue-200 rounded-full opacity-60"></div>
            </div>
            <div className="relative">
              <div className="absolute -bottom-4 -right-4 w-4 h-4 bg-red-500 rounded-full"></div>
              <div className="absolute -bottom-8 right-8 w-6 h-6 bg-blue-500 rounded-full opacity-60"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
