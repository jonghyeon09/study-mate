type Props = {
  className?: string;
  children?: React.ReactNode;
};

function Layout({ className = '', children }: Props) {
  return (
    <div className="w-full mx-auto">
      <div
        className={`relative max-h-screen mx-auto max-w-screen-sm overflow-y-auto ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

export default Layout;
