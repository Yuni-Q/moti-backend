import React, { useState } from 'react';

import Header from '../components/Header';
import Profile from '../components/Profile';
import { StyledHr, StyledImg, StyledRow, StyledWrapper } from '../components/style/StyledComponent';
import User from '../models/User';
import Cookie from '../utils/Cookie';
import { consoleError } from '../utils/log';
import { redirectLogin, redirectRoot } from '../utils/redirect';

import { PageContext } from './_app';

interface Props {
  initUser: User;
}

const My: React.FC<Props> = ({ initUser }) => {
  const [user, setUser] = useState(initUser);
  const [isEdit, setIsEdit] = useState(false);

  const onChageUser = (newUser: User) => {
    setUser(newUser);
  };

  const onChageIsEdit = (bol: boolean) => {
    setIsEdit(bol);
  };

  if (isEdit) {
    return <Profile user={user} onChageUser={onChageUser} onChageIsEdit={onChageIsEdit} />;
  }
  return (
    <StyledWrapper className="justify-content-start">
      <Header
        left={{}}
        title="마이페이지"
        right={{
          imgUrl: '/assets/images/icRewriteNormal.png',
          onClick: () => onChageIsEdit(true),
          alt: 'icRewriteNormal',
        }}
      />
      <StyledImg className="mt-8" src="/assets/images/imgMypage.png" alt="imgMypage" width="108" height="108" />
      <div className="text-align-center mt-4">{user.name} 님</div>
      <StyledHr />
      <StyledRow>
        <div>닉네임</div>
        <div>{user.name}</div>
      </StyledRow>
      <StyledRow>
        <div>생년월일</div>
        <div>{user.birthday}</div>
      </StyledRow>
      <StyledRow>
        <div>성별</div>
        <div>{user.gender ? user.gender : '미입력'}</div>
      </StyledRow>
      <StyledHr />
      <StyledRow className="justify-content-end">
        <div>문의하기</div>
      </StyledRow>
      <StyledRow className="justify-content-end">
        <div>
          <a href="https://www.notion.so/MOTI-35d01dd331bb4aa0915c33d28d60b63c" target="_blank" rel="noreferrer">
            개인정보취급방침 및 이용약관
          </a>
        </div>
      </StyledRow>
    </StyledWrapper>
  );
};

interface ServerSideProps {
  props: {
    initUser: User;
  };
}

export const getServerSideProps = async ({ req, res }: PageContext): Promise<ServerSideProps | void> => {
  const props = {
    initUser: {} as User,
  };
  try {
    const token = await Cookie.getToken(req);
    if (!token) {
      return redirectLogin(res);
    }

    const user = await User.getUsersMy({ token, req });
    if (!user) {
      return redirectLogin(res);
    }
    props.initUser = user;

    return {
      props,
    };
  } catch (error) {
    consoleError('error', error);
    return redirectRoot(res);
  }
};

export default My;
