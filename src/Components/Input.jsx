import React from "react";

function Input({ name, type="text", label, value, error, onChange }) {
  return (
    <div>
      <div class="form-group">
        <label htmlFor={name}>{label}</label>
        <input
          onChange={onChange}
          value={value}
          type={type}
          class="form-control"
          name={name}
          id={name}
          placeholder={`Enter ${name}`}
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
}

export default Input;
