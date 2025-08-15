self.addEventListener('install', e => {
  console.log('Service Worker installed');
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  console.log('Service Worker activated');
  return self.clients.claim();
});

// プッシュ通知受信時（将来的にPush APIで通知可能）
self.addEventListener('push', e => {
  const data = e.data.json();
  self.registration.showNotification(data.title, {
    body: data.body,
    icon: '/img/apple-touch-icon-180.png',
    vibrate: [200, 100, 200],
    tag: 'pomodoro-phase',
    renotify: true
  });
});

// notificationclick イベントでアプリを前面に
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('/');
    })
  );
});
