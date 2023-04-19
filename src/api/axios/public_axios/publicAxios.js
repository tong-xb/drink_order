import fodoAppRequest from '@/api/axios/fidoAppRequest';

//fidoApp

//初始取得sessionid 與 資產總覽
export const apiPostOverviewInit = (data) => fodoAppRequest.post('?workCode=overviewInit', data);
//資產總覽
export const apiPostOverallAcctAll = (data) => fodoAppRequest.post('?workCode=overallAcctAll', data);
//資產總覽 債券自行買賣(買賣斷交易)
export const apiPostGetBuySelOutRefMktVal = (data) => fodoAppRequest.post('?workCode=getBuySelOutRefMktVal', data);
//資產總覽 債券自行買賣(附買回交易)
export const apiPostGetConditionalSaleRefMktVal = (data) => {
  return fodoAppRequest.post('?workCode=getConditionalSaleRefMktVal', data);
};

//臺幣帳務總覽
export const apiPostOverallAcctTwd = (data) => fodoAppRequest.post('?workCode=overallAcctTwd', data);
//取臺幣定存/支存/活存帳戶
export const apiPostTwdAcct = (data) => fodoAppRequest.post('?workCode=twdAcct', data);
//臺幣帳號列表
export const apiPostTwdAcctTxnDetail = (data) => fodoAppRequest.post('?workCode=twdAcctTxnDetail', data);
//取得臺幣定存帳戶
export const apiPostGetDepositTwdAcct = (data) => fodoAppRequest.post('?workCode=getDepositTwdAcct', data);
//取得臺幣帳戶內容
export const apiPostTwdAcctInfo = (data) => fodoAppRequest.post('?workCode=twdAcctInfo', data);

//外幣帳務總覽
export const apiPostFceAcct = (data) => fodoAppRequest.post('?workCode=fceAcct', data);
//利匯率列表
export const apiPostGetHostCcyList = (data) => fodoAppRequest.post('?workCode=getHostCcyList', data);
//外幣活存全部幣別明細查詢
export const apiPostFixedFceMultiDtl = (data) => fodoAppRequest.post('?workCode=fixedFceMultiDtl', data);

//信託戶API
export const apiPostGetFundBranch = (data) => fodoAppRequest.post('?workCode=getFundBranch', data);
//客戶基本資料與KYC
export const apiPostGetFundCustAndKycInfo = (data) => fodoAppRequest.post('?workCode=getFundCustAndKycInfo', data);

//基金總覽
export const apiPostOverviewFund = (data) => fodoAppRequest.post('?workCode=overviewFund', data);

//海外債
export const apiPostOverseaBondOverview = (data) => fodoAppRequest.post('?workCode=overseaBondOverview', data);
//累計配息資料
export const apiPostOverseaBondPayAmount = (data) => fodoAppRequest.post('?workCode=overseaBondPayAmount', data);
//申購海外債列表
export const apiPostGetOverseaBond = (data) => fodoAppRequest.post('?workCode=getOverseaBond', data);
