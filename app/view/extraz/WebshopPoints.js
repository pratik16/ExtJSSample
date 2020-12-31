Ext.define('Regardz.view.extraz.WebshopPoints', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.webshoppoints',
    loadMask: true,
    requires: [
		'Ext.ux.form.SearchField'
	],
    layout: 'hbox',
    border: false,
    style: 'background:none; border:0px;',
    padding: 0,
    margin: 0,
    frame: true,
    initComponent: function () {

        var me = this;
        me.title = 'Extraaz Points_Title'.l('SC37200');
        me.items = [{
            xtype: 'extrazpointsindividualList',
            padding: '5px',
            width: '60%'
        }, {
            xtype: 'extrazpointslist',
            padding: '5px',
            width: '40%'
        }];
        me.callParent();
    }
});