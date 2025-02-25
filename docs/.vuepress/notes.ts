import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume'

const demoNote = defineNoteConfig({
  dir: 'demo',
  link: '/demo',
  sidebar: ['', 'foo', 'bar'],
})

// const gitNote = defineNoteConfig({
//   dir: 'git',
//   link: '/git',
//   sidebar: ['', '常用git命令'],
// })

const memoNote = defineNoteConfig({
  dir: 'memo',
  link: '/memo',
  sidebar: 'auto',
})

export const notes = defineNotesConfig({
  dir: 'notes',
  link: '/',
  notes: [demoNote, memoNote]
})
