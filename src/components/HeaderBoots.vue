<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div class="container-fluid">
        <!-- Brand -->
        <a class="navbar-brand d-flex align-items-center" :href="brandLink">
          <img
            v-if="brandLogo"
            :src="brandLogo"
            alt="logo"
            class="me-2"
            style="height: 32px; width: auto"
          />
          <span class="fw-bold">{{ brand }}</span>
        </a>

        <!-- Toggler -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="`#${collapseId}`"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          :aria-label="`Toggle navigation`"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Collapsible content -->
        <div class="collapse navbar-collapse" :id="collapseId">
          <!-- Left links -->
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li
              v-for="(item, idx) in links"
              :key="idx"
              class="nav-item"
              :class="{ dropdown: item.children }"
            >
              <template v-if="!item.children">
                <a
                  class="nav-link"
                  :class="{ active: item.active }"
                  :href="item.href"
                  >{{ item.label }}</a
                >
              </template>

              <template v-else>
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {{ item.label }}
                </a>
                <ul class="dropdown-menu">
                  <li v-for="(child, cidx) in item.children" :key="cidx">
                    <a class="dropdown-item" :href="child.href">{{
                      child.label
                    }}</a>
                  </li>
                </ul>
              </template>
            </li>
          </ul>

          <!-- Search + right actions -->
          <form class="d-flex me-3" @submit.prevent="onSearch">
            <input
              v-model="searchQuery"
              class="form-control me-2"
              type="search"
              :placeholder="searchPlaceholder"
              aria-label="Search"
            />
            <button class="btn btn-outline-primary" type="submit">
              Search
            </button>
          </form>

          <!-- Slot for custom actions (login, avatar, buttons) -->
          <div class="d-flex align-items-center">
            <slot name="actions">
              <!-- default fallback actions -->
              <a class="btn btn-primary me-2" :href="ctaLink">{{ ctaLabel }}</a>
            </slot>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { nanoid } from 'nanoid'

// Props
defineProps({
  brand: { type: String, default: 'My Brand' },
  brandLogo: { type: String, default: '' },
  brandLink: { type: String, default: '/' },
  links: {
    type: Array,
    default: () => [
      { label: 'Home', href: '/', active: true },
      { label: 'About', href: '/about' },
      {
        label: 'More',
        children: [
          { label: 'Team', href: '/team' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
  },
  ctaLabel: { type: String, default: 'Get started' },
  ctaLink: { type: String, default: '/signup' },
  searchPlaceholder: { type: String, default: 'Search...' },
})

// Local state
const searchQuery = ref('')

// Unique collapse id to avoid collisions if multiple headers exist
const collapseId = `navbarCollapse-${Math.random().toString(36).slice(2, 9)}`

// Emits (optional)
const emit = defineEmits(['search'])

// Methods
function onSearch() {
  emit('search', searchQuery.value)
}
</script>

<style scoped>
/* Small visual tweaks */
.navbar-brand img {
  object-fit: contain;
}
</style>
