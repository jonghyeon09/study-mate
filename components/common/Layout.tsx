type Props = {
  className?: string;
  children?: React.ReactNode;
};

function Layout({ className = '', children }: Props) {
  return (
    <div className="relative w-full h-screen mx-auto">
      <div
        className={`relative h-full max-h-screen mx-auto max-w-screen-sm overflow-y-auto ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

export default Layout;
