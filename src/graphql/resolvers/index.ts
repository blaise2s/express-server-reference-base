import merge from 'lodash.merge';
import analyzeResolvers from './analyze.resolvers';
import healthCheckResolvers from './health-check.resolvers';
import scriptResolvers from './script.resolvers';
import stateResolvers from './state.resolvers';
import uploadResolvers from './upload.resolvers';

// console.log(healthCheckResolvers);
// console.log(uploadResolvers);
// console.log(analyzeResolvers);
// console.log(merge(healthCheckResolvers, uploadResolvers, analyzeResolvers));

// const rollup1 = {
//   rollup: {
//     AA: { ecomm: 328.0, pos: 47.0, total: 375.0, numStores: 0.0 },
//     AE: {
//       ecomm: 9485.0,
//       pos: 1037.0,
//       total: 10522.0,
//       numStores: 0.0,
//     },
//     AK: {
//       ecomm: 19243.0,
//       pos: 1057.0,
//       total: 20300.0,
//       numStores: 0.0,
//       totalSales: 10000.58,
//     },
//     AL: {
//       ecomm: 46099.0,
//       pos: 3540.0,
//       total: 49639.0,
//       numStores: 0.0,
//     },
//     AP: { ecomm: 6015.0, pos: 409.0, total: 6424.0, numStores: 0.0 },
//     AR: {
//       ecomm: 24235.0,
//       pos: 2185.0,
//       total: 26420.0,
//       numStores: 0.0,
//     },
//     AZ: {
//       ecomm: 108643.0,
//       pos: 135237.0,
//       total: 243880.0,
//       numStores: 2.0,
//     },
//     CA: {
//       ecomm: 1139617.0,
//       pos: 1098693.0,
//       total: 2238310.0,
//       numStores: 13.0,
//     },
//     CO: {
//       ecomm: 162638.0,
//       pos: 214465.0,
//       total: 377103.0,
//       numStores: 2.0,
//     },
//     CT: {
//       ecomm: 106810.0,
//       pos: 139680.0,
//       total: 246490.0,
//       numStores: 2.0,
//     },
//     DC: {
//       ecomm: 14182.0,
//       pos: 635.0,
//       total: 14817.0,
//       numStores: 0.0,
//     },
//     DE: {
//       ecomm: 25697.0,
//       pos: 90786.0,
//       total: 116483.0,
//       numStores: 1.0,
//     },
//     FL: {
//       ecomm: 483240.0,
//       pos: 1047885.0,
//       total: 1531125.0,
//       numStores: 7.0,
//     },
//     GA: {
//       ecomm: 128295.0,
//       pos: 117433.0,
//       total: 245728.0,
//       numStores: 2.0,
//     },
//     HI: {
//       ecomm: 31257.0,
//       pos: 77526.0,
//       total: 108783.0,
//       numStores: 1.0,
//     },
//     IA: {
//       ecomm: 54550.0,
//       pos: 4471.0,
//       total: 59021.0,
//       numStores: 0.0,
//     },
//     ID: {
//       ecomm: 36818.0,
//       pos: 2047.0,
//       total: 38865.0,
//       numStores: 0.0,
//     },
//     IL: {
//       ecomm: 607764.0,
//       pos: 318970.0,
//       total: 926734.0,
//       numStores: 5.0,
//     },
//     IN: {
//       ecomm: 189265.0,
//       pos: 8757.0,
//       total: 198022.0,
//       numStores: 1.0,
//     },
//     KS: {
//       ecomm: 47604.0,
//       pos: 79689.0,
//       total: 127293.0,
//       numStores: 1.0,
//     },
//     KY: {
//       ecomm: 116296.0,
//       pos: 4589.0,
//       total: 120885.0,
//       numStores: 1.0,
//     },
//     LA: {
//       ecomm: 30623.0,
//       pos: 56515.0,
//       total: 87138.0,
//       numStores: 1.0,
//     },
//     MA: {
//       ecomm: 198530.0,
//       pos: 245020.0,
//       total: 443550.0,
//       numStores: 4.0,
//     },
//     MD: {
//       ecomm: 147733.0,
//       pos: 196529.0,
//       total: 344262.0,
//       numStores: 3.0,
//     },
//     ME: {
//       ecomm: 28238.0,
//       pos: 2142.0,
//       total: 30380.0,
//       numStores: 0.0,
//     },
//     MI: {
//       ecomm: 286683.0,
//       pos: 14437.0,
//       total: 301120.0,
//       numStores: 1.0,
//     },
//     MN: {
//       ecomm: 320969.0,
//       pos: 8342.0,
//       total: 329311.0,
//       numStores: 1.0,
//     },
//     MO: {
//       ecomm: 173568.0,
//       pos: 7733.0,
//       total: 181301.0,
//       numStores: 1.0,
//     },
//     MS: {
//       ecomm: 13034.0,
//       pos: 1435.0,
//       total: 14469.0,
//       numStores: 0.0,
//     },
//     MT: {
//       ecomm: 21972.0,
//       pos: 1278.0,
//       total: 23250.0,
//       numStores: 0.0,
//     },
//     NC: {
//       ecomm: 156123.0,
//       pos: 262799.0,
//       total: 418922.0,
//       numStores: 3.0,
//     },
//     ND: {
//       ecomm: 15645.0,
//       pos: 1157.0,
//       total: 16802.0,
//       numStores: 0.0,
//     },
//     NE: {
//       ecomm: 34121.0,
//       pos: 2702.0,
//       total: 36823.0,
//       numStores: 0.0,
//     },
//     NH: {
//       ecomm: 46011.0,
//       pos: 3961.0,
//       total: 49972.0,
//       numStores: 0.0,
//     },
//     NJ: {
//       ecomm: 218116.0,
//       pos: 332279.0,
//       total: 550395.0,
//       numStores: 5.0,
//     },
//     NM: {
//       ecomm: 29579.0,
//       pos: 1557.0,
//       total: 31136.0,
//       numStores: 0.0,
//     },
//     NV: {
//       ecomm: 52247.0,
//       pos: 86264.0,
//       total: 138511.0,
//       numStores: 1.0,
//     },
//     NY: {
//       ecomm: 394770.0,
//       pos: 927788.0,
//       total: 1322558.0,
//       numStores: 11.0,
//     },
//     OH: {
//       ecomm: 453729.0,
//       pos: 14902.0,
//       total: 468631.0,
//       numStores: 3.0,
//     },
//     OK: {
//       ecomm: 42192.0,
//       pos: 60015.0,
//       total: 102207.0,
//       numStores: 1.0,
//     },
//     OR: {
//       ecomm: 140019.0,
//       pos: 110105.0,
//       total: 250124.0,
//       numStores: 1.0,
//     },
//     PA: {
//       ecomm: 575273.0,
//       pos: 178255.0,
//       total: 753528.0,
//       numStores: 2.0,
//     },
//     RI: {
//       ecomm: 21438.0,
//       pos: 46668.0,
//       total: 68106.0,
//       numStores: 1.0,
//     },
//     SC: {
//       ecomm: 58747.0,
//       pos: 71143.0,
//       total: 129890.0,
//       numStores: 1.0,
//     },
//     SD: {
//       ecomm: 13946.0,
//       pos: 1508.0,
//       total: 15454.0,
//       numStores: 0.0,
//     },
//     TN: {
//       ecomm: 179547.0,
//       pos: 5931.0,
//       total: 185478.0,
//       numStores: 1.0,
//     },
//     TX: {
//       ecomm: 514451.0,
//       pos: 610784.0,
//       total: 1125235.0,
//       numStores: 9.0,
//     },
//     UT: {
//       ecomm: 105537.0,
//       pos: 146066.0,
//       total: 251603.0,
//       numStores: 1.0,
//     },
//     VA: {
//       ecomm: 227998.0,
//       pos: 264903.0,
//       total: 492901.0,
//       numStores: 3.0,
//     },
//     VT: {
//       ecomm: 19533.0,
//       pos: 1212.0,
//       total: 20745.0,
//       numStores: 0.0,
//     },
//     WA: {
//       ecomm: 334215.0,
//       pos: 279882.0,
//       total: 614097.0,
//       numStores: 3.0,
//     },
//     WI: {
//       ecomm: 197724.0,
//       pos: 8460.0,
//       total: 206184.0,
//       numStores: 1.0,
//     },
//     WV: {
//       ecomm: 20017.0,
//       pos: 1742.0,
//       total: 21759.0,
//       numStores: 0.0,
//     },
//     WY: { ecomm: 9659.0, pos: 599.0, total: 10258.0, numStores: 0.0 },
//   },
// };

// const rollup2 = {
//   rollup: {
//     AA: { zip: '12345' },
//     '12345': {
//       ecomm: 9659.0,
//       pos: 599.0,
//       total: 10258.0,
//       numStores: 0.0,
//     },
//   },
// };

// console.log(rollup1);
// console.log(rollup2);
// console.log('MERGED');
// console.log(merge(rollup1, rollup2));

export default merge(
  healthCheckResolvers,
  uploadResolvers,
  analyzeResolvers,
  stateResolvers,
  scriptResolvers
);
