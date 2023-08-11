type Porps = {
  width: number;
  height?: number;
  className?: string;
};

function UnderLine({ width, height = 12, className = '' }: Porps) {
  return (
    <div
      style={{ width: width, height: height }}
      className={`bg-[--color-indigo] absolute left-0 bottom-[-2px]${
        ' ' + className
      }`}
    ></div>
  );
}

export default UnderLine;
