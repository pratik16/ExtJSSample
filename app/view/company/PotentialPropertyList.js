/*Below file is not used*/
Ext.define('Regardz.view.company.PotentialPropertyList', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.potentialpropertylist',
    store: '',
    loadMask: true,
    requires: [
		'Ext.ux.form.SearchField'
	],
    initComponent: function () {

        var me = this;
        //        me.autoHeight = true;
        //        height = 300;
        //        me.title = "Competitors";
        //        me.frame = true;
        //        me.columns = [{
        //            header: 'Name',
        //            dataIndex: '',
        //            flex: 1
        //        }, {

        //            dataIndex: '',
        //            flex: 1
        //        }, {
        //            hidden: true,
        //            dataIndex: 'CompetitorId',
        //            align: 'center',
        //            hideable: false
        //        }];
        //        me.tbar = ['->', {
        //            xtype: 'button',
        //            iconCls: 'filter',
        //            disabled: true
        //        }, {
        //            xtype: 'searchfield',
        //            store: Ext.getStore(''),
        //            iconCls: 'filter',
        //            paramName: 'searchString'
        //        }];

        //        me.bbar = {
        //            xtype: 'pagingtoolbar',
        //            store: this.store,
        //            displayInfo: true,
        //            emptyMsg: "No data to display"
        //        };

        me.items = [{
            xtype: 'grid',
            title: "Potential Properties",
            height: 200,
            store: Ext.getStore(''),

            viewConfig: {
                forceFit: true
            },

            frame: true,
            autoScroll: true,
            autoExpandColumn: 'Properties',

            columns: [
            { header: 'Properties', dataIndex: '', sortable: true, width: 80, flex: 1 },            
            { width: 20, dataIndex: '' },
            { hidden: true, dataIndex: 'CompetitorId', align: 'center', hideable: true }
            ],

            tbar: ['->', {
                xtype: 'button',
                iconCls: 'filter',
                disabled: true
            }, {
                xtype: 'searchfield',
                store: Ext.getStore(''),
                iconCls: 'filter',
                paramName: 'searchString'
            }],
            bbar: [{ xtype: 'pagingtoolbar',
                store: this.store,
                displayInfo: true,
                emptyMsg: "No data to display".l("g")
            }]
        }];

        me.callParent();
    }
});