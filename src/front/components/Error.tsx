import { useRouter } from 'next/router';
import React from 'react';
import { StyledBody, StyledBottomButton, StyledImg } from './style/StyledComponent';

const getText = (errorMessage?: string) => {
	if(errorMessage) {
		return '알 수 없는 오류가 발생했습니다.'
	}
	return (
		<>
			인터넷이 불안정해요.
			<br />
			확인 후 재접속 해주세요.
		</>
	)

}

interface Props {
	errorMessage?: string;
}

const Error: React.FC<Props> = ({ errorMessage }) => {
	const router = useRouter();

	const onClick = () => router.reload();

	return (
		<StyledBody className="justify-content-center">
			<div>
				<StyledImg
					width={errorMessage ? "178" : "114"}
					height={errorMessage ? "178" : "114"}
					src={errorMessage ? '/assets/images/unknownError.png' : '/assets/images/internet.png'}
					alt="error"
				/>
			</div>
			<div>
				<div className="text-align-center mt-6 mb-8">
					{getText(errorMessage)}
				</div>
			</div>
			<StyledBottomButton type="button" width={112} onClick={onClick}>
				재접속
			</StyledBottomButton>
		</StyledBody>
	);
};

export default Error;
