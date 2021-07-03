import React from 'react';

import Mission from '../models/Mission';

import Header from './Header';
import { StyledWrapper, StyledFileInputButton, StyledImg, StyledSubTitle } from './style/StyledComponent';

interface Props {
  mission: Mission;
  setFile: React.Dispatch<React.SetStateAction<File>>;
}

const FileInput: React.FC<Props> = ({ mission, setFile }) => {
  const onChagne = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && typeof event.target.files[0] === 'object') {
      setFile(event.target.files[0]);
    }
  };
  return (
    <StyledWrapper>
      <Header left={{}} title="질문 선택" />
      <StyledSubTitle>{mission.title}</StyledSubTitle>
      <div>
        <StyledImg src="/assets/images/imgCam.png" alt="imgCam" width="202" height="202" />
      </div>
      <StyledFileInputButton>
        <label htmlFor="file">이미지 업로드</label>
        <input type="file" id="file" onChange={onChagne} />
      </StyledFileInputButton>
    </StyledWrapper>
  );
};

export default FileInput;
