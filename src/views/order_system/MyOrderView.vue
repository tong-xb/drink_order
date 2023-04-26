<template>
  <div class="myOrder_container">
    <div class="select_container">
      <select name="" id="">
        全部
      </select>
    </div>

    <div class="order_container">
      <div class="order_container_title">
        <h1>50嵐</h1>
        <p>4/19 (三) 13:30</p>
        <a>></a>
      </div>
      <p>預計送達時間: 4/19 (三) 13:30</p>
      <div class="order_container_content">
        <div class="left"><a>1</a></div>
        <div class="middle">
          <p class="name">茉莉綠茶</p>
          <p class="customize">微糖 微冰</p>
        </div>
        <div class="right">
          <p>$30</p>
        </div>
      </div>
      <div class="order_container_footer">
        <div class="total_container">
          <div class="total">$30</div>
        </div>
        <div class="button_container">
          <button>刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.select_container {
  height: 30px;
}
.myOrder_container {
  padding: 20px;
  max-width: 450px;
}
.myOrder_container select {
  margin-bottom: 20px;
  float: right;
}
.order_container {
  padding: 10px 20px;
  border: #939393 solid 2px;
  border-radius: 15px;
}
.order_container h1 {
  margin: 15px 0;
}
.order_container_title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.order_container p {
  padding: 0;
}
.order_container_content {
  display: flex;
  padding: 20px 0 10px 0;
}
.order_container_content .left {
  width: 5%;
}
.order_container_content .left a {
  background-color: #d3d3d3;
  padding: 2px;
}
.order_container_content .middle {
  width: 80%;
  display: flex;
  flex-direction: column;
  padding: 0;
}
.order_container_content .right {
  width: 15%;
}
.name {
  font-size: larger;
  font-weight: bold;
}
.customize {
  color: #939393;
}
.order_container_footer .total {
  width: 15%;
  float: right;
}
.total_container {
  border-top: #939393 solid 1px;
  padding-top: 10px;
  height: 50px;
}
.button_container {
  display: flex;
  justify-content: center;
}
</style>
