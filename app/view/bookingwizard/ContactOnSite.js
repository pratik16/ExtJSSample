Ext.define('Regardz.view.bookingwizard.ContactOnSite', {
    extend: 'Ext.window.Window',
    alias: 'widget.contactonsite',
    modal: true,
    border: false,
    title: 'Contact On Site_Title'.l('SC55200'),
    initComponent: function () {

        var me = this;
        me.items = [{
            xtype: 'grid',
			itemid: 'contactonsite',
			title: 'Items'.l('SC55200'),
			width: 500,
			store: Ext.getStore('bookingwizard.ContactOnSiteStore'),
			viewConfig: {
				forceFit: true
			},
			height: 245,
			frame: false,
			autoScroll: true,
			autoExpandColumn: 'name',
			columns: [

				{ header: "Name".l('SC55200'), sortable: true, dataIndex: 'Name', name: 'Name', flex: 1 },
				{ header: "Salutation".l('SC55200'), width: 100, align: 'center', sortable: true, name: 'Salutation', dataIndex: 'Salutation' },
				{ header: "E-mail address".l('SC55200'), width: 100, align: 'center', sortable: true, name: 'Email', dataIndex: 'Email' },
				{ header: "Role".l('SC55200'), width: 100, align: 'center', sortable: true, name: 'Role', dataIndex: 'Role' },
				{ width: 50, align: 'center', dataIndex: 'Other'}
			],
			tbar: [
				
			],
            buttons: [{
                text: 'Save'.l('g'),
                handler: function () {
                    me.close();
                }
            }, {
                text: 'Cancel'.l('g'),
				handler: function () {
                    me.close();
                }
            }]
        }];
		
        me.callParent(arguments);
    }
});