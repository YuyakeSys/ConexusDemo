// components/FormField.js
export default function FormField({
  label,
  name,
  type,
  options,
  value,
  onChange,
}) {
  if (type === "select") {
    return (
      <div className="mb-3">
        <label htmlFor={name} className="form-label">
          {label}
        </label>
        <select
          className="form-select"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
        >
          <option value="">Select your role</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>
      </div>
    );
  } else if (type === "textarea") {
    return (
      <div className="mb-1">
        <label htmlFor={name} className="form-label">
          {label}
        </label>
        <textarea
          className="form-control"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  } else {
    return (
      <div className="mb-3">
        <label htmlFor={name} className="form-label">
          {label}
        </label>
        <input
          type={type}
          className="form-control"
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={`Enter your ${label.toLowerCase()}`}
        />
      </div>
    );
  }
}
