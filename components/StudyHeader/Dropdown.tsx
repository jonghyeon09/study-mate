import ArrowDownIcon from '../icons/ArrowDownIcon';

type Props = {
  studyName: string;
};

function Dropdown({ studyName }: Props) {
  return (
    <div>
      <p>{studyName}</p>
      <ArrowDownIcon />
    </div>
  );
}

export default Dropdown;
