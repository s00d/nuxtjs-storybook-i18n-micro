<template>
  <div>
    <!-- Базовый пример -->
    <h1>{{ $t('welcome') }}</h1>


    <!-- Переключение локали -->
    <div class="locale-switcher">
      <button
        v-for="locale in $getLocales()"
        :key="locale.code"
        @click="$switchLocale(locale.code)"
        :class="{ active: locale.code === $getLocale() }"
      >
        {{ $t(`locales.${locale.code}`) }}
      </button>
    </div>

    <!-- Динамические ключи -->
    <div class="features">
      <h2>{{ $t('features.title') }}</h2>
      <ul>
        <li v-for="(feature, index) in $t('features.list')" :key="index">
          {{ feature }}
        </li>
      </ul>
    </div>

    <!-- Плюрализация -->
    <div class="stats">
      <p>{{ $tc('messages.users', userCount) }}</p>
      <p>{{ $tc('messages.posts', postCount) }}</p>
    </div>

    <!-- Форматирование чисел и дат -->
    <div class="formats">
      <p>{{ $tn(1234567.89, { style: 'currency', currency: 'USD' }) }}</p>
      <p>{{ $td(new Date(), { dateStyle: 'full' }) }}</p>
      <p>{{ $tdr(new Date(Date.now() - 3600 * 1000)) }}</p>
    </div>

    <!-- Вложенные переводы -->
    <footer>
      <p>{{ $t('footer.disclaimer') }}</p>
      <div v-html="$t('footer.contact')"></div>
    </footer>
  </div>
</template>

<script setup>
import { useNuxtApp } from '#imports'

const { $t, $tn, $td, $tdr } = useNuxtApp()
const userCount = ref(1500);
const postCount = ref(24);
</script>

<style>
.features ul {
  list-style: none;
  padding: 0;
}

.active {
  font-weight: bold;
  color: #029cfd;
}

.formats p {
  margin: 10px 0;
  padding: 5px;
  background: #f5f5f5;
}
</style>
