import type { Study } from '@/types';
import ArrowDownIcon from '../icons/ArrowDownIcon';

type Props = {
  isOpen: boolean;
  studyList: Study[] | undefined;
  children: React.ReactNode;
  onClick: (study: Study) => void;
};

function Dropdown({ isOpen, studyList, children, onClick }: Props) {
  return (
    <div className="flex items-center cursor-pointer">
      {children}
      {isOpen && (
        <ul className="flex flex-col absolute top-[54px] font-medium leading-6 bg-white input-shadow py-[12px] z-50">
          {studyList?.map((study) => (
            <li
              className="cursor-pointer p-[12px] hover:bg-slate-100"
              key={study.studyId}
              onClick={() => onClick(study)}
            >
              {study.description}
            </li>
          ))}
        </ul>
      )}

      <ArrowDownIcon />
    </div>
  );
}

export default Dropdown;
