<template>
<div id="Unknown404">
    <h2>您要找的页面不存在...</h2>
    <router-link to="/">返回首页</router-link>
</div>

</template>
<style lang="less" scoped>
#Unknown404{
    flex: 1;
    position: relative;
    h2{
        text-align: center;
        margin: 10px 0 50px;

    }
    a{
        position: absolute;
        left: 50%;
        top: 50px;
        transform: translate(-50%);
        
    }
}
</style>