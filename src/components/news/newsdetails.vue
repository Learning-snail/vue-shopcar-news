<template>
    <div class="mb">
      <hd-Nav title="新闻详情"></hd-Nav>
      <div class="con">
        <p v-text="newsdetails.title" class="title"></p>
        <span v-text="newsdetails.time " class="time"></span>
        <span v-text="newsdetails.source " class="source"></span>
        <img :src="newsdetails.picUrl" alt="" class="img">
        <div v-html="newsdetails.content" class="content"></div>
        <p class="editor">
        <span v-text="newsdetails.reporter"></span>
        <span  >责任编辑：{{newsdetails.editor}}</span>
        </p>
      </div>
    </div>
</template>

<script>
    export default {
        name: "newsdetails",
        data(){
          return {
            newsdetails:{}
          }
        },
      created(){
        let id=this.$route.query.id
        this.$ajax.get("vue.php?title=newsList"+id)
           .then(res=>{
             this.newsdetails = res.data
           })
      }
    }
</script>

<style scoped lang="less">
  @rem:750 / 10rem;
  .mb{
    margin-bottom: 130/@rem;
  }
  .con{
    padding: 0 40/@rem;
    .title{
      font-size: 40/@rem;
      text-align: left;
      color: #3f4146;
    }
    .source{
      font-size: 24/@rem;
    }
    .time{
      font-size: 20/@rem;
    }
    .img{
      display: block;
      margin: auto;
      width: 670/@rem;
    }
    .content{
      font-size: 32/@rem;
      text-align: left;
      text-indent: 2em;
    }
    .editor{
      display: flex;
      justify-content: space-between;
      color: #9d9ea3;
      font-size: 22/@rem;
    }
  }


</style>
