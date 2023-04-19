// 引入 echarts 核心模塊，核心模塊提供了 echarts 使用必需要的接口。
import * as echarts from 'echarts/core';
// 引入Pie圖表，圖表後綴都為 Chart
import { PieChart } from 'echarts/charts';
// 引入標題，提示框，内置數據轉換器組件，組件後綴都為 Component
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
// 標籤自動布局特性
import { LabelLayout } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必需的一步
import { SVGRenderer } from 'echarts/renderers';
//引入台幣格式Format
import { formatTWCurrency } from '@/common/method_common/formatPrice.js';

// 註冊必需的組件
echarts.use([PieChart, TitleComponent, TooltipComponent, LegendComponent, LabelLayout, SVGRenderer]);

export const useAssetsPie = (element) => {
  // 初始化，傳入HTML element
  const pieChart = echarts.init(element, null, { renderer: 'svg' });

  function padString(str, length) {
    // 計算全形中文字數量
    const fullWidthChars = [...str].filter((c) => /\p{Unified_Ideograph}/u.test(c)).length;
    // 計算需要填充的空格數量
    const padLength = length - fullWidthChars * 2 - str.length;
    // 如果需要填充的空格數量小於 0，則不進行填充
    const pad = ' '.repeat(padLength < 0 ? 0 : padLength);
    // 回傳填充後的字串
    return str + pad;
  }

  function legendFormatter(params, item) {
    const totalLength = 25;
    const str1 = `${params} ${item.percent}`;
    const paddedStr1 = padString(str1, totalLength);
    return paddedStr1 + formatTWCurrency(item.value, 0, 'currency');
  }

  function legendEmptyFormatter(params, item) {
    const totalLength = 28;
    const str1 = `${params}`;
    const paddedStr1 = padString(str1, totalLength);
    return paddedStr1 + formatTWCurrency(item.value, 0, 'currency');
  }

  // 封裝相關參數依需求訂製
  const setOption = (legend_data, series_data) => {
    let legend_top_data = [];
    let legend_bottom_data = [];
    let series_top_data = [];
    let series_bottom_data = [];

    legend_data.forEach((item) => {
      if (item.value >= 0) {
        if (item.name === '總資產' || item.name === '總負債') {
          legend_top_data.push(item);
        } else {
          legend_bottom_data.push(item);
        }
      }
    });

    series_data.forEach((item) => {
      if (item.value >= 0) {
        if (item.name === '總資產' || item.name === '總負債') {
          series_top_data.push(item);
        } else {
          series_bottom_data.push(item);
        }
      }
    });

    const option = {
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          let str = '';
          if (params.percent.toFixed(1) === '0.0') {
            str = `${params.marker} ${params.name} <0.1% \xa0\xa0\xa0\xa0\xa0 $${params.value}`;
          } else {
            str = `${params.marker} ${params.name} ${params.percent.toFixed(1)}% \xa0\xa0\xa0\xa0\xa0 $${params.value}`;
          }
          return str;
        },
      },
      legend: [
        {
          right: '3%',
          top: '3%',
          orient: 'vertical',
          textStyle: {
            fontSize: 15,
          },
          data: legend_top_data,
        },
        {
          left: 'center',
          bottom: '5%',
          orient: 'vertical',
          textStyle: {
            fontSize: 16,
          },
          data: legend_bottom_data,
          formatter: function (params) {
            let result = '';
            legend_bottom_data.forEach((item) => {
              if (params === '存款' && item.name === '存款') {
                result = legendFormatter(params, item);
              } else if (params === '投資' && item.name === '投資') {
                result = legendFormatter(params, item);
              } else if (params === '貸款' && item.name === '貸款') {
                result = legendFormatter(params, item);
              } else if (params === '信用卡' && item.name === '信用卡') {
                result = legendFormatter(params, item);
              } else if (params === '透支' && item.name === '透支') {
                result = legendFormatter(params, item);
              }
            });
            return result;
          },
        },
      ],
      series: [
        {
          center: ['50%', '36%'],
          type: 'pie',
          radius: [0, '37%'],
          label: {
            position: 'inner',
            fontSize: 15,
            formatter: function (params) {
              return params.percent.toFixed(1) === '0.0'
                ? `${params.name}\n(<0.1%)`
                : `${params.name}\n(${params.percent.toFixed(1)}%)`;
            },
          },
          labelLine: {
            show: false,
          },
          emphasis: {
            disabled: true,
          },
          data: series_top_data,
        },
        {
          center: ['50%', '36%'],
          type: 'pie',
          radius: ['42%', '55%'],
          label: {
            show: true,
            position: 'outside',
            fontSize: 15,
            formatter: function (params) {
              return params.percent.toFixed(1) === '0.0'
                ? `${params.name}\n(<0.1%)`
                : `${params.name}\n(${params.percent.toFixed(1)}%)`;
            },
          },
          data: series_bottom_data,
        },
      ],
    };
    return pieChart.setOption(option);
  };

  // 封裝resize，RWD會使用到
  const resize = () => pieChart.resize();

  pieChart.on('legendselectchanged', function (params) {
    const selected = params.selected; // 取得點擊後的選項狀態
    const legendData1 = pieChart.getOption().legend[0].data;
    const legendData2 = pieChart.getOption().legend[1].data;
    const hasFalse = Object.values(selected).includes(false);

    pieChart.setOption({
      legend: [
        {
          right: '3%',
          top: '3%',
          orient: 'vertical',
          textStyle: {
            fontSize: 15,
          },
          data: legendData1,
        },
        {
          left: 'center',
          bottom: '5%',
          orient: 'vertical',
          textStyle: {
            fontSize: 16,
          },
          data: legendData2,
          formatter: function (params) {
            let result = '';
            legendData2.forEach((item) => {
              if (params === '存款' && item.name === '存款') {
                if (hasFalse) {
                  result = legendEmptyFormatter(params, item);
                } else {
                  result = legendFormatter(params, item);
                }
              } else if (params === '投資' && item.name === '投資') {
                if (hasFalse) {
                  result = legendEmptyFormatter(params, item);
                } else {
                  result = legendFormatter(params, item);
                }
              } else if (params === '貸款' && item.name === '貸款') {
                if (hasFalse) {
                  result = legendEmptyFormatter(params, item);
                } else {
                  result = legendFormatter(params, item);
                }
              } else if (params === '信用卡' && item.name === '信用卡') {
                if (hasFalse) {
                  result = legendEmptyFormatter(params, item);
                } else {
                  result = legendFormatter(params, item);
                }
              } else if (params === '透支' && item.name === '透支') {
                if (hasFalse) {
                  result = legendEmptyFormatter(params, item);
                } else {
                  result = legendFormatter(params, item);
                }
              }
            });
            return result;
          },
        },
      ],
    });
  });

  return { pieChart, setOption, resize };
};
