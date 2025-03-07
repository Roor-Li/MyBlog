import { defineClientConfig } from 'vuepress/client'
// import RepoCard from 'vuepress-theme-plume/features/RepoCard.vue'
// import NpmBadge from 'vuepress-theme-plume/features/NpmBadge.vue'
// import NpmBadgeGroup from 'vuepress-theme-plume/features/NpmBadgeGroup.vue'
// import Swiper from 'vuepress-theme-plume/features/Swiper.vue'

// import CustomComponent from './theme/components/Custom.vue'
import './styles/index.scss'

// import './theme/styles/custom.css'

// 定义背景图片集合
const BACKGROUND_IMAGES = [
  '001.webp', '002.webp', '003.webp', '004.webp',
  '005.webp', '006.webp', '007.webp', '008.webp',
  '009.webp', '010.webp', '011.webp', '012.webp',
  '013.webp', '014.webp', '015.webp', '016.webp',
  '017.webp', '018.webp', '019.webp', '020.webp',
  '021.webp', '022.webp', '023.webp', '024.webp',
  '025.webp', '026.webp', '027.webp', '028.webp',
  '029.webp', '030.webp', '031.webp', '032.webp',
  '033.webp', '034.webp', '035.webp', '036.webp',
  '037.webp', '038.webp', '039.webp', '040.webp',
  '041.webp', '042.webp', '043.webp', '044.webp',
  '045.webp', '046.webp', '047.webp', '048.webp',
  '049.webp', '050.webp', '051.webp', '052.webp',
  '053.webp', '054.webp', '055.webp',
].map(name => 
  `https://unpkg.com/volantis-static@0.0.1660614606622/media/wallpaper/minimalist/2020/${name}`
)

export default defineClientConfig({
  enhance({ app }) {
    // built-in components
    // app.component('RepoCard', RepoCard)
    // app.component('NpmBadge', NpmBadge)
    // app.component('NpmBadgeGroup', NpmBadgeGroup)
    // app.component('Swiper', Swiper) // you should install `swiper`

    // your custom components
    // app.component('CustomComponent', CustomComponent)
  },
  setup() {
    // 立即设置初始背景
    const setInitialBackground = () => {
      const randomIndex = Math.floor(Math.random() * BACKGROUND_IMAGES.length)
      const initialBg = `url(${BACKGROUND_IMAGES[randomIndex]})`
      document.documentElement.style.setProperty(
        '--theme-bg-image', 
        initialBg
      )
    }

    // 在DOM准备就绪时立即设置
    if (typeof window !== 'undefined') {
      setInitialBackground()
      window.addEventListener('load', setInitialBackground)
    }
  }
})
