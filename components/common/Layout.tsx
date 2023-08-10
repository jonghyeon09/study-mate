type Props = {
  className?: string;
  children?: React.ReactNode;
};

function Layout({ className = '', children }: Props) {
  return (
    <main
      className={`relative h-screen max-h-screen mx-auto max-w-screen-sm ${className}`}
    >
      {children}
    </main>
  );
}

export default Layout;
