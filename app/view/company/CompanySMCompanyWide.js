Ext.require([
    'Ext.data.*',
    'Ext.grid.*',
    'Ext.tree.*',
    'Ext.ux.CheckColumn'
]);

Ext.define('Regardz.view.company.CompanySMCompanyWide', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.companysmcompanywide',
    id: 'companysmcompanywide',
    title: 'Company Wide Targets'.l('SC61100'),
    collapsible: true,
    useArrows: true,
    rootVisible: false,
    store: 'company.CompanywideStore',
    multiSelect: true,
    singleExpand: true,
    frame: true,
    width: parseInt(Ext.getBody().getViewSize().width * (0.90)),
    initComponent: function () {

        var me = this;
        if (Ext.getCmp('companysmcompanywide')) {
            Ext.getCmp('companysmcompanywide').destroy();
        }
        me.rootVisible = false;
        me.layout = 'fit';
        //the 'columns' property is now 'headers'
        me.columns = [{
            xtype: 'treecolumn', //this is so we know which column will show the tree
            text: 'Companies'.l('SC61100'),
            sortable: true,
            width: '19%',
            dataIndex: 'CompanyName'
        }, {
            id: 'firstyear',
            columns: [
            {
                text: 'Revenu'.l('SC61100'),
                columns: [
                {
                    xtype: 'numbercolumn',
                    text: 'Own'.l('SC61100'),
                    align: 'center',
                    width: 70,
                    format: '0.00',
                    dataIndex: 'FirstYearRevenueOwn'
                }, {
                    xtype: 'numbercolumn',
                    text: 'Total'.l('SC61100'),
                    align: 'center',
                    width: 70,
                    format: '0.00',
                    dataIndex: 'FirstYearRevenueTotal'
                }]
            }, {
                //                text: ' ',
                //                columns: [
                //                {
                xtype: 'numbercolumn',
                text: '%',
                align: 'center',
                width: 70,
                format: '0.0',
                dataIndex: 'FirstYearPercentage'
                //                }]
            }, {
                text: 'Target'.l('SC61100'),
                columns: [
                {
                    xtype: 'numbercolumn',
                    text: 'Own'.l('SC61100'),
                    width: 70,
                    align: 'center',
                    format: '0.00',
                    dataIndex: 'FirstYearOwn'
                }, {
                    xtype: 'numbercolumn',
                    text: 'Total'.l('SC61100'),
                    width: 70,
                    align: 'center',
                    format: '0.00',
                    dataIndex: 'FirstYearTotal'
                }]
            }]
        }, {
            id: 'secondyear',
            columns: [
            {
                text: 'Revenu'.l('SC61100'),
                columns: [
                {
                    xtype: 'numbercolumn',
                    width: 70,
                    text: 'Own'.l('SC61100'),
                    align: 'center',
                    format: '0.00',
                    dataIndex: 'SecondYearRevenueOwn'
                }, {
                    xtype: 'numbercolumn',
                    width: 70,
                    text: 'Total'.l('SC61100'),
                    align: 'center',
                    format: '0.00',
                    dataIndex: 'SecondYearRevenueTotal'
                }]
            }, {
                xtype: 'numbercolumn',
                text: '%',
                align: 'center',
                width: 70,
                format: '0.0',
                dataIndex: 'SecondYearPercentage'
                //                }]
            }, {
                text: 'Target'.l('SC61100'),
                columns: [
                {
                    xtype: 'numbercolumn',
                    text: 'Own'.l('SC61100'),
                    align: 'center',
                    width: 70,
                    format: '0.00',
                    dataIndex: 'SecondYearOwn'
                }, {
                    xtype: 'numbercolumn',
                    text: 'Total'.l('SC61100'),
                    align: 'center',
                    width: 70,
                    format: '0.00',
                    dataIndex: 'SecondYearTotal'
                }]
            }]
        }, {
            id: 'thirdyear',
            columns: [
            {
                text: 'Revenu'.l('SC61100'),
                columns: [
                {
                    xtype: 'numbercolumn',
                    width: 70,
                    text: 'Own'.l('SC61100'),
                    align: 'center',
                    format: '0.00',
                    dataIndex: 'ThirdYearRevenueOwn'
                }, {
                    xtype: 'numbercolumn',
                    text: 'Total'.l('SC61100'),
                    width: 70,
                    align: 'center',
                    format: '0.00',
                    dataIndex: 'ThirdYearRevenueTotal'
                }]
            }, {
                xtype: 'numbercolumn',
                text: '%',
                align: 'center',
                width: 70,
                format: '0.0',
                dataIndex: 'ThirdYearPercentage'
                //                }]
            }, {
                text: 'Target'.l('SC61100'),
                columns: [
                {
                    xtype: 'numbercolumn',
                    text: 'Own'.l('SC61100'),
                    align: 'center',
                    width: 70,
                    format: '0.00',
                    dataIndex: 'ThirdYearOwn'
                }, {
                    xtype: 'numbercolumn',
                    text: 'Total'.l('SC61100'),
                    align: 'center',
                    width: 70,
                    format: '0.00',
                    dataIndex: 'ThirdYearTotal'
                }]
            }]
        }, {
            hidden: true,
            dataIndex: 'CompanyId',
            hideable: false
        }];
        me.callParent();
    }
});