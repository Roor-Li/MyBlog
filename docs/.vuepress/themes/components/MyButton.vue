<script setup lang="ts">
import VPIcon from '@theme/VPIcon.vue'
import { computed, toRef, useTemplateRef } from 'vue'
import { useRouter, withBase } from 'vuepress/client'
import { useLink } from 'vuepress-theme-plume/client'
import { onMounted, onUnmounted } from 'vue'

interface Props {
  tag?: string
  size?: 'medium' | 'big'
  theme?: 'brand' | 'alt' | 'sponsor'
  text?: string
  href?: string
  target?: string
  rel?: string
  icon?: string
  suffixIcon?: string
}
const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  theme: 'brand',
  text: '',
  tag: undefined,
  href: undefined,
  target: undefined,
  rel: undefined,
})
const router = useRouter()

const component = computed(() => {
  return props.tag || props.href ? 'a' : 'button'
})

const { link, isExternal } = useLink(toRef(props, 'href'), toRef(props, 'target'))

function linkTo(e: Event) {
  if (!isExternal.value && link.value?.[0] !== '#') {
    e.preventDefault()
    if (link.value)
      router.push(link.value)
  }
}

const buttonRef = useTemplateRef<HTMLElement>('buttonRef')

onMounted(() => {
  const button = buttonRef.value
  if (!button) return

  const handler = (e: MouseEvent) => {
    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    button.style.setProperty('--x', `${x}px`)
    button.style.setProperty('--y', `${y}px`)
    console.log(x, y)
  }

  button.addEventListener('mousemove', handler)
  
  onUnmounted(() => {
    button.removeEventListener('mousemove', handler)
  })
})
</script>

<template>
  <Component
    :is="component"
    class="vp-button"
    :class="[size, theme]"
    :href="link?.[0] === '#' ? link : withBase(link || '')"
    :target="target ?? (isExternal ? '_blank' : undefined)"
    :rel="rel ?? (isExternal ? 'noreferrer' : undefined)"
    @click="linkTo($event)"
    ref="buttonRef"
  >
    <span class="button-content">
      <VPIcon v-if="icon" :name="icon" />
      <slot><span>{{ text }}</span></slot>
      <VPIcon v-if="suffixIcon" :name="suffixIcon" />
    </span>
  </Component>
</template>

<style scoped>
.vp-button {
  display: inline-block;
  font-weight: 600;
  text-align: center;
  white-space: nowrap;
  border: 1px solid transparent;
  transition: .5s;
  transition-property: border, color, background-color;

  position: relative;
  overflow: hidden;
  border: none;
}
.vp-button span {
  position: relative;
  z-index: 1;
}

.vp-button:active {
  transition:
    color 0.1s,
    border-color 0.1s,
    background-color 0.1s;
}

.vp-button.medium {
  padding: 0 20px;
  font-size: 14px;
  line-height: 38px;
  border-radius: 20px;
}

.vp-button.big {
  padding: 0 24px;
  font-size: 16px;
  line-height: 46px;
  border-radius: 24px;
}

.vp-button.brand {
  color: var(--vp-button-alt-text);
  background-color: var(--vp-button-alt-bg);
}
.vp-button.brand:hover {
  color: var(--vp-button-brand-bg);
  text-shadow: 0 0 10px var(--vp-button-brand-bg), 0 0 20px var(--vp-button-brand-bg);
}
.vp-button.brand::before {
  content: '';
  position: absolute;
  top: var(--y);
  left: var(--x);
  transform: translate(-50%, -50%);
  background: radial-gradient(var(--vp-button-brand-bg), transparent, transparent);
  width: 100px;
  height: 100px;
  opacity: 0;
  transition: .5s, top 0, left 0;
}
.vp-button.brand:hover::before {
  opacity: 1;
}
.vp-button.brand::after {
  content: '';
  position: absolute;
  inset: 2px;
  border-radius: 18px;
  background-color: var(--vp-button-alt-bg);
}

/* .vp-button.brand {
  color: var(--vp-button-brand-text);
  background-color: var(--vp-button-brand-bg);
  border-color: var(--vp-button-brand-border);
}

.vp-button.brand:hover {
  color: var(--vp-button-brand-hover-text);
  background-color: var(--vp-button-brand-hover-bg);
  border-color: var(--vp-button-brand-hover-border);
} */
.vp-button.brand:active {
  color: var(--vp-button-alt-active-text);
  background-color: var(--vp-button-brand-active-bg);
  border-color: var(--vp-button-brand-active-border);
}

.vp-button.alt {
  color: var(--vp-button-alt-text);
  background-color: var(--vp-button-alt-bg);
  /* border-color: var(--vp-button-alt-border); */
}
.vp-button.alt:hover {
  color: var(--vp-button-brand-bg);
  text-shadow: 0 0 10px var(--vp-button-brand-bg), 0 0 20px var(--vp-button-brand-bg);
}
.vp-button.alt::before {
  content: '';
  position: absolute;
  top: var(--y);
  left: var(--x);
  transform: translate(-50%, -50%);
  background: radial-gradient(var(--vp-button-brand-bg), transparent, transparent);
  width: 100px;
  height: 100px;
  opacity: 0;
  transition: .5s, top 0, left 0;
}
.vp-button.alt:hover::before {
  opacity: 1;
}
.vp-button.alt::after {
  content: '';
  position: absolute;
  inset: 2px;
  border-radius: 18px;
  background-color: var(--vp-button-alt-bg);
}
/* .vp-button.alt:hover {
  color: var(--vp-button-alt-hover-text);
  background-color: var(--vp-button-alt-hover-bg);
  border-color: var(--vp-button-alt-hover-border);
} */
.vp-button.alt:active {
  color: var(--vp-button-alt-active-text);
  background-color: var(--vp-button-alt-active-bg);
  border-color: var(--vp-button-alt-active-border);
}

.vp-button.sponsor {
  color: var(--vp-button-sponsor-text);
  background-color: var(--vp-button-sponsor-bg);
  border-color: var(--vp-button-sponsor-border);
}

.vp-button.sponsor:hover {
  color: var(--vp-button-sponsor-hover-text);
  background-color: var(--vp-button-sponsor-hover-bg);
  border-color: var(--vp-button-sponsor-hover-border);
}

.vp-button.sponsor:active {
  color: var(--vp-button-sponsor-active-text);
  background-color: var(--vp-button-sponsor-active-bg);
  border-color: var(--vp-button-sponsor-active-border);
}

.vp-button .button-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.vp-button .button-content :deep(.vp-icon) {
  width: 1.2em;
  height: 1.2em;
}

.vp-button + .vp-button {
  margin-left: 1em;
}
</style>
