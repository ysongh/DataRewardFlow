const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
 
 module.exports = buildModule("DataRewardFlowModule", (m) => {
   const dataRewardFlow = m.contract("DataRewardFlowFactory", ["0x7d5CF15FA320901c1175d53007e78B19D73A1b65"]);
 
   return { dataRewardFlow };
 });