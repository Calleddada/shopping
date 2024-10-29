<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <like></like>
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor"></Floor>
    <!-- <Floor></Floor> -->
    <Brand></Brand>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Brand from '@/pages/Home/Brand'
import Floor from '@/pages/Home/Floor'
export default {
    name:'',
    components:{
      ListContainer,
      Recommend,
      Rank,
      Like,
      Brand,
      Floor
    },
    mounted(){
      this.$store.dispatch('getFloorList')
      this.$store.dispatch('getUserInfo')
    },
    computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
}
</script>

<style>

</style>