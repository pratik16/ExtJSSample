Ext.define('Regardz.view.bookingwizard.RightSide.SalesInfo', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.rightsalesinfo',
    requires: ['Regardz.view.common.CheckboxRow'],
    initComponent: function () {
        var me = this;
        me.fieldSetHeight = 400;
        me.width = "100%";
        //me.autoScroll = false;

        if (Ext.getCmp('searchString2')) {
            Ext.getCmp('searchString2').destroy();
        }

        me.leadSource = {
            xtype: 'combo',
            fieldLabel: 'Lead Source'.l('SC50000'),
            displayField: 'Name',
            forceSelection: true,
            itemid: 'salesInfoLeadSource',
            queryMode: 'local',
            valueField: 'LeadSourceId',
            labelWidth: 70,
            width: 270,
            margin: '5',
            //            flex: 0.7,
            emptyText: 'Select Lead Source'.l('SC50000'),
            store: Ext.getStore('common.LeadSourceStore')

        };
        me.budgetTextBox = {
            xtype: 'numberfield',
            name: 'budget',
            itemid: 'salesInfoBudget',
            emptyText: 'Budget'.l('SC50000'),
            fieldLabel: 'Budget'.l('SC50000'),
            labelWidth: 70,
            width: 270,
            //            labelWidth: 100,
            //            width: 270,
            margin: '5',
            flex: 0.7,
            selectOnFocus: true,
            allowNegative: false,
            allowDecimals: false
        };
        me.ViewDescription = {
            xtype: 'fieldcontainer',
            items: [{
                xtype: 'fieldcontainer',
                layout: 'vbox',
                margin: 5,
                //                width: '80%',
                //                flex: 0.8,
                items: [
						me.leadSource,
						me.budgetTextBox
                ]
            }]

        };


        me.filterCompetitors = {
            xtype: 'textfield',
            name: 'filter',
            itemid: 'fieldFilterCompetitors',
            emptyText: 'filter'.l('SC50000'),
            width: 80,
            margin: '5',
            selectOnFocus: true
        };
        me.buttonSearchCompetitors = Ext.create('Ext.Button', {
            scale: 'small',
            frame: false,
            border: false,
            iconCls: 'search-icon',
            width: 20,
            margin: '5'
        });


        me.BuyingReasonList = {
            xtype: 'grid',
            title: 'BuyingReason'.l('SC50000'),
            store: Ext.getStore('bookingwizard.RightSide.SalesInfoBuyingReasonStore'),
            itemid: 'BuyingReasonList',
            height: 175,
            padding: '10',
            noResize: true,
            width: '98%',
            frame: false,
            autoScroll: true,
            columns: [{
                header: 'Description'.l('SC50000'),
                dataIndex: 'Name',
                width: '86%'
            }, {
                dataIndex: 'Checked', xtype: 'checkboxrow', width: '10%'
            }]
        };

        me.CompetitorsList = {
            xtype: 'grid',
            title: 'Competitors'.l('SC50000'),
            store: Ext.getStore('bookingwizard.RightSide.SalesInfoCompetitorStore'),
            itemid: 'CompetitorsList',
            height: 175,
            padding: '10',
            width: '98%',
            noResize: true,
            frame: false,
            autoScroll: true,
            columns: [{
                header: 'Name'.l('SC50000'),
                dataIndex: 'Name',
                width: '86%'
            },

             { dataIndex: 'Checked', xtype: 'checkboxrow', align: 'center', width: '10%', name: 'Checked', hideable: false}],
            tbar: ['->', {
                xtype: 'button',
                iconCls: 'filter',
                tooltip: 'Filter'.l('SC50000'),
                disabled: true
            }, {
                xtype: 'textfield',
                id: 'searchString2',
                itemid: 'searchString2',
                name: 'searchString2',
                enableKeyEvents: false
            }, {
                xtype: 'button',
                iconCls: Ext.baseCSSPrefix + 'form-clear-trigger',
                action: 'clearCompetitors',
                tooltip: 'Clear filter'.l('SC50000'),
                hidden: true
            },
					 {
					     xtype: 'button',
					     action: 'searchCompetitors',
					     tooltip: 'Search'.l('SC50000'),
					     iconCls: Ext.baseCSSPrefix + 'form-search-trigger'
					 }
            ]
        };

        me.items = [{
            layout: 'vbox',
            xtype: 'panel',
            width: '95%',
            items: [
					me.ViewDescription,
					me.BuyingReasonList,
					me.CompetitorsList
            ]
        }
        ];
        me.callParent();
    },
    radioRender: function (v, meta, record, rowIdx, col_idx, store) {
        return '<input ' + (record.data.Checked == true ? 'checked=checked' : '') + ' onclick="setCompetitorForSales(' + rowIdx + ',\'' + store.storeId + '\')" type=radio name="rgrp' + this.body.id + '">'; //myEl // 
    },
    renderIcons: function (value, metadata, record, rowIndex, colIndex, store) {
        metadata.css = metadata.css + ' info_icon';
    }
});
