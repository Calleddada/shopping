import { reqCartList,reqDeleteCartById,reqUpdateCheckedById } from "@/api"

const state = {
    cartList:[]
}
const mutations = {
    GETCARLIST(state,cartList){
        state.cartList = cartList
    }
}
const actions = {
    async getCartList({commit}){
        let result = await reqCartList()
        // console.log(result);
        if(result.code == 200){
            commit('GETCARLIST',result.data)
        }
    },

    async deleteCartListBySkuId({commit},skuId){
        let result = await reqDeleteCartById(skuId)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },

    async updateCheckedById({commit},{skuId,isChecked}){
        let result = await reqUpdateCheckedById(skuId,isChecked)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },

    deleteAllCheckedCart({dispatch,getters}){
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item=>{
           let promise = item.isChecked==1?dispatch('deleteCartListBySkuId',item.skuId):''
           PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    },

    upDataAllCartChecked({dispatch,state},isChecked){
        let PromiseAll = []
        state.cartList[0].cartInfoList.forEach(item=>{
           let promise = dispatch('updateCheckedById',{skuId:item.skuId,isChecked})
           PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    }
}
const getters = {
    cartList(state){
        return state.cartList[0]||{}
    },
    
}

export default{
    state,
    actions,
    mutations,
    getters
}