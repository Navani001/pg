import { ButtonComponent } from "@/component";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { useState } from "react";
import { SlCalender } from "react-icons/sl";

export function YearDropDown({ joinYear, year, setYear }: { joinYear: number, year: string, setYear: (year: string) => void }) {
    const currentYear = new Date().getFullYear();
    
    // Generate years from joinYear to current year
    const generateYears = () => {
        const years: { key: string, label: string }[] = [];
        for (let i = joinYear; i <= currentYear; i++) {
            years.push({
                key: i.toString(),
                label: i.toString(),
            });
        }
        return years;
    };

    const items = generateYears();

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
