type Props = {
  children: React.ReactNode;
};

function PopupHeader({ children }: Props) {
  return (
    <div className="w-full h-[52px] mb-[24px] bg-red-100">
      <div className="h-full flex items-center justify-between px-[12px]">
        {children}
      </div>
    </div>
  );
}

export default PopupHeader;
