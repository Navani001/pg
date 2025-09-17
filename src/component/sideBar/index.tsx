// components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { GoGraph } from "react-icons/go";
import { IoDocumentText } from "react-icons/io5";

export const Sidebar = () => {
  const pathname = usePathname();

  const links = [
    { name: "Overview", href: "/dashboard", icon: GoGraph },
    { name: "Document", href: "/document", icon: IoDocumentText },
    { name: "Proof", href: "/proof", icon: BsFillQuestionCircleFill },

    { name: "Profile Details", href: "/profile", icon: FaUserCircle },
    { name: "Request form", href: "/request", icon: BsFillQuestionCircleFill },
    
  ];

  return (
    <div className="h-[90vh] w-full bg-transparent shadow-sm border-r">
      <div className="p-4 font-bold text-gray-400 text-sm tracking-wide">
        DASHBOARD
      </div>
      <ul className="space-y-2 px-2">
        {links.map(({ name, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <li key={name}>
              <Link
                href={href}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer transition-colors
                ${
                  isActive
                    ? "text-red-500 font-medium "
                    : "text-gray-800 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
