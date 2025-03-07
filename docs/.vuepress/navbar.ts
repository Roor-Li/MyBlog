import { defineNavbarConfig } from 'vuepress-theme-plume'

export const navbar = defineNavbarConfig([
  { text: '首页', link: '/', icon: 'flat-color-icons:home' },
  { text: '博客', link: '/blog/', icon: 'flat-color-icons:document' },
  // { text: '标签', link: '/blog/tags/', icon: 'mdi:tag' },
  // { text: '归档', link: '/blog/archives/', icon: 'ri:folder-5-fill' },
  {
    text: '笔记',
    items: [
      { text: '备忘录', link: '/notes/memo/README.md', icon: 'emojione:memo' },
      { text: '示例', link: '/notes/demo/README.md', icon: 'tdesign:play-demo-filled' },
      // { text: '', link: '/notes/git/README.md' }
    ],
    icon: 'emojione-v1:note-pad'
  },
])
