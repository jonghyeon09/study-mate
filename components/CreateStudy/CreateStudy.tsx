import Modal from '@/components/common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import CloseIcon from '../icons/CloseIcon';
import useInput from '@/hooks/useInput';

type Props = {
  onClose: () => void;
};

function CreateStudy({ onClose }: Props) {
  const { value, onChange, reset } = useInput();

  return (
    <Modal className="flex flex-col justify-between">
      <div className="flex items-center justify-between h-[48px]">
        <p className="text-[20px] font-medium">스터디 시작하기</p>
        <CloseIcon onClick={onClose} />
      </div>
      <div className="mt-auto">
        <p className="font-bold leading-[24px]">스터디 명</p>
        <Input
          type="text"
          placeholder="스터디명을 입력하세요"
          value={value}
          onChange={onChange}
          maxLength={10}
          reset={reset}
        />
        <Button>저장하기</Button>
      </div>
    </Modal>
  );
}

export default CreateStudy;
