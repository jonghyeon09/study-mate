import { forwardRef } from 'react';

type Props = {
  className?: string;
  children?: React.ReactNode;
  onScroll?: (e: React.UIEvent<HTMLElement>) => void;
};

function Layout(
  { className = '', children, onScroll }: Props,
  ref?: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div className="relative w-full h-screen mx-auto">
      <div
        ref={ref}
        className={`relative h-full max-h-screen mx-auto max-w-screen-sm overflow-y-auto overflow-x-hidden ${className}`}
        onScroll={onScroll}
      >
        {children}
      </div>
    </div>
  );
}

export default forwardRef(Layout);
