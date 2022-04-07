/**
 * 获取参数：this.$store.state.specimen.num
 * 
 * 调用方法：
 * import { mapState, mapMutations } from 'vuex'
 * 
 * data() {
 *    return { num: this.$store.state.specimen.num }
 * },
 * mounted() {
    console.log("message", this.num)  // 0
    this.setNum(20)
    console.log("message", this.$store.state.specimen.num)  // 20
  },
 * methods: {
    ...mapMutations({
      setNum: 'specimen/setNum'
    })
  }
 * 
*/
export default {
    namespaced: true,
    state: {
      num: 0
    },
    getters: {},
    mutations: {
      setNum(state, num) {
        state.num = num
      }
    },
    actions: {
  
    }
  }
  