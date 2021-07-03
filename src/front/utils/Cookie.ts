import { IncomingMessage } from 'http';

import Cookies from 'universal-cookie';

export default class Cookie {
  static cookies = new Cookies();

  public static async getToken(req?: IncomingMessage): Promise<string> {
    try {
      const cookies = req ? new Cookies(req.headers.cookie) : new Cookies();
      // const token = cookies.get('token');
      // const user = await User.getUsersMy({token, req})
      // if(!user.id) {
      //     return ''
      // }
      return cookies.get('token');
    } catch (error) {
      return '';
    }
  }

  public static setToken({ req, token }: { req?: IncomingMessage; token: string }): void {
    const cookies = req ? new Cookies(req.headers.cookie) : new Cookies();
    cookies.set('token', token);
  }

  public static removeToken({ req }: { req?: IncomingMessage }): void {
    const cookies = req ? new Cookies(req.headers.cookie) : new Cookies();
    cookies.remove('token');
  }

  public static getOnboard(req?: IncomingMessage): string {
    const cookies = req ? new Cookies(req.headers.cookie) : new Cookies();
    return cookies.get('onboard');
  }

  public static setOnboard({ req }: { req?: IncomingMessage }): void {
    const cookies = req ? new Cookies(req.headers.cookie) : new Cookies();
    cookies.set('onboard', 'true');
  }

  public static getRefreshToken(req?: IncomingMessage): string {
    const cookies = req ? new Cookies(req.headers.cookie) : new Cookies();
    return cookies.get('refreshToken');
  }

  public static setRefreshToken({ req, token }: { req?: IncomingMessage; token: string }): void {
    const cookies = req ? new Cookies(req.headers.cookie) : new Cookies();
    cookies.set('refreshToken', token);
  }
}
