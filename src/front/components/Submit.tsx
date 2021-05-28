import Link from 'next/link';
import React from 'react';
import Header from './Header';
import { StyledBody, StyledBottomButton, StyledImg, StyledSubTitle, StyledWrapper } from './style/StyledComponent';

const Submit: React.FC = () => {
	return (
		<StyledWrapper>
			<Header title="미션 완료" />
			<StyledBody>
				<StyledSubTitle>
					오늘의 질문에 답변을
					<br />
					완료했습닌다.
				</StyledSubTitle>
				<div className="mt-3">새로운 파츠를 얻었어요. 확인해볼까요?</div>
				<StyledImg className="my-7" width="108" height="108" src="/assets/images/imgMypage.png" alt="imgMypage" />
			</StyledBody>
			<Link href="/" >
				<a>
					<StyledBottomButton type="button" width={168}>
						확인하러 가기
					</StyledBottomButton>
				</a>
			</Link>
		</StyledWrapper>
	);
};

export default Submit;
