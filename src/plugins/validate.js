import Vue from "vue";
import VeeValidate from "vee-validate";
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate);

VeeValidate.Validator.localize('zh_CN',{
    messages:{
        ...zh_CN.messages,
        is:(field)=>`${field}必须与密码相同}`  
    },
    attributes:{  //给校验的属性起别名
        phone:'手机号',
        code:'验证码',
        password:'密码',
        password1:'确认密码',
        agree:'协议'
    }
})

VeeValidate.Validator.extend('tongyi',{
    validate:value=>{
        return value
    },
    getMessage:field=>field+'必须同意'
})