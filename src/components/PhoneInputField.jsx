import React, { useState, useEffect, useRef } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./PhoneInputField.css";

/**
 * Returns an error string if phone/WhatsApp number is invalid, or "" if valid.
 */
export const getPhoneValidationError = (phone) => {
  if (!phone || typeof phone !== "string") {
    return "Please enter your WhatsApp number.";
  }
  const digits = phone.replace(/[^0-9]/g, "");

  // If user has not typed anything beyond country code or left it empty
  if (digits.length <= 4) {
    return "Please enter your WhatsApp number.";
  }

  // India (+91)
  if (digits.startsWith("91")) {
    const subscriber = digits.slice(2);
    if (subscriber.length === 0) {
      return "Please enter your 10-digit WhatsApp number.";
    }
    if (subscriber.length < 10) {
      return `Please enter a complete 10-digit WhatsApp number (${10 - subscriber.length} digits left).`;
    }
    if (subscriber.length > 10) {
      return "WhatsApp number cannot exceed 10 digits for India.";
    }
    if (!/^[6-9]/.test(subscriber)) {
      return "Indian mobile numbers must start with 6, 7, 8, or 9.";
    }
    if (/^(\d)\1{9}$/.test(subscriber)) {
      return "Please enter a valid, non-dummy WhatsApp number.";
    }
    if (subscriber === "1234567890" || subscriber === "0123456789") {
      return "Please enter a genuine WhatsApp number.";
    }
    return "";
  }

  // International numbers (E.164: 8 to 16 digits total)
  if (digits.length < 8) {
    return "Please enter a valid WhatsApp number with country code.";
  }
  if (digits.length > 16) {
    return "Phone number is too long.";
  }

  // Check for dummy repeated digits across subscriber part
  const subscriberApprox = digits.slice(2);
  if (subscriberApprox.length >= 6 && /^(\d)\1+$/.test(subscriberApprox)) {
    return "Please enter a valid, non-dummy WhatsApp number.";
  }

  return "";
};

/**
 * Validates whether a phone number with country code is plausible.
 */
export const isValidPhoneNumber = (phone) => {
  return getPhoneValidationError(phone) === "";
};

export default function PhoneInputField({
  value = "",
  onChange,
  onBlur,
  name = "phone",
  id,
  label = "Phone Number *",
  placeholder = "98765 43210",
  country = "in",
  required = true,
  disabled = false,
  className = "",
  error = "",
  theme = "light", // 'light' or 'dark'
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef(null);
  const inputId = id || `phone-input-${name}`;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const checkDropdownState = () => {
      const openFlag = el.querySelector(".flag-dropdown.open");
      const countryList = el.querySelector(".country-list");
      const open = Boolean(
        openFlag || (countryList && !countryList.classList.contains("hide"))
      );
      setIsDropdownOpen(open);
    };

    const observer = new MutationObserver(checkDropdownState);
    observer.observe(el, {
      attributes: true,
      subtree: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const handlePhoneChange = (val, countryData, event, formattedVal) => {
    if (typeof onChange === "function") {
      onChange(val, countryData, formattedVal);
    }
  };

  const isDark = theme === "dark";

  return (
    <div
      ref={containerRef}
      className={`phone-input-field-wrapper ${
        isDark ? "phone-input-field--dark" : ""
      } ${isDropdownOpen ? "is-dropdown-open" : ""} ${className}`}
      style={{
        zIndex: isDropdownOpen ? 999999 : undefined,
      }}
    >
      <div
        className={`phone-input-control-box ${
          isFocused ? "is-focused" : ""
        } ${value ? "has-value" : ""} ${error ? "has-error" : ""}`}
      >
        <PhoneInput
          country={country}
          value={value || ""}
          onChange={handlePhoneChange}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            if (typeof onBlur === "function") {
              onBlur(e);
            }
          }}
          enableSearch
          searchPlaceholder="Search country..."
          searchNotFound="No country found"
          placeholder={placeholder}
          disabled={disabled}
          inputProps={{
            id: inputId,
            name: name,
            required: required,
            autoComplete: "tel",
          }}
          containerClass="custom-tel-container"
          inputClass="custom-tel-input"
          buttonClass="custom-tel-button"
          dropdownClass="custom-tel-dropdown"
          searchClass="custom-tel-search"
          dropdownStyle={{
            backgroundColor: isDark ? "#0d1321" : "#ffffff",
            zIndex: 999999,
          }}
        />

        {label && (
          <label htmlFor={inputId} className="phone-floating-label">
            {label}
          </label>
        )}
      </div>

      {typeof error === "string" && error.trim().length > 0 && (
        <span className="phone-input-error-msg">{error}</span>
      )}
    </div>
  );
}
