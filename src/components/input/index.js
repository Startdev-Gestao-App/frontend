import { forwardRef } from "react";

const InputComponent = forwardRef(({ label, ...props }, ref) => {
  return (
    <>
      <label className="form-label">{label}</label>
      <input ref={ref} className="form-control" {...props} />
    </>
  );
});
export default InputComponent;
