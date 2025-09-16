/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { SyncIcon } from "@exa/ui/assets";
import { Button, cn } from "@heroui/react";
import type React from "react";

/**
 * Props interface for the IconButtonComponent
 * @interface IconButtonProps
 */
type IconButtonProps = {
  /** Optional ID for the component */
  id?: string;

  /** Handler function for button click events */
  handleOnClick?: () => void;

  /** Text to display on the button (used for accessibility) */
  buttonText?: string;

  /** React node to be used as button icon */
  buttonIcon?: React.ReactNode;

  /** Custom className for styling the icon */
  iconClassName?: string;

  /** Custom className for styling the notification dot */
  dotClassName?: string;

  /** Flag to determine if the notification dot should be displayed */
  isDot?: boolean;

  /** Custom className for styling the button */
  btnClassName?: string;
  border?: string;
  height?: number;
  width?: number;
  size?: "sm" | "lg" | "md";
  ariaLabel?: string;
};

/**
 * A reusable icon-only button component with optional notification dot
 *
 * @component
 * @example
 * ```tsx
 * <IconButtonComponent
 *   buttonIcon={<NotificationIcon />}
 *   isDot={true}
 * />
 * ```
 */
export const IconButtonComponent = ({
  id,
  handleOnClick = () => false,
  buttonText = "Sync from HRMS",
  buttonIcon = <SyncIcon />,
  iconClassName = "",
  dotClassName = "",
  btnClassName = "",
  isDot = false,
  border = "content2-200",
  height = 2.5,
  width = 2.5,
  size,
  ariaLabel,
  ...rest
}: IconButtonProps) => {
  return (
    <Button
      // NextUI Button component with icon-only configuration
      isIconOnly
      role="button"
      className={cn(
        `bg-background hover:bg-background border border-${border} 0 rounded-[0.37rem]`,
        btnClassName, // Allow custom class overrides
        `h-[${height}rem] min-w-[${width}rem] w-[${width}rem]`
      )}
      size={size}
      variant="flat"
      onPress={() => handleOnClick()}
      id={`${id}-button`}
      aria-label={ariaLabel}
      {...rest}
    >
      {/* Icon container with centered alignment */}
      <div
        className={cn(
          "flex items-center justify-center",
          iconClassName // Allow custom icon styling
        )}
      >
        {buttonIcon}
      </div>

      {/* Notification dot - rendered conditionally */}
      {isDot && (
        <div
          className={cn(
            "absolute bg-danger-200 top-[2px] right-[2px] rounded-full w-[0.5rem] h-[0.5rem]",
            dotClassName // Allow custom dot styling
          )}
        />
      )}
    </Button>
  );
};
