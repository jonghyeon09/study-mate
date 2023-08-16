import useLocalStorage from '@/hooks/useLocalStorage';
import { profile } from '@/types';
import Image from 'next/image';
import { useState, useEffect } from 'react';

type Props = {};

function Profile({}: Props) {
  const [profile, setProfile] = useLocalStorage<profile>('profile');
  // const [image, setImage] = useState('');
  // const [nickname, setNickname] = useState('');

  // useEffect(() => {
  //   if (profile) {
  //     setImage(profile.profileImage);
  //     setNickname(profile.username);
  //   }
  // }, [profile]);

  return (
    <div className="flex flex-col gap-[12px] w-full">
      <div className="relative w-[60px] h-[60px] border-2 border-white rounded-md">
        {profile && (
          <Image
            src={profile.profileImage}
            alt="프로필 사진"
            fill
            objectFit="contain"
          />
        )}
      </div>
      <p className="font-bold text-white">{profile && profile?.username}</p>
    </div>
  );
}

export default Profile;
