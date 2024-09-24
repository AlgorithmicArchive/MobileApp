import { Field } from "../../types";

// validations.ts
export const notEmpty = (field: Field, value: string): string => {
  if (value.trim() === "") {
    return "This field is required.";
  }
  return "";
};

export const onlyAlphabets = (field: Field, value: string): string => {
  if (!/^[A-Za-z .']+$/.test(value)) {
    return "Please use letters (a-z, A-Z) and special characters (. and ') only.";
  }
  return "";
};

export const onlyDigits = (field: Field, value: string): string => {
  if (!/^\d+$/.test(value)) {
    return "Please enter only digits.";
  }
  return "";
};

export const specificLength = (field: Field, value: string): string => {
  if (value.length !== (field.maxLength || 0)) {
    return `This must be exactly ${field.maxLength} characters long.`;
  }
  return "";
};

export const isAgeGreaterThan = (field: Field, value: string): string => {
  // Helper function to parse date strings like "1 SEPT 2024"
  const parseCustomDate = (dateString: string): Date | null => {
    const dateParts = dateString.split(' ');
    if (dateParts.length !== 3) {
      return null; // Return null if the format is incorrect
    }

    const day = parseInt(dateParts[0], 10);
    const month = dateParts[1].toUpperCase();
    const year = parseInt(dateParts[2], 10);

    // Map month names to month numbers
    const monthMapping: { [key: string]: number } = {
      JAN: 0,
      FEB: 1,
      MAR: 2,
      APR: 3,
      MAY: 4,
      JUN: 5,
      JUL: 6,
      AUG: 7,
      SEPT: 8,
      OCT: 9,
      NOV: 10,
      DEC: 11,
    };

    const monthIndex = monthMapping[month];
    if (monthIndex === undefined) {
      return null; // Invalid month name
    }

    return new Date(year, monthIndex, day);
  };

  const currentDate = new Date();
  const compareDate = new Date(
    currentDate.getFullYear() - (field.maxLength || 0),
    currentDate.getMonth(),
    currentDate.getDate()
  );

  // Parse the input date from the custom format
  const inputDate = parseCustomDate(value);
  if (!inputDate) {
    return "Invalid date format. Please use '1 SEPT 2024'.";
  }

  // Compare the parsed input date with the comparison date
  if (inputDate > compareDate) {
    return `Age should be greater than ${field.maxLength}`;
  }

  return "";
};


export const isEmailValid = (field: Field, value: string): string => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(value)) {
    return "Invalid Email Address.";
  }
  return "";
};

export const isDateWithinRange = (field: Field, value: string): string => {
  // Helper function to parse date strings like "1 SEPT 2024"
  const parseCustomDate = (dateString: string): Date | null => {
    const dateParts = dateString.split(' ');
    if (dateParts.length !== 3) {
      return null; // Return null if the format is incorrect
    }

    const day = parseInt(dateParts[0], 10);
    const month = dateParts[1].toUpperCase();
    const year = parseInt(dateParts[2], 10);

    // Map month names to month numbers
    const monthMapping: { [key: string]: number } = {
      JAN: 0,
      FEB: 1,
      MAR: 2,
      APR: 3,
      MAY: 4,
      JUN: 5,
      JUL: 6,
      AUG: 7,
      SEPT: 8,
      OCT: 9,
      NOV: 10,
      DEC: 11,
    };

    const monthIndex = monthMapping[month];
    if (monthIndex === undefined) {
      return null; // Invalid month name
    }

    return new Date(year, monthIndex, day);
  };

  // Parse the input date from the custom format
  const dateOfMarriage = parseCustomDate(value);
  if (!dateOfMarriage) {
    return "Invalid date format. Please use '1 SEPT 2024'.";
  }

  const currentDate = new Date();

  // Calculate minDate by adding the minLength (in months) to the current date
  const minDate = new Date(currentDate);
  minDate.setMonth(currentDate.getMonth() + (parseInt(field.minLength?.toString() || "0")));

  // Calculate maxDate by adding the maxLength (in months) to the current date
  const maxDate = new Date(currentDate);
  maxDate.setMonth(currentDate.getMonth() + (parseInt(field.maxLength?.toString() || "0")));

  // Check if the date is within the range
  if (dateOfMarriage < minDate || dateOfMarriage > maxDate) {
    return `The date should be between ${field.minLength} to ${field.maxLength} months from the current date.`;
  }

  return "";
};


export const duplicateAccountNumber = async (
  value: string,
  applicationId: string
): Promise<string> => {
  try {
    const response = await fetch(
      `/Base/IsDuplicateAccNo?accNo=${value}&applicationId=${applicationId}`
    );
    const data = await response.json();
    if (data.status) {
      return "Application with this account number already exists.";
    }
  } catch (error) {
    console.error("Error checking duplicate account number:", error);
    return "Error validating account number.";
  }
  return "";
};

export const capitalizeAlphabets = (value: string): string => {
  return value.toUpperCase();
};
