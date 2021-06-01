import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import ContentComponent from '../../../components/ContentComponent';
import Header from '../../../components/Header';
import {
	StyledCardFrame,
	StyledCardFrameWrapper,
	StyledCarousel,
	StyledDotButton,
	StyledDotWrapper,
	StyledRightIcon,
	StyledSubTitle,
	StyledWrapper,
} from '../../../components/style/StyledComponent';
import Answer from '../../../models/Answer';
import Cookie from '../../../utils/Cookie';
import { consoleError } from '../../../utils/log';
import { redirectLogin, redirectRoot } from '../../../utils/redirect';
import { PageContext } from '../../_app';

interface Props {
	answers: Answer[];
}

const AnswerDetail: React.FC<Props> = ({ answers }) => {
	const router = useRouter();
	const [slideIndex, setSlideIndex] = useState(0);
	const title = dayjs(answers[slideIndex].date).format('YYYY. MM. DD');

	const onChagneSlideIndex = (newIndex: number) => {
		setSlideIndex(newIndex);
	};
	return (
		<StyledWrapper>
			<Header
				left={{}}
				title={title}
				right={{ onClick: () => router.push('/album'), imgUrl: '/assets/images/normal.png', alt: 'normal' }}
			/>
			<AnswerDetailDot answers={answers} slideIndex={slideIndex} onChagneSlideIndex={onChagneSlideIndex} />
			<AnswerCarosel answers={answers} slideIndex={slideIndex} onChagneSlideIndex={onChagneSlideIndex} />
		</StyledWrapper>
	);
};

const StyledCardsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 100%;
	overflow: scroll;
`;

interface AnswerDetailDotProps {
	answers: Answer[];
	slideIndex: number;
	onChagneSlideIndex: (index: number) => void;
}

const AnswerDetailDot: React.FC<AnswerDetailDotProps> = ({ answers, slideIndex, onChagneSlideIndex }) => {
	return (
		<StyledDotWrapper>
			{answers.map((answer, index) => {
				return (
					<StyledDotButton
						key={answer.id}
						active={index === slideIndex}
						type="button"
						onClick={() => onChagneSlideIndex(index)}
					>
						dot
					</StyledDotButton>
				);
			})}
		</StyledDotWrapper>
	);
};

interface AnswerCaroselProps {
	answers: Answer[];
	slideIndex: number;
	onChagneSlideIndex: (index: number) => void;
}

export default AnswerDetail;

const AnswerCarosel: React.FC<AnswerCaroselProps> = ({ answers, slideIndex, onChagneSlideIndex }) => {
	const defaultControlsConfig = {
		nextButtonStyle: { display: 'none' },
		prevButtonStyle: { display: 'none' },
	};

	return (
		<StyledCarousel
			cellAlign="center"
			slidesToShow={1}
			cellSpacing={24}
			autoplay={false}
			defaultControlsConfig={defaultControlsConfig}
			slideIndex={slideIndex}
			afterSlide={(newSlideIndex) => onChagneSlideIndex(newSlideIndex)}
		>
			{answers.map((answer) => {
				return (
					<StyledCardsWrapper key={answer.id}>
						<StyledSubTitle className="mx-13">
							<div>{answer?.mission?.title}</div>
							<Link href="/answers/[id]" as={`/answers/${answer.id}`}>
								<a>
									<StyledRightIcon
										className="mr-6"
										width={24}
										height={24}
										src="/assets/images/icRewriteNormal.png"
										alt="icRewriteNormal"
									/>
								</a>
							</Link>
						</StyledSubTitle>
						<StyledCardFrameWrapper>
							<StyledCardFrame src="/assets/images/imgCardframe.png" alt="imgCardframe" />
							<ContentComponent
								imgSrc={answer.imageUrl || ''}
								isContent={answer.mission?.isContent}
								content={answer.content || ''}
							/>
						</StyledCardFrameWrapper>
					</StyledCardsWrapper>
				);
			})}
		</StyledCarousel>
	);
};

interface ServerSideProps {
	props: {
		answers: Answer[];
	};
}

export const getServerSideProps = async ({ req, res, params }: PageContext): Promise<void | ServerSideProps> => {
	const props = {
		answers: [] as Answer[],
	};

	try {
		const token = await Cookie.getToken(req);
		if (!token) {
			return redirectLogin();
		}

		const { id: stringId } = params;
		const id = Number(stringId);
		if (!id) {
			return redirectRoot(res);
		}

		const answers = await Answer.getAnswersListId({ id, token, req });
		if (!answers) {
			return redirectRoot(res);
		}
		props.answers = answers;
		return {
			props,
		};
	} catch (error) {
		consoleError('error', error);
		return redirectRoot(res);
	}
};
