self.addEventListener('install', (event) => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  clients.claim()
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        return (
          response ||
          fetch(event.request).then((res) => {
            return caches.open('v1').then((cache) => {
              cache.put(event.request, res.clone())
              return res
            })
          })
        )
      })
      .catch(() => {
        // 可以返回离线页面或静态资源
      })
  )
})
