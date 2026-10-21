import React, { useState, useEffect, useRef } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./PhoneInputField.css";

/**
 * Validates whether a phone number with country code is plausible.
 * Accepts numbers with 8 to 16 total digits (including country dial code).
 */
export const isValidPhoneNumber = (phone) => {
  if (!phone) return false;
  const digits = phone.toString().replace(/[^0-9]/g, "");
  // Dial code (1-4 digits) + subscriber number (typically 7-12 digits) = 8 to 16 digits
  return digits.length >= 8 && digits.length <= 16;
};

export default function PhoneInputField({
  value = "",
  onChange,
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
          onBlur={() => setIsFocused(false)}
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
