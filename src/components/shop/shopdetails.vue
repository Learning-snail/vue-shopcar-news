<template>
    <div class="mb">
      <hd-Nav>商品详情</hd-Nav>
      <div class="details">
        <img :src="shoplist.imgUrl" alt="" width="80%" height="100%" v-lazy="shoplist.imgUrl">
        <p v-text="shoplist.des" class="des"></p>
        <p class="price">
          <span v-text="shoplist.symbol"></span>
          <span v-text="shoplist.price"></span>
        </p>
        <p class="courier">快递：包邮
          <span v-text="shoplist.alreadyPaid"></span>
        </p>
      </div>
      <div class="buyNum clearFix">
        <p class="buy">购买数量</p>
        <p class="addNum">
          <a href="javascript:;" @click="reduce">-</a>
          <a href="javascript:;">{{num}}</a>
          <a href="javascript:;" @click="add">+</a>
        </p>
      </div>
        <div class="buy">
          <a href="javascript:;" class="addCart" @click="addCart">加入购物车</a>
          <router-link :to="{name:'shopcart',query:{title:'likeYou'}}" class="nowBuy" >立即购买</router-link>
        </div>
    </div>
</template>

<script>
  import connect from '../common/connect'
  import shopToots from '../common/shopTools'
    export default {
        name: "shopdetails",
      data(){
          return {
            shoplist:{},
            num:0
          }
      },
      created(){
          let id = this.$route.query.id
          let title = this.$route.query.title
          this.$ajax.get("vue.php?title="+title+id)
            .then(res=>{
              res.data[id]=id;
              this.shoplist=res.data;
            })
      },
      methods:{
        addCart(){
          connect.$emit("addCart",this.num)
          shopToots.add({
            id:this.$route.query.id,
            num:this.num
          })
        },
          add(){
            this.num++
          },
        reduce(){
            if( this.num<=0 )return
          this.num--

        }
      }
    }
</script>

<style scoped lang="less">
  @rem:750/10rem;
  .mb{
    margin-bottom: 130/@rem;
    .details{
      margin-top: 30/@rem;
      padding: 0 50/@rem;
      border-bottom: 1px solid #e7e7e7;
      .des{
        font-size: 33/@rem;
        margin-bottom: 30/@rem;
      }
      .price{
        font-size: 35/@rem;
        color:red;
        text-align: left;
      }
      .courier{
        font-size: 30/@rem;
        color: #ccc;
        text-align: left;
        span{
          float: right;
        }
      }
    }
    .buyNum{
      padding: 0 50/@rem;
      .buy{
        float: left;
        font-size: 40/@rem;
      }
      .addNum{
        float: right;
        font-size: 40/@rem;
        padding-top: 10/@rem;
        a{
          width: 60/@rem;
          height: 60/@rem;
          background: #f1f1f1;
          display: inline-block;
          color: #878787;
          text-align: center;
          text-decoration: none;
        }
      }
    }
    .buy{
      display: flex;
      height: 96/@rem;
      padding: 0 50/@rem;
      text-align: center;
      line-height: 96/@rem;
      a{
        flex: 1;
        color: white;
        font-size: 31/@rem;
        text-decoration: none;
      }
      .addCart{
        background: #ff9402;
      }
      .nowBuy{
        background: #ff5000;
      }
    }

  }

</style>
