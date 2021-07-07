import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';

import Header from '../components/Header';
import {
  StyeldForm,
  StyledBottomButton,
  StyledCarousel,
  StyledDotButton,
  StyledDotWrapper,
} from '../components/style/StyledComponent';
import Mission from '../models/Mission';
import User from '../models/User';
import Cookie from '../utils/Cookie';
import { consoleError } from '../utils/log';
import { redirectLogin, redirectRoot } from '../utils/redirect';

import { PageContext } from './_app';

const StyledQuestionWrapper = styled.div`
  margin: 16px 0 24px;
  flex-shrink: 0;
  box-shadow: 0 0 10px 0 rgb(231, 188, 158);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 11px;
  height: 90%;
`;

const StyledQuestionHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 16px;
  border-radius: 11px;
  img + img {
    margin: 0 0 0 8px;
  }
`;

interface Props {
  initMissions: Mission[];
  initCanRefresh: boolean;
}

const Question: React.FC<Props> = ({ initMissions, initCanRefresh }) => {
  const router = useRouter();
  const [slideIndex, setSlideIndex] = useState(0);
  const [missions, setMission] = useState(initMissions);
  const [canRefresh, setCanRefresh] = useState(initCanRefresh);

  const onChangeMission = (newMissions: Mission[]) => {
    setMission(newMissions);
  };

  const onChangeCanRefresh = (newCanRefresh: boolean) => {
    setCanRefresh(newCanRefresh);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (canRefresh) {
      try {
        const token = await Cookie.getToken();
        if (!token) {
          return redirectLogin();
        }
        const { missions: newMissions, refresh } = await Mission.getMissionsRefresh({ token });
        onChangeCanRefresh(refresh);
        onChangeMission(newMissions);
      } catch (error) {
        consoleError('error', error);
      }
    }
  };

  const onClickLeftButton = () => router.back();

  const onChangeSlideIndex = (newSlideIndex: number) => {
    setSlideIndex(newSlideIndex);
  };

  const defaultControlsConfig = {
    nextButtonStyle: { display: 'none' },
    prevButtonStyle: { display: 'none' },
  };

  return (
    <StyeldForm onSubmit={onSubmit}>
      <Header left={{ onClick: onClickLeftButton }} title="질문 선택" />
      <StyledCarousel
        height="100%"
        cellAlign="center"
        slidesToShow={1}
        slideWidth={0.8}
        cellSpacing={24}
        autoplay={false}
        defaultControlsConfig={defaultControlsConfig}
        slideIndex={slideIndex}
        afterSlide={onChangeSlideIndex}>
        {missions.map((mission, index) => {
          return (
            <StyledQuestionWrapper key={mission.id}>
              <StyledQuestionHeader>
                {mission.isImage && (
                  <img width="24" height="24" src="/assets/images/icCameraNormal.png" alt="icCameraNormal" />
                )}
                {mission.isContent && (
                  <img width="24" height="24" src="/assets/images/icTextformNormal.png" alt="icTextformNormal" />
                )}
              </StyledQuestionHeader>
              <div className="m-4">
                <div>질문 {index + 1}</div>
                <div className="h3 mt-4">{mission.title}</div>
              </div>
              <Link href="/missions/[id]" as={`/missions/${mission.id}`}>
                <a>
                  <StyledBottomButton className="text-center mb-8" width={240} type="button">
                    답변하기
                  </StyledBottomButton>
                </a>
              </Link>
            </StyledQuestionWrapper>
          );
        })}
      </StyledCarousel>
      <QuestionDot slideIndex={slideIndex} onChangeSlideIndex={onChangeSlideIndex} />
      <StyledBottomButton width={201} type="submit">
        질문 다시받기 {canRefresh ? '1' : '0'} / 1
      </StyledBottomButton>
    </StyeldForm>
  );
};

interface QuestionDotProps {
  slideIndex: number;
  onChangeSlideIndex: (slideIndex: number) => void;
}

const QuestionDot: React.FC<QuestionDotProps> = ({ slideIndex, onChangeSlideIndex }) => {
  return (
    <StyledDotWrapper>
      {[0, 1, 2].map((num) => {
        return (
          <StyledDotButton key={num} type="button" active={num === slideIndex} onClick={() => onChangeSlideIndex(num)}>
            dot
          </StyledDotButton>
        );
      })}
    </StyledDotWrapper>
  );
};

export default Question;

interface ServerSideProps {
  props: {
    initMissions: Mission[];
    initCanRefresh: boolean;
  };
}

export const getServerSideProps = async ({ req, res }: PageContext): Promise<ServerSideProps | void> => {
  const props = {
    initMissions: [] as Mission[],
    initCanRefresh: false,
  };
  try {
    const token = await Cookie.getToken(req);
    if (!token) {
      return redirectLogin(res);
    }

    const user = await User.getUsersMy({ token, req });
    if (!user.id) {
      return redirectLogin(res);
    }

    const { missions, refresh } = await Mission.getMissions({ token, req });
    props.initMissions = missions;
    props.initCanRefresh = refresh;

    return {
      props,
    };
  } catch (error) {
    consoleError('error', error);
    return redirectRoot(res);
  }
};
