Ext.define('Regardz.view.company.MergeSales', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mergesales',
    //store: 'company.MergeCompaniesStore',
    id: 'mergesales',
    itemid: 'mergesales',
    modal: true,
    border: false,
    autoShow: true,
    width: parseInt(Ext.getBody().getViewSize().width * (0.95)),
    layout: 'hbox',

    initComponent: function () {
        if (Ext.getCmp('MergeSales'))
            Ext.getCmp('MergeSales').destroy();

        if (Ext.getCmp('MergeSales2'))
            Ext.getCmp('MergeSales2').destroy();

        var me = this;
        me.layout = 'hbox';
        me.items = [
        {
            xtype: 'form',
            id: 'MergeSales',
            border: false,
            //width: '57%',
            bodyStyle: 'padding:5px 5px 0',
            fieldDefaults: { msgTarget: 'side', labelWidth: 100 },
            defaults: { anchor: '100%' },
            layout: { type: 'table', columns: 6 },
            fileUpload: true,
            items: [
                {
                    xtype: 'fieldset',
                    title: 'Sales'.l('SC61140'),
                    width: parseInt(me.width * (0.40)),
                    layout: 'anchor',
                    defaults: { anchor: '100%', height: 22 },
                    items:
                    [{
                        xtype: 'displayfield',
                        fieldLabel: 'Sales manager'.l('SC61140'),
                        name: 'SalesManagerName',
                        itemid: 'SalesManagerNameL',
                        labelWidth: 155
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Sales manager assistant'.l('SC61140'),
                        name: 'SalesManagerAssistantName',
                        itemid: 'SalesManagerAssistantNameL',
                        labelWidth: 155
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Lead source'.l('SC61140'),
                        name: 'LeadSourceName',
                        itemid: 'LeadSourceNameL',
                        labelWidth: 155
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Company status'.l('SC61140'),
                        name: 'CompanyStatusName',
                        labelWidth: 155,
                        itemid: 'CompanyStatusName1'
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Quality rating'.l('SC61140'),
                        name: 'QualityRating',
                        labelWidth: 155,
                        itemid: 'QualityRating1'
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Business type'.l('SC61140'),
                        name: 'BusinessTypeName',
                        itemid: 'BusinessTypeNameL',
                        labelWidth: 155
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Credit status'.l('SC61140'),
                        name: 'CreditStatusName',
                        itemid: 'CreditStatusIdL',
                        labelWidth: 155
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Number of employees'.l('SC61140'),
                        name: 'NoOfEmployees',
                        itemid: 'NoOfEmployeesL',
                        labelWidth: 155
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Bookings per year'.l('SC61140'),
                        name: 'NoOfBookingAYear',
                        itemid: 'NoOfBookingAYearL',
                        labelWidth: 155
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Group size'.l('SC61140'),
                        name: 'GroupSize',
                        itemid: 'GroupSizeL',
                        labelWidth: 155
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Roomnights per year'.l('SC61140'),
                        name: 'NoOfRoomNightsAYear',
                        itemid: 'NoOfRoomNightsAYearL',
                        labelWidth: 155
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Lead status'.l('SC61140'),
                        name: 'LeadStatusName',
                        itemid: 'LeadStatusNameL',
                        labelWidth: 155
                    }, { xtype: 'hidden', itemid: 'SalesManagerId1', name: 'SalesManagerId' }, { xtype: 'hidden', itemid: 'SalesManagerAssistantId1', name: 'SalesManagerAssistantId' }, { xtype: 'hidden', itemid: 'LeadSourceId1', name: 'LeadSourceId' },
                    { xtype: 'hidden', itemid: 'CreditStatusId1', name: 'CreditStatusId' }, { xtype: 'hidden', itemid: 'LeadStatusId1', name: 'LeadStatusId' }, { xtype: 'hidden', itemid: 'BusinessTypeId1', name: 'BusinessTypeId' }, { xtype: 'hidden', itemid: 'CompanyStatusId1', name: 'CompanyStatusId'}]
                }, { xtype: 'tbspacer', width: 40 }, {
                    xtype: 'panel',
                    //frame: true,
                    border: false,
                    style: 'background:none; border:0px;',
                    layout: 'vbox',
                    itemid: 'salesitemidR',
                    //padding: '0 0 20px 0',
                    items:
                        [{ xtype: 'tbspacer', height: 5 }, { xtype: 'button', width: 40, action: 'ButtonPressed', value: 1, text: '1', pressed: true, enableToggle: true, toggleGroup: "Sales1" },
                        { xtype: 'tbspacer', height: 5 }, { xtype: 'button', width: 40, action: 'ButtonPressed', value: 1, text: '1', pressed: true, enableToggle: true, toggleGroup: "Sales2" },
                        { xtype: 'tbspacer', height: 5 }, { xtype: 'button', width: 40, action: 'ButtonPressed', value: 1, text: '1', pressed: true, enableToggle: true, toggleGroup: "Sales3" },
                        { xtype: 'tbspacer', height: 5 }, { xtype: 'button', width: 40, action: 'ButtonPressed', value: 1, text: '1', pressed: true, enableToggle: true, toggleGroup: "Sales4" },
                        { xtype: 'tbspacer', height: 5 }, { xtype: 'button', width: 40, action: 'ButtonPressed', value: 1, text: '1', pressed: true, enableToggle: true, toggleGroup: "Sales5" },
                        { xtype: 'tbspacer', height: 5 }, { xtype: 'button', width: 40, action: 'ButtonPressed', value: 1, text: '1', pressed: true, enableToggle: true, toggleGroup: "Sales6" },
                        { xtype: 'tbspacer', height: 5 }, { xtype: 'button', width: 40, action: 'ButtonPressed', value: 1, text: '1', pressed: true, enableToggle: true, toggleGroup: "Sales7" },
                        { xtype: 'tbspacer', height: 5 }, { xtype: 'button', width: 40, action: 'ButtonPressed', value: 1, text: '1', pressed: true, enableToggle: true, toggleGroup: "Sales8" },
                        { xtype: 'tbspacer', height: 5 }, { xtype: 'button', width: 40, action: 'ButtonPressed', value: 1, text: '1', pressed: true, enableToggle: true, toggleGroup: "Sales9" },
                        { xtype: 'tbspacer', height: 5 }, { xtype: 'button', width: 40, action: 'ButtonPressed', value: 1, text: '1', pressed: true, enableToggle: true, toggleGroup: "Sales10" },
                        { xtype: 'tbspacer', height: 5 }, { xtype: 'button', width: 40, action: 'ButtonPressed', value: 1, text: '1', pressed: true, enableToggle: true, toggleGroup: "Sales11" },
                        { xtype: 'tbspacer', height: 5 }, { xtype: 'button', width: 40, action: 'ButtonPressed', value: 1, text: '1', pressed: true, enableToggle: true, toggleGroup: "Sales12"}]
                }, { xtype: 'tbspacer', width: 5 }, {
                    xtype: 'panel',
                    //frame: true,
                    border: false,
                    style: 'background:none; border:0px;',
                    layout: 'vbox',
                    itemid: 'salesitemidR',
                    //padding: '0 0 20px 0',
                    items:
                        [{ xtype: 'tbspacer', height: 5 }, { xtype: 'button', width: 40, action: 'ButtonPressed', value: 2, text: '2', enableToggle: true, toggleGroup: "Sales1" },
                        { xtype: 'tbspacer', height: 5 }, { xtype: 'button', width: 40, action: 'ButtonPressed', value: 2, text: '2', enableToggle: true, toggleGroup: "Sales2" },
                        { xtype: 'tbspacer', height: 5 }, { xtype: 'button', width: 40, action: 'ButtonPressed', value: 2, text: '2', enableToggle: true, toggleGroup: "Sales3" },
                        { xtype: 'tbspacer', height: 5 }, { xtype: 'button', width: 40, action: 'ButtonPressed', value: 2, text: '2', enableToggle: true, toggleGroup: "Sales4" },
                        { xtype: 'tbspacer', height: 5 }, { xtype: 'button', width: 40, action: 'ButtonPressed', value: 2, text: '2', enableToggle: true, toggleGroup: "Sales5" },
                        { xtype: 'tbspacer', height: 5 }, { xtype: 'button', width: 40, action: 'ButtonPressed', value: 2, text: '2', enableToggle: true, toggleGroup: "Sales6" },
                        { xtype: 'tbspacer', height: 5 }, { xtype: 'button', width: 40, action: 'ButtonPressed', value: 2, text: '2', enableToggle: true, toggleGroup: "Sales7" },
                        { xtype: 'tbspacer', height: 5 }, { xtype: 'button', width: 40, action: 'ButtonPressed', value: 2, text: '2', enableToggle: true, toggleGroup: "Sales8" },
                        { xtype: 'tbspacer', height: 5 }, { xtype: 'button', width: 40, action: 'ButtonPressed', value: 2, text: '2', enableToggle: true, toggleGroup: "Sales9" },
                        { xtype: 'tbspacer', height: 5 }, { xtype: 'button', width: 40, action: 'ButtonPressed', value: 2, text: '2', enableToggle: true, toggleGroup: "Sales10" },
                        { xtype: 'tbspacer', height: 5 }, { xtype: 'button', width: 40, action: 'ButtonPressed', value: 2, text: '2', enableToggle: true, toggleGroup: "Sales11" },
                        { xtype: 'tbspacer', height: 5 }, { xtype: 'button', width: 40, action: 'ButtonPressed', value: 2, text: '2', enableToggle: true, toggleGroup: "Sales12" }]
                }, { xtype: 'tbspacer', width: 30 }]
        },
        {
            xtype: 'form',
            id: 'MergeSales2',
            border: false,
            bodyStyle: 'padding:5px 5px 0',
            fieldDefaults: { msgTarget: 'side', labelWidth: 100 },
            defaults: { anchor: '100%' },
            //width: '43%',
            fileUpload: true,
            items: [
                {
                    xtype: 'fieldset',
                    title: 'Sales'.l('SC61140'),
                    width: parseInt(me.width * (0.40)),
                    layout: 'anchor',
                    defaults: { anchor: '100%', height: 22 },
                    items:
                    [{
                        xtype: 'displayfield',
                        fieldLabel: 'Sales manager'.l('SC61140'),
                        name: 'SalesManagerName',
                        itemid: 'SalesManagerNameR',
                        labelWidth: 155
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Sales manager assistant'.l('SC61140'),
                        name: 'SalesManagerAssistantName',
                        itemid: 'SalesManagerAssistantNameR',
                        labelWidth: 155
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Lead source'.l('SC61140'),
                        name: 'LeadSourceName',
                        itemid: 'LeadSourceNameR',
                        labelWidth: 155
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Company status'.l('SC61140'),
                        name: 'CompanyStatusName',
                        labelWidth: 155,
                        itemid: 'CompanyStatusName2'
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Quality rating'.l('SC61140'),
                        name: 'QualityRating',
                        labelWidth: 155,
                        itemid: 'QualityRating2'
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Business type'.l('SC61140'),
                        name: 'BusinessTypeName',
                        itemid: 'BusinessTypeNameR',
                        labelWidth: 155
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Credit status'.l('SC61140'),
                        name: 'CreditStatusName',
                        itemid: 'CreditStatusIdR',
                        labelWidth: 155
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Number of employees'.l('SC61140'),
                        name: 'NoOfEmployees',
                        itemid: 'NoOfEmployeesR',
                        labelWidth: 155
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Bookings per year'.l('SC61140'),
                        name: 'NoOfBookingAYear',
                        itemid: 'NoOfBookingAYearR',
                        labelWidth: 155
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Group size'.l('SC61140'),
                        name: 'GroupSize',
                        itemid: 'GroupSizeR',
                        labelWidth: 155
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Roomnights per year'.l('SC61140'),
                        name: 'NoOfRoomNightsAYear',
                        itemid: 'NoOfRoomNightsAYearR',
                        labelWidth: 155
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Lead status'.l('SC61140'),
                        name: 'LeadStatusName',
                        itemid: 'LeadStatusNameR',
                        labelWidth: 155
                    }, { xtype: 'hidden', itemid: 'SalesManagerId2', name: 'SalesManagerId' }, { xtype: 'hidden', itemid: 'SalesManagerAssistantId2', name: 'SalesManagerAssistantId' }, { xtype: 'hidden', itemid: 'LeadSourceId2', name: 'LeadSourceId' },
                    { xtype: 'hidden', itemid: 'CreditStatusId2', name: 'CreditStatusId' }, { xtype: 'hidden', itemid: 'LeadStatusId2', name: 'LeadStatusId' }, { xtype: 'hidden', itemid: 'BusinessTypeId2', name: 'BusinessTypeId' }, { xtype: 'hidden', itemid: 'CompanyStatusId2', name: 'CompanyStatusId'}]
                },
                {
                     xtype: 'checkbox',
                     boxLabel: 'Accept',
                     itemid: 'salesTabAccept',
                     inputValue: true,
                     width: parseInt(me.width * (0.40))
                }, { xtype: 'hidden', itemid: 'MergeSalesBtn1', value: 1 }, { xtype: 'hidden', itemid: 'MergeSalesBtn2', value: 1 }, { xtype: 'hidden', itemid: 'MergeSalesBtn3', value: 1 },
                { xtype: 'hidden', itemid: 'MergeSalesBtn4', value: 1 }, { xtype: 'hidden', itemid: 'MergeSalesBtn5', value: 1 }, { xtype: 'hidden', itemid: 'MergeSalesBtn6', value: 1 },
                { xtype: 'hidden', itemid: 'MergeSalesBtn7', value: 1 }, { xtype: 'hidden', itemid: 'MergeSalesBtn8', value: 1 }, { xtype: 'hidden', itemid: 'MergeSalesBtn9', value: 1 },
                { xtype: 'hidden', itemid: 'MergeSalesBtn10', value: 1 }, { xtype: 'hidden', itemid: 'MergeSalesBtn11', value: 1 }, { xtype: 'hidden', itemid: 'MergeSalesBtn12', value: 1}]
            }]        

        me.callParent(arguments);
    }
});
