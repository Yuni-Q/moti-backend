import React from 'react';
import { StyldContentComponent, StyledFileInputImage, StyledTextAreaWrapper } from "./style/StyledComponent";

interface ContentComponentProps {
    imgSrc: string;
    isContent?: boolean;
    content: string;
    onChangeContent?: (content: string) => void
    onChangeFile?: (file: File) => void;
}

const ContentComponent: React.FC<ContentComponentProps> = ({imgSrc, isContent, content, onChangeContent, onChangeFile }) => {
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (onChangeFile && event.target.files && typeof event.target.files[0] === 'object') {
            onChangeFile(event.target.files[0]);
		}
    }

    const onClick = (event: React.MouseEvent<HTMLInputElement>) => {
		if(!onChangeContent) {
            event.preventDefault();
        }
    }
    
    return (
        <StyldContentComponent>
            <Image imgSrc={imgSrc} onChange={onChange} onClick={onClick} />
            <Content imgSrc={imgSrc} content={content} isContent={isContent} onChangeContent={onChangeContent} />
        </StyldContentComponent>
    )
}
export default ContentComponent;

interface ImageProps {
    imgSrc: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onClick: (event: React.MouseEvent<HTMLInputElement>) => void;
}

const Image: React.FC<ImageProps> = ({imgSrc, onChange, onClick}) => {
    if(!imgSrc) {
        return null;
    }
    return (
        <StyledFileInputImage>
            <label htmlFor="file">
                <img className="mt-8" src={imgSrc} alt="imageAsBase64" width="100%" />
            </label>
            <input type="file" id="file" onChange={onChange} onClick={onClick}/>
        </StyledFileInputImage>
    )
}

interface ContentProps {
    content: string;
    imgSrc: string;
    isContent?: boolean;
    onChangeContent?: (content: string) => void
}

const Content: React.FC<ContentProps> = ({content, imgSrc, isContent, onChangeContent}) => {
    if(!isContent) {
        return null;
    }
    return (
        <StyledTextAreaWrapper imgSrc={imgSrc}
            value={content}
            onChange={(e) => onChangeContent && onChangeContent(e.target.value)}
            placeholder="여기를 눌러 질문에 대한 답을 적어주세요"
        />
    )
};
