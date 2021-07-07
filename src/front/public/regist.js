(() => {
  const appServerPublicKey = 'BBGgQwXhN2DR1BT7ZFeDJiRNDrJ1lRKILlgvs8NhZbp2JOVk8GgtS1M2f8lC6W_CyQ025fEq282z5iIX13Ay0EE';
  let isSubscribed = false;
  let swRegist = null;

  function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      // eslint-disable-next-line no-useless-escape
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; i += 1) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  // function updateButton() {
  //   // TODO: 알림 권한 거부 처리

  //   const pushButton = document.getElementById('subscribe')
  //   if (isSubscribed) {
  //       pushButton.textContent = 'Disable Push Messaging';
  //   } else {
  //       pushButton.textContent = 'Enable Push Messaging';
  //   }
  //   pushButton.disabled = false;
  // }

  // function updateSubscription(subscription) {
  //   // TODO: 구독 정보 서버로 전송
  //   const detailArea = document.getElementById('subscription_detail')

  //   if (subscription) {
  //       detailArea.innerText = JSON.stringify(subscription)
  //       detailArea.parentElement.classList.remove('hide')
  //   } else {
  //       detailArea.parentElement.classList.add('hide')
  //   }

  // }

  function sendSubscriptionToBackEnd(json) {
    return fetch('/api/push/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: json,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Bad status code from server.');
        }
        return response.json();
      })
      .then((responseData) => {
        if (!responseData) {
          throw new Error('Bad response from server.');
        }
      });
  }

  function subscribe() {
    const applicationServerKey = urlB64ToUint8Array(appServerPublicKey);
    const ACCESS_PUSH_TOKEN = 'ACCESS_PUSH_TOKEN';

    swRegist.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey,
      })
      .then((subscription) => {
        const json = JSON.stringify(subscription.toJSON(), null, 2);
        isSubscribed = true;
        localStorage.setItem(ACCESS_PUSH_TOKEN, JSON.stringify(json)); // 추후 코드 제거를 위해 저장합니다.
        sendSubscriptionToBackEnd(json);
      })
      .catch((err) => {
        console.log('Failed to subscribe the user: ', err);
      });
  }

  // 알림 구독 취소
  function unsubscribe() {
    swRegist.pushManager
      .getSubscription()
      .then((subscription) => {
        if (subscription) {
          return subscription.unsubscribe();
        }
      })
      .catch((error) => {
        console.log('Error unsubscribing', error);
      })
      .then(() => {
        console.log('User is unsubscribed.');
        isSubscribed = false;
      });
  }

  function initPush() {
    if (Notification.permission === 'denied') {
      alert('Notification permission denied');
      return;
    }
    swRegist.pushManager.getSubscription().then(function (subscription) {
      isSubscribed = !(subscription === null);
      if (isSubscribed) {
        console.log('User is subscribed.');
        // subscribe();
        unsubscribe();
      } else {
        console.log('User is NOT subscribed.');
        subscribe();
      }
    });
  }

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('service-worker.js')
      .then((regist) => {
        console.log('Service Worker Registred');
        swRegist = regist;

        regist.addEventListener('updatefound', () => {
          const newWorker = regist.installing;
          console.log('Service Worker update found!');

          newWorker?.addEventListener('statechange', function () {
            console.log('Service Worker state changed: ', this.state);
          });
        });
        // initPush();
      })
      .catch((err) => {
        console.log('service worker registration failed', err.message);
      });
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('Controller changed');
    });
  }
})();
