let shopTools={}
let shop = JSON.parse(window.localStorage.getItem("shopinfo")||"{}")
//添加
shopTools.add=function(goods){
 if( shop[goods.id] ){
     shop[goods.id]+=goods.num
 }else{
   shop[goods.id]=goods.num
 }
 this.save(shop)
}

// 删除
shopTools.del = function (id) {
  delete shop[id]
  this.save(shop)
}

//获得
shopTools.get = function () {
  return JSON.parse(window.localStorage.getItem("shopinfo")||"{}")
}

//获取总数
shopTools.countNum = function () {
  let sum=0
  for (let id in shop) {
    sum+=shop[id]
  }
  return sum

}

//保存
shopTools.save =function () {
  window.localStorage.setItem("shopinfo",JSON.stringify(shop))
}
export default shopTools
