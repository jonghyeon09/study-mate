type Porps = {
  width: number;
  height: number;
};

function UnderLine({ width, height }: Porps) {
  return (
    <div
      style={{ width: width, height: height }}
      className={`bg-[--color-indigo] absolute bottom-[-2px]`}
    ></div>
  );
}

export default UnderLine;
