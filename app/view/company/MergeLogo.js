Ext.define('Regardz.view.company.MergeLogo', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mergelogo',
    //store: 'company.MergeCompaniesStore',
    id: 'mergelogo',
    itemid: 'mergelogo',
    modal: true,
    border: false,
    autoShow: true,
    width: parseInt(Ext.getBody().getViewSize().width * (0.95)),
    layout: 'hbox',

    initComponent: function () {
        if (Ext.getCmp('MergeLogo'))
            Ext.getCmp('MergeLogo').destroy();

        if (Ext.getCmp('MergeLogo2'))
            Ext.getCmp('MergeLogo2').destroy();

        var me = this;
        me.layout = 'hbox';
        me.items = [
        {
            xtype: 'form',
            id: 'MergeLogo',
            border: false,
            //width: parseInt(me.width * (0.55)),
            bodyStyle: 'padding:5px 5px 0',
            fieldDefaults: { msgTarget: 'side', labelWidth: 100 },
            defaults: { anchor: '100%' },
            layout: { type: 'table', columns: 6 },
            fileUpload: true,
            items: [
                    {
                        xtype: 'image',
                        title: 'Preview'.l('g'),
                        height: 400,
                        width: parseInt(me.width * (0.40)),
                        style: "border: 1px solid",
                        itemid: 'imageThumbL',
                        alias: 'imageThumbL',
                        border: true
                    },
                    { xtype: 'tbspacer', width: 40 },
                    { xtype: 'button', width: 40, value: 1, text: '1', action: 'ButtonPressed', pressed: true, enableToggle: true, toggleGroup: "Logo1" }, { xtype: 'tbspacer', width: 5 },
                    { xtype: 'button', width: 40, value: 2, text: '2', action: 'ButtonPressed', enableToggle: true, toggleGroup: "Logo1" }, { xtype: 'tbspacer', width: 40 }
                   ]
        },
        {
            xtype: 'form',
            id: 'MergeLogo2',
            border: false,
            bodyStyle: 'padding:5px 5px 0',
            fieldDefaults: { msgTarget: 'side', labelWidth: 100 },
            defaults: { anchor: '100%' },
            //width: parseInt(me.width * (0.45)),
            fileUpload: true,
            items: [
                {
                    xtype: 'image',
                    title: 'Preview'.l('g'),
                    height: 400,
                    width: parseInt(me.width * (0.40)),
                    style: "border: 1px solid",
                    itemid: 'imageThumbR',
                    alias: 'imageThumbR',
                    border: true
                },
                {
                    xtype: 'checkbox',
                    boxLabel: 'Accept'.l('SC61140'),
                    itemid: 'logoTabAccept',
                    inputValue: true,
                    width: '40%'
                }
                ]
            }, { xtype: 'hidden', itemid: 'MergeLogoBtn1', value: 1 }, { xtype: 'hidden', itemid: 'LogoValue1', value: '' }, { xtype: 'hidden', itemid: 'LogoValue2', value: ''}];

        me.callParent(arguments);
    }
});
