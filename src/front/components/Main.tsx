import dayjs from 'dayjs';
import { NextPage } from 'next';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Answer from '../models/Answer';
import Cookie from '../utils/Cookie';
import AnswerComponent from './AnswerComponent';
import Error from './Error';
import Motivation from './Motivation';
import Onboard from './Onboard';
import { StyledDotButton, StyledDotWrapper, StyledFooter, StyledImg, StyledWrapper } from './style/StyledComponent';

interface Props {
	answers: Answer[];
	isTodayAnswer: boolean;
}

const Main: NextPage<Props> = ({ answers, isTodayAnswer }) => {
	const [step, setStep] = useState(5);
	const [errorMessage] = useState('');

	useEffect(() => {
		if (!Cookie.getOnboard()) {
			setStep(1);
		}
	}, []);

	const onChageStep = (newStep: number) => {
		setStep(newStep);
	};

	if (step <= 4) {
		return <Onboard step={step} onChageStep={onChageStep} />;
	}

	return (
		<StyledWrapper>
			<MainDot answers={answers} />
			{errorMessage && <Error errorMessage={errorMessage} />}
			{!errorMessage && !isTodayAnswer && <Motivation />}
			{!!isTodayAnswer && <AnswerComponent answers={answers} />}
			<StyledFooter>
				<div>
					<Link href="/album">
						<a>
							<StyledImg src="/assets/images/normal.png" width="24" height="24" alt="normal" />
						</a>
					</Link>
				</div>
				<div className="h3">
					<span>{dayjs().format('YYYY. MM. DD')}</span>
				</div>
				<div>
					<Link href="/my">
						<a>
							<StyledImg src="/assets/images/icProfileToucharea.png" width="24" height="24" alt="icProfileToucharea" />
						</a>
					</Link>
				</div>
			</StyledFooter>
		</StyledWrapper>
	);
};

export default Main;

interface MainDotProps {
	answers: Answer[];
}

const MainDot: React.FC<MainDotProps> = ({ answers }) => {
	return (
		<StyledDotWrapper>
			{[1, 2, 3, 4, 5, 6].map((num, index) => {
				return (
					<div className="my-4 mx-4" key={num}>
						<div className="text-center">{num}th</div>
						<StyledDotButton type="button" key={num} active={!!answers[index]} />
					</div>
				);
			})}
		</StyledDotWrapper>
	);
};
