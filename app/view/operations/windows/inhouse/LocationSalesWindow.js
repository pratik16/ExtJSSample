Ext.define('Regardz.view.operations.windows.inhouse.LocationSalesWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.inhouselocationsales',
    modal: true,
    border: false,
    title: 'Set Sales on location_Title'.l('SC71210'),
    width: 400,
    padding: 10,
    BookingId:0,
    initComponent: function () {
        var me = this;
        me.salesStore = new Ext.data.SimpleStore({
            fields: ['Name', 'Value'],
            data: [
                ['Yes'.l('SC71210'), 1],
                ['Yes, agreement with contect on location'.l('SC71210'), 3],
                ['Yes, agreement with booker'.l('SC71210'), 4]
            ]
        });
        me.items = [
          {
              xtype: 'fieldcontainer',
              fieldLabel: 'Sales on location'.l('SC71210'),
              labelWidth: 150,
              margin: '10 0 0 0',
              items: [{
                  xtype: 'combo',
                  store: me.salesStore,
                  itemid: 'inhouseComboSalesOnLocationOptions',
                  width: 200,
                  displayField: 'Name',
                  valueField: 'Value'
              }]
          },
          {
              xtype: 'textfield',
              hidden: true,
              itemid: 'inhouseSalesCurrentBooking',
              value:me.BookingId
          }
        ]
        me.buttons = [
        {
            text: 'Close'.l('g'),
            handler: function () {
                me.close();
            }
        },
        {
            text: 'Save'.l('g'),
            action: 'inhouseSalesSave'
        }];
        me.callParent();
    }
});