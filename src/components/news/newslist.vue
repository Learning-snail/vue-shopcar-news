<template>
  <div class="mb">
    <hd-Nav title="新闻资讯"></hd-Nav>
    <div id="newsList">
      <ul>
        <li v-for="(item,index) in arr" :key="item.id">
            <router-link :to="{name:'news.details' ,query:{id:item.id,title:'newslist'}}">
              <div id="pic">
                <img :src="item.picUrl" v-lazy="item.picUrl" alt="正在加载" width="100%" height="100%">
              </div>
              <div id="con">
                <h2 v-text="item.title"></h2>
                <p>
                  <span v-text="item.time"></span>
                  <span class="fl">来源 {{item.source}}</span>
                </p>
              </div>
            </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: "newslist",
        data(){
          return{
            arr:[]
          }
        },
        created(){
          this.$ajax.get("vue.php?title=newsList")
            .then(res=>{
              this.arr=res.data
            })
        }
    }
</script>

<style scoped lang="less">
  @rem : 750 /10rem;
  .mb{
    margin-bottom: 130/@rem;
  }
  #newsList{
    height: 100%;
    text-align: left;
    ul{
      li{
        padding: 25/@rem 0;
        border-bottom: 1px solid #ddd;
        a{
          display: flex;
          justify-content: center;
        }
        #pic{
          width: 110/@rem;
          height: 110/@rem;
          margin-right: 25/@rem;
        }
        #con{
          display: flex;
          flex-flow: wrap;
          width: 550/@rem;
          height: 110/@rem;
          align-content:space-between;
          color: #999;
          p{
            width:100%;
            h2{
              width:100%;
              font-size:30/@rem;
            }
            .fl{
              float: right;
            }
          }

        }


      }
    }
  }

</style>
