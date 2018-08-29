<template>
	<div>
		<div class="search">
			<input type="text" v-model="keywords" @keyup="search(keywords)" placeholder="请输入搜索关键词~">
			<i class="iconfont ac">&#xeafe;</i>
		</div>
        <ul class="site-wrap" v-show="searchSiteList.length==0">
            <li class="site-li" v-for="item in siteList">{{ item.address }}</li>
        </ul>
        <ul class="site-wrap" v-show="searchSiteList.lengt!=0">
            <li class="site-li" v-for="item in searchSiteList">{{ item.address }}</li>
        </ul>
	</div>
</template>

<script>
import mapUtil from '@/service/util/mapUtil'
import mapService from '@/service/mapService'
export default{
    data(){
        return {
            keywords:'',
            searchSiteList:[],
            siteList:[
                {
                    id:0,
                    address:"安徽省池州市chrome江中路靠近中国银行(池州沿江支行)",
                },
                {
                    id:0,
                    address:"goole(池州沿江支行)",
                },
                {
                    id:0,
                    address:"安徽省池州baidu区长江中路靠近中国银行(池州沿江支行)",
                },
                {
                    id:0,
                    address:"安徽省池州市直击真相长江中路靠近中国银行(池州沿江支行)",
                },
                {
                    id:0,
                    address:"安徽省池州市君越长江中路靠近中国银行(池州沿江支行)",
                },
                {
                    id:0,
                    address:"安徽省池州市贵池区长江中路靠近中国银行(池州沿江支行)",
                },
                {
                    id:0,
                    address:"安徽省池州市贵池区长江中路靠近中国银行(池州沿江支行)",
                }

            ]
        }
    },
    mounted(){
            var page_num = 0;

            mapUtil.getPosition((data)=>{
                let aa = data.citycode;
                let longitude = data.longitude;
                let latitude = data.latitude;

                mapService.getPoiList(page_num,latitude,longitude,(data2)=>{
                        console.log(data2);
                        page_num++;

                })
            })
            // mapUtil.getPosition((position)=>{
            // this.site=position.publishaddresses;
                //position:{"publishaddresses":"安徽省池州市贵池区长江中路靠近中国银行(池州沿江支行)","latitude":30.663549,"longitude":117.482321,"publishstreet":"长江中路","streetnum":"30号","poiname":"中国银行(池州沿江支行)","citycode":"0566"}
            // });
    },
    methods:{
        search(keywords){
            // if (keywords) {
            //     this.searchSiteList=[];
            //     for (var i = 0,len = this.siteList.length; i < len; i++) {
            //         if (this.siteList[i].address.match(keywords)) {
            //             this.searchSiteList.push(this.siteList[i]);
            //         }
            //         console.log(this.siteList[i].address.match(keywords))
            //     }
            //      console.log(this.searchSiteList.length)

            // }else{
            //     this.searchSiteList.length=0;
            //     console.log(this.searchSiteList.length!=0)
            // }
        }
    },
    computed:{
        searchSiteList:function(){
            if (keywords) {
                this.searchSiteList=[];
                for (var i = 0,len = this.siteList.length; i < len; i++) {
                    if (this.siteList[i].address.match(keywords)) {
                        this.searchSiteList.push(this.siteList[i]);
                    }
                    console.log(this.siteList[i].address.match(keywords))
                }
                 console.log(this.searchSiteList.length)

            }else{
                this.searchSiteList.length=0;
                console.log(this.searchSiteList.length!=0)
            }
        }
    }
}
</script>

<style rel="stylesheet" scoped>
.search{
    position: relative;
    margin: 10px;
    line-height: 34px;
}
.search input {
    width: 100%;
    line-height: 2.3em;
    border-radius: 8px;
    vertical-align: baseline;
    text-indent: 2%;
    border: 1px solid #ddd;
}
.search i {
    color: #999;
    position: absolute;
    top: 0;
    right: 0;
    font-size: 24px;
    width: 30px;
}
.site-wrap{
    padding:0 10px;
    background: #fff;
    line-height: 32px;
}
.site-li{
    padding: 5px 0;
    border-bottom: 1px solid #eee;   
}
</style>