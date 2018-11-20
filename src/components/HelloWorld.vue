<template>
  <button @click="fetchResults" />
</template>

<script>
// import axios from 'axios'
import { fetchTest2, fetchTest } from '@/api/action'

export default {
  data () {
    return {
      value: null
    }
  },

  methods: {
    async fetchResults () {
      fetchTest2()
        .then(data => {
          fetchTest()
            .then(res => {
              this.value = res.data
            })
        })
    }
  }
}
</script>
