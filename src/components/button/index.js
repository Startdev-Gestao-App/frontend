const ButtonComponent = ({ label, variant, ...props }) => {
  return (
    <button className={`btn ${variant}`} {...props}>
      {label}
    </button>
  );
};

export default ButtonComponent;
