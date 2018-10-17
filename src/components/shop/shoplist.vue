<template>
  <div class="mb">
<hd-Nav title="商品列表"></hd-Nav>
    <div class="shoplist">
      <ul>
        <li v-for="(item,index) in shopList" :key="index">
          <router-link :to="{name:'shop.details' , query:{title:'likeYou',id:(index+1)}}">
          <img :src="item.imgUrl" alt="">
          <p v-text="item.des" class="con"></p>
          <div class="text">
          <span class="sym">{{item.symbol}}</span>
          <span >{{item.price}}</span>
          </div>
          <div class="paid">
            <p v-text="item.alreadyPaid"></p>
          </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: "shoplist",
        data(){
          return{
            shopList:[]
          }
        },
      created(){
          this.$ajax.get("vue.php?title=likeYou")
            .then(res=>{
              this.shopList=res.data;
            })
      }
    }
</script>

<style scoped lang="less">
  @rem:750/10rem;
  .mb{

    margin-bottom: 130/@rem;
  }
  .shoplist{
    margin-top: 30/@rem;
    background: #eee;
    ul{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li{
        position:relative;
        overflow: hidden;
        width: 370/@rem;
        height: 528/@rem;
        margin-bottom: 10/@rem;
        background-color: #fff;
        font-size: 27/@rem;
        img{
          width:100%;
          height: 358/@rem;
        }
        p.con{
          padding:0 20/@rem;
          margin: 20/@rem 0;
          height: 70/@rem;
          overflow: hidden;
          text-overflow: ellipsis;
          max-height: 64/@rem;
          -webkit-line-clamp: 2;
          word-break: break-all;
          line-height: 35/@rem;
          color: rgb(51, 51, 51);
        }
        .text{
          position: absolute;
          bottom: 0;
          left: 0;
          color: red;
        }
        .paid{
          position: absolute;
          bottom: 0;
          right: 0;
          color:#ccc
        }

      }
    }
  }





</style>
