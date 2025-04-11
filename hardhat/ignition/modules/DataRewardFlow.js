const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
 
 module.exports = buildModule("DataRewardFlowModule", (m) => {
   const dataRewardFlow = m.contract("DataRewardFlowFactory", []);
 
   return { dataRewardFlow };
 });