interface Queue {
  id: string;

  func(resolved: (arg?: any) => void, rejected: (arg?: any) => void): void;

  resolved(arg?: any): void;

  rejected(arg?: any): void;
}

const working: { [key: string]: boolean } = {};
const queue: Queue[] = [];

function run() {
  let q: Queue | undefined;
  let id = '';
  for (let i = 0; i < queue.length; i += 1) {
    // 이미 하고 있다면 수행하지 않는다
    if (!working[queue[i].id]) {
      q = queue.splice(i, 1).pop();
      if (q) {
        id = q.id;
        // working 추가
        working[q.id] = true;
        break;
      }
    }
  }

  if (id && q) {
    new Promise((resolved, rejected) => {
      if (q) {
        q.func(resolved, rejected);
      }
    })
      .then(q.resolved)
      .catch(q.rejected)
      .then(() => {
        // working에 삭제
        delete working[id];
        run();
      });
  }
}

// queue에 넣고 run 실행
export default async function QueueRunner(
  id: string,
  func: (resolved: (arg?: any) => void, rejected: (arg?: any) => void) => void,
): Promise<any> {
  return new Promise((resolved, rejected) => {
    queue.push({ id, func, resolved, rejected });
    run();
  });
}
