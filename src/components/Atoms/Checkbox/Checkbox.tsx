import React, { useEffect, useState } from "react";
import CheckboxStyle from "./Checkbox.styled";

type CheckboxProps = {
  label: string;
  isChecked?: boolean;
  onChange: (event: React.ChangeEvent) => void;
  defaultChecked: boolean;
  id?: string;
};

const Checkbox = ({
  label,
  isChecked,
  onChange,
  defaultChecked,
  ...props
}: CheckboxProps) => {
  useEffect(() => {
    if (label) {
      (document.getElementById(`${label}`) as HTMLInputElement).checked =
        defaultChecked;
    }
  }, [defaultChecked]);

  return (
    <CheckboxStyle type="checkbox" id="categoryName" name="categoryName">
      <input
        className="inputCheck "
        id={label}
        type="checkbox"
        onChange={onChange}
        defaultChecked={defaultChecked}
        {...props}
      />
      <span></span>
      <div>{label}</div>
    </CheckboxStyle>
  );
};

export default Checkbox;
