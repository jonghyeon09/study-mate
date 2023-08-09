type Props = {
  children?: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <div className="container mx-auto h-screen">
      <main className="relative h-full max-h-screen mx-auto max-w-screen-sm bg-amber-100">
        {children}
      </main>
    </div>
  );
}

export default Layout;
