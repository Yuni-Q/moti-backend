import React from 'react';

import Answer from '../models/Answer';

import { StyledPart } from './style/StyledComponent';

interface Props {
  answers: Answer[];
}

const Parts: React.FC<Props> = ({ answers }) => {
  return (
    <>
      {answers.map((value, index) => {
        return <StyledPart key={value.id} src={value?.file?.cardPngUrl} alt={`cardImg${index}`} />;
      })}
    </>
  );
};

export default Parts;
