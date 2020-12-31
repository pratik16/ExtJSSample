Ext.define('Regardz.view.property.FloorPlan', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.floorplan',
    store: 'property.FloorPlanStore',
    loadMask: true,
    requires: ['Ext.ux.IFrame', 'Ext.ux.form.SearchField'],    
    initComponent: function () {
        var me = this;
        me.layout = "hbox";
        /*Its prevent to reload grid from resize function from common file*/
        me.noResize = true;         
        //me.style = "margin: 10px 0 0 0";
        me.items = [
            {
                xtype: 'grid',
                frame: true,
                itemid: 'floorplangrid',
                width: '48%',
               // height: parseInt(Ext.getBody().getViewSize().height * (0.65)),
                store: Ext.getStore('property.FloorPlanStore'),
                autoScroll: true,
                style: "margin: 10px 0 0 0px;",
                viewConfig: {
                    forceFit: true
                },
                tbar: [{
                    xtype: 'button',
                    action: 'addFloorPlan',
                    iconCls: 'new',
                    text: 'Add New'.l('SC31400'),
                    tooltip: 'Add new floor plan'.l('SC31400'),
                    height: 21
                },
                '->', {
                    xtype: 'button',
                    iconCls: 'filter',
                    disabled: true
                }, {
                    xtype: 'searchfield',
                    store: Ext.getStore('property.FloorPlanStore'),
                    iconCls: 'filter',
                    paramName: 'searchParam'
                }
                ],
                columns: [
                    { header: 'File Name'.l('SC31400'), dataIndex: 'DisplayName', name: 'DisplayName', flex: 1 },
                    { header: 'Floor'.l('SC31400'), dataIndex: 'FloorName', name: 'FloorName'},                
                    {header: 'Category'.l('SC31400'), dataIndex: 'Category', width: 100, align: 'center', name: 'Category'},
                    { dataIndex: 'PropertyId', renderer: this.editFloorPlan, align: 'center', width: 25, name: 'FloorPlanEdit'},
                    { dataIndex: 'PropertyId', renderer: this.previewFloorPlan, align: 'center', width: 25, name: 'FloorPlanPreview'},
                    { dataIndex: 'PropertyId', renderer: this.deteleFloorPlan, align: 'center', width: 25, name: 'FloorPlanDelete'},
                    { hidden: true, dataIndex: 'PropertyFloorPlanId', align: 'center' }
                ],
                bbar: {
                    xtype: 'pagingtoolbar',
                    store: this.store,
                    displayInfo: true,
                    emptyMsg: "No data to display".l("g")
                } 
            },
            {
                xtype: 'container',
                width: '48%',
                style: ";margin: 10px 0 0 20px;",
                height: '90%',
                //border: 1,
                items: [
                    {
                        xtype: 'panel',
                        title: 'Preview'.l('SC31400')
                    },
                    {
                        xtype: 'uxiframe',
                        itemid: 'florPlanPreview',
                        title: 'Preview'.l('SC31400'),
                        style: "border: 1px solid",
                        height: parseInt(Ext.getBody().getViewSize().height * (0.55)),
                        width: '100%'/*,
                        autoEl: {
                            tag: "iframe",
                            src: "http://localhost:56814/PDFViewer.aspx"
                        }*/
                    }
                ]
            }

        ]
        //me.layout = 'fit';

        me.height = parseInt(Ext.getBody().getViewSize().height * (0.75));

//        me.tbar = [{
//            xtype: 'button',
//            action: 'addFloorPlan',
//            iconCls: 'new',
//            text: 'Add New'.l('SC31400'),
//            tooltip: 'Add new floor plan'.l('SC31400'),
//            height: 21
//        }];

        //        me.bbar = {
        //            xtype: 'pagingtoolbar',
        //            store: this.store,
        //            displayInfo: true,
        //            emptyMsg: "No data to display"
        //        };

        me.callParent();
    },


    deteleFloorPlan: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = "Delete floor plan".l('SC31400');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.css = 'icon-delete';
    },

    previewFloorPlan: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = "Preview floor plan".l('SC31400');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.css = 'searchIcon';
    },

    editFloorPlan: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = "Edit floor plan".l('SC31400');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.css = 'icon-edit';
    }
});