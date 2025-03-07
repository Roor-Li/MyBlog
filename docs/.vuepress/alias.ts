import { getDirname, path } from 'vuepress/utils'

const __dirname = getDirname(import.meta.url)

export default {
  // '@theme/VPFooter.vue': path.resolve(
  //   __dirname,
  //   './themes/components/MyFooter.vue',
  // ),

  // 搜索框圆角
  // '@theme/Nav/VPNavBar.vue': path.resolve(
  //   __dirname,
  //   './themes/components/Nav/MyNavBar.vue',
  // ),

  // 导航栏毛玻璃
  // '@theme/Nav/VPNav.vue': path.resolve(
  //   __dirname,
  //   './themes/components/Nav/MyNav.vue',
  // ),

  // '@theme/Blog/VPBlogProfile.vue': path.resolve(
  //   __dirname,
  //   './themes/components/Blog/MyBlogProfile.vue',
  // ),
  // '@theme/Blog/VPBlog.vue': path.resolve(
  //   __dirname,
  //   './themes/components/Blog/MyBlog.vue',
  // ),
  // '@theme/VPContent.vue': path.resolve(
  //   __dirname,
  //   './themes/components/MyContent.vue',
  // ),
  '@theme/VPButton.vue': path.resolve(
    __dirname,
    './themes/components/MyButton.vue',
  ),
}
