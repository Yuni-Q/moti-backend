import { useRouter } from 'next/router';
import React from 'react';
import { StyldHeader, StyledLeftIcon, StyledTitle, StyledRightIcon } from "./style/StyledComponent";

interface Props {
    left?: {
        onClick?: () => void;
    }
    title: string;
    right?: {
        onClick: () => void;
        imgUrl: string;
        alt: string
    }
    
}

const Header: React.FC<Props> = ({title, left, right}) => {
    const router = useRouter();
    return (
        <StyldHeader>
                {left && <button type="button" onClick={() =>{ 
                    if(!left.onClick) {
                        return router.back();
                    }
                    left.onClick();
                    }}>
					<StyledLeftIcon
						width={24}
						height={24}
						src="/assets/images/icArrowLeft.png"
						alt="icArrowLeft"
					/>
				</button>}
				<StyledTitle>{title}</StyledTitle>
                {right && <button type="button" onClick={() => right.onClick()}>
					<StyledRightIcon
						width={24}
						height={24}
						src={right.imgUrl}
						alt={right.alt}
					/>
				</button>}
        </StyldHeader>
    )
}

export default Header;