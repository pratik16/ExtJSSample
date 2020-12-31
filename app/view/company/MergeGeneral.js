Ext.define('Regardz.view.company.MergeGeneral', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mergegeneral',
    //store: 'company.MergeCompaniesStore',
    id: 'mergegeneral',
    itemid: 'mergegeneral',
    modal: true,
    border: false,
    autoShow: true,
    width: parseInt(Ext.getBody().getViewSize().width * (0.95)),
    layout: 'hbox',
     
    initComponent: function () {
        if (Ext.getCmp('MergeGeneral'))
            Ext.getCmp('MergeGeneral').destroy();

        if (Ext.getCmp('MergeGeneral2'))
            Ext.getCmp('MergeGeneral2').destroy();

        var me = this;
        me.layout = 'hbox';
        //me.frame = true;
        me.items = [
        {
            xtype: 'form',
            id: 'MergeGeneral',
            border: false,
            //width: parseInt(me.width * (0.60)),
            bodyStyle: 'padding:5px 5px 0',
            fieldDefaults: { msgTarget: 'side', labelWidth: 100 },
            defaults: { anchor: '100%' },
            layout: { type: 'table', columns: 6 },
            fileUpload: true,
            items: [
                {
                    xtype: 'fieldset',
                    title: 'General Info'.l('SC61140'),
                    width: parseInt(me.width * (0.40)),
                    layout: 'anchor',
                    defaults: { anchor: '100%', height: 22 },
                    items:
                    [{
                        xtype: 'displayfield',
                        fieldLabel: 'Phone'.l('SC61140'),
                        name: 'Phone',
                        itemid: 'Phone1',
                        labelWidth: 155
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Fax'.l('SC61140'),
                        name: 'Fax',
                        itemid: 'Fax1',
                        labelWidth: 155
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Market segment'.l('SC61140'),
                        name: 'MarketSourceName',
                        itemid: 'MarketSourceId1',
                        labelWidth: 155
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'SICC'.l('SC61140'),
                        name: 'SicName',
                        itemid: 'SicId1',
                        labelWidth: 155
                    }, { xtype: 'hidden', itemid: 'MarketSourceIdL', name: 'MarketSourceId' }, { xtype: 'hidden', itemid: 'SicIdL', name: 'SicId'}]
                }, { xtype: 'tbspacer', width: 40 }, {
                    xtype: 'panel',
                    //frame: true,
                    border: false,
                    style: 'background:none; border:0px;',
                    layout: 'vbox',
                    //padding: '0 0 20px 0',
                    items:
                        [{ xtype: 'tbspacer', height: 5 }, { xtype: 'button', width: 40, action: 'ButtonPressed', value: 1, text: '1', pressed: true, enableToggle: true, toggleGroup: "General1" },
                        { xtype: 'tbspacer', height: 5 }, { xtype: 'button', width: 40, action: 'ButtonPressed', value: 1, text: '1', pressed: true, enableToggle: true, toggleGroup: "General2" },
                        { xtype: 'tbspacer', height: 5 }, { xtype: 'button', width: 40, action: 'ButtonPressed', value: 1, text: '1', pressed: true, enableToggle: true, toggleGroup: "General3" },
                        { xtype: 'tbspacer', height: 5 }, { xtype: 'button', width: 40, action: 'ButtonPressed', value: 1, text: '1', pressed: true, enableToggle: true, toggleGroup: "General4"}]
                }, { xtype: 'tbspacer', width: 5 }, {
                    xtype: 'panel',
                    //frame: true,
                    border: false,
                    style: 'background:none; border:0px;',
                    layout: 'vbox',
                    //padding: '0 0 20px 0',
                    items:
                        [{ xtype: 'tbspacer', height: 5 }, { xtype: 'button', width: 40, action: 'ButtonPressed', value: 2, text: '2', enableToggle: true, toggleGroup: "General1" },
                        { xtype: 'tbspacer', height: 5 }, { xtype: 'button', width: 40, action: 'ButtonPressed', value: 2, text: '2', enableToggle: true, toggleGroup: "General2" },
                        { xtype: 'tbspacer', height: 5 }, { xtype: 'button', width: 40, action: 'ButtonPressed', value: 2, text: '2', enableToggle: true, toggleGroup: "General3" },
                        { xtype: 'tbspacer', height: 5 }, { xtype: 'button', width: 40, action: 'ButtonPressed', value: 2, text: '2', enableToggle: true, toggleGroup: "General4" }]
                }, { xtype: 'tbspacer', width: 40 }, {
                    xtype: 'fieldset',
                    title: 'Internet Info'.l('SC61140'),
                    width: parseInt(me.width * (0.40)),
                    layout: 'anchor',
                    defaults: { anchor: '100%', height: 22 },
                    items:
                    [{
                        xtype: 'displayfield',
                        fieldLabel: 'Web address'.l('SC61140'),
                        name: 'Website',
                        itemid: 'Website1',
                        labelWidth: 155
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Twitter'.l('SC61140'),
                        name: 'Twitter',
                        itemid: 'Twitter1',
                        labelWidth: 155
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Facebook'.l('SC61140'),
                        name: 'Facebook',
                        itemid: 'Facebook1',
                        labelWidth: 155
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'LinkedIn'.l('SC61140'),
                        name: 'LinkedIn',
                        itemid: 'LinkedIn1',
                        labelWidth: 155
                    }]
                }, { xtype: 'tbspacer', width: 40 }, {
                    xtype: 'panel',
                    //frame: true,
                    border: false,
                    style: 'background:none; border:0px;',
                    layout: 'vbox',
                    //padding: '0 0 5 0',
                    items:
                        [{ xtype: 'tbspacer', height: 5 }, { xtype: 'button', action: 'ButtonPressed', width: 40, value: 1, text: '1', pressed: true, toggleGroup: "General5" },
                        { xtype: 'tbspacer', height: 5 }, { xtype: 'button', action: 'ButtonPressed', width: 40, value: 1, text: '1', pressed: true, toggleGroup: "General6" },
                        { xtype: 'tbspacer', height: 5 }, { xtype: 'button', action: 'ButtonPressed', width: 40, value: 1, text: '1', pressed: true, toggleGroup: "General7" },
                        { xtype: 'tbspacer', height: 5 }, { xtype: 'button', action: 'ButtonPressed', width: 40, value: 1, text: '1', pressed: true, toggleGroup: "General8"}]
                }, { xtype: 'tbspacer', width: 5 }, {
                    xtype: 'panel',
                    //frame: true,
                    border: false,
                    style: 'background:none; border:0px;',
                    layout: 'vbox',
                    //padding: '0 0 5 0',
                    items:
                        [{ xtype: 'tbspacer', height: 5 }, { xtype: 'button', action: 'ButtonPressed', width: 40, value: 2, text: '2', toggleGroup: "General5" },
                        { xtype: 'tbspacer', height: 5 }, { xtype: 'button', action: 'ButtonPressed', width: 40, value: 2, text: '2', toggleGroup: "General6" },
                        { xtype: 'tbspacer', height: 5 }, { xtype: 'button', action: 'ButtonPressed', width: 40, value: 2, text: '2', toggleGroup: "General7" },
                        { xtype: 'tbspacer', height: 5 }, { xtype: 'button', action: 'ButtonPressed', width: 40, value: 2, text: '2', toggleGroup: "General8"}]
                }, { xtype: 'tbspacer', width: 40 }]
        },
        {
            xtype: 'form',
            id: 'MergeGeneral2',
            border: false,
            bodyStyle: 'padding:5px 5px 0',
            fieldDefaults: { msgTarget: 'side', labelWidth: 100 },
            defaults: { anchor: '100%' },
            //width: parseInt(me.width * (0.40)),
            fileUpload: true,
            items: [
                {
                    xtype: 'fieldset',
                    title: 'General Info'.l('SC61140'),
                    width: parseInt(me.width * (0.40)),
                    layout: 'anchor',
                    defaults: { anchor: '100%', height: 22 },
                    items:
                    [{
                        xtype: 'displayfield',
                        fieldLabel: 'Phone'.l('SC61140'),
                        name: 'Phone',
                        itemid: 'Phone2',
                        labelWidth: 155
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Fax'.l('SC61140'),
                        name: 'Fax',
                        itemid: 'Fax2',
                        labelWidth: 155
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Market segment'.l('SC61140'),
                        name: 'MarketSourceName',
                        itemid: 'MarketSourceId2',
                        labelWidth: 155
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'SICC'.l('SC61140'),
                        name: 'SicName',
                        itemid: 'SicId2',
                        labelWidth: 155
                    }, { xtype: 'hidden', itemid: 'MarketSourceIdR', name: 'MarketSourceId' }, { xtype: 'hidden', itemid: 'SicIdR', name: 'SicId'}]
                }, {
                    xtype: 'fieldset',
                    title: 'Internet Info'.l('SC61140'),
                    width: parseInt(me.width * (0.40)),
                    layout: 'anchor',
                    defaults: { anchor: '100%', height: 22 },
                    items:
                    [{
                        xtype: 'displayfield',
                        fieldLabel: 'Web address'.l('SC61140'),
                        name: 'Website',
                        itemid: 'Website2',
                        labelWidth: 155
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Twitter'.l('SC61140'),
                        name: 'Twitter',
                        itemid: 'Twitter2',
                        labelWidth: 155
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Facebook'.l('SC61140'),
                        name: 'Facebook',
                        itemid: 'Facebook2',
                        labelWidth: 155
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'LinkedIn'.l('SC61140'),
                        name: 'LinkedIn',
                        itemid: 'LinkedIn2',
                        labelWidth: 155
                    }]
                },

                 {
                     xtype: 'checkbox',
                     boxLabel: 'Accept'.l('SC61140'),
                     itemid: 'generalTabAccept',
                     inputValue: true,
                     width: '40%'              
                 }
                
                ]
            }, { xtype: 'hidden', itemid: 'MergeGeneralBtn1', value: 1 }, { xtype: 'hidden', itemid: 'MergeGeneralBtn2', value: 1 }, { xtype: 'hidden', itemid: 'MergeGeneralBtn3', value: 1 }, { xtype: 'hidden', itemid: 'MergeGeneralBtn4', value: 1 },
            { xtype: 'hidden', itemid: 'MergeGeneralBtn5', value: 1 }, { xtype: 'hidden', itemid: 'MergeGeneralBtn6', value: 1 },{ xtype: 'hidden', itemid: 'MergeGeneralBtn7', value: 1 },{ xtype: 'hidden', itemid: 'MergeGeneralBtn8', value: 1 }];

        me.callParent(arguments);
    },

    FormatFieldValue: function (value, meta, record) {
        meta.value = meta.rawValue;
        meta.tdCls = 'dashboardRedRow';
    }
});