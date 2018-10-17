<template>
    <div class="mb">
      <hd-Nav title="图文分享"></hd-Nav>
      <div class="tabItem">
        <p v-for="(item,index) in shareNav" :key="index" v-text="item.title" @click="getImgs(item.tip)" :class="item.id===1?'active':''"></p>
      </div>
      <div class="conList" :class="'show'">
      <ul>
          <li v-for="(item,index) in womanStar" :key="index">
            <router-link :to="{name:'photo.details',query:{id:item.id, title:item.tip}}">
              <div class="pic">
                <img :src="item.picUrl" v-lazy="item.picUrl" alt="" width="100%" height="100%">
              </div>
              <div class="con">
                <h2 v-text="item.title"></h2>
              </div>
            </router-link>
          </li>
      </ul>
      </div>
      <div class="conList">
      <ul>
          <li v-for="(item,index) in manStar" :key="index">
            <router-link :to="{name:'photo.details',query:{id:item.id, title:item.tip}}">
            <div class="pic">
              <img :src="item.picUrl" v-lazy="item.picUrl" alt="" width="100%" height="100%">
            </div>
            <div class="con">
              <h2 v-text="item.title"></h2>
            </div>
            </router-link>
          </li>
      </ul>
    </div>
      <div class="conList">
  <ul>
          <li v-for="(item,index) in fullView" :key="index">
            <router-link :to="{name:'photo.details',query:{id:item.id, title:item.tip}}">
            <div class="pic">
              <img :src="item.picUrl" v-lazy="item.picUrl" alt="" width="100%" height="100%">
            </div>
            <div class="con">
              <h2 v-text="item.title"></h2>
            </div>
            </router-link>
          </li>
      </ul>
  </div>

  </div>
</template>

<script>
    export default {
        name: "photolist",
        data(){
          return {
            shareNav:[],
            womanStar:[],
            manStar:[],
            fullView:[],
          }
        },
      created(){
          this.$ajax.get("vue.php?title=shareNav")
            .then(res=>{
              this.shareNav=res.data
              this.getImgs("womanStar")
            })
      },
      methods:{
        getImgs(title){
          this.$ajax.get("vue.php?title="+title)
            .then(res=>{
              this[title]=res.data
              this.classChange()
            });
    },
        classChange(){
          let aP = document.querySelectorAll(".mb .tabItem p")
          let aDiv = document.getElementsByClassName("conList")
          for (let i = 0, length = aP.length; i < length; i++) {
            aP[i].i = i
            aP[i].onclick = function () {
              for (let j = 0, length = aDiv.length; j < length; j++) {
                aP[j].className=''
                aDiv[j].style.display='none'
              }
              this.className='active'
              aDiv[this.i].style.display='block'
            }
          }

        }
      }

    }
</script>

<style scoped lang="less">
  @rem:750 / 10rem;
  .mb{
    margin-bottom: 130/@rem;
  }
  .tabItem{
    display: flex;
    font-size:30/@rem;
    p{
      flex:1;
      color: #26a2ff;
      padding: 30/@rem 0;
    }
    p.active{
      border-bottom: 3px solid #26a2ff;
      color: #000;
    }
  }
  .conList{
    display: none;
    ul li{
      padding: 25/@rem 0;
      border-bottom: 1px solid #ddd;
      a{
        display: flex;
        justify-content: center;
        .pic{
          width: 110/@rem;
          height: 110/@rem;
          margin-right: 25/@rem;
        }
        .con{
          width: 550/@rem;
          height: 110/@rem;
          display: flex;
          align-items: center;
        }
        h2{
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: #555;
          font-weight: normal;
          font-size: 25/@rem;
        }

      }
    }
  }
  .conList.show{
    display:block
  }


</style>
