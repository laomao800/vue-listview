<template>
  <div class="demo-box">
    <header class="demo-box__header">
      <div class="demo-box__tabs">
        <div
          class="demo-box__tab"
          :class="{ 'demo-box__tab--active': activeCode }"
          @click="activeCode = !activeCode"
        >
          <i :class="`db-icon db-icon-code`"/> 查看代码
        </div>

        <div v-if="codesandbox" class="demo-box__tab demo-box__link demo-box__link--codesandbox">
          <a target="_blank" :href="codesandbox">
            <i :class="`db-icon db-icon-codesandbox`"/> Code Sandbox
          </a>
        </div>
      </div>
    </header>

    <div class="demo-box__content">
      <div v-if="$slots.demo" v-show="!activeCode" key="demo" ref="demo" class="demo-box__demo">
        <slot name="demo"/>
      </div>
      <div v-if="$slots.code" v-show="activeCode" key="code" ref="code" class="demo-box__code">
        <slot name="code"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    codesandbox: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      activeCode: false
    }
  }
}
</script>

<style lang="less">
.demo-box {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 10px;
    padding-left: 10px;
    overflow: hidden;
    background: #fafafa;
    border-bottom: 1px solid #efefef;
  }

  &__tabs {
    display: flex;
    float: left;
  }

  &__tab {
    padding: 10px 20px;
    line-height: 26px;
    color: #7d7d7d;
    cursor: pointer;
    border-radius: 5px 5px 0 0;
    transition: all 0.2s ease;
    transform: translate(0);

    a {
      padding: 10px 20px;
      margin: -10px -20px;
      color: #009efb;
      text-decoration: none !important;
    }

    .db-icon {
      // font-size: 20px;
    }

    &--active {
      background: #fff;
      box-shadow: 0 -4px 15px 0 rgba(0, 0, 0, 0.08);
      transform: translateY(5px);
    }

    &:not(&--active):hover {
      transform: translateY(2px);
    }
  }
}
</style>

<style>
@font-face {
  font-family: 'db-icon';
  src: url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAANMAAsAAAAAB1gAAAL9AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDBgqCOIIWATYCJAMMCwgABCAFhG0HPRtjBsiusCnDvYggNoxjQxBdr/OzCTyCeIgfw737/yaiScQQ7aSxhHlIJIgkQiU1SqWaVdrkUlfuM7earxBQZ698PtKNrAfiMFbE03OX8qlKlzQMafS5nDVWz7M77Jy65f6fw6VND8P525bL3AMD6sUBBbQ3RpEVyAn6LcOrLtXpnXxOoNWkBC43qho6wFui6wLxStcoeGcCUorpZqGx4miOxAEPzeVd+YX3we/jr43wpmio6NZbTypVKPkZvVYXzt8Y8BCE49kgnqJiCUjiTqXjmFuUWOKmVZe5G/WgUQplrPD5OYHAkDWyf3gUQTSipe1gjuiKkxI6bAp/iM76lQoa0YTbwGuC7a+qcqA7ws+TXvMw5tJWJLuyGKVd3Y6IvbwQ3tHp3mAduHQpMuvKlajhq1cjMi9fRrUFMk7X3YVl8SAEbhl38Tvq8OtwpYqbucuF4ampu/PoCO2AjqqMjPzq7Kr09blJsjp/VXRVXtAT55Vd9f1/LqKi+9QWFQ7NyOlm3PnFhbqiYzZ8HuLLW0YXn16c3Py3/a/PHg7eO27/li3q//XjO32I603JedvTeNR+99EQq5gNIwDnJeVvkLLeqgP/4G+ctLtBBf+b2xJ86sNz7Ds3U2DFoFkBLHzjHVkHQK5JYhqviQZVQoOqg9RGBa1acY49vc76qwaMUkKzgQSKJhNQNZtCJnYJGrTZgkbNLkOrRdWn2/QR3ES2YMEqgtDtBRSdPkLV7TcysafQYNA/aNQdbtDqKMKubDMTum+5QCpRJaZJoivcwWyz9A3L21AbtVGRFgeELhSGHiapSSn5dDU6UIyxwxjT0qRkhAluJ1XoNbTZOHEKbkFFJpmldOYlJ7OqDyUp3A6+rhMQJSEVYTKJ0Ck4B+aNlnwL32+DNKNsKNHQV+fsggSDPjmRKkkKAFmtcID6ruUdwxhNGkliCEbg7IgqZEM2luAIZ/UiC6SQkph7xJzyJJNBDKpIml9lf75j0IruqVGiRsqHXEV/d06iQR2qiU8AAAAAAA==')
    format('woff2');
}

.db-icon {
  font-family: 'db-icon';
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.db-icon-code:before {
  content: '\ea67';
}

.db-icon-codesandbox:before {
  content: '\e722';
}
</style>
