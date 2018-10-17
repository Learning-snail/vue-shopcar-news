<template>
  <div>
    <!--<head-nav title="结算购物车"></head-nav>-->

    <div class="shopArea mb">
      <div class="shop " v-for="(item,index) in shopList" :key="index">
        <div class="shopShow">
          <div class="pic ">
            <img :src="item.imgUrl" width="100%" height="100%" alt="">
          </div>
          <div class="des ">{{item.des}}</div>
        </div>

        <div class="buyNum ">
          <p class=" buyfont">{{item.symbol}} {{item.price}}</p>
          <p class="addNum ">
            <a href="javascript:;" class="reduce" @click="shopReduce(index)">-</a>
            <a href="javascript:;" class="num" >{{item.num}}</a>
            <a href="javascript:;" class="add" @click="shopAdd(index)">+</a>
          </p>
          <a href="javascript:;" class="del" @click="del(index)">删除</a>
        </div>
      </div>
      <div class="totalPrice">
        <div class="total">
          <p class="totalMoney">
            <span class="font">总计:</span> <span>￥ {{totalPrice.sum}}</span>
          </p>
          <p class="preferential">
            总金额￥{{totalPrice.sum }}优惠￥0.00
          </p>
        </div>
        <div class="goPayment">
          <span class="font">去结算</span><span class="num">{{totalPrice.num}}件</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import shopTools from '../common/shopTools'
  import connect from '../common/connect'
    export default {
        name: "shopcart",
        data() {
          return {
            shopList:[],
          }
        },
      created(){
          let shop=shopTools.get()
          let shopid=Object.keys(shop)
          let title = this.$route.query.title
          shopid.forEach(item=>{
            this.$ajax.get("vue.php?title="+title+item)
              .then(res=>{
                this.shopList.push(res.data);
                this.shopList.forEach(item=>{
                  this.$set(item,"num",shop[item.id])
                })
              })
          })
      },
      computed:{
        totalPrice(){
         let sum=0
         let num=0
         this.shopList.forEach(item=>{
           sum+=item.price*item.num
           num+=item.num
         })
         return {
           sum,
           num
         }
        }
      },
      methods:{
        shopReduce(index){
          if( this.shopList[index].num ){
            this.shopList[index].num--
            connect.$emit("addCart",-1)
            shopTools.add({
              id:this.shopList[index].id,
              num:-1
            })
          }

        },
        shopAdd(index){
          this.shopList[index].num++
          connect.$emit("addCart",1)
          shopTools.add({
            id:this.shopList[index].id,
            num:1
          })
        },
        del(index){
          let shops=this.shopList[index]
          shopTools.del(shops.id)
          connect.$emit("addCart",-shops.num)
          this.shopList.splice(index,1)
        },

      },
    }
</script>

<style scoped lang="less">
  @rem:750/10rem;
  .mb{
    margin-bottom: 130/@rem;
  }
  .shopArea{
    text-align: left;
    background: #fff;

    .location{
      font-size: 32/@rem;
      color: #ccc;
      padding: 10/@rem;
      padding: 20/@rem 55/@rem;
    }
    .shop{
      border-bottom: 1px solid #ddd;
      border-top: 1px solid #ddd;
      padding: 0 55/@rem;
      .shopShow{
        display: flex;
        justify-content: space-between;
        align-items: center;
        overflow: hidden;
        padding: 25/@rem 0;
        .pic{
          width: 200/@rem;
          height: 200/@rem;
        }
        .des{
          width: 400/@rem;
          font-size: 35/@rem;
        }
      }

      .buyNum{
        border-top: 1px solid #ddd;
        border-left: none;
        border-right: none;
        padding: 20/@rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .buyfont{
          font-size: 40/@rem;
        }
        .addNum{
          font-size: 40/@rem;
          a{
            width: 60/@rem;
            height: 60/@rem;
            background: #f1f1f1;
            display: inline-block;
            color: #878787;
            text-align: center;
            text-decoration: none;
          }
          a:active{
            background: #ddd;
          }
        }
        .del{
          color: skyblue;
          font-size: 40/@rem;
        }
      }
    }

    .totalPrice{
      height: 100/@rem;
      text-align: center;
      display: flex;
      justify-content: space-between;
      margin-top: 20/@rem;
      background: rgba(255,255,255,0.7);
      box-shadow: 0 -1px 2px #d7d7d7;
      /*align-items: center;*/
      .all{

        color: #999;
        font-size: 20/@rem;
        i{
          width: 40/@rem;
          height: 40/@rem;
          border-radius: 50%;
          background: #e93b3d;
        }
        i::after{
          content: '';
        }
      }
      .total{
        text-align: left;
        text-indent: 1em;
        p{
          height: 50%;
          font-size: 32/@rem ;
          line-height: 50/@rem;
          color: #999;
        }
        .totalMoney{
          color: #e4393c;
          font-weight: bold;
          .font{
            color: #333;
          }
        }
        .preferential{
          font-size: 18/@rem;
        }
      }
      .goPayment{
        width: 220/@rem;
        background: #e4393c;
        color: #fff;
        span{
          vertical-align: middle;
        }
        .font{
          font-size: 32/@rem;
        }
        .num{
          font-size: 23/@rem;
        }

      }
    }
  }

</style>
