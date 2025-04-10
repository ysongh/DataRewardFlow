const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
 
 module.exports = buildModule("DataRewardFlowModule", (m) => {
   const dataRewardFlow = m.contract("DataRewardFlow", [
    "0xFF000000000000000000000000000000000048E4",
    "I need a data on today weather"
  ]);
 
   return { dataRewardFlow };
 });