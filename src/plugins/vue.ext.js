/* vue自定义插件方法 */
import moment from 'moment'
export default {
	install(Vue){

		/* 全局返回上一步 */
		Vue.prototype.back = () => {
			this.$router?this.$router.back():window.history.back()
		}

        /*格式化日期*/
        Vue.prototype.formatDate = (date) => {
            if(date){
                return moment(date).format('YYYY-MM-DD')
            }
        }

        /* @desc:格式化性别 */
        Vue.prototype.formatGender = (val) => {
            let arr = ['','男','女']
            if(val){
                return arr[val]
            }
        }

		/* 存储本地信息
		   格式：{"app":{"selected":"appIndex"}}
		   规则：如果没有则创建，有就更新 */
		Vue.prototype.setMsg=(url,name,msg)=>{
            if(sessionStorage.getItem(url) !== null){
                let Msg = JSON.parse(sessionStorage.getItem(url))
                Msg[name] = msg
                sessionStorage.setItem(url,JSON.stringify(Msg))
            }else{
                let Msg = {}
                Msg[name] = msg
                sessionStorage.setItem(url,JSON.stringify(Msg))
            }
        }

        /* 获取本地信息，返回结构为对象 */
        Vue.prototype.getMsg=(url,name)=>{
            if(sessionStorage.getItem(url) !== null){
                let Msg = JSON.parse(sessionStorage.getItem(url))
                return Msg[name]
            }else{
                return null;
            }
        }

        /* 获取cookie */
        Vue.prototype.getCookie=(name) =>{
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if (parts.length == 2) return parts.pop().split(";").shift();
        }

        /* 设置cookie,用于本地调试 */
        Vue.prototype.initCookie = () => {
            let body = {
                headimgurl:'http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoydrbmKaIwaoQhlpallLfohKBKofPrDdWNwsA8yAPG1jAoo6mKDGnUAjWl3HM35cOibdMC13c0Tmw/0',
                nickname:'%E5%8F%91%E5%8F%91%E5%91%86%E5%93%9F;',
                openid:'oYTI41fq6Qc1zfNcmD2KXMh2h32Q',
                sid:'pMfqD6aCNTzKGQAWPhxExldOeY1uD07V',
                wxconfig:'wx31402a79b03c8279|1510125383|10d26a806fd526b2fced92cec79652df|9bc19c94781e156458b1ba4dc09a0a902cc5bc19'
            }
            for(let param in body){
                document.cookie = param+'='+body[param]
            } 
        }

        /* @desc:根据对象属性排序 */
        Vue.prototype.sortByAttr = (property) => {
            return function(a,b){
                var value1 = a[property];
                var value2 = b[property];
                return value1 - value2;
            }
        }

        /* @desc:拆分key-value */
        Vue.prototype.objToky = (obj) => {
            let res = []
            for(let key in obj){
                res.push({key:key,value:obj[key]})
            }
            return res
        }

        //配置微信jssdk
        Vue.prototype.configWxjssdk = () =>{
            let arr = getCookie('wxconfig').split('|')
            let wx_info = {
                appid:arr[0],
                timestamp:arr[1],
                nonce:arr[2],
                signature:arr[3]
            }
            configWxSdk(wx_info)

            function getCookie(name){
                var value = "; " + document.cookie;
                var parts = value.split("; " + name + "=");
                if (parts.length == 2) return parts.pop().split(";").shift();
            }

            function configWxSdk(wxConfig){
                wx.config({
                    debug: false,
                    appId: wxConfig.appid,
                    timestamp: parseInt(wxConfig.timestamp),
                    nonceStr: wxConfig.nonce,
                    signature: wxConfig.signature,
                    jsApiList: [
                        'getLocation',
                        'openLocation',
                        'chooseImage',
                        'scanQRCode',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'hideMenuItems',
                        'previewImage',
                        'uploadImage',
                        'chooseWXPay'
                    ]
                });
            }
        }
	}
}