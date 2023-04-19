<template>
  <div ref="infoCard" :class="'info-card ' + props.classStyle">
    <div class="card-header" v-if="$slots.header">
      <slot name="header"></slot>
    </div>
    <div class="card-body" v-if="$slots.body">
      <slot name="body"></slot>
    </div>
    <div class="card-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  classStyle: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss" scoped>
.info-card {
  box-shadow: 0px 2px 4px #c5c5c5;
  margin: 15px;
  border-radius: 10px;
  font-size: 1em;
  line-height: 1.425em;
  &.full {
    display: inline-block;
    .card-header {
      margin-left: 0;
      margin-right: 0;
    }
  }
  &.card-white {
    background: #fff;
    color: black;
    width: -webkit-fill-available;
  }
  .card-header {
    padding-top: 15px;
    padding-bottom: 8px;
    margin-left: 15px;
    margin-right: 15px;
    border-bottom: #959595 solid 1px;
    font-size: 1.1em;
    align-items: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .card-item {
      padding-top: 8px;
      div {
        white-space: nowrap;
      }
    }
  }

  .card-body {
    padding-bottom: 15px;
    margin-left: 15px;
    .item {
      padding-top: 8px;
      padding-right: 15px;
      div {
        white-space: nowrap;
      }
    }
  }
  .card-footer {
    padding-top: 8px;
    padding-bottom: 15px;
    margin-left: 15px;
    margin-right: 15px;
    border-top: #959595 solid 1px;
  }
}

.two-rows {
  display: grid;
  grid-template-columns: 50% 50%;
  text-align: left;
}
</style>
