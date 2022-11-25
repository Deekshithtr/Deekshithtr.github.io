interface ICustomButton {
  children: React.ReactNode | string;
  customClass?: string;
  disable?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const CustomButton = ({ children, customClass, disable = false, onClick }: ICustomButton) => {
  return (
    <button onClick={onClick} className={customClass} disabled={disable}>
      {children}
    </button>
  );
};

export default CustomButton;
