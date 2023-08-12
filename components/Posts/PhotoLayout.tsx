import React from 'react';

type Props = {
  children?: React.ReactNode;
};

function PhotoLayout({ children }: Props) {
  return (
    <div className="relative w-[106px] h-[106px] rounded-[6px] border-2 border-black border-opacity-20 bg-white overflow-hidden">
      {children}
    </div>
  );
}

export default PhotoLayout;
