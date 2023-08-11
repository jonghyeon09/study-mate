type Props = {
  children?: React.ReactNode;
};

function Header({ children }: Props) {
  return (
    <header className="fixed mx-auto w-full max-w-screen-sm h-[--h-header] flex items-center justify-between px-[24px] bg-white z-[100]">
      {children}
    </header>
  );
}

export default Header;
