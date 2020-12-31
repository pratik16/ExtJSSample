Ext.define('Regardz.view.extraz.ExtrazPointsIndividualList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.extrazpointsindividualList',
    store: 'extraz.ExtrazIndividualListStore',

    requires: [
		'Ext.ux.form.SearchField'
	],

    loadMask: true,

    initComponent: function () {

        if (Ext.getCmp('City'))
            Ext.getCmp('City').destroy();

        if (Ext.getCmp('E-mail'))
            Ext.getCmp('E-mail').destroy();

        if (Ext.getCmp('Contact'))
            Ext.getCmp('Contact').destroy();

        var me = this;
        me.autoScroll = true;
        //me.height = parseInt(Ext.getBody().getViewSize().height * (0.83));
        me.viewConfig = {
            forceFit: true
        };
        me.title = 'Users'.l('SC37200');
        me.noResize = true;
        me.columns = [{
            header: 'Name'.l('SC37200'),
            dataIndex: 'IndividualName',
            flex: 1
        }, {
            header: 'Street'.l('SC37200'),
            dataIndex: 'Address1',
            flex: 1
        }, {
            header: 'E-mail'.l('SC37200'),
            dataIndex: 'Email',
            flex: 1
        }, {
            header: 'City'.l('SC37200'),
            dataIndex: 'City',
            width: 100
        }, {
            header: 'Extraaz'.l('SC37200'),
            dataIndex: 'Extras',
            width: 75
        }, {
            hidden: true,
            dataIndex: 'WebShopCategoryId',
            hideable: false
        }];

        me.tbar = [{
            xtype: 'textfield',
            fieldLabel: 'Contact'.l('SC37200'),
            width: 200,
            labelAlign: 'right',
            labelWidth: 75,
            name: 'Contact',
            id: 'Contact',
            action: 'actionContact'
        }, {
            xtype: 'textfield',
            fieldLabel: 'E-mail'.l('SC37200'),
            width: 200,
            labelWidth: 75,
            labelAlign: 'right',
            name: 'E-mail',
            id: 'E-mail',
            action: 'actionEmail'
        }, {
            xtype: 'textfield',
            width: 200,
            labelWidth: 75,
            labelAlign: 'right',
            fieldLabel: 'City'.l('SC37200'),
            id: 'City',
            action: 'actionCity'
        }/*, '->', {
            xtype: 'button',
            iconCls: 'filter',
            action: 'filterIndividualList'
        }*/];

        me.callParent();
    }
});