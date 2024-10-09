sap.ui.define([
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/HTML"
], function (MessageToast, JSONModel, BaseController, HTML) {
    "use strict";

    return BaseController.extend("workflowuimodule.controller.App", {

        onBeforeRendering: async function () {
           
            setTimeout(function () {
            
                
            debugger;
            var oView = this.getView();
            var oDat = oView.oPropagatedProperties.oModels.context.oData;
            var pdfDocumentValue = oDat.pdfDocument;
            var baseUrl = "https://3e1cae61trial-dev13-mahindra-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/";

            // Perform an AJAX call to get the PDF links
            $.ajax({
                url: baseUrl + pdfDocumentValue,
                method: "GET",
                success: function (oData) {
                    debugger;
                    var oModel = new JSONModel();
                    oModel.setData({ Files: oData.value }); // Assign the array directly
                    oView.setModel(oModel, "myModel"); // Set the model with name "myModel"
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.error("Error in fetching data: " + textStatus + ': ' + errorThrown);
                }
            });
            // var oUploadSet = this.byId("uploadSet");
            }.bind(this), 1000); // Ensure 'this' refers to the controller extension context

           


            setTimeout(function () {
                debugger;
                var oView1 = this.getView();
                var baseUrl1 = "https://3e1cae61trial-dev13-mahindra-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/Comment";
    
                // Perform AJAX request to retrieve data
                $.ajax({
                    url: baseUrl1,
                    method: "GET",
                    success: function(oData1) {
                        debugger
                        var oModel1 = new JSONModel();
                        oModel1.setData({ Comment: oData1.value });
                        oView1.setModel(oModel1, "myModel1");
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.error("Error fetching data: " + textStatus + ' ' + errorThrown);
                    }
                   
                });
                debugger
            }.bind(this), 1000);



            setTimeout(
                function () {
                  var oView2 = this.getView();
                  var oData2 = oView2.oPropagatedProperties.oModels.context.oData;
                //   var baseUrl2 = oData2.link;
                var baseUrl2 = "https://c8d78be1trial-dev-04-mahindra2-04-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/Vehicle";
      
                  // Perform AJAX request to retrieve data
                  $.ajax({
                    url: baseUrl2,
                    method: "GET",
                    success: function (oData2) {
                        console.log(oData2);
                      var oModel2 = new sap.ui.model.json.JSONModel();
                      oModel2.setData({ vehicleDetails: oData2.value });
                      oView2.setModel(oModel2, "myModel2");
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                      console.error(
                        "Error fetching data: " + textStatus + " " + errorThrown
                      );
                    },
                  });
                }.bind(this),
                1000
              );
                
        },


    

        handleLink1Press: function () {
            var msg = 'Page 1 a very long link clicked';
            MessageToast.show(msg);
        },

        handleLink2Press: function () {
            var msg = 'Page 2 long link clicked';
            MessageToast.show(msg);
        },

        handleEditBtnPress: function () {
            var msg = 'An edit box should appear when you click on the "Edit header" button';
            MessageToast.show(msg);
        },

        toggleFooter: function () {
            var oObjectPageLayout = this.byId("ObjectPageLayout");
            oObjectPageLayout.setShowFooter(!oObjectPageLayout.getShowFooter());
        },

        onOpenPressed: function (oEvent) {
            debugger;
            var baseUrl = "https://3e1cae61trial-dev13-mahindra-srv.cfapps.us10-001.hana.ondemand.com/odata/v4/my/";
            let fileurl = oEvent.oSource.mProperties.url;
            var pattern = /Files.*$/;
            var match = fileurl.match(pattern);
            if (match) {
                var entityUrl = baseUrl + match[0];
                oEvent.oSource.mProperties.url = entityUrl;
            }
        },

        onBrowseHistoryPress: function () {
            // Open the dialog with comment history
            if (!this.byId("commentHistoryDialog")) {
                this.loadFragment({
                    name: "MahindraWorkflow.workflowuimodule.view.CommentHistoryDialog"
                }).then(function (oDialog) {
                    oDialog.open();
                });
            } else {
                this.byId("commentHistoryDialog").open();
            }
        },

        onCloseHistoryDialog: function () {
            // Close the dialog
            this.byId("commentHistoryDialog").close();
        },

        onFilterTypeChange: function (oEvent) {
            // Logic for changing the filter in the timeline based on selection
            var sKey = oEvent.getSource().getSelectedKey();
            var oTimeline = this.byId("commentTimeline");
            oTimeline.setGroupBy(sKey);
        },
        onEscapeHandler: function(oPromise) {
            this.byId("commentHistoryDialog").close();
            oPromise.resolve();
        },

        onCloseHistoryDialog: function() {
            this.byId("commentHistoryDialog").close();
        }
        
    });
});
 