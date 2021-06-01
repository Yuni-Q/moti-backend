import Link from 'next/link';
import React from 'react';
import { StyledBody, StyledCardFrameWrapper, StyledImg } from './style/StyledComponent';

const Motivation: React.FC = () => {

	return (
		<StyledBody className="justify-content-center">
			<Link href="/question" >
				<a>
					<StyledCardFrameWrapper>
						<div className="mt-8">Motivation</div>
						<StyledImg className="mt-8" src="/assets/images/imgQuestion.png" width="202" height="202" alt="imgQuestion" />
						<div className="text-align-center my-8">
							<div>
								Today’s
							</div>
							<div className="mt-2">
								your
							</div>
							<div className="mt-2">
								Question
							</div>
						</div>
					</StyledCardFrameWrapper>
				</a>
			</Link>
		</StyledBody>
	);
};

export default Motivation;
