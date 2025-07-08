import { useEffect, useState } from 'react'

// export function useCountDown(time: number = 5) {
//   const [count, setCount] = useState(time)
//   const [disabled, setDisabled] = useState(true)

//   useEffect(() => {
//     if (count > 0) {
//       const timer = setTimeout(() => {
//         setCount(count - 1)
//       }, 1000)
//       return () => clearTimeout(timer)
//     } else {
//       setDisabled(false)
//     }
//   }, [count])

//   return [count, disabled]
// }

export function useCountDown(time: number = 5) {
  const [count, setCount] = useState(time)
  const disabled = count > 0

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => {
        setCount(count - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [count])

  return { count, disabled }
}
