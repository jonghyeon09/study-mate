import { useEffect, useState } from 'react';

type Porps = {
  width: number;
  height: number;
};

function UnderLine({ width, height }: Porps) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setSize({ width, height });
  }, [height, width]);

  return (
    <div
      style={{ width: size.width, height: size.height }}
      className={`bg-indigo absolute bottom-[-2px]`}
    ></div>
  );
}

export default UnderLine;
