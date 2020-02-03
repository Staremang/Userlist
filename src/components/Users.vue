<template>
  <div class="users">
    <transition-group
      name="list-complete"
      tag="ul"
      class="users__list"
    >
      <li
        v-for="(user, index) in userlist"
        :key="index"
        class="users__item"
      >
        <UsersItem
          :name="`${user.name.first} ${user.name.last}`"
          :img="user.picture.large"
          :email="user.email"
        />
      </li>
    </transition-group>

    <div class="users__control">
      <button v-if="status === 'loading'" class="btn btn-primary" type="button" disabled>
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
        Загрузка...
      </button>
      <button v-else-if="status === 'error'" class="btn btn-danger" type="button" disabled>
        Ошибка!
      </button>
      <button v-else class="btn btn-primary" type="button" @click="nextPage">
        Добавить
      </button>
    </div>
  </div>
</template>

<script>
import { getDocumentScroll, getDocumentSize, getViewportSize } from '../utils'
import UsersItem from './UsersItem.vue'

export default {
  name: 'Users',

  components: {
    UsersItem
  },

  data () {
    return {
      status: null,
      seed: '',
      page: 0,
      userlist: []
    }
  },

  mounted () {
    this.nextPage()
    document.addEventListener('scroll', this.handleScroll)
  },

  beforeDestroy () {
    document.removeEventListener('scroll', this.handleScroll)
  },

  methods: {
    /**
     * Обработчик события прокрутки
     */
    handleScroll () {
      if (this.status) {
        return
      }
      if (getDocumentScroll().top < getDocumentSize().height - getViewportSize().height) {
        return
      }
      this.nextPage()
    },

    /**
     * Загружает список новых карточек
     */
    nextPage () {
      let url = 'https://randomuser.me/api/?'

      /** Требуемые поля */
      url += '&inc=email,name,picture'

      /** Требуемое количество карточек */
      url += '&results=10'

      /** Требуемая страница */
      url += `&page=${this.page + 1}`

      /** Зерно сохраняется при первом и используется при последующих запросах */
      if (this.seed !== '') {
        url += `&seed=${this.seed}`
      }

      this.status = 'loading'

      fetch(url)
        .then((resp) => resp.json())
        .then((json) => {
          if (json.error) {
            const error = new Error(json.error)
            error.response = json
            throw error
          }

          return json
        })
        .then((json) => {
          this.status = null

          this.userlist.push(...json.results)

          this.seed = json.info.seed
          this.page = json.info.page
        })
        .catch(() => {
          this.status = 'error'
          setTimeout(() => {
            this.status = null
          }, 2000)
        })
    }
  }
}
</script>

<style scoped lang="scss">
.users {
  padding: 2rem 0;

  &__list {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
  }

  &__item {
    transition: all 1s;
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__control {
    text-align: center;
    padding: 2rem 0;
  }
}

.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-complete-leave-active {
  position: absolute;
}
</style>
