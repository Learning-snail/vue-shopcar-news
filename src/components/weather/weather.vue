<template>
    <div class="weather">
        <div class="title" >{{cityInfo.c9}} {{cityInfo.c7}}</div>
        <div class="time">
          <ul class="top">
            <li>
              <p>{{cityInfo.c7}}</p>
              <div>
                <p id="mouth">十月</p>
                <p id="day">20</p>
              </div>
            </li>
            <li >
              <p id="time">16:57:30</p>
              <p id="year">2018年10月20日</p>
              <p id="week">星期四</p>
            </li>
          </ul>
          <ul class="bottom">
            <li>
              <p class="week">周{{nowDay.week}}(实时)</p>
              <p>{{nowDay.mouth}}{{nowDay.day}}</p>
              <div>
                <img :src=now.weather_pic alt="" width="100%" height="100%">
              </div>
              <p> {{now.temperature}} °C</p>
              <p>{{now.weather}}</p>
              <p>{{now.wind_direction}}</p>
              <p>{{now.sd}}</p>
            </li>
            <li>
              <p class="week">周{{Tomorrow.week}}</p>
              <p>{{Tomorrow.mouth}}{{Tomorrow.day}}</p>
              <div>
                <img :src=f2.day_weather_pic alt="" width="100%" height="100%">
              </div>
              <p> {{f2.night_air_temperature}} ~ {{f2.day_air_temperature}} °C</p>
              <p>{{f2.day_weather}}</p>
              <p>{{f2.day_wind_direction}}</p>
              <p>降水概率 {{f2.jiangshui}}</p>
            </li>
            <li>
              <p class="week">周{{twoTomorrow.week}}</p>
              <p>{{twoTomorrow.mouth}}{{twoTomorrow.day}}</p>
              <div>
                <img :src=f3.day_weather_pic alt="" width="100%" height="100%">
              </div>
              <p> {{f3.night_air_temperature}} ~ {{f3.day_air_temperature}} °C</p>
              <p>{{f3.day_weather}}</p>
              <p>{{f3.day_wind_direction}}</p>
              <p>降水概率 {{f3.jiangshui}}</p>
            </li>

          </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "weather",
      data(){
          return {
            f1:{},
            f2:{},
            f3:{},
            now:{},
            cityInfo:{},
            nowDay:{},
            Tomorrow:{},
            twoTomorrow:{}
          }
      },
       created(){
          let arrDay=[this.nowDay,this.Tomorrow,this.twoTomorrow]
          let day=['天','一','二','三','四','五','六','七','八','九','十','十一','十二']
          let date = new Date
         arrDay.forEach((item,index)=>{
            item["day"] =date.getDate()+index+'天'
            item["mouth"] = date.getMonth()+1+'月'
           item["week"] = day[date.getDay()+index%7]
           }
         )
         let timePlay = ()=> {
           let date = new Date
           this.$jq('#time').html(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds())
           this.$jq('#year').html(date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDate()+"日")
           this.$jq('#week').html("星期"+day[date.getDay()])
           this.$jq('#month').html(day[(date.getMonth()+1)] + '月');
           this.$jq('#day').html(date.getDate());
         }
         setInterval(timePlay,1000)
         timePlay()

         function formatterDateTime() {
           var date=new Date()
           var month=date.getMonth() + 1
           var datetime = date.getFullYear()
             + ""
             + (month >= 10 ? month : "0"+ month)
             + ""
             + (date.getDate() < 10 ? "0" + date.getDate() : date
               .getDate())
             + ""
             + (date.getHours() < 10 ? "0" + date.getHours() : date
               .getHours())
             + ""
             + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
               .getMinutes())
             + ""
             + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
               .getSeconds());
           return datetime;
         }
         this.location = '天津';
         this.$jq.ajax({
           type: 'post',
           url: 'http://route.showapi.com/9-2',
           dataType: 'json',
           data: {
             "showapi_timestamp": formatterDateTime(),
             "showapi_appid": 37928,
             "showapi_sign": 'd0ca1605e19241c38849c3fb9a56b447',
             "area":this.location,
           },

           error: function(XmlHttpRequest, textStatus, errorThrown) {
             console.log("操作失败!");
           },
           success: (result)=> {
             //console.log(result.showapi_res_body)
              this.cityInfo = result.showapi_res_body.cityInfo;
              this.now = result.showapi_res_body.now;
             this.f1 = result.showapi_res_body.f1;
             this.f2 = result.showapi_res_body.f2;
             this.f3 = result.showapi_res_body.f3;
           }
         });
       }
    }
</script>

<style scoped lang="less">
  @rem : 750/10rem;
  .weather{
    height:100%;
    background: -webkit-linear-gradient(
      top,
      #394984,
      #edb46d
    ) !important;
      .title{
        font-size: 30/@rem;
        color: #fff;
      }
      .time{
        height: 400/@rem;
        ul.top{
          display:flex;
          margin:30/@rem 0 30/@rem 150/@rem;
          color: #fff;
          font-size: 30/@rem;
          li{
            margin-right: 20/@rem;
            border: 1/@rem solid rgba(255,255,255,0.1);

            div{
              width:40px;
              height:43px;
              background-color: red;
            }
          }
        }
        ul.bottom{
          display:flex;
          color: #fff;
          font-size: 30/@rem;
          li{
            border: 1/@rem solid rgba(255,255,255,0.1);
          }
        }
      }

  }


</style>
