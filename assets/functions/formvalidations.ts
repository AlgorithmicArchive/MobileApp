import { Field } from "../../types";

// Validation functions

export const notEmpty = (field: Field, value: string): string | null => {
  console.log("VALUE",value);
  if (typeof value==='string' && value.trim() === "") {
    return "This field is required.";
  }
  return null;
};

export const onlyAlphabets = (field: Field, value: string): string | null => {
  if (!/^[A-Za-z .']+$/.test(value)) {
    return "Please use letters (a-z, A-Z) and special characters (. and ') only.";
  }
  return null;
};

export const onlyDigits = (field: Field, value: string): string | null => {
  if (!/^\d+$/.test(value)) {
    return "Please enter only digits.";
  }
  return null;
};

export const specificLength = (field: Field, value: string): string | null => {
  if (value.length !== (field.maxLength || 0)) {
    return `This must be exactly ${field.maxLength} characters long.`;
  }
  return null;
};

export const isAgeGreaterThan = (field: Field, value: string): string | null => {
  // Helper function to parse a custom date format "DD MMM YYYY"
  const parseCustomDate = (dateString: string): Date | null => {
    const dateParts = dateString.trim().split(' ');
    if (dateParts.length !== 3) {
      console.log("Invalid date format: expected three parts, got:", dateParts);
      return null;
    }

    const day = parseInt(dateParts[0], 10);
    const month = dateParts[1].toUpperCase().trim();
    const year = parseInt(dateParts[2], 10);

    if (isNaN(day) || isNaN(year)) {
      console.log("Invalid day or year:", day, year);
      return null;
    }

    // Month mapping for "MMM" format
    const monthMapping: { [key: string]: number } = {
      JAN: 0,
      FEB: 1,
      MAR: 2,
      APR: 3,
      MAY: 4,
      JUN: 5,
      JUL: 6,
      AUG: 7,
      SEP: 8, // Ensure this is correct (Sept is 8)
      OCT: 9,
      NOV: 10,
      DEC: 11,
    };

    const monthIndex = monthMapping[month];
    if (monthIndex === undefined) {
      console.log("Invalid month:", month);
      return null;
    }

    console.log("Parsed date successfully:", day, monthIndex, year);
    return new Date(year, monthIndex, day);
  };

  const currentDate = new Date();

  // Check if `field.maxLength` is defined and treat it as the minimum age requirement in years.
  if (!field.maxLength) {
    return "Invalid age comparison: missing maxLength";
  }

  const compareDate = new Date(
    currentDate.getFullYear() - field.maxLength, // Subtract the required age from the current year
    currentDate.getMonth(),
    currentDate.getDate()
  );

  // Parse the input date
  const inputDate = parseCustomDate(value);
  console.log("INPUT DATE:", inputDate);

  if (!inputDate) {
    return "Invalid date format. Please use '1 SEPT 2024'.";
  }

  // Compare the input date to the calculated age comparison date
  if (inputDate > compareDate) {
    return `Age should be greater than ${field.maxLength}`;
  }

  return null; // No errors
};


export const isEmailValid = (field: Field, value: string): string | null => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(value)) {
    return "Invalid Email Address.";
  }
  return null;
};

export const isDateWithinRange = (field: Field, value: string): string | null => {
  const parseCustomDate = (dateString: string): Date | null => {
    const dateParts = dateString.split(' ');
    if (dateParts.length !== 3) {
      return null;
    }

    const day = parseInt(dateParts[0], 10);
    const month = dateParts[1].toUpperCase();
    const year = parseInt(dateParts[2], 10);

    const monthMapping: { [key: string]: number } = {
      JAN: 0,
      FEB: 1,
      MAR: 2,
      APR: 3,
      MAY: 4,
      JUN: 5,
      JUL: 6,
      AUG: 7,
      SEP: 8,
      OCT: 9,
      NOV: 10,
      DEC: 11,
    };

    const monthIndex = monthMapping[month];
    if (monthIndex === undefined) {
      return null;
    }

    return new Date(year, monthIndex, day);
  };

  const dateOfMarriage = parseCustomDate(value);
  if (!dateOfMarriage) {
    return "Invalid date format. Please use '1 SEPT 2024'.";
  }

  const currentDate = new Date();

  const minDate = new Date(currentDate);
  minDate.setMonth(currentDate.getMonth() + (parseInt(field.minLength?.toString() || "0")));

  const maxDate = new Date(currentDate);
  maxDate.setMonth(currentDate.getMonth() + (parseInt(field.maxLength?.toString() || "0")));

  if (dateOfMarriage < minDate || dateOfMarriage > maxDate) {
    return `The date should be between ${field.minLength} to ${field.maxLength} months from the current date.`;
  }

  return null;
};

export const duplicateAccountNumber = async (
  field: Field, 
  value: string, 
  applicationId?: string
): Promise<string | null> => {
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
  return null;
};

export const capitalizeAlphabets = (
  field: Field, 
  value: string, 
  applicationId?: string
): string | null => {
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
  return null; // Return null if value is not a string
};



// Create a validation map
export const validationMap: Record<string, (field: Field, value: string, applicationId?: string) => string | null | Promise<string | null>> = {
  notEmpty,
  onlyAlphabets,
  onlyDigits,
  specificLength,
  isAgeGreaterThan,
  isEmailValid,
  isDateWithinRange,
  duplicateAccountNumber,
  capitalizeAlphabets,
};
