(function () {
var myConnector = tableau.makeConnector();
 
myConnector.getSchema = function (schemaCallback) {
var cols = [
//{ id : "@timestamp", alias:"_timestamp", dataType : tableau.dataTypeEnum.datetime },
{ id : "name", alias: "businesstransaction",dataType : tableau.dataTypeEnum.string },

];
var tableInfo = {
id : "AppData",
alias : "App Dynamics Snapshots",
columns : cols
};
schemaCallback([tableInfo]);
};
  
myConnector.getData = function(table, doneCallback) {
$.getJSON("https://cl1-vmcrpees-01.multiplan.com:9200/*appdynamics-snapshots*/_search", function(resp) {
var feat = resp;
tableData = [];
for (var i = 0, len = feat.length; i < len; i++) {
tableData.push({
//"_timestamp": feat[i].@timestamp,
"name": feat[i].businesstransaction.name
});
};
  table.appendRows();

doneCallback();
});
};
  
  
$(document).ready(function () {
$("#submitButton").click(function () {
tableau.connectionName = "AppData";
window._tableau.triggerInitialization();  
tableau.registerConnector(myConnector); 
tableau.submit();
});
});})();
