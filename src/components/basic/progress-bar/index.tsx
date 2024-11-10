import 'nprogress/nprogress.css'

import { useThemeToken } from '@/hooks/business/useThemetoken'

export default function ProgressBar() {
  const { colorPrimary } = useThemeToken()

  const changeNprogressBar = () => {
    const nprogress = document.getElementById('nprogress')

    if (nprogress) {
      const bar: HTMLElement = nprogress.querySelector('.bar')!
      const peg: HTMLElement = nprogress.querySelector('.peg')!

      bar.style.background = colorPrimary
      bar.style.boxShadow = `0 0 2px ${colorPrimary}`

      peg.style.boxShadow = `0 0 10px ${colorPrimary}, 0 0 5px ${colorPrimary}`
    }
  }

  changeNprogressBar()

  return null
}
