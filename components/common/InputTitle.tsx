type Props = {
  title: string;
  sub?: string;
};

function InputTitle({ title, sub }: Props) {
  return (
    <div className="w-full h-[60px] flex justify-between items-end pb-[6px]">
      <p className="input-title">{title}</p>
      <p className="input-title-sub">{sub}</p>
    </div>
  );
}

export default InputTitle;
