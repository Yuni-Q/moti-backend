import React from 'react';

import Cookie from '../utils/Cookie';

import { StyldHeader, StyledDotButton, StyledImg, StyledWrapper } from './style/StyledComponent';

const getImage = (step: number) => {
  if (step === 1) {
    return '/assets/images/onbording1.png';
  }
  if (step === 2) {
    return '/assets/images/onbording2.png';
  }
  if (step === 3) {
    return '/assets/images/onbording3.png';
  }
  return '/assets/images/onbording4.png';
};

const getTitle = (step: number) => {
  if (step === 1) {
    return '매일 나에 대한 새로운 질문';
  }
  if (step === 2) {
    return '나를 기록하기';
  }
  if (step === 3) {
    return '나만의 드림캐쳐 만들기';
  }
  return '리마인더';
};

const getText = (step: number) => {
  if (step === 1) {
    return (
      <>
        하루에 받는 질문 3개 중 마음에 드는 질문을 선택하세요.
        <br />
        질문은 하루 한번씩 다시 받기 가능합니다.
      </>
    );
  }
  if (step === 2) {
    return (
      <>
        사진, 글 등으로 답할 수 있는 질문에 대답하며
        <br />
        나를 기록하는 시간을 가져보세요.
      </>
    );
  }
  if (step === 3) {
    return (
      <>
        질문에 답변해 파츠를 하나씩 모으세요.
        <br />
        6일간의 기록을 통해 나만의 드림캐쳐가 완성됩니다.
      </>
    );
  }
  return (
    <>
      앨범에서 지금까지 모은 드림캐쳐와
      <br />
      기록을 다시 확인할 수 있어요.
    </>
  );
};

interface Props {
  step: number;
  onChageStep: (step: number) => void;
}

const Onboard: React.FC<Props> = ({ step, onChageStep }) => {
  const onChagne = () => {
    if (step >= 4) {
      Cookie.setOnboard({});
    }
    onChageStep(step + 1);
  };
  return (
    <div>
      <button type="button" onClick={onChagne}>
        <StyledWrapper>
          <OnboardDot step={step} />
          <div className="text-center h3">{getTitle(step)}</div>
          <div className="text-center h5 mt-4">{getText(step)}</div>
          <StyledImg src={getImage(step)} width="100%" alt="onbording" />
        </StyledWrapper>
      </button>
    </div>
  );
};

interface OnboardDotProps {
  step: number;
}

const OnboardDot: React.FC<OnboardDotProps> = ({ step }) => {
  return (
    <StyldHeader>
      {[1, 2, 3, 4].map((num) => {
        return <StyledDotButton key={num} active={num === step} />;
      })}
    </StyldHeader>
  );
};

export default Onboard;
