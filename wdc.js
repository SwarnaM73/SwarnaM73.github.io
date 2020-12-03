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
$.getJSON("https://cl1-vmcrpees-01.multiplan.com:9200/'appdynamics-snapshots'/_search", function(resp) {
var feat = resp;
tableData = [];
  if(tableData.length = 0 )
     return abort("No rows for extract");
// Iterate over the JSON object
for (var i = 0, len = feat.length; i < len; i++) {
tableData.push({
//"_timestamp": feat[i].@timestamp,
"name": feat[i].businesstransaction.name
});
}

var row_index = 0;
var size = 10;
while (row_index <= 50){
  table.appendRows(tableData.slice(row_index, size + row_index)); 
  tableau.reportProgress("Getting row: " + row_index);
}  

doneCallback();
});
};
  
tableau.registerConnector(myConnector);
  
$(document).ready(function () {
$("#submitButton").click(function () {
tableau.connectionName = "AppData";
window._tableau.triggerInitialization();  
tableau.submit();
});
});})();
