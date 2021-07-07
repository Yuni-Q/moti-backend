import { useRouter } from 'next/router';
import React, { useState } from 'react';

import User from '../models/User';
import Cookie from '../utils/Cookie';
import { consoleError } from '../utils/log';
import { redirectLogin } from '../utils/redirect';

import Header from './Header';
import { StyeldForm, StyledBottomButton, StyledHr, StyledInput, StyledRow } from './style/StyledComponent';

interface Props {
  user: User;
  onChageUser: (user: User) => void;
  onChageIsEdit: (bol: boolean) => void;
}

const Profile: React.FC<Props> = ({ user, onChageUser, onChageIsEdit }) => {
  const [name, setName] = useState(user.name || '');
  const [birthday, setBirthday] = useState(user.birthday || '');
  const [gender, setGender] = useState(user.gender || '');
  const router = useRouter();

  const onClickLogout = () => {
    Cookie.removeToken({});
    router.push('/');
  };

  const onClickDeleteUser = async () => {
    try {
      const token = await Cookie.getToken();
      if (!token) {
        return redirectLogin();
      }
      await User.deleteUser({ token });
      router.push('/');
    } catch (error) {
      consoleError('error', JSON.stringify(error));
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const dayRegExp = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/;
      if (!dayRegExp.test(birthday)) {
        return alert('날짜가 올바르지 않습니다.');
      }
      if (gender !== '남' && gender !== '여') {
        return alert('성별은 남/여 중에 선택해주세요.');
      }
      const token = await Cookie.getToken();
      if (!token) {
        return redirectLogin();
      }
      const body = {
        name,
        gender,
        birthday,
      };
      await User.putUser({ token, body });
      const newUser = await User.getUsersMy({ token });
      onChageUser(newUser);
      onChageIsEdit(false);
    } catch (error) {
      consoleError('error', error);
    }
  };

  return (
    <StyeldForm className="justify-content-start" onSubmit={onSubmit}>
      <Header left={{}} title="수정하기" />
      <StyledHr />
      <StyledRow>
        <div>닉네임</div>
        <StyledInput value={name} onChange={(e) => setName(e.target.value)} />
      </StyledRow>
      <StyledRow>
        <div>생년월일</div>
        <StyledInput value={birthday} onChange={(e) => setBirthday(e.target.value)} />
      </StyledRow>
      <StyledRow>
        <div>성별</div>
        <StyledInput value={gender} onChange={(e) => setGender(e.target.value)} />
      </StyledRow>
      <StyledHr />
      <StyledRow className="justify-content-end">
        <button type="button" onClick={onClickLogout}>
          로그아웃
        </button>
      </StyledRow>
      <StyledRow className="justify-content-end">
        <button type="button" onClick={onClickDeleteUser}>
          탈퇴하기
        </button>
      </StyledRow>
      <StyledBottomButton width={136} type="submit">
        저장하기
      </StyledBottomButton>
    </StyeldForm>
  );
};

export default Profile;
