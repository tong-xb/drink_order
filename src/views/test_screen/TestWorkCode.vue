<template>
  <div>idNO:</div>
  <input v-model="idNum" />
  <div>workCode:</div>
  <input v-model="workCode" placeholder="workCode" />
  <div>post json:</div>
  <div>
    <div>
      <input v-model="postKey" placeholder="key" />
      <input v-model="postValue" placeholder="value" />
      <button @click="addKeyValue">確認</button>
      <button @click="clearObject">清除</button>
    </div>
    <div>
      <pre>{{ myJson }}</pre>
    </div>
  </div>
  <br />
  <button @click="testApi">測試</button>

  <div class="json" ref="jsonContainer"></div>
</template>

<script setup>
import fodoAppRequest from '@/api/axios/fidoAppRequest';
import { useUserStore } from '@/stores/user';
import { ref, reactive, computed } from 'vue';

const userStore = useUserStore();

const jsonContainer = ref(null);

const idNum = ref('');
const workCode = ref('');
const response = reactive({});

const jsonData = reactive({});
const postKey = ref('');
const postValue = ref('');
const keyValueData = reactive({});

function addKeyValue() {
  if (postKey.value) {
    keyValueData[postKey.value] = postValue.value;
    Object.assign(jsonData, keyValueData);
  }

  postKey.value = '';
  postValue.value = '';
  Object.keys(keyValueData).forEach((key) => {
    delete keyValueData[key];
  });
}

function clearObject() {
  Object.keys(jsonData).forEach((key) => {
    delete jsonData[key];
  });
}

const myJson = computed(() => JSON.stringify(jsonData, null, 2));

const testApi = async () => {
  jsonContainer.value.innerHTML = '';
  if (idNum.value) {
    const initRes = await fodoAppRequest.post('?workCode=overviewInit', { idNo: idNum.value });
    userStore.seId = initRes.data.RsData.seid;
  }

  const res = await fodoAppRequest.post(`?workCode=${workCode.value}`, jsonData);
  Object.assign(response, { ...res.data });

  jsonContainer.value.appendChild(jsnview(response));
};

function jsnview(data, opts) {
  function getType(value) {
    return Number(value) === value && value % 1 != 0
      ? 'float'
      : {}.toString
          .call(value)
          .match(/\s([a-zA-Z]+)/)[1]
          .toLowerCase();
  }
  function createElement(tag) {
    return document.createElement(tag);
  }
  let options = {
    showLen: true,
    showType: true,
    showBrackets: true,
    showFoldmarker: true,
    colors: { boolean: '#ff2929', null: '#ff2929', string: '#690', number: '#905', float: '#002f99' },
  };
  options = { ...options, ...opts };
  function createList(data, parent = null, isArray = false) {
    for (const key in data) {
      const li = createElement('li');
      const value = data[key];
      const isValueArray = Array.isArray(value);
      if ((value && typeof value === 'object' && value.constructor.name === 'Object') || isValueArray) {
        let isClosed = false;
        const foldSpan = createElement('span');
        foldSpan.classList.add('fold', 'open');
        foldSpan.setAttribute('data-before', '▾');
        foldSpan.setAttribute('data-close', '▸');
        if (options.showFoldmarker) {
          foldSpan.setAttribute('data-after', '↔');
        }
        foldSpan.textContent = options.showBrackets ? (isArray ? '' : `"${key}": `) + (isValueArray ? '[' : '{') : '';
        li.appendChild(foldSpan);
        if (options.showLen) {
          const lenSpan = createElement('span');
          const len = isValueArray ? value.length : Object.keys(value).length;
          lenSpan.classList.add('len');
          lenSpan.textContent = `{${len}}`;
          li.appendChild(lenSpan);
        }
        const ul = createElement('ul');
        li.appendChild(ul);
        if (isValueArray) {
          const innerUl = createElement('ul');
          for (let i = 0; i < value.length; i++) {
            createList(value[i], innerUl, true);
          }
        }
        createList(value, ul, isValueArray);
        foldSpan.onclick = () => {
          isClosed = !isClosed;
          foldSpan.parentElement.querySelector('ul').style.display = isClosed ? 'none' : 'block';
          foldSpan.classList.add(isClosed ? 'close' : 'open');
          foldSpan.classList.remove(isClosed ? 'open' : 'close');
        };
        const closeFoldSpan = createElement('span');
        closeFoldSpan.classList.add('fold');
        closeFoldSpan.textContent = options.showBrackets ? (isValueArray ? ']' : '}') : '';
        li.appendChild(closeFoldSpan);
        parent.appendChild(li);
      } else {
        const valueSpan = createElement('span');
        const typeSpan = createElement('span');
        const type = getType(value);
        valueSpan.style.color = options.colors[type];
        valueSpan.textContent = isNaN(value) ? `"${value}"` : value;
        li.textContent += isArray ? '' : `"${key}": `;
        li.appendChild(valueSpan);
        if (options.showType) {
          typeSpan.classList.add('type');
          typeSpan.textContent = `(${type})`;
          li.appendChild(typeSpan);
        }
        parent.appendChild(li);
      }
    }
    return parent;
  }
  const ul = createElement('ul');
  ul.classList.add('jsv');
  createList({ data }, ul, true);
  return ul;
}
</script>

<style lang="scss" scoped>
.json {
  :deep(.jsv ul) {
    padding: 0 0 0 10px;
    margin-left: 5px;
    border-left: 1px dotted #888;
  }
  :deep(.jsv li, .jsv ul) {
    list-style: none;
  }
  :deep(.jsv) {
    margin: 0;
    padding: 0;
    border: 0;
  }
  :deep(.fold) {
    cursor: pointer;
  }
  :deep(.close:after, .close:before, .open:before) {
    font-family: arial;
    font-size: 20px;
    margin-right: 7px;
    cursor: pointer;
  }
  :deep(.open:before) {
    content: attr(data-before);
    display: inline-block;
  }
  :deep(.close:before) {
    content: attr(data-close);
  }
  :deep(.close:after) {
    content: attr(data-after);
    font-size: 20px;
    margin-left: 7px;
  }
  :deep(.len, .type) {
    margin-left: 5px;
  }
  :deep(.close:after, .close:before, .len, .open:before, .type) {
    color: #888;
  }
}
</style>
