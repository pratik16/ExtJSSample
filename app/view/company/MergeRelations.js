Ext.define('Regardz.view.company.MergeRelations', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mergerelations',
    //store: 'company.MergeCompaniesStore',
    id: 'mergerelations',
    itemid: 'mergerelations',
    modal: true,
    border: false,
    autoShow: true,
    width: parseInt(Ext.getBody().getViewSize().width * (0.95)),
    layout: 'hbox',

    initComponent: function () {
        if (Ext.getCmp('MergeRelations'))
            Ext.getCmp('MergeRelations').destroy();

        if (Ext.getCmp('MergeRelations2'))
            Ext.getCmp('MergeRelations2').destroy();

        var me = this;
        me.layout = 'hbox';
        me.items = [
        {
            xtype: 'form',
            id: 'MergeRelations',
            border: false,
            //width: parseInt(me.width * (0.57)),
            bodyStyle: 'padding:5px 5px 0',
            fieldDefaults: { msgTarget: 'side', labelWidth: 100 },
            defaults: { anchor: '100%' },
            layout: { type: 'table', columns: 6 },
            fileUpload: true,
            items: [
                {
                    xtype: 'fieldset',
                    title: 'Parent'.l('SC61140'),
                    width: parseInt(me.width * (0.40)),
                    layout: 'anchor',
                    defaults: { anchor: '100%' },
                    items: [{ xtype: 'displayfield', fieldLabel: 'Parent'.l('SC61140'), name: 'ParentCompanyName', labelWidth: 155, itemid: 'ParentCompanyNameL'
                    }, { xtype: 'hidden', itemid: 'ParentCompanyIdL', name: 'ParentCompanyId'}]
                },
                { xtype: 'tbspacer', width: 40 },
                { xtype: 'button', width: 40, action: 'ButtonPressed', itemid:'btnParentCompanyL', value: 1, text: '1', pressed: true, enableToggle: true, toggleGroup: "Relations1" },
                { xtype: 'tbspacer', width: 5 },
                { xtype: 'button', width: 40, action: 'ButtonPressed', itemid: 'btnParentCompanyR', disabled: true, value: 2, text: '2', enableToggle: true, toggleGroup: "Relations1" },
                { xtype: 'tbspacer', width: 40 },
                {
                    xtype: 'mergechildcompanylist',
                    //itemid: 'childcompanylist',
                    height: 380,
                    width: parseInt(me.width * (0.40)),
                    autoScroll: true
                },
                { xtype: 'tbspacer', width: 40 },
                { xtype: 'tbspacer', width: 40 },
                { xtype: 'tbspacer', width: 5 },
                { xtype: 'tbspacer', width: 40 },
                { xtype: 'tbspacer', width: 40}]
        },
        {
            xtype: 'form',
            id: 'MergeRelations2',
            border: false,
            bodyStyle: 'padding:5px 5px 0',
            fieldDefaults: { msgTarget: 'side', labelWidth: 100 },
            defaults: { anchor: '100%' },
            //width: parseInt(me.width * (0.43)),
            fileUpload: true,
            items: [
                {
                    xtype: 'fieldset',
                    title: 'Parent'.l('SC61140'),
                    width: parseInt(me.width * (0.40)),
                    layout: 'anchor',
                    defaults: { anchor: '100%' },
                    items: [{ xtype: 'displayfield', fieldLabel: 'Parent'.l('SC61140'), name: 'ParentCompanyName', labelWidth: 155, itemid: 'ParentCompanyNameR'
                    }, { xtype: 'hidden', itemid: 'ParentCompanyIdR', name: 'ParentCompanyId'}]
                }, {
                    xtype: 'mergechildcompanylist2',
                    itemid: 'mergechildcompanylist2',
                    height: 380,
                    width: parseInt(me.width * (0.40)),
                    autoScroll: true
                },
                {
                    xtype: 'checkbox',
                    boxLabel: 'Accept'.l('SC61140'),
                    itemid: 'relationTabAccept',
                    inputValue: true,
                    width: '40%'
                }]
        },{ xtype: 'hidden', itemid: 'MergeRelationsBtn1', value: 1}];

        me.callParent(arguments);
    }
});
