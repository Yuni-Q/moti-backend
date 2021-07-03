/* eslint-disable no-restricted-globals */
// This is the "Offline page" service worker

// Install stage sets up the offline page in the cache and opens a new cache

const CACHE_NAME = 'MOTI-v0.0.0';
const VERSION = 'MOTI-v0.0.0';

const FILES_TO_CACHE = [
  '/favicon.png',
  '/manifest.json',
  'reset.css',
  '/assets/images/icApple.png',
  '/assets/images/icArrowLeft.png',
  '/assets/images/icCameraNormal.png',
  '/assets/images/icProfileToucharea.png',
  '/assets/images/icRewriteNormal.png',
  '/assets/images/icTextformNormal.png',
  '/assets/images/imgCam.png',
  '/assets/images/imgCardframe.png',
  '/assets/images/imgFemale.svg',
  '/assets/images/imgMale.svg',
  '/assets/images/imgMypage.png',
  '/assets/images/imgQuestion.png',
  '/assets/images/internet.png',
  '/assets/images/motiLogo.png',
  '/assets/images/normal.png',
  '/assets/images/onbording1.png',
  '/assets/images/onbording2.png',
  '/assets/images/onbording3.png',
  '/assets/images/onbording4.png',
  '/assets/images/unknownError.png',
];

const log = (msg) => {
  console.log(`[ServiceWorker ${VERSION}] ${msg}`);
};

self.addEventListener('install', (event) => {
  self.skipWaiting();
  log('INSTALL');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      log('Caching app shell');
      return cache.addAll(FILES_TO_CACHE);
    }),
  );
});

self.addEventListener('activate', (event) => {
  log('ACTIVE');
  // event.waitUntil(self.clients.claim());
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (CACHE_NAME !== key) {
            return caches.delete(key);
          }
          return null;
        }),
      );
    }),
  );
});

self.addEventListener('fetch', (event) => {
  console.log('FETCH', event.request.url);
  event.respondWith(
    fetch(event.request).then((response) => {
      return response || fetch(event.request);
    }),
    fetch(event.request).catch((error) => {
      console.error(`Serving Offline ${error}`);
      return caches
        .open('MASH-UP-offline')
        .then((cache) => {
          return cache.match('/');
        })
        .catch((error2) => console.log('실패', error2));
    }),
  );
});

// Functional: PUSH
self.addEventListener('push', (event) => {
  console.log(`Push had this data: "${event.data.text()}"`);
  const pushInfo = JSON.parse(event.data.text());
  console.log(pushInfo);
  const options = {
    // 푸쉬 알림창에 대한 각종 설정
    body: pushInfo.context, // 푸쉬 매세지에 대한 설정.
    icon: '/favicon.png', // 알림 아이콘 사이즈
    data: {
      // 푸쉬메세지에 필요한 커스텀값들을 obj 형태로 전달 가능.
      url: pushInfo.url, // 알림 클릭시 필요한 url 세팅. 커스텀 데이터
    },
  };

  // showNotification 에 첫 파라미터는 제목, 두번째는 위의 옵션 데이터를 넣어줍니다.
  event.waitUntil(self.registration.showNotification(pushInfo.title, options));
});

// 알림 메세지를 클릭했을때의 이벤트.
self.addEventListener('notificationclick', function (event) {
  event.notification.close(); // 푸쉬 종료 처리

  event.waitUntil(
    // `push` 에서 받은 url로 새창으로 열어 이동
    // eslint-disable-next-line no-undef
    clients.openWindow('/'),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});
