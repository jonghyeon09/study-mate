import { useState } from 'react';
import PopupLayout from '../common/PopupLayout';
import Layout from '../common/Layout';
import Header from '../common/Header';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';
import { useSetRecoilState } from 'recoil';
import { isOpenCreateNoticeState } from '@/recoil/atoms';
import Main from '../common/Main';
import Input from '../common/Input';
import useInput from '@/hooks/useInput';
import SaveButton from '../common/SaveButton';
import dynamic from 'next/dynamic';
import data from '@emoji-mart/data';

const Picker = dynamic(
  () => {
    return import('@emoji-mart/react');
  },
  { ssr: false }
);

function CreateNotice() {
  const [isEmoji, setIsEmoji] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string>();
  const setIsOpenCreateNotice = useSetRecoilState(isOpenCreateNoticeState);
  const { value, onChange, reset } = useInput();

  const handleEmoji = (emoji: any) => {
    setSelectedEmoji(emoji.native);
    setIsEmoji(false);
  };

  return (
    <>
      <PopupLayout>
        <Layout>
          <Header>
            <ArrowLeftIcon onClick={() => setIsOpenCreateNotice(false)} />
            <div className="w-full relative flex justify-center"></div>
          </Header>

          <Main className="flex flex-col bg-white overflow-y-auto">
            <div className="flex justify-between items-end w-full h-[60px] p-[24px] pb-[6px]">
              <p className="text-xl font-bold">공지사항</p>
              <p className="text-sm text-[--color-gray2]">최대 5개 등록 가능</p>
            </div>

            <div className="flex flex-col w-full p-[24px] bg-slate-100">
              <div className="flex relative w-full h-[36px]">
                <button
                  className="w-[44px] h-full mr-[4px] input-shadow bg-white"
                  onClick={() => setIsEmoji((prev) => !prev)}
                >
                  {selectedEmoji}
                </button>
                <Input
                  className="input-shadow flex-1"
                  value={value}
                  onChange={onChange}
                  reset={reset}
                  placeholder="공지를 적어주세요"
                  maxLength={15}
                />

                {isEmoji && (
                  <div className="absolute top-[50px]">
                    <Picker
                      data={data}
                      onEmojiSelect={handleEmoji}
                      locale={'kr'}
                    />
                  </div>
                )}
              </div>
              <SaveButton disabled={value.length == 0}>
                공지사항 추가하기
              </SaveButton>
            </div>
          </Main>
        </Layout>
      </PopupLayout>
    </>
  );
}

export default CreateNotice;
