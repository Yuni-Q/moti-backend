import _ from 'lodash';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Header from '../components/Header';
import Parts from '../components/Parts';
import { StyledCardFrame, StyledCardFrameWrapper, StyledWrapper } from '../components/style/StyledComponent';
import Answer from '../models/Answer';
import Cookie from '../utils/Cookie';
import { consoleError } from '../utils/log';
import { redirectLogin, redirectRoot } from '../utils/redirect';

import { PageContext } from './_app';

const StyledAlbum = styled(StyledWrapper)`
  justify-content: flex-start;
`;

const StyledCardsWrapper = styled.div`
  margin: 16px 12px 0;
  display: flex;
  flex-wrap: wrap;
`;

const StyledCardWrapperA = styled.a`
  width: 34%;
  flex-shrink: 0;
  flex-grow: 1;
  text-align: center;
  margin: 0 16px 32px;
`;

const StyledNo = styled.div`
  display: flex;
  flex-basis: 100%;
  align-items: center;
  color: rgb(241, 219, 205);
  font-size: 12px;
  margin: 0 0 16px;

  &::before,
  &::after {
    content: '';
    flex-grow: 1;
    background: rgb(241, 219, 205);
    height: 1px;
    font-size: 0px;
    line-height: 0px;
    margin: 0px 16px;
  }
`;

const StyledAlbumCardFrameWrapper = styled(StyledCardFrameWrapper)`
  width: 100%;
`;

interface Props {
  initCards: Answer[][];
}

const Album: React.FC<Props> = ({ initCards }) => {
  const [cards, setAnswerList] = useState([...initCards] || [[]]);
  useEffect(() => {
    const checkPoint =
      window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300;
    const getItem = async () => {
      if (checkPoint) {
        try {
          const lastAnswerNo = cards[cards.length - 1][0]?.no;
          if (!!lastAnswerNo && lastAnswerNo !== 1) {
            const token = await Cookie.getToken();
            if (!token) {
              return redirectLogin();
            }
            const { id } = cards[cards.length - 1][cards[cards.length - 1].length - 1];
            if (id) {
              const newCardList = await Answer.getAnswersList({ id, token });
              setAnswerList((oldCardList: Answer[][]) => [...oldCardList, ...newCardList]);
            }
          }
        } catch (error) {
          consoleError('error', error);
        }
      }
    };
    const fn = _.throttle(getItem, 5000);
    const noScroll = document.documentElement.clientHeight === document.documentElement.scrollHeight;
    if (noScroll) {
      fn();
    }
    window.addEventListener('scroll', fn);
    return () => {
      window.removeEventListener('scroll', fn);
    };
  }, [cards]);

  return (
    <StyledAlbum>
      <Header left={{}} title="앨범" />
      <CardsComponent cards={cards} />
    </StyledAlbum>
  );
};

interface ServerSideProps {
  props: {
    initCards: Answer[][];
  };
}

export const getServerSideProps = async ({ req, res }: PageContext): Promise<ServerSideProps | void> => {
  const props = {
    initCards: [] as Answer[][],
  };
  try {
    const token = await Cookie.getToken(req);
    if (!token) {
      return redirectLogin(res);
    }

    const cardList = await Answer.getAnswersList({ token, req });

    props.initCards = cardList;

    return {
      props,
    };
  } catch (error) {
    consoleError('error', error);
    return redirectRoot(res);
  }
};

export default Album;

interface CardsComponentProps {
  cards: Answer[][];
}

const CardsComponent: React.FC<CardsComponentProps> = ({ cards }) => {
  return (
    <StyledCardsWrapper>
      {cards.map((answers) => {
        return (
          <Link key={answers[0].no} href="/answers/list/[id]" as={`/answers/list/${answers[0].id}`}>
            <StyledCardWrapperA>
              <button type="button">
                <StyledNo>No. {answers[0].no}</StyledNo>
                <StyledAlbumCardFrameWrapper>
                  <StyledCardFrame src="/assets/images/imgCardframe.png" alt="imgCardframe" />
                  <Parts answers={answers} />
                </StyledAlbumCardFrameWrapper>
              </button>
            </StyledCardWrapperA>
          </Link>
        );
      })}
    </StyledCardsWrapper>
  );
};
