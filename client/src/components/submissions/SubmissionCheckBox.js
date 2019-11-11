import React from "react";

const SubmissionCheckBox = ({ label, isSelected, onCheckboxChange, submission }) => (
  <div className="form-check">
    <label>
      <input
        type="checkbox"
        name={label}
        checked={isSelected}
        onChange={(e) => onCheckboxChange(e, label, submission)}
        className="form-check-input"
      />
      <span className="checkmark"></span>
    </label>
  </div>
);

export default SubmissionCheckBox;