import { ButtonComponent } from "@/component";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { useState } from "react";
import { SlCalender } from "react-icons/sl";

export function YearDropDown() {
    const [year, setYear] = useState<string>("2025")
    const items: { key: string, label: string }[] = [
        {
            key: "2020",
            label: "2020",
        },
        {
            key: "2021",
            label: "2021",
        },
        {
            key: "2022",
            label: "2022",
        },
        {
            key: "2023",
            label: "2023",
        },
        {
            key: "2024",
            label: "2024",
        },
        {
            key: "2025",
            label: "2025",
        },
        {
            key: "2026",
            label: "2026",
        },
        {
            key: "2027",
            label: "2027",
        },
        {
            key: "2028",
            label: "2028",
        },
        {
            key: "2029",
            label: "2029",
        },
        {
            key: "2030",
            label: "2030",
        },
    ];

    return (
        <Dropdown>
            <DropdownTrigger className="w-auto border-1 p-4 rounded-lg" >
                <ButtonComponent
                    iconClassName=""
                    baseClassName="!rounded-lg"
                    textClassName="!text-foreground !font-bold"
                    buttonIcon={<SlCalender />}
                    buttonText={`${year}`}
                />
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Dynamic Actions"
                items={items}
                selectionMode="single"
                selectedKeys={new Set([year])}
                onSelectionChange={(keys) => {
                    console.log("Selected year:", keys);
                    const selectedKey = Array.from(keys)[0] as string;
                    setYear(selectedKey);
                }}
            >
                {(item) => (
                    <DropdownItem
                        key={item.key}
                    >
                        {item.label}
                    </DropdownItem>
                )}
            </DropdownMenu>
        </Dropdown>
    );
}
