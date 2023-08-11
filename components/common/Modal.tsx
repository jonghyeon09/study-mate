type Props = {
  children: React.ReactNode;
  className?: string;
};

function Modal({ children, className = '' }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-40">
      <div className={`modal border-shadow ${className}`}>{children}</div>
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={(e) => handleClick(e)}
      ></div>
    </div>
  );
}

export default Modal;
