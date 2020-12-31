Ext.define('Regardz.view.company.IndividualProfile', {
    extend: 'Ext.window.Window',
    alias: 'widget.individualprofile',
    modal: true,

    initComponent: function () {

        if (Ext.getCmp('individual_overview'))
            Ext.getCmp('individual_overview').destroy();

        var me = this;
        me.tabDisabled = true;

        if (me.IndividualId > 0) {
            me.tabDisabled = false;
        }

        me.autoScroll = true;
        me.height = parseInt(Ext.getBody().getViewSize().height * (0.95));
        //me.width = 700;

        me.iddivoverview = Ext.create('widget.overview_I', { IndividualId: me.IndividualId }); me.iddivoverview.height = me.height - 100;
        me.indivedit = Ext.create('widget.edit', { IndividualId: me.IndividualId }); me.indivedit.height = me.height - 100;
        me.indivSales = Ext.create('widget.sales_i'); me.indivSales.height = me.height - 100;

        me.checkboxconfigs = [];
        me.windowWidth = parseInt(Ext.getBody().getViewSize().width * (0.90));
        me.windowHeight = parseInt(Ext.getBody().getViewSize().height * (0.95));
        //me.layout = 'fit';

        Ext.apply(me, {
            title: 'Individual Profile_Title'.l('SC61300'), //.l('PropertyEdit'),
            autoShow: true,
            y: 0,
            bodyStyle: 'background: none',
            closable: true,
            resizable: true,
            buttonAlign: 'right',
            //layout: 'fit',
            width: me.windowWidth,
            height: me.windowHeight,
            border: false,
            items: [
            { xtype: 'form', hidde: true, name: 'IndividualProileWinForm', id: 'IndividualProileWinForm', items: [{ xtype: 'hidden', name: 'IndividualId', value: me.IndividualId}] },
            {
                xtype: 'tabpanel',
                activeTab: 0,
                id: 'individual_overview',
                plain: false,
                border: false,
                bodyPadding: 1,
                padding: 5,
                cls: 'propertyEdit',
                layout: 'form',
                style: 'background:none; border:0px;',
                items: [
                {
                    title: 'Overview'.l('SC61300'),
                    name: 'individualoverview',
                    disabled: me.tabDisabled,
                    items: me.iddivoverview
                }, {
                    title: 'Edit'.l('SC61300'),
                    name: 'indivedit',
                    items: me.indivedit
                }, {
                    title: 'Sales'.l('SC61300'),
                    name: 'sales',
                    items: me.indivSales
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
                action: 'saveIndividual'
                //                handler: function () {
                //                    Ext.Msg.alert('Success'.l('g'), 'Information saved successfully');
                //                    me.destroy();
                //                }
            }]
        }];
        me.callParent();

    }
});