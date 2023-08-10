type Props = {
  className?: string;
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function IconLayout({ children, className = '', onClick }: Props) {
  return (
    <button
      className={`w-[36px] h-[36px] flex items-center justify-center ${className}`}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default IconLayout;
