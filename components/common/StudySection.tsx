type Props = {
  children: React.ReactNode;
};

function PopupSection({ children }: Props) {
  return <section className="px-[24px] w-full h-full">{children}</section>;
}

export default PopupSection;
