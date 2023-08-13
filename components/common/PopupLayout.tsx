type Props = {
  className?: string;
  children?: React.ReactNode;
};

function PopupLayout({ className, children }: Props) {
  return (
    <div className={`fixed z-[1000] w-full h-screen max-h-screen ${className}`}>
      {children}
    </div>
  );
}

export default PopupLayout;
