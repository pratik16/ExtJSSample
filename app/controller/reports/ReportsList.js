Ext.define('Regardz.controller.reports.ReportsList', {
    extend: 'Ext.app.Controller',
    views: ['reports.ReportsList', 'reports.GenerateReport',
                'common.DateFieldControl', 'common.PropertyControl', 'common.TimeFieldControl', 'common.TextFieldControl'
           ],
    stores: ['reports.ReportsListStore'],
    thisController: false,

    init: function () {
        var me = this;
        this.control(
        {
            //'panel [itemid="categoryStructurePanelId"]': {
            //    afterrender: function () {
            //        var tree = Ext.ComponentQuery.query('[itemid="categoryStructurePanelId"]')[0];
            //        tree.expandAll();
            //    }
            //},
            'reportsmaincategorieslist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    //var fieldName = iView.getGridColumns()[iColIdx].ReportCategoryName;

                    //var zRec = iView.getRecord(iRowEl);
                    
                    if (iColIdx == 1)
                        alert("Open report window");
                    //else if (iColIdx == 2)
                    //    this.editCategory(zRec);

                }
            },

            'reportslist': {            
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);

                     if (fieldName == 'reportCreate' && zRec.data.leaf == true ) {
                        log("zRec.data=", zRec.data)
                        Ext.create('widget.generatereport', {reportId: zRec.data.ReportId}).show();
                     }
                }
            },

            'generatereport': {
                afterrender: function (t, r, i) {
                    Ext.data.JsonP.request({
                        url: webAPI_path + 'api/Reports/GetReportParameters',
                        type: "GET",
                        params: { languageId: user_language,reportId: t.reportId },
                        success: function (response) {
                            
                             var reportName = Ext.ComponentQuery.query('generatereport hiddenfield[itemid=ReprotName]')[0];
                             reportName.setValue(response.reportObject.ReportName)

                             /*Set Enable disable for fields*/
                             Ext.ComponentQuery.query('generatereport [itemid=HTML]')[0].disable();
                             if (response.reportObject.IsHtml == false)
                                Ext.ComponentQuery.query('generatereport [itemid=HTML]')[0].disable();
                             else 
                                Ext.ComponentQuery.query('generatereport [itemid=HTML]')[0].enable();

                            if (response.reportObject.IsExcel == false)
                                Ext.ComponentQuery.query('generatereport [itemid=Excel]')[0].disable();
                             else 
                                Ext.ComponentQuery.query('generatereport [itemid=Excel]')[0].enable();

                             if (response.reportObject.IsWord == false)
                                Ext.ComponentQuery.query('generatereport [itemid=Word]')[0].disable();
                             else 
                                Ext.ComponentQuery.query('generatereport [itemid=Word]')[0].enable();

                            if (response.reportObject.IsCSV == false)
                                Ext.ComponentQuery.query('generatereport [itemid=CSV]')[0].disable();
                             else 
                                Ext.ComponentQuery.query('generatereport [itemid=CSV]')[0].enable();

                            if (response.reportObject.IsCSV == false)
                                Ext.ComponentQuery.query('generatereport [itemid=PDF]')[0].disable();
                             else 
                                Ext.ComponentQuery.query('generatereport [itemid=PDF]')[0].enable();
                                
                             /*End*/

                             var items = [];
                             Ext.each(response.data, function (r) {
                                
                                if (r.TypeName == "DateField") {
                                    items.push({
                                        xtype: 'datefieldcontrol',
                                        name: r.Name,
                                        fieldLabel: r.Code,
                                        allowBlank: r.IsMandatory == true ? false : true
                                        //maxValue: r.Length
                                    })
                                }
                                else if (r.TypeName == "Property") {
                                    items.push({
                                        xtype: 'propertycontrol',
                                        name: r.Name,
                                        fieldLabel: r.Code
                                      //  allowBlank: r.IsMandatory == true ? false : true,                                     
                                        //maxValue: r.Length

                                    })
                                }
                                else if (r.TypeName == "TextField") {
                                    items.push({
                                        xtype: 'textfieldcontrol',
                                        name: r.Name,
                                        fieldLabel: r.Code,
                                        allowBlank: r.IsMandatory == true ? false : true
                                        //maxValue: r.Length

                                    })
                                }
                             });
                             
                             var c = Ext.ComponentQuery.query('generatereport panel[itemid=dynamic_component]')[0];

                             c.removeAll(true);
                             c.add(items);
                             c.doLayout();
                        }
                    });
                }
            },
            'generatereport button[action="create_report"]': {
                click: function (t, r, i) {
                    var c = Ext.ComponentQuery.query('generatereport panel[itemid=dynamic_component]')[0].getForm();
                    var report_type = Ext.ComponentQuery.query('radiogroup[itemid=output_format]')[0].getValue().output;
                    
                    var rep = Ext.ComponentQuery.query('generatereport hiddenfield[itemid=ReprotName]')[0];
                    
                    if (c.isValid()) {
                        var value = c.getValues();    
                        
                        value.Report = rep.getValue();
                        value.OutputType = report_type;
                        var ReportName = value.Report;
                      //  Report=ROLResales_OPT_TEN_DEF&PRMBookingCreationDateFrom=20-04-2013&PRMBookingCreationDateTo=28-04-2013&PRMProperty=65|66|67&PRMStatus=6&OutputType=PDF                
                        var params = '';
                       
                        for(var key in value){ /*Where d is object*/     
                            if ($.isArray(value[key])) {
                                if (value[key].length > 0) {
                                     var arrIds = '';
                                     Ext.each(value[key], function (r) {
                                        arrIds = arrIds + r + '|';
                                     });
                                     arrIds = arrIds.replace(/\|$/, '');
                                     params = params + key +'='+ arrIds +'&';
                                }
                            }
                            else 
                                params = params + key +'='+ value[key] +'&';
                        }
                        
                       params = params.replace(/\&$/, '');

                      Ext.Ajax.request({
                        url: webAPI_path + 'api/ReportLog/AddReportLog',
                        type: 'POST',
                        params: {ReportParams: params, CreatedBy: CurrentSessionUserId, CreatedDate: Ext.Date.format(new Date(), 'Y-m-d H:i:s')},
                        success: function (response) {
                                                   
                           var r = Ext.decode(response.responseText);                           
                           
                          // window.location = 'ReportViewer.aspx?Report='+ReportName+'&id=' + r.data[0];

                        },
                        failure: function (form, response) {
                            r = response.result;                           
                        }
                    });

                    }
                }
            },

            'button[action="searchReport"]': {
                click: function (comp, opt) {

                    var r = Ext.getCmp('searchStringReports').getValue();
                    //Ext.getStore('reports.ReportsListStore').clearFilter();                    
                    var regex = new RegExp(".*" + r + ".*", "i");
                    me.filterTree(r);

                    //Ext.getStore('reports.ReportsListStore').filter("ReportCategoryName", regex, true, true);

                    if (r.length > 0) {
                        var clearIcon = Ext.ComponentQuery.query('[action="clearReportFilter"]')[0];
                        clearIcon.show();
                    }
                }
            },
            'textfield[itemid="searchStringReports"]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        var r = Ext.getCmp('searchStringReports').getValue();
                        var regex = new RegExp(".*" + r + ".*", "i");
                        me.filterTree(r);
                        //Ext.getStore('reports.ReportsListStore').clearFilter();

                        //Ext.getStore('reports.ReportsListStore').filter("ReportCategoryName", regex, true, true);
                        if (r.length > 0) {
                            var clearIcon = Ext.ComponentQuery.query('[action="clearReportFilter"]')[0];
                            clearIcon.show();
                        }
                    }
                }
            },
            'button[action="clearReportFilter"]': {
                click: function () {
                    Ext.getCmp('searchStringReports').setValue('');
                    //Ext.getStore('reports.ReportsListStore').clearFilter();
                    Ext.getStore('reports.ReportsListStore').reload();
                    var clearIcon = Ext.ComponentQuery.query('[action="clearReportFilter"]')[0];
                    clearIcon.hide();
                }
            }
        });
    },
    filterTree: function (aText) {

        var aTree = Ext.ComponentQuery.query('[itemid="categoryStructurePanelId"]')[0];

        if (!aText) {
            return;
        }
        // Regular expression to find a word in a text
        //var lRegExp = new RegExp(Ext.escapeRe(aText), 'i');
        var lRegExp = new RegExp(".*" + aText + ".*", "i");
        // Recursive function to search inside the tree
        var lRecursiveFindChildren = function (aInputTree) {
            if (aInputTree.isLeaf()) {
                return lRegExp.test(aInputTree.data.text);
                // Remove this condition if you only want to search in the leafs
            } else if (lRegExp.test(aInputTree.data.text)) {
                return true;
            } else {
                var lChildren = aInputTree.childNodes;
                var lLength = lChildren.length - 1;
                var lMatch = null;
                var lCMatch = false;
                for (var i = lLength; i >= 0; i--) {
                    // Calling again the function to find if children match
                    lMatch = lRecursiveFindChildren(lChildren[i]);
                    if (!lMatch && lMatch != undefined) {
                        lChildren[i].remove();
                    } else {
                        lChildren[i].expand();
                        lCMatch = true;
                    }
                }
                return lCMatch;
            }
        }
        lRecursiveFindChildren(aTree.getRootNode());
    }
});
