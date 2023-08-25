import { useState } from 'react';
import PopupLayout from '../common/PopupLayout';
import Layout from '../common/Layout';
import Header from '../common/Header';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentStudyState, isOpenCreateNoticeState } from '@/recoil/atoms';
import Main from '../common/Main';
import Input from '../common/Input';
import useInput from '@/hooks/useInput';
import SaveButton from '../common/SaveButton';
import dynamic from 'next/dynamic';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getNotice } from '@/services/getNotice';
import { createNotice } from '@/services/createNotice';
import { EmojiClickData } from 'emoji-picker-react';

const Picker = dynamic(
  () => {
    return import('emoji-picker-react');
  },
  { ssr: false }
);

function CreateNotice() {
  const [isEmoji, setIsEmoji] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string>();
  const currentStudy = useRecoilValue(currentStudyState);
  const setIsOpenCreateNotice = useSetRecoilState(isOpenCreateNoticeState);
  const { value, onChange, reset } = useInput();
  const queryClient = useQueryClient();
  const { data: noticeList } = useQuery({
    queryKey: ['notice', currentStudy?.studyId],
    queryFn: () => getNotice(currentStudy?.studyId),
    enabled: !!currentStudy?.studyId,
  });
  const { mutate } = useMutation(createNotice, {
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['notice', currentStudy?.studyId],
      }),
  });

  const handleEmoji = (emoji: EmojiClickData, event: MouseEvent) => {
    setSelectedEmoji(emoji.emoji);
    setIsEmoji(false);
  };

  const handleCreate = () => {
    if (!currentStudy || !selectedEmoji) return;

    mutate({
      params: {
        studyId: currentStudy.studyId,
      },
      data: {
        tag: selectedEmoji,
        description: value,
      },
    });
  };

  return (
    <>
      <PopupLayout>
        <Layout>
          {isEmoji && (
            <div className="absolute w-full max-w-screen-sm h-screen z-50">
              <div className="w-full h-screen absolute top-0 bg-black opacity-50"></div>
              <div className="absolute bottom-0 w-full h-[50vh]">
                <Picker
                  onEmojiClick={handleEmoji}
                  width={'100%'}
                  height={'100%'}
                />
              </div>
            </div>
          )}

          <Header>
            <ArrowLeftIcon onClick={() => setIsOpenCreateNotice(false)} />
            <div className="w-full relative flex justify-center"></div>
          </Header>

          <Main className="flex flex-col bg-white overflow-y-auto">
            <div className="flex justify-between items-end w-full h-[60px] p-[24px] pb-[6px]">
              <p className="text-xl font-bold">공지사항</p>
              {/* <p className="text-sm text-[--color-gray2]">최대 5개 등록 가능</p> */}
            </div>

            <div className="flex flex-col gap-[24px] w-full p-[24px]">
              {noticeList?.notice.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-[4px] relative w-full h-[36px]"
                >
                  <div className="flex items-center justify-center min-w-[44px] h-full input-shadow bg-white">
                    {item.tag}
                  </div>
                  <div className="flex items-center w-full input-shadow px-[12px]">
                    {item.description}
                  </div>
                </div>
              ))}

              {/* {noticeList && noticeList?.notice.length < 5 && (
              )} */}
              <div className="flex gap-[4px] relative w-full h-[36px]">
                <button
                  className="min-w-[44px] h-full input-shadow bg-white"
                  onClick={() => setIsEmoji((prev) => !prev)}
                >
                  {selectedEmoji}
                </button>
                <Input
                  className="input-shadow"
                  value={value}
                  onChange={onChange}
                  reset={reset}
                  placeholder="공지를 적어주세요"
                  maxLength={15}
                />
              </div>

              <SaveButton
                // disabled={
                //   !selectedEmoji ||
                //   value.length == 0 ||
                //   (noticeList && noticeList?.notice.length >= 5)
                // }
                disabled={!selectedEmoji || value.length == 0}
                onClick={handleCreate}
              >
                {/* {noticeList && noticeList?.notice.length >= 5
                  ? '공지사항을 모두 추가했어요'
                  : '공지사항 추가하기'} */}
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
