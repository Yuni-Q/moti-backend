import Carousel from 'nuka-carousel';
import styled from 'styled-components';

const StyledDiv = styled.div``;

export default StyledDiv;

export const StyledWrapper = styled.div`
    width: 100vw;
    max-width: 100vw;
    height: 100vh;
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
`;

export const StyeldForm = styled.form`
    width: 100vw;
    max-width: 100vw;
    min-height: 100vh;
    height: 100vh;
    min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
`;

export const StyldHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 72px;
    position: relative;
    width: 100%;
    flex-shrink: 0;
`;

export const StyledTitle = styled.div`
    flex: 1;
    color: rgb(241, 219, 205);
    text-align: center;
`;

export const StyledLeftIcon = styled.img`
    position: absolute; 
    margin: 0 12px; 
    top: 24px;
    left: 0px;
`;

export const StyledRightIcon = styled.img`
    position: absolute; 
    margin: 0 12px; 
    top: 24px;
    right: 0px;
`;


export const StyledSubTitle = styled.div`
    margin: 8px 36px 56px;
    font-size: 24px;
`;

export const StyledCardFrameWrapper = styled.div`
    max-width: 287px;
    width: calc(100vw - 64px);
    box-shadow: 0 0 10px 0 rgb(231, 188, 158);
    border-radius: 11px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const StyledCardFrame = styled.img`
    width: calc(100% - 32px);
    margin: 12px;
`;

export const StyledTextAreaWrapper = styled.textarea<{imgSrc: string;}>`
    text-align: center;
    width: 100%;
    height: 100%;
    margin: ${({imgSrc}) => imgSrc ? '8px 0 36px 0' : ' 36px 0;'};
    flex: 1;
    border: none;
    padding: ${({imgSrc}) => imgSrc ? '0' : '60% 0'};
    resize: none;
`;

export const StyledBottomButton = styled.button<{width: number}>`
    display: block;
    margin: 24px 0 36px;
    width: ${({width}) => width}px;
    height: 40px;
    background-color: rgb(222, 226, 230);
    color: rgb(212, 161, 125);
    border-radius: 30px;
    box-shadow: 0 0 10px 0 rgb(252, 222, 227);
`;

export const StyledBody = styled.div`
    text-align: center;
    flex: 1;
    display: flex; 
    flex-direction: column; 
    justify-content: space-between;
    align-items: center;
`

export const StyledImg = styled.img`
    display: block;
    margin: 0 auto;
    background: initial;
`;

export const StyledFileInputButton = styled.div`
& > label {
    margin: 0 0 148px 0;
    width: 168px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    background-color: #fff;
    color: rgb(212, 161, 125);
    box-shadow: 0 0 10px 0 rgb(252, 222, 227);
}
& > input {
    display: none;
}
`;

export const StyldContentComponent = styled.div`
    background: initial;
    z-index: 10;
    width: calc(100% - 64px);
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex: 1;
    position: absolute;
    text-align: center;
    height: 100%;
`;
export const StyledFileInputImage = styled.div`
background: initial;
& > label {
    background: initial;
}
& > input {
    display: none;
}
`;

export const StyledDotWrapper = styled.div`
    display: flex; 
    margin: 24px 24px 16px;
    justify-content: center;
`;

export const StyledDotButton = styled.button<{active: boolean}>`
    width: 8px;
    height: 8px;
    border-radius: 8px;
    background-color: ${({active}) => active ? '#d4a17d' : 'rgb(68, 68, 68)'};
    margin: 8px 8px;
    font-size: 0;
    display: block;
`;

export const StyledPart = styled.img`
    width: 70%;
    background: initial;
    z-index: 100;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const StyledCarousel = styled(Carousel)`
	flex: 1;
	height: 100%;
	.slider-frame {
		ul.slider-list {
			height: 100% !important;
			li.slider-slide {
				height: 100% !important;
			}
		}
	}
	.slider-control-bottomcenter {
		display: none;
	}
`;

export const StyledFooter = styled.footer`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    height: 60px;
    flex-shrink: 0;
    align-items: center;
`;

export const StyledHr = styled.hr`
	width: calc(100% - 32px);
	margin: 26px 16px 0;
	border: 1px solid rgb(255, 223, 223);
`;

export const StyledRow = styled.div`
	width: calc(100% - 32px);
	display: flex;
	justify-content: space-between;
	height: 52px;
	align-content: center;
	div {
		display: flex;
		align-items: center;
	}
`;

export const StyledInput = styled.input`
    display: flex;
    align-items: center;
    border: none;
    text-align: end;
`;