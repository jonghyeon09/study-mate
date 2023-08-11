type Props = {
  className?: string;
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
};

function IconLayout({ children, className = '', onClick }: Props) {
  return (
    <div
      className={`w-[36px] h-[36px] flex items-center justify-center cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default IconLayout;
