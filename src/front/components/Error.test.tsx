import { fireEvent, render } from '@testing-library/react';
import { useRouter } from 'next/router';
import React from 'react';
import Error from './Error';

jest.mock('next/router');

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
});
