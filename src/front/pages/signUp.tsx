import Link from 'next/link';
import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import {
	StyledBody,
	StyledBottomButton,
	StyledImg,
	StyledSubTitle,
	StyledWrapper,
} from '../components/style/StyledComponent';
import User from '../models/User';
import Cookie from '../utils/Cookie';
import { consoleError } from '../utils/log';
import { redirectLogin, redirectRoot } from '../utils/redirect';
import { PageContext } from './_app';

const StyledSignUpButton = styled.button`
	width: 240px;
	height: 40px;
	color: rgb(173, 181, 189);
	border-radius: 30px;
	margin: 24px 0 0;
`;

interface Props {
	token: string;
}

const getTitle = (step: number) => {
	if (step === 1) {
		return '닉네임 설정';
	}
	if (step === 2) {
		return '성별 선택';
	}
	if (step === 3) {
		return '생년월일 선택';
	}
	return '회원가입 완료';
};

const getSubTitle = (step: number) => {
	if (step === 1) {
		return '닉네임을 입력해주세요';
	}
	if (step === 2) {
		return '성별을 선택해주세요';
	}
	if (step === 3) {
		return '생년월일을 입력해주세요';
	}
	return <></>;
};
const SignUp: React.FC<Props> = () => {
	const [step, setStep] = useState(1);
	const [name, setName] = useState('');
	const [gender, setGender] = useState('');
	const [year, setYear] = useState('1993');
	const [month, setMonth] = useState('2');
	const [day, setDay] = useState('16');

	const onChangeName = (newName: string) => {
		setName(newName);
	};

	const onChangeGender = (newGender: string) => {
		setGender(newGender);
	};

	const onChangeYear = (newYear: string) => {
		setYear(newYear);
	};

	const onChangeMonth = (newMonth: string) => {
		setMonth(newMonth);
	};

	const onChangeDay = (newDay: string) => {
		setDay(newDay);
	};

	const onClickBackButton = () => setStep((oldStep) => oldStep - 1);

	const isBackButton = step === 2 || step === 3;
	return (
		<StyledWrapper>
			<Header left={isBackButton ? { onClick: onClickBackButton } : undefined} title={getTitle(step)} />
			<StyledSubTitle>{getSubTitle(step)}</StyledSubTitle>
			<StyledBody>
				{step === 1 && <SignUpName name={name} onChangeName={onChangeName} onChangeStep={() => setStep(2)} />}
				{step === 2 && <SignUpGender gender={gender} onChangeGender={onChangeGender} onChangeStep={() => setStep(3)} />}
				{step === 3 && (
					<SignUpBirthday
						name={name}
						gender={gender}
						year={year}
						onChangeYear={onChangeYear}
						month={month}
						onChangeMonth={onChangeMonth}
						day={day}
						onChangeDay={onChangeDay}
						onChangeStep={() => setStep(4)}
					/>
				)}
				{step === 4 && <SignUpComplete name={name} />}
			</StyledBody>
		</StyledWrapper>
	);
};

export const getServerSideProps = async ({ req, res }: PageContext): Promise<void> => {
	try {
		const token = Cookie.getToken(req);
		if (!token) {
			return redirectLogin(res);
		}
	} catch (error) {
		consoleError('error', error);
		return redirectRoot(res);
	}
};

export default SignUp;

const StyledNameInput = styled.input`
	display: block;
	font-size: 24px;
	text-align: center;
	border: none;
	border-bottom: 1px solid rgb(163, 118, 87);
`;

const StyledNameBody = styled.div`
	flex-grow: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

interface SignUpNameProps {
	name: string;
	onChangeName: (name: string) => void;
	onChangeStep: () => void;
}

const SignUpName: React.FC<SignUpNameProps> = ({ name, onChangeName, onChangeStep }) => {
	const onClick = () => {
		if (name.length < 1) {
			return alert('name을 입력해 주세요 !!');
		}
		onChangeStep();
	};

	return (
		<>
			<StyledNameBody>
				<StyledNameInput
					value={name}
					onChange={(e) => onChangeName(e.target.value)}
					maxLength={8}
					placeholder="8글자로 만들어주세요"
				/>
				<div className="text-center mt-2">8글자로 만들어 주세요</div>
			</StyledNameBody>
			<StyledBottomButton className="mb-37 text-center" width={240} type="button" onClick={onClick}>
				다 음
			</StyledBottomButton>
		</>
	);
};

const StyledSignUpGender = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 100vw;
	flex-grow: 1;
`;

const StyledGenderWrapper = styled.div`
	width: 100vw;
	position: relative;
	width: 30%;
	flex-grow: 1;
	box-shadow: 0 0 10px 0 rgb(231, 188, 158);
	border-radius: 11px;
	display: flex;
	flex-direction: column;
`;

const StlyedBlackMask = styled.button`
	position: absolute;
	width: 110%;
	height: 110%;
	top: 50%;
	left: 50%;
	background-color: rgba(26, 22, 22, 0.9);
	transform: translate(-50%, -50%);
	font-size: 0;
`;

interface SignUpGenderProps {
	gender: string;
	onChangeGender: (gender: string) => void;
	onChangeStep: () => void;
}

const SignUpGender: React.FC<SignUpGenderProps> = ({ gender, onChangeGender, onChangeStep }) => {
	const onClickNext = () => {
		if (gender.length < 1) {
			return alert('성별을 선택해 주세요 !!');
		}
		onChangeStep();
	};

	const onClickJump = () => {
		onChangeGender('');
		onChangeStep();
	};

	return (
		<>
			<StyledSignUpGender>
				<StyledGenderWrapper className="ml-4 mr-2">
					{gender !== '남' && (
						<StlyedBlackMask type="button" onClick={() => onChangeGender('남')}>
							남
						</StlyedBlackMask>
					)}
					{/* '16px 25px 14px'  */}
					<StyledImg className="my-4 mx-6" src="/assets/images/imgMale.svg" alt="imgMale" width="calc(100% - 48px)" />
					<div className="text-center my-4">MAN</div>
				</StyledGenderWrapper>
				<StyledGenderWrapper className="ml-2 mr-4">
					{gender !== '여' && (
						<StlyedBlackMask type="button" onClick={() => onChangeGender('여')}>
							여
						</StlyedBlackMask>
					)}
					<StyledImg
						className="my-4 mx-6"
						src="/assets/images/imgFemale.svg"
						alt="imgFemale"
						width="calc(100% - 48px)"
					/>
					<div className="text-center my-4">WOMAN</div>
				</StyledGenderWrapper>
			</StyledSignUpGender>
			<StyledBottomButton className="mb-0" width={240} type="button" onClick={onClickNext}>
				다 음
			</StyledBottomButton>
			<StyledSignUpButton className="mb-21" onClick={onClickJump}>
				건너뛰기
			</StyledSignUpButton>
		</>
	);
};

const StyledSignUpBirthday = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-grow: 1;
`;

const StyledSignUpBirthdayInput = styled.input`
	border: none;
	border-top: 1px solid rgb(241, 219, 205);
	border-bottom: 1px solid rgb(241, 219, 205);
	display: block;
	font-size: 24px;
	width: 64px;
	text-align: center;
	padding: 8px 0;
	margin: 4px;
`;

interface SignUpBirthdayProps {
	name: string;
	gender: string;
	year: string;
	onChangeYear: (year: string) => void;
	month: string;
	onChangeMonth: (month: string) => void;
	day: string;
	onChangeDay: (day: string) => void;
	onChangeStep: () => void;
}

const SignUpBirthday: React.FC<SignUpBirthdayProps> = ({
	name,
	gender,
	year,
	onChangeYear,
	month,
	onChangeMonth,
	day,
	onChangeDay,
	onChangeStep,
}) => {
	const onClickNext = async () => {
		try {
			const birthday = `${year}-${Number(month) < 10 ? `0${month}` : month}-${Number(day) < 10 ? `0${day}` : day}`;
			const dayRegExp = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/;
			if (!dayRegExp.test(birthday)) {
				return alert('날짜가 올바르지 않습니다.');
			}
			const token = await Cookie.getToken();
			if (!token) {
				return redirectLogin();
			}
			const body = { name, gender, birthday };
			await User.putUser({ token, body });
			return onChangeStep();
		} catch (error) {
			consoleError('error', error);
		}
	};

	const onClickJump = async () => {
		try {
			const token = await Cookie.getToken();
			if (!token) {
				return redirectLogin();
			}
			const body = { name, gender };
			await User.putUser({ token, body });
			return onChangeStep();
		} catch (error) {
			consoleError('error', error);
		}
	};

	return (
		<>
			<StyledSignUpBirthday>
				<StyledSignUpBirthdayInput
					value={year}
					onChange={(e) => onChangeYear(e.target.value)}
					maxLength={4}
					type="number"
				/>
				<StyledSignUpBirthdayInput
					max={12}
					value={Number(month) < 10 ? `0${month}` : month}
					onChange={(e) => onChangeMonth(e.target.value)}
					maxLength={2}
					type="number"
				/>
				<StyledSignUpBirthdayInput
					max={31}
					value={Number(day) < 10 ? `0${day}` : day}
					onChange={(e) => onChangeDay(e.target.value)}
					maxLength={2}
					type="number"
				/>
			</StyledSignUpBirthday>
			<StyledBottomButton className="mb-0" width={240} type="button" onClick={onClickNext}>
				다 음
			</StyledBottomButton>
			<StyledSignUpButton className="mb-21" onClick={onClickJump}>
				건너뛰기
			</StyledSignUpButton>
		</>
	);
};

const StyledComplete = styled.div`
	font-size: 24px;
	text-align: center;
	flex-grow: 1;
	display: flex;
	justify-content: center;
	align-items: center;
`;

interface SignUpCompleteProps {
	name: string;
}

const SignUpComplete: React.FC<SignUpCompleteProps> = ({ name }) => {
	return (
		<>
			<StyledComplete>
				{name}님
				<br />
				회원가입을
				<br />
				축하합니다!
				<br />
			</StyledComplete>
			<Link href="/">
				<a>
					<StyledBottomButton className="mb-37 text-center" width={240} type="button">
						시작하기
					</StyledBottomButton>
				</a>
			</Link>
		</>
	);
};
