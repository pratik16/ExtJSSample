Ext.define('Regardz.view.company.ContactManageTabs', {
    extend: 'Ext.window.Window',
    alias: 'widget.contactmanagetabs',
    modal: true,

    initComponent: function () {
        var me = this;

        me.autoScroll = true;
        me.height = parseInt(Ext.getBody().getViewSize().height * (0.95));
//        alert('this is in TAB compnayID : ' + me.CompanyId);
//        alert('this is in TAB IndividualId : ' + me.IndividualId);
        me.contGenInfo = Ext.create('widget.contactmanage', { IndividualId: me.IndividualId, CompanyId: me.CompanyId }); me.contGenInfo.height = me.height - 100;
        me.contSalesInfo = Ext.create('widget.sales_c'); me.contSalesInfo.height = me.height - 100;
        me.contComments = Ext.create('widget.comments_c'); me.contComments.height = me.height - 100;

        me.checkboxconfigs = [];
        me.windowWidth = parseInt(Ext.getBody().getViewSize().width * (0.90));
        me.windowHeight = parseInt(Ext.getBody().getViewSize().height * (0.95));

        Ext.apply(me, {
            title: 'Contact Edit_Title'.l('SC61120'),
            autoShow: true,
            y: 0,
            bodyStyle: 'background: none',
            closable: true,
            resizable: true,
            buttonAlign: 'right',
            width: me.windowWidth,
            height: me.windowHeight,
            border: false,
            items: [
            {
                xtype: 'tabpanel',
                activeTab: 0,
                width: me.windowWidth - 20,
                plain: false,
                border: false,
                //frame: true,
                bodyPadding: 1,
                padding: 5,
                cls: 'propertyEdit',
                layout: 'form',
                style: 'background:none; border:0px;',
                items: [
                {
                    title: 'General Info'.l('SC61120'),
                    name: 'contactManageGenInfo',
                    items: me.contGenInfo
                }, {
                    title: 'Sales Info'.l('SC61120'),
                    name: 'contactManageSalesInfo',
                    items: me.contSalesInfo
                }, {
                    title: 'Comments'.l('SC61120'),
                    name: 'contactManageComments',
                    items: me.contComments
                }, {
                    xtype: 'hidden',
                    name: 'CompanyId',
                    value: me.CompanyId
                }, {
                    xtype: 'hidden',
                    name: 'IndividualId',
                    value: me.IndividualId
                }]
            }]
        });
        me.dockedItems = [{
            dock: 'bottom',
            align: 'right',
            buttonAlign: 'right',
            buttons: [{
                text: 'Cancel'.l('w'),
                action: 'cancel',
                handler: function () {
                    me.destroy();
                }
            }, {
                text: 'Save'.l('w'),
                action: 'saveContact'
            }]
        }];
        me.callParent();
    }
});