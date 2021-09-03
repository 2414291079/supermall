// import { Promise } from "core-js/fn/promise";
import { ADD_CARTCOUNT, ADD_CARTLIST } from "./mutations_type";
export default{
  addCart(context,payload){
    return new Promise((resolve,reject)=>{
      let oldProduct=context.state.cartList.find(item=>item.iid===payload.iid)
      if(oldProduct){
        context.commit(ADD_CARTCOUNT,oldProduct)
        resolve('当前的商品数量加1')
      }else{
        context.commit(ADD_CARTLIST,payload)
        resolve('添加购物车成功')
      }
    })
  }
}