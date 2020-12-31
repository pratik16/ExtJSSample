Ext.define('Regardz.view.bookingwizard.SetNewReduction', {
    extend: 'Ext.window.Window',
    alias: 'widget.setnewreduction',
    modal: true,
    border: false,
    title: 'Set Reduction_Title'.l('SC54500'),
    //autoShow: true,
    width: 700,
    id: 'idSetReduction',
    initComponent: function () {

        var me = this;
        var reductionStore = Ext.create('Ext.data.Store', {
            fields: ['EventName', 'Item', 'Category', 'GroupName'],
            data:
              [{
                  "EventName": "Meeting",
                  "Item": "Coffee",
                  "Category": "F&B",
                  "GroupName": "8 Hour meeting package"


              },
              {
                  "EventName": "Meeting",
                  "Item": "Laptop",
                  "Category": "AV",
                  "GroupName": "8 Hour meeting package"


              },
              {
                  "EventName": "Lunch",
                  "Item": "Restaurant",
                  "Category": "F&B",
                  "GroupName": ""


              },
              {
                  "EventName": "Lunch",
                  "Item": "Basic meal",
                  "Category": "F&B",
                  "GroupName": "8 Hour meeting package"
              }
              ]
        });
        me.itemid = 'setnewreduction';
        me.items = [{
            xtype: 'form',
            frame: true,
            cls: 'propertyEdit',
            bodyStyle: 'padding:5px 5px 0',

            items: [
				{
				    xtype: 'numberfield',
				    fieldLabel: 'Reduction percentage'.l('SC54500') + '*',
				    name: 'reductionpercentage',
				    width: 400,
				    labelWidth: 200,
				    minValue: 0,
				    maxValue: 100,
				    itemid: 'reductionText',
				    anchor: '100%'
				},
				{
				    xtype: 'gridpanel',
				    title: 'Apply to'.l('SC54500'),
				    store: Ext.getStore('bookingwizard.ReductionStore'),
				    //store: reductionStore,
				    viewConfig: {
				        forceFit: true
				    },
				    height: 245,
				    frame: false,
				    autoScroll: true,
				    itemid: 'gridReduction',
				    //autoExpandColumn: 'name',
				    //fields: ['EventName', 'EventId', 'ItemCategoryName', 'ItemName', 'groupName', 'ItemCategorId', 'ItemId', 'bookingEventItemDetailId']
				    columns: [
						{ header: "Event".l('SC54500'), flex: 1, sortable: true, dataIndex: 'EventName' },
						{ header: "Item".l('SC54500'), flex: 1, sortable: true, dataIndex: 'ItemName' },
                        { header: "Category".l('SC54500'), flex: 1, sortable: true, dataIndex: 'ItemCategoryName' },
                        { header: "Group name".l('SC54500'), flex: 1, sortable: true, dataIndex: 'groupName' },
                        { hidden: true, dataIndex: 'EventId' }, { hidden: true, dataIndex: 'ItemCategorId' }, { hidden: true, dataIndex: 'ItemId' }, { hidden: true, dataIndex: 'bookingEventItemDetailId' }, { hidden: true, dataIndex: 'bookingEventItemDetailTrackingId' },
				    { sortable: true, renderer: this.checkboxrenderer, width: 30 }
				    ]
				}

            ],
            buttons: [{
                text: 'Cancel'.l('w'),
                handler: function () {
                    me.close();
                }
            }, {
                text: 'Next'.l('w'),
                action: 'setReductionAction'
            }]
        }];
        me.callParent(arguments);
    },
    checkboxrenderer: function (value, metadata, record, rowIdx, colIndex, store) {

        return '<input checked="checked" id="reductionItem_' + record.data.bookingEventItemDetailTrackingId + '" data-id="' + record.data.TrackingIds + '" data-itemid="' + record.data.DetailIds + '" type=checkbox name="rgrp' + this.body.id + '">';
    }
});