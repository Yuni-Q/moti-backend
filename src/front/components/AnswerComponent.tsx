import Link from 'next/link';
import React from 'react';

import Answer from '../models/Answer';

import Parts from './Parts';
import { StyledBody, StyledCardFrame, StyledCardFrameWrapper } from './style/StyledComponent';

interface Props {
  answers: Answer[];
}

const AnswerComponent: React.FC<Props> = ({ answers }) => {
  return (
    <StyledBody className="justify-content-center">
      <Link href="/answers/list/[id]" as={`/answers/list/${answers[0].id}`}>
        <a>
          <StyledCardFrameWrapper>
            <StyledCardFrame src="/assets/images/imgCardframe.png" alt="imgCardframe" />
            <Parts answers={answers} />
          </StyledCardFrameWrapper>
        </a>
      </Link>
    </StyledBody>
  );
};

export default AnswerComponent;
