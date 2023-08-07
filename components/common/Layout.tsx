type Props = {
  children?: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <div className="container mx-auto h-screen">
      <main className="h-full mx-auto max-w-screen-sm bg-amber-100">
        {children}
      </main>
    </div>
  );
}

export default Layout;
