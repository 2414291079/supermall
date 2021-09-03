import { ADD_CARTCOUNT, ADD_CARTLIST} from "./mutations_type";
export default{
  [ADD_CARTCOUNT](state,payload){
    payload.count+=1
    console.log(payload.count);
  },
  [ADD_CARTLIST](state,payload){
    payload.checked=true
    payload.count=1
    state.cartList.push(payload)
  }
}