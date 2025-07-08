// 简单的 IndexedDB 工具
export function openDB(dbName = 'myDB', storeName = 'data') {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(dbName, 1)
    request.onupgradeneeded = function () {
      const db = request.result
      try {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true })
        }
      } catch (e) {
        reject(e)
      }
    }
    request.onsuccess = function () {
      resolve(request.result)
    }
    request.onerror = function () {
      reject(request.error)
    }
  })
}

export async function addData(data: any, dbName = 'myDB', storeName = 'data') {
  const db = await openDB(dbName, storeName)
  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite')
    tx.objectStore(storeName).add(data)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

export async function getAllData(dbName = 'myDB', storeName = 'data') {
  const db = await openDB(dbName, storeName)
  const tx = db.transaction(storeName, 'readonly')
  const store = tx.objectStore(storeName)
  return new Promise<any[]>((resolve, reject) => {
    const req = store.getAll()
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

export async function clearAllData(dbName = 'myDB', storeName = 'data') {
  const db = await openDB(dbName, storeName)
  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite')
    tx.objectStore(storeName).clear()
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}
