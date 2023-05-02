<template>
  <div>
    <div class="modal-background"></div>
    <div class="modal-base">
      <!-- Modal content -->
      <div class="modal-content">
        <div class="orderHeader">
          <h1>50嵐</h1>
        </div>
        <div class="orderBody">
          <div class="item">
            <h2>訂購時間:</h2>
            <input type="text" />
          </div>
          <div class="item">
            <h2>預計到達時間:</h2>
            <input type="text" />
          </div>
          <div class="item">
            <h2>備註:</h2>
            <input type="text" />
          </div>
        </div>
        <div class="orderFooter">
          <button @click="addToCart">加入訂單</button>
          <button @click="closeWindow">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits('emitWindowOpen');
const closeWindow = () => {
  emit('emitWindowOpen', false);
};
</script>

<style lang="scss" scoped>
.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.4);
  transition: opacity 0.3s ease-in-out;
}
.modal-base {
  position: fixed; /* Stay in place */
  z-index: 100; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: hidden; /* Enable scroll if needed */
}
.modal-content {
  display: flex;
  flex-direction: column;
  background-color: #fefefe;
  margin: 10vh 5vh;
  padding: 10px 20px;
  border: 1px solid #888;
  border-radius: 0.5rem;
  height: 80vh;
  font-size: 1.1rem;
}
.orderHeader {
  height: 15%;
  text-align: center;
}
.orderBody {
  overflow: auto;
  height: 70%;
}
.orderBody-content {
  padding: 5px 0;
}
.orderBody-content h3 {
  padding: 5px 0;
}
.radioSelector_container {
  display: flex;
  justify-content: space-between;
}
.radioSelector input {
  margin: 0 5px 0 0;
}
.radioSelector div {
  padding-top: 5px;
}
.orderFooter {
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.orderFooter button {
  width: 80%;
  margin: 3px;
}
</style>
