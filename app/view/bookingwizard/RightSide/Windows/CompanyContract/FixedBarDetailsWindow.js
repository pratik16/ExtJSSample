Ext.define('Regardz.view.bookingwizard.RightSide.Windows.CompanyContract.FixedBarDetailsWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.fixedbardetailswindow',
    modal: true,
    border: false,
    title: 'Fixed Bar Details_Title'.l('SC50340'),
    iconCls: 'contract',
    width: '50%',
    companyName: null,
    initComponent: function () {

        var me = this;

        me.itemid = 'fixedpackagedetailsitems';
        me.width = '80%';

        me.PropertyId = me.propertyId;
        
        me.PurchaseConditions = {};

        me.fixedBarDetails = Ext.create('Ext.grid.Panel', {
            store: 'bookingwizard.RightSide.Windows.CompanyContract.FixedBarDetailsStore',
            itemid: "fixedBarGrid",
            title: "Packages".l("SC50340"),
            height: 200,
            width: '97%',
            margin: '10',
            noResize: true,
            columns: [
                { baseCls: '', width: 150, header: 'Name'.l('SC50340'), dataIndex: 'Name', flex: 1 },
                { baseCls: '', header: 'Category'.l('SC50340'), dataIndex: 'Duration', flex: 1 },
                { baseCls: '', header: 'Type'.l('SC50340'), dataIndex: 'FPType', flex: 1 },
                { baseCls: '', header: 'Price/Person'.l('SC50340'), dataIndex: 'Price', flex: 1, renderer: this.renderFormat, align: 'right' },
                { hidden: true, dataIndex: 'ContractId', hideable: false }
            ]
        });

        me.items = [me.fixedBarDetails];

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