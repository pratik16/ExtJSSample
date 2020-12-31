Ext.namespace("Ext.ux");

Ext.require([
    'Ext.ux.RowExpander',
    'Ext.selection.CheckboxModel'
]);

Ext.define('Regardz.view.bookingwizard.RightSide.Windows.CompanyContract.FixedPackageDetailsWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.fixedpackagedetailswindow',
    modal: true,
    border: false,    
    iconCls: 'contract',
    width: '50%',
    companyName: null,
    initComponent: function () {

        var me = this;

        me.itemid = 'fixedpackagedetailsitems';
        me.width = '80%';

        me.PurchaseConditions = {};
        me.PropertyId = me.propertyId;

        me.fixedPackageDetails = Ext.create('Ext.grid.Panel', {
            store: 'bookingwizard.RightSide.Windows.CompanyContract.FixedPackageDetailsStore',
            itemid: "purchaseConditionsGrid",
            title: "Packages".l("SC50310"),
            height: 200,
            width: '97%',
            margin: '10',
            noResize: true,
            viewConfig: {
                forceFit: true
            },
            autoHeight: true,
            plugins: [{
                ptype: 'rowexpander',
                rowBodyTpl: [
                // '<p><b>Name:</b> {Name}</p><br>',
                        '<p><b>' + 'Description'.l('SC50310') + ':</b><br /> {Description}</p>'
                //'<p><b>Price:</b> {Price}</p>'
                ]
            }],
            columns: [
                { baseCls: '', header: 'Name'.l('SC50310'), dataIndex: 'Name', flex: 1 },
                { baseCls: '', header: 'Category'.l('SC50310'), dataIndex: 'Duration', width: 150 },
                { baseCls: '', header: 'Type'.l('SC50310'), dataIndex: 'FPType', width: 150 },
                { baseCls: '', header: 'Price/Person'.l('SC50310'), dataIndex: 'Price', width: 150, renderer: this.renderFormat, align: 'right' },
                { hidden: true, dataIndex: 'ContractId', hideable: false }
            ]
        });

        me.items = [me.fixedPackageDetails];

        me.dockedItems = [{
            dock: 'bottom',
            buttonAlign: 'right',
            buttons: [
                {
                    text: 'Close'.l('w'),
                    handler: function () {
                        me.destroy();
                    }
                }
            ]
        }];
        me.callParent(arguments);
    },
    renderFormat: function (value, metadata, record, rowIndex, colIndex, store) {
        return Ext.util.Format.number(value, '0,000.00'); ;
    }
});