import { cleanup, fireEvent, render } from '@testing-library/react';
import { useRouter } from 'next/router';
import React from 'react';
import renderer from 'react-test-renderer';

import Error from './Error';

jest.mock('next/router');

afterEach(cleanup);

describe('Error', () => {
  context('with errorMessage', () => {
    it('render error', () => {
      const { container } = render(<Error errorMessage="error" />);
      expect(container).toHaveTextContent('재접속');
      expect(container).toHaveTextContent('알 수 없는 오류가 발생했습니다.');
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
      const tree = renderer.create(<Error />);
      expect(tree).toMatchInlineSnapshot(`
        <div
          className="sc-iqAclL dqaLjA justify-content-center"
        >
          <div>
            <img
              alt="error"
              className="sc-crzoAE iZXZAL"
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
            className="sc-kEqXSa feeVXd"
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
