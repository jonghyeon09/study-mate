type Props = {
  children: React.ReactNode;
};

function Toast({ children }: Props) {
  return (
    <div className="flex items-center justify-center fixed bottom-[60px] left-1/2 -translate-x-1/2 w-[308px] h-[36px] rounded-[16px] bg-black text-white z-50">
      {children}
    </div>
  );
}

export default Toast;
