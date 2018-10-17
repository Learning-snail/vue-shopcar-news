<template>
    <div class="mb">
      <hd-Nav title="图片详情"></hd-Nav>
      <div v-for="(item,index) in img" :key="index">
        <img :src="item.picUrl" v-lazy="item.picUrl" alt="" width="100%" height="100%">
      </div>

    </div>
</template>

<script>
    export default {
        name: "photodetalis",
        data() {
          return {
            img: []
          }
        },
      created(){
          let id = this.$route.query.id
          let title = this.$route.query.title
          this.$ajax.get("vue.php?title="+title+id)
            .then(res=>{
              this.img = res.data
            })
      }
    }
</script>

<style scoped lang="less">
  @rem:750/10rem;
  .mb{
    margin-bottom: 130/@rem;
  }
  img{
    display: block;
  }

</style>
