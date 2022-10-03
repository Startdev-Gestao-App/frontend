import { forwardRef } from "react";

const SelectComponent = forwardRef(({ label, children, ...props }, ref) => {
  return (
    <>
      <label className="form-label">{label}</label>
      <select ref={ref} className="form-select" {...props}>
        {children}
      </select>
    </>
  );
});
export default SelectComponent;
