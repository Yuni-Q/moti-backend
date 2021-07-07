import { ServerResponse } from 'http';

export default (): string => {
  return '';
};

export const redirectRoot = (res?: ServerResponse): void => {
  const path = '/';
  if (res) {
    res.setHeader('location', path);
    res.statusCode = 302;
    res.end();
  } else {
    window.location.pathname = path;
  }
};

export const redirectLogin = (res?: ServerResponse): void => {
  const path = '/login';
  if (res) {
    res.setHeader('location', path);
    res.statusCode = 302;
    res.end();
  } else {
    window.location.pathname = path;
  }
};

// export const checkUser = async ({token}: {token: string}): Promise<boolean> => {
//     try {
//         const user = await User.getUsersMy({token});
//         if(!user || !user.id) {
//             return false;
//         }
//         return true;
//     } catch(error) {
//         consoleError('error', error);
//         return false;
//     }
// }
