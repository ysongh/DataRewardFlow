const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
 
 module.exports = buildModule("DataRewardFlowModule", (m) => {
   const dataRewardFlow = m.contract("DataRewardFlow", ["0xFf00000000000000000000000000000000016999"]);
 
   return { dataRewardFlow };
 });