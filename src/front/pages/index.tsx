import React from 'react';

import Main from '../components/Main';
import Answer from '../models/Answer';
import User from '../models/User';
import Cookie from '../utils/Cookie';
import { consoleError } from '../utils/log';
import { redirectLogin } from '../utils/redirect';

import { PageContext } from './_app';

interface Props {
  answers: Answer[];
  isTodayAnswer: boolean;
}

const App: React.FC<Props> = ({ answers, isTodayAnswer }) => {
  return <Main answers={answers} isTodayAnswer={isTodayAnswer} />;
};

interface ServerSideProps {
  props: {
    answers: Answer[];
    isTodayAnswer: boolean;
  };
}

export const getServerSideProps = async ({ req, res }: PageContext): Promise<ServerSideProps | void> => {
  const props = {
    answers: [] as Answer[],
    isTodayAnswer: false,
    isOnboard: false,
  };
  try {
    const token = await Cookie.getToken(req);
    if (!token) {
      return redirectLogin(res);
    }

    const user = await User.getUsersMy({ token, req });
    if (!user.id) {
      return redirectLogin(res);
    }

    const { today, answers } = await Answer.getAnswersWeek({ token, req });
    props.answers = answers;

    const isTodayAnswer =
      answers.filter((answer) => {
        return answer.date === today;
      }).length > 0;
    props.isTodayAnswer = isTodayAnswer;

    return {
      props,
    };
  } catch (error) {
    consoleError('error', error);
    return redirectLogin(res);
  }
};

export default App;
