type Props = {
  className?: string;
  children?: React.ReactNode;
};

function Header({ className, children }: Props) {
  return (
    <header
      className={`fixed mx-auto w-full max-w-screen-sm h-[--h-header] flex items-center justify-between px-[24px] bg-white z-[100]${
        ' ' + className
      }`}
    >
      {children}
    </header>
  );
}

export default Header;
