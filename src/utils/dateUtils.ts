import { CalendarDate } from "@internationalized/date";

/**
 * Converts a CalendarDate to YYYY-MM-DD format string
 * @param date CalendarDate object
 * @returns string in YYYY-MM-DD format or empty string if date is null
 */
export const formatCalendarDateToISO = (date: CalendarDate | null): string => {
  if (!date) return "";
  
  const year = date.year;
  const month = date.month.toString().padStart(2, '0');
  const day = date.day.toString().padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

/**
 * Converts an ISO date string (YYYY-MM-DD) to CalendarDate
 * @param isoString string in YYYY-MM-DD format
 * @returns CalendarDate object or null if invalid
 */
export const convertISOToCalendarDate = (isoString: string): CalendarDate | null => {
  if (!isoString) return null;
  
  try {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth() returns 0-11
    const day = date.getDate();
    return new CalendarDate(year, month, day);
  } catch (error) {
    console.error("Error converting date:", error);
    return null;
  }
};

/**
 * Gets current date in YYYY-MM-DD format
 * @returns string in YYYY-MM-DD format
 */
export const getCurrentDateISO = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

/**
 * Gets current date as CalendarDate
 * @returns CalendarDate object for today
 */
export const getCurrentCalendarDate = (): CalendarDate => {
  const now = new Date();
  return new CalendarDate(now.getFullYear(), now.getMonth() + 1, now.getDate());
};

/**
 * Formats a Date object to YYYY-MM-DD format
 * @param date Date object
 * @returns string in YYYY-MM-DD format
 */
export const formatDateToISO = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};