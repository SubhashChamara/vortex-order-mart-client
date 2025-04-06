import { ValidationType } from "../types/ValidationType";

const phoneRegex = /^[0-9]{10}$/;
const nicRegex = /^[0-9]{9}[vVxX]$/;

const validatePhoneNumber = (phoneNumber: string): string | null => {
  return phoneRegex.test(phoneNumber) ? null : "Invalid phone number";
};

const validateNICNumber = (nicNumber: string): string | null => {
  return nicRegex.test(nicNumber) ? null : "Invalid NIC number";
};

const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) ? null : "Invalid email address";
};

const cardNumber16Digits = (number: string): string | null => {
  const cardNumberRegex = /^\d{4} \d{4} \d{4} \d{4}$/;
  return cardNumberRegex.test(number)
    ? null
    : "Please enter 16 digits card number";
};

const amount = (amount: string): string | null => {
  const cardNumberRegex = /^\$?\d{1,3}(,\d{3})*(\.\d{2})?$/;
  return cardNumberRegex.test(amount) ? null : "Invalid amount";
};

const validateRequired = (value: string): string | null => {
  return value.trim() !== "" ? null : "This field is required";
};

const validateCheckbox = (isChecked: boolean): string | null => {
  return isChecked === true || isChecked == false
    ? null
    : "This checkbox must be checked";
};

const validateRequiredRadioButton = (isChecked: boolean): string | null => {
  return isChecked === true || isChecked == false
    ? null
    : "This selection must be select";
};

export const validateValue = (
  validationType: ValidationType,
  value: any
): string | null => {
  switch (validationType) {
    case ValidationType.CARD_NUMBER_16D:
      return cardNumber16Digits(value);
    case ValidationType.AMOUNT:
      return amount(value);
    case ValidationType.ONLY_TRUE_OR_FALSE:
      return validateRequiredRadioButton(value);
    case ValidationType.PHONE:
      return validatePhoneNumber(value);
    case ValidationType.NIC:
      return validateNICNumber(value);
    case ValidationType.EMAIL:
      return validateEmail(value);
    case ValidationType.REQUIRED:
      return validateRequired(value);
    case ValidationType.CHECKBOX:
      return validateCheckbox(value);
    default:
      return null;
  }
};

export const formatInput = (value: string, type: ValidationType): string => {
  switch (type) {
    case ValidationType.PHONE:
      return value.replace(/[^0-9+]/g, "");
    case ValidationType.CARD_NUMBER_16D:
      const digitsOnly = value.replace(/[^0-9]/g, "").slice(0, 16);
      const formatted = digitsOnly.replace(/(\d{4})(?=\d)/g, "$1 ");
      return formatted;
    case ValidationType.AMOUNT:
      return value.replace(/[^0-9.]/g, "");
    case ValidationType.ONLY_TRUE_OR_FALSE:
      return value === "true" || value === "false" ? value : "";
    case ValidationType.NIC:
      return value.replace(/[^0-9Vv]/g, "");
    case ValidationType.EMAIL:
      return value;
    case ValidationType.REQUIRED:
      return value.trim();
    default:
      return value;
  }
};
