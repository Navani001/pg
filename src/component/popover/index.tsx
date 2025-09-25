import { Popover, PopoverTrigger, PopoverContent, Button } from "@heroui/react";
import { Image } from "@heroui/react";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";

export function PopOverLogo() {
    const [name,setName] = useState("f");
    // const name = localStorage.getItem("name") || "User";
useEffect(() => {
    setName(localStorage.getItem("name") || "User");
},[])
    // Generate colors based on first letter
    const getColorBasedOnLetter = (letter: string) => {
        const colors = [
            'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500',
            'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500',
            'bg-orange-500', 'bg-cyan-500', 'bg-lime-500', 'bg-emerald-500'
        ];
        const charCode = letter.toUpperCase().charCodeAt(0);
        return colors[charCode % colors.length];
    };

    const getTextColorBasedOnLetter = (letter: string) => {
        const textColors = [
            'text-white', 'text-gray-100', 'text-gray-200', 'text-yellow-100',
            'text-pink-100', 'text-blue-100', 'text-green-100', 'text-purple-100'
        ];
        const charCode = letter.toUpperCase().charCodeAt(0);
        return textColors[charCode % textColors.length];
    };

    const firstLetter = name[0];
    const letterBasedBgColor = getColorBasedOnLetter(firstLetter);
    const letterBasedTextColor = getTextColorBasedOnLetter(firstLetter);

    const handleLogout = () => {
        // Remove token from localStorage
        localStorage.removeItem('token');
        // You can also remove from sessionStorage if using that
        // sessionStorage.removeItem('token');

        // Optional: redirect to login page or refresh
        window.location.href = '/login'; // or use your routing method
    };

    return (
        <Popover offset={20} placement="bottom" classNames={{
            base: "bg-black outline border-2 rounded-lg p-0 ",
            content: "bg-black "

        }}>
            <PopoverTrigger>
                {/* <Image
                    src="https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww"
                    radius="full"
                    loading="lazy"
                    width={50}
                    height={50}
                    classNames={{
                        img: "object-cover",
                    }}
                    alt="profile"
                /> */}
                <span className={`w-12 h-12 rounded-full ${letterBasedBgColor} flex items-center justify-center text-2xl ${letterBasedTextColor}`}>{name[0]}</span>

            </PopoverTrigger>
            <PopoverContent>
                <div className="px-1 py-2">
                    <Button
                        color="danger"
                        variant="light"
                        onClick={handleLogout}
                        className="w-full"
                        startContent={<LogOut size={16} />}
                    >
                        Logout
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}