import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Error from './Error';

jest.mock('next/router');

afterEach(cleanup);

describe('Error', () => {
  context('with errorMessage', () => {
    it('render error', () => {
      const { container } = render(<Error errorMessage="error" />);
      expect(container).toHaveTextContent('재접속');
      expect(container).toHaveTextContent('알 수 없는 오류가 발생했습니다.');
      const text = screen.getByText('재접속');
      expect(text).toBeInTheDocument();
    });
    it('screen 사용', () => {
      render(<Error errorMessage="error" />);
      const text = screen.getByText('재접속');
      expect(text).toBeInTheDocument();
    });
    it('style test', () => {
      render(<Error errorMessage="error" />);
      const text = screen.getByText('재접속');
      expect(text).toHaveStyleRule('background-color', 'rgb(222,226,230)');
    });
    it('click 재접속 button', () => {
      const reload = jest.fn();
      (useRouter as jest.Mock).mockImplementation(() => {
        return {
          reload,
        };
      });
      const { getAllByText } = render(<Error errorMessage="error" />);
      const buttons = getAllByText('재접속');
      fireEvent.click(buttons[0]);
      expect(reload).toBeCalled();
    });
  });
  context('without errorMessage', () => {
    it('render error', () => {
      const { container } = render(<Error />);
      expect(container).toHaveTextContent('재접속');
      expect(container).toHaveTextContent('인터넷이 불안정해요.');
      expect(container).toHaveTextContent('확인 후 재접속 해주세요.');
    });
  });
  context('matches snapshot', () => {
    it('toMatchInlineSnapshot 안에 내용은 자동으로 채워집니다', () => {
      const tree = renderer.create(<Error />).toJSON();
      expect(tree).toMatchInlineSnapshot(`
        .c2 {
          display: block;
          margin: 24px 0 36px;
          width: 112px;
          height: 40px;
          background-color: rgb(222,226,230);
          color: rgb(212,161,125);
          border-radius: 30px;
          box-shadow: 0 0 10px 0 rgb(252,222,227);
        }

        .c0 {
          text-align: center;
          -webkit-flex: 1;
          -ms-flex: 1;
          flex: 1;
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-flex-direction: column;
          -ms-flex-direction: column;
          flex-direction: column;
          -webkit-box-pack: justify;
          -webkit-justify-content: space-between;
          -ms-flex-pack: justify;
          justify-content: space-between;
          -webkit-align-items: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
        }

        .c1 {
          display: block;
          margin: 0 auto;
          background: initial;
        }

        <div
          className="c0 justify-content-center"
        >
          <div>
            <img
              alt="error"
              className="c1"
              height="114"
              src="/assets/images/internet.png"
              width="114"
            />
          </div>
          <div>
            <div
              className="text-align-center mt-6 mb-8"
            >
              인터넷이 불안정해요.
              <br />
              확인 후 재접속 해주세요.
            </div>
          </div>
          <button
            className="c2"
            onClick={[Function]}
            type="button"
            width={112}
          >
            재접속
          </button>
        </div>
      `);
    });
  });
});
