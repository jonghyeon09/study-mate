import React from 'react';
import Layout from '../common/Layout';
import Header from '../common/Header';
import Main from '../common/Main';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';
import PopupLayout from '../common/PopupLayout';
import UploadButton from './UploadButton';
import InputTitle from '../common/InputTitle';
import Input from '../common/Input';
import SaveButton from '../common/SaveButton';
import { SCDream } from '@/pages';
import { useState, useEffect } from 'react';
import { useRef } from 'react';
import PhotoLayout from './PhotoLayout';
import { createTrace } from '@/services/createTrace';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

type FormState = {
  inputField: string;
  textareaField: string;
};
type Props = {
  onClick: () => void;
  onSave: () => void;
};

function Posts({ onClick, onSave }: Props) {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isActive, setIsActive] = useState([true, false, false]);
  const [formState, setFormState] = useState<FormState>({
    inputField: '',
    textareaField: '',
  });
  const inputFileRef = useRef<HTMLInputElement>(null);
  const { query } = useRouter();
  const queryClient = useQueryClient();
  const { mutate } = useMutation(createTrace, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['traceList'] });
    },
  });

  const handleButtonClick = () => {
    inputFileRef.current?.click(); // input 태그의 click 메서드 호출
  };

  const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 3) {
      alert('최대 3장 까지 선택 가능합니다.');
      return;
    }

    const newPreviewImages: string[] = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newPreviewImages.push(e.target?.result as string);
        if (newPreviewImages.length === files.length) {
          setPreviewImages(newPreviewImages);
        }
      };
      reader.readAsDataURL(file);
    });

    setSelectedImages(files);
  };

  const handleRemoveImage = (i: number) => {
    const newSelected = selectedImages.filter(
      (file) => file !== selectedImages[i]
    );
    const newPreviewImages = previewImages.filter(
      (image) => image !== previewImages[i]
    );

    setSelectedImages(newSelected);
    setPreviewImages(newPreviewImages);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      studyId: query.study as string,
      title: formState.inputField,
      description: formState.textareaField,
      images: selectedImages,
    });
    setSelectedImages([]);
    setPreviewImages([]);
    setFormState({
      inputField: '',
      textareaField: '',
    });
    onSave();
  };

  const handleReset = () => {
    setFormState((prev) => ({ ...prev, ['inputField']: '' }));
  };

  useEffect(() => {
    let buttons = [false, false, false];

    buttons.forEach(() => {
      buttons[previewImages.length] = true;
    });

    if (previewImages.length === 3) {
      buttons = [false, false, false];
    }

    setIsActive(buttons);
  }, [previewImages]);

  return (
    <PopupLayout className={SCDream.className}>
      <Layout className="w-full h-screen bg-white">
        <Header className="flex justify-center text-center">
          <ArrowLeftIcon onClick={onClick} />
          <div className="w-full relative flex justify-center">
            <p className="font-medium text-xl">인증하기</p>
          </div>
        </Header>

        <Main className="px-[24px]">
          <InputTitle title="인증사진" sub="최대 3장" />
          <div className="w-full flex gap-[14px]">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFilesChange}
              className="hidden"
              ref={inputFileRef}
            />
            <PhotoLayout>
              <UploadButton
                isActive={isActive[0]}
                src={previewImages[0]}
                onClick={handleButtonClick}
                onRemove={() => handleRemoveImage(0)}
              />
            </PhotoLayout>
            <PhotoLayout>
              <UploadButton
                isActive={isActive[1]}
                src={previewImages[1]}
                onClick={handleButtonClick}
                onRemove={() => handleRemoveImage(1)}
              />
            </PhotoLayout>
            <PhotoLayout>
              <UploadButton
                isActive={isActive[2]}
                src={previewImages[2]}
                onClick={handleButtonClick}
                onRemove={() => handleRemoveImage(2)}
              />
            </PhotoLayout>
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
              <SaveButton disabled={formState.inputField.length == 0}>
                저장하기
              </SaveButton>
            </div>
          </form>
        </Main>
      </Layout>
    </PopupLayout>
  );
}

export default Posts;
