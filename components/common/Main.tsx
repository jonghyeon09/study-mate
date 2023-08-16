type Props = {
  className?: string;
  children?: React.ReactNode;
};

function Main({ className = '', children }: Props) {
  return (
    <main
      className={`relative w-full min-h-screen pt-[--h-header] ${className}`}
    >
      {children}
    </main>
  );
}

export default Main;
