"use client";
import { ButtonComponent } from "@/component";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { SlCalender } from "react-icons/sl";

export function PaymentDropDown() {
    const [payment, setPayment] = useState<string>("Online")
    const items: { key: string, label: string }[] = [
        { key: "Online", label: "Online" },
        { key: "Cash", label: "Cash" },
        { key: "Cheque", label: "Cheque" },
        { key: "UPI", label: "UPI" },
        { key: "Card", label: "Card" },
    ];

    return (
        <Dropdown>
            <DropdownTrigger className="w-auto border  justify-start border-black p-4 rounded-lg" >
                <ButtonComponent
                    iconClassName=""
                    baseClassName="!rounded-lg"
                    textClassName="!text-foreground !font-bold"
                    buttonIcon={<IoIosArrowDown />}
                    buttonText={`${payment}`}
                />
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Payment Method"
                items={items}
                selectionMode="single"
                selectedKeys={new Set([payment])}
                onSelectionChange={(keys) => {
                    const selectedKey = Array.from(keys)[0] as string;
                    setPayment(selectedKey);
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
