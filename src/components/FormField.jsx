// FormField.jsx — Reusable form control wrapper with validation strategies.
//
// Syllabus Alignment: Lectures 55-60 (Form handling, validation strategies, reusable input components)
// Features:
// - Dynamic error states with icon
// - Required asterisk indicator
// - Helper/hint text
// - Optional live character counter (current / max)
// - Accessible ARIA attributes

import "./FormField.css";

export default function FormField({
  label,
  id,
  error,
  hint,
  required = false,
  charCount,
  maxChars,
  children,
  className = "",
}) {
  return (
    <div className={`field ${error ? "field--has-error" : ""} ${className}`}>
      <div className="field__label-row">
        <label htmlFor={id} className="field__label">
          {label} {required && <span className="field__required" title="Required field">*</span>}
        </label>
        {maxChars !== undefined && (
          <span
            className={`field__counter ${
              charCount > maxChars ? "field__counter--over" : ""
            }`}
          >
            {charCount}/{maxChars}
          </span>
        )}
      </div>

      <div className="field__control-wrapper">{children}</div>

      {error ? (
        <p className="field-error" id={`${id}-error`} role="alert">
          <span className="field-error__icon">⚠</span> {error}
        </p>
      ) : hint ? (
        <p className="field-hint" id={`${id}-hint`}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}
