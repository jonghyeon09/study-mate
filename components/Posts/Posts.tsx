import React from 'react';
import Layout from '../common/Layout';
import Header from '../common/Header';
import Main from '../common/Main';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';
import PopupLayout from '../common/PopupLayout';
import UploadButton from './UploadButton';
import InputTitle from '../common/InputTitle';
import Input from '../common/Input';
import useInput from '@/hooks/useInput';
import SaveButton from '../common/SaveButton';
import { SCDream } from '@/pages';
import { useState } from 'react';

type FormState = {
  inputField: string;
  textareaField: string;
};

function Posts() {
  // const { value, onChange, reset } = useInput();
  const [formState, setFormState] = useState<FormState>({
    inputField: '',
    textareaField: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleReset = () => {
    setFormState((prev) => ({ ...prev, ['inputField']: '' }));
  };

  return (
    <PopupLayout className={SCDream.className}>
      <Layout className="w-full h-screen bg-white">
        <Header className="flex justify-center text-center">
          <ArrowLeftIcon className="absolute" />
          <div className="w-full relative flex justify-center">
            <p className="font-medium text-xl">인증하기</p>
          </div>
        </Header>
        <Main className="px-[24px]">
          <InputTitle title="인증사진" sub="최대 3장" />
          <div className="w-full flex gap-[14px]">
            <UploadButton isActive />
            <UploadButton />
            <UploadButton />
          </div>
          <form onSubmit={handleSubmit}>
            <InputTitle title="제목" sub="최대 15자" />
            <Input
              value={formState.inputField}
              onChange={handleChange}
              reset={handleReset}
              maxLength={15}
              placeholder="무엇을 공부했나요?"
            />
            <InputTitle title="내용" sub="최대 50자" />
            <textarea
              name="textareaField"
              style={{ height: 120 }}
              className="input input-shadow placeholder:font-medium resize-none"
              placeholder="공부 내용을 자유롭게 적어주세요"
              value={formState.textareaField}
              onChange={handleChange}
              maxLength={50}
            ></textarea>
            <div className="absolute bottom-0 left-0 w-full px-[24px]">
              <SaveButton>저장하기</SaveButton>
            </div>
          </form>
        </Main>
      </Layout>
    </PopupLayout>
  );
}

export default Posts;
