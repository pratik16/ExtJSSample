Ext.define('Regardz.view.usermanage.SalesTargetList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.salestargetlist',
    noResize: true,
    //    height: parseInt(Ext.getBody().getViewSize().height * (0.80)),
    store: 'usermanage.SalesTargetStore',
    //renderTo: 'right_region', //
    requires: [
		'Ext.ux.form.SearchField'
	],
    // isButtonInGrid: true,

    initComponent: function () {
        var me = this;
        me.title = "Sales Tragets_Title".l('SC32300');
        // me.noResize = true;
        me.remoteSort = true;
        me.autoHeight = true;
        me.columns = [{
            header: 'First Name'.l('SC32300'),
            dataIndex: 'FirstName',
            flex: 1,
            name: 'FirstName'
        }, {
            header: 'Surname'.l('SC32300'),
            dataIndex: 'LastName',
            width: 150,
            name: 'LastName'
        }, {
            header: 'Code'.l('SC32300'),
            dataIndex: 'Initial',
            align: 'center',
            width: 100,
            name: 'Initial'
        }, {
            header: 'E-mail'.l('SC32300'),
            dataIndex: 'Email',
            align: 'left',
            width: 200,
            name: 'Email'
        }, {
            header: 'New Business'.l('SC32300'),
            dataIndex: 'NewBusiness',
            align: 'right',
            width: 100,
            name: 'NewBusiness',
            renderer: this.decimalComma
        }, {
            header: 'Deepening'.l('SC32300'),
            dataIndex: 'Deepening',
            align: 'right',
            width: 100,
            name: 'Deepening',
            renderer: this.decimalComma
        }, {
            dataIndex: 'SalesTargetId',
            renderer: this.editsalestarget,
            align: 'center',
            width: 25,
            name: 'editSalesTarget'
        }, {
            hidden: true,
            dataIndex: 'SalesTargetId'
        }, {
            hidden: true,
            dataIndex: 'UserId'
        }];
        me.tbar = ['->', {
            xtype: 'combo',
            name: 'Year',
            displayField: 'Year',
            valueField: 'Year',
            emptyText: "Select Year".l('SC32300'),
            padding: 0,
            anchor: '100%',
            itemid: 'year',
            //value: Ext.Date.format(new Date(), 'Y'),
            store: Ext.getStore('usermanage.SalesTargetYearComboStore')
        }, {
            xtype: 'button',
            iconCls: 'filter',
            disabled: true
        }, {
            xtype: 'searchfield',
            store: Ext.getStore('usermanage.SalesTargetStore'),
            iconCls: 'filter',
            paramName: 'searchParam'
        }];
        me.layout = 'fit';
        me.autoScroll = true;
        me.frame = true;

        me.viewConfig = {
            forceFit: true
        };

        me.bbar = {
            xtype: 'pagingtoolbar',
            store: this.store,
            //pageSize: 5,
            displayInfo: true,
           // displayMsg: 'Displaying topics {0} - {1} of {2}',
            emptyMsg: "No topics to display".l('g')
        };

        me.callParent();
    },

    editsalestarget: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = "Edit Sales Target".l('SC32300'); ;
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'icon-edit';
    },
    decimalComma: function (value, metadata, record, rowIndex, colIndex, store) {        
        if (value != null)
            return String(value).replace('.', Ext.util.Format.decimalSeparator);
        else
            return '';
        //    return 1;
    }
});