type Props = {
  children?: React.ReactNode;
};

function Header({ children }: Props) {
  return (
    <header className="relative w-full h-[54px] flex items-center justify-between px-[24px] bg-slate-100">
      {children}
    </header>
  );
}

export default Header;
