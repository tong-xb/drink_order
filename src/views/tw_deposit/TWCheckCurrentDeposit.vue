<template>
  <div :key="item.acctNo" v-for="item in depositStore.depositObject.deposit">
    <infoCard @click="goDetailsPage(item.acctNo)">
      <template #header>
        <div>
          <div>
            <div class="color-midnight-blue">{{ item.prodDesc }}</div>
          </div>
          <div>
            <div>{{ item.branchName }} - {{ item.acctNo }}</div>
          </div>
        </div>
        <IconArrowRight stroke-color="#0044bb" />
      </template>

      <template #body>
        <CardDeposit :item="item" />
      </template>
    </infoCard>
  </div>
  <div class="result" v-show="depositStore.depositObject.deposit.length === 0">查無資料</div>
  <NotificationMessage padding="2px 15px 2px 0px" color="#959595">
    <ol>
      <li>本交易明細資料，不得做為存款餘額證明或往來憑證之用。</li>
      <li>若有執行帳務交易之需求，請開啟元大行動銀行APP。</li>
    </ol>
  </NotificationMessage>
</template>

<script setup>
import IconArrowRight from '@/components/icons/IconArrowRight.vue';
import infoCard from '@/components/public_components/card/infoCard.vue';
import CardDeposit from '@/components/split_component/tw_deposit/CardDeposit.vue';
import NotificationMessage from '@/components/public_components/notification/NotificationMessage.vue';
import { useRouter } from 'vue-router';
import { useDepositStore } from '@/stores/twDeposit';

const depositStore = useDepositStore();

const router = useRouter();

const goDetailsPage = (acctNo) => {
  depositStore.twDetailAccNo = acctNo;
  router.push({ name: 'TWCheckCurrentDepositDetails' });
};
</script>

<style lang="scss" scoped>
.result {
  padding: 15px;
  color: var(--yt-c-midnight-blue);
  text-align: center;
  font-weight: bold;
}
</style>
