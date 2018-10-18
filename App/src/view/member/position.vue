<template>
    <div>
        <div class="search">
            <input type="text" v-model="keywords" @keyup="search(keywords)" placeholder="请输入位置关键词~">
            <i class="iconfont icon-search ac"></i>
        </div>
        <ul class="site-wrap" >
            <li class="site-li" v-for="(item,index) in siteList" @click="positionBack(item.name,item.address)">
                {{ item.name }}
                <p>{{ item.address }}</p>          
            </li>
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
            siteList:[],
        }
    },
    mounted(){
        this.$nextTick(()=>{
            let page_num = 0;
            mapUtil.getPosition((data)=>{
                let aa = data.citycode;
                let longitude = data.longitude;
                let latitude = data.latitude;

                mapService.getPoiList(page_num,latitude,longitude,(data2)=>{
                    this.siteList=data2.results;
                    page_num++;
                })
            })
            
        })
        
            // mapUtil.getPosition((position)=>{
            // this.site=position.publishaddresses;
                //position:{"publishaddresses":"安徽省池州市贵池区长江中路靠近中国银行(池州沿江支行)","latitude":30.663549,"longitude":117.482321,"publishstreet":"长江中路","streetnum":"30号","poiname":"中国银行(池州沿江支行)","citycode":"0566"}
            // });
    },
    methods:{
        search(keywords){
         
            let page_num = 0;

            mapUtil.getPosition((data)=>{
              
                let aa = data.citycode;
                let longitude = data.longitude;
                let latitude = data.latitude;

                mapService.getPoiList(page_num,latitude,longitude,keywords,(data2)=>{                    
                        this.siteList=data2.results;
                        page_num++;

                })
            })
        },
        positionBack(pn,pa){
            window.history.back();
            localStorage.position = pn;
            localStorage.selectedpublishaddress = pa;
        }
    },
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
    line-height: 22px;
}
.site-li{
    padding: 5px 0;
    border-bottom: 1px solid #eee;   
}
.site-li p{
    font-size: 10px;
    color: #aaa;
}
</style>