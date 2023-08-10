type Props = {
  children: React.ReactNode;
};

function PopupLayout({ children }: Props) {
  return (
    <div className="w-full h-full absolute top-0 left-0 z-10 bg-slate-100">
      {children}
    </div>
  );
}

export default PopupLayout;
