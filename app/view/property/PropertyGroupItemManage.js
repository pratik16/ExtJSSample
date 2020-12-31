Ext.define('Regardz.view.property.PropertyGroupItemManage', {
    extend: 'Ext.window.Window',
    alias: 'widget.propertygroupitemmanage',
    modal: true,
    width: parseInt(Ext.getBody().getViewSize().width * (0.8)),
    height: parseInt(Ext.getBody().getViewSize().height * (0.75)),
    border: false,
    title: 'Property Group Item Pricing Manage_Title'.l('SC31147'),
    resizable: false,
    initComponent: function () {
        var me = this;

        me.layout = "hbox";
        /*Its prevent to reload grid from resize function from common file*/
        me.noResize = true;
        //  me.style = "margin: 10px 0 0 10px";

        me.Summarystore = new Ext.data.ArrayStore({
            fields: ['ItemId', 'ItemName', 'BarA', 'ItemA', 'BarB', 'ItemB', 'BarC', 'ItemC', 'BarD', 'ItemD']
        });
        var data = [['0', 'Package price', '0', '0', '0', '0', '0', '0', '0', '0']];

        me.Summarystore.loadData(data);

        var solePer = (me.rec.Quantity > 0) ? 'Group' : me.rec.Quantity;

        var startDate = (me.rec.StartDate != null) ? Ext.util.Format.date(me.rec.StartDate, 'Y-m-d') : '';

        if (me.type == 'add')
            startDate = null;
        else if (me.type == 'edit')
            startDate = startDate;
        else
            startDate = null;

        //Quantity
        me.items = [
			{
			    xtype: 'fieldset',
			    width: '30%',
			    height: '90%',
			    margin: '10px 10px 10px 10px',
			    defaults: {			        
			        anchor: '80%',
			        labelWidth: 70
			    },
			    title: 'General Settings'.l('SC31147'),
			    items: [
                    {
                        xtype: 'displayfield',
                        name: 'name',
                        fieldLabel: 'Name'.l('SC31147'),
                        value: me.rec.ItemCategoryName
                    },
					{
					    xtype: 'displayfield',
					    name: 'soldper',
					    fieldLabel: 'Sold Per'.l('SC31147'),
					    value: solePer
					},
					{
					    xtype: 'datefield',
					    fieldLabel: 'Start Date'.l('SC31147')+'*',
					    itemid: 'StartDate',
					    name: 'StartDate',
					    itemid: 'StartDate',
					    format: usr_dateformat,
					    submitFormat: 'Y-m-d',
					    editable: false,
					    value: startDate,
                        anchor: '75%'

					},
                    {
                        xtype: 'hidden',
                        name: 'ItemGroupId',
                        itemid: 'ItemGroupId',
                        value: me.rec.ItemGroupId
                    },
                    {
                        xtype: 'hidden',
                        name: 'ExemptionIds',
                        itemid: 'ExemptionIds',
                        value: me.rec.ExemptionIds
                    },
                    {
                        xtype: 'hidden',
                        name: 'SubmitType',
                        itemid: 'SubmitType',
                        value: me.type
                    }
                ]
			},

            {
                xtype: 'container',
                width: '67%',
                height: '90%',
               // layout: 'fit',
                items: [{
                    xtype: 'grid',
                    frame: true,
                    itemid: 'ItemGroupGlobalList',
                    resizable: true,
                    //layout: 'fit',
                    height: parseInt(me.height * (0.4)),
                    store: Ext.getStore('property.PropertyGroupItemPriceListStore'),
                    autoScroll: true,
                    margin: '15px 10px 10px 10px',
                    viewConfig: {
                        forceFit: true,
                        markDirty: false
                    },
                    plugins: [
		                Ext.create('Ext.grid.plugin.CellEditing', {
		                    clicksToEdit: 2
		                })
	                ],
                    noResize: true,
                    title: 'Items'.l('SC31147'),
                    autoExpandColumn: 'Item',
                    columns: [
                            { hidden: true, dataIndex: 'ItemId', renderer: this.summaryRender },
                            { header: 'Item'.l('SC31147'), dataIndex: 'ItemName', flex: 1 },
                            { header: 'BAR A'.l('SC31147'), dataIndex: 'BarA', width: 50, renderer: this.decimalComma,
                                format: '0.00',
                                editor: {
                                    xtype: 'numberfield',
                                    decimalPrecision: 2,
                                    allowBlank: false,
                                    maxLength: 120,
                                    minValue: 0,
                                    maxValue: 99999,
                                    enforceMaxLength: true,
                                    maxLength: 8,
                                    format: '0.00'
                                }
                            },
					        { header: 'Item A'.l('SC31147'), dataIndex: 'ItemA', width: 50, renderer: this.decimalComma },
					        { header: 'BAR B'.l('SC31147'), dataIndex: 'BarB', width: 50, renderer: this.decimalComma,
					            format: '0.00',
					            editor: {
					                xtype: 'numberfield',
					                decimalPrecision: 2,
					                allowBlank: false,
					                maxLength: 120,
					                minValue: 0,
					                maxValue: 99999,
					                enforceMaxLength: true,
					                maxLength: 8,
					                format: '0.00'
					            }
					        },
					        { header: 'Item B'.l('SC31147'), dataIndex: 'ItemB', width: 50, renderer: this.decimalComma },
					        { header: 'BAR C'.l('SC31147'), dataIndex: 'BarC', width: 50, renderer: this.decimalComma,
					            format: '0.00',
					            editor: {
					                xtype: 'numberfield',
					                decimalPrecision: 2,
					                allowBlank: false,
					                maxLength: 120,
					                minValue: 0,
					                maxValue: 99999,
					                enforceMaxLength: true,
					                maxLength: 8,
					                format: '0.00'
					            }
					        },
					        { header: 'Item C'.l('SC31147'), dataIndex: 'ItemC', width: 50, renderer: this.decimalComma },
					        { header: 'BAR D'.l('SC31147'), dataIndex: 'BarD', width: 50, renderer: this.decimalComma,
					            format: '0.00',
					            editor: {
					                xtype: 'numberfield',
					                decimalPrecision: 2,
					                allowBlank: false,
					                maxLength: 120,
					                minValue: 0,
					                maxValue: 99999,
					                enforceMaxLength: true,
					                maxLength: 8,
					                format: '0.00'
					            }
					        },
					        { header: 'Item D'.l('SC31147'), dataIndex: 'ItemD', width: 50, renderer: this.decimalComma }
                        ]
                },

                        {
                            xtype: 'displayfield',
                            height: '20%'
                        },
                        {
                            xtype: 'grid',
                            frame: true,
                            itemid: 'ItemGroupGlobalListSummary',
                           // layout: 'fit',
                            autoScroll: true,
                            store: me.Summarystore,
                            margin: '15px 10px 10px 10px',
                            viewConfig: {
                                forceFit: true,
                                markDirty: false
                            },
                            style: {
                               valign: 'bottom'
                            },
                            noResize: true,
                            autoExpandColumn: 'ItemName',
                            columns: [
		                        { hidden: true, dataIndex: 'ItemId' },
		                        { header: 'Totals'.l('SC31147'), dataIndex: 'ItemName', flex: 1 },
		                        { header: 'BAR A'.l('SC31147'), dataIndex: 'BarA', width: 50, renderer: this.decimalComma },
		                        { header: 'Item A'.l('SC31147'), dataIndex: 'ItemA', width: 50, renderer: this.decimalComma },
		                        { header: 'BAR B'.l('SC31147'), dataIndex: 'BarB', width: 50, renderer: this.decimalComma },
		                        { header: 'Item B'.l('SC31147'), dataIndex: 'ItemB', width: 50, renderer: this.decimalComma },
		                        { header: 'BAR C'.l('SC31147'), dataIndex: 'BarC', width: 50, renderer: this.decimalComma },
		                        { header: 'Item C'.l('SC31147'), dataIndex: 'ItemC', width: 50, renderer: this.decimalComma },
		                        { header: 'BAR D'.l('SC31147'), dataIndex: 'BarD', width: 50, renderer: this.decimalComma },
		                        { header: 'Item D'.l('SC31147'), dataIndex: 'ItemD', width: 50, renderer: this.decimalComma }
	                        ]
                        }]
            }
        ];

        me.dockedItems = [{
            dock: 'bottom',
            align: 'right',
            buttonAlign: 'right',
            buttons: [{
                text: 'Cancel'.l('w'),
                action: 'cancel',
                handler: function () {
                    me.destroy();
                }
            }, {
                text: 'Save'.l('w'),
                action: 'property_item_group_action'
            }]
        }];


        me.height = parseInt(Ext.getBody().getViewSize().height * (0.75));

        me.callParent(arguments);
    },

    decimalComma: function (value, metadata, record, rowIndex, colIndex, store) {

        if (colIndex == 3 || colIndex == 5 || colIndex == 7 || colIndex == 9) {
            metadata.style = "background-color: #DED8D8";
        }

        if (value > 0)
            return String(value).replace('.', Ext.util.Format.decimalSeparator);
        return value;

    }

});
