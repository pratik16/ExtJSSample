Ext.define('Regardz.view.company.Sales_I', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.sales_i',
    modal: true,
    border: false,
    autoShow: true,
    width: '100%',
    requires: ['Regardz.view.common.CheckboxRow', 'Ext.ux.form.SearchField'],

    initComponent: function () {

        if (Ext.getCmp('Sales_I'))
            Ext.getCmp('Sales_I').destroy();

        var me = this;

        /*
        me.IndividualContactRole = {
        xtype: 'grid',
        title: 'Contact roles'.l('SC61300'),
        store: Ext.getStore('customer.IndividualContactRoleStore'),
        itemid: 'IndividualContactRole',
        height: 150,
        hideHeaders: true,
        autoScroll: true,
        columns: [{
        flex: 1,
        dataIndex: 'RoleName'
        }, {
        width: 30,
        dataIndex: 'Checked',
        xtype: 'checkboxrow'
        }]           
        };*/
        me.IndividualMailingCode = {
            xtype: 'grid',
            noResize: true,
            title: 'Mailing codes'.l('SC61300'),
            store: Ext.getStore('customer.IndividualMailingCodeStore'),
            itemid: 'IndividualMailingCode',
            cls: 'gridwhitebackground',
            hideHeaders: true,
            autoScroll: true,
            height:'100%',
            columns: [{
                flex: 1,
                dataIndex: 'Code'
            }, {
                width: 30,
                dataIndex: 'Checked',
                xtype: 'checkboxrow'
            }]
            //            tbar: ['->', {
            //                xtype: 'button',
            //                iconCls: 'filter',
            //                disabled: true
            //            }, {
            //                xtype: 'searchfield',
            //                store: Ext.getStore('customer.IndividualMailingCodeStore'),
            //                iconCls: 'filter',
            //                paramName: 'searchString'
            //            }]
        };

        me.IndividualRoomClassification = {
            xtype: 'grid',
            noResize: true,
            title: 'Preferences'.l('SC61300'),
            store: 'customer.IndividualRoomClassificationStore',
            itemid: 'IndividualRoomClassification',
            cls: 'gridwhitebackground',
            hideHeaders: true,
            autoScroll: true,
            height: '100%',            
            columns: [{
                flex: 1,
                dataIndex: 'Classification'
            }, {
                width: 30,
                dataIndex: 'Checked',
                xtype: 'checkboxrow'
            }]
            //            tbar: ['->', {
            //                xtype: 'button',
            //                iconCls: 'filter',
            //                disabled: true
            //            }, {
            //                xtype: 'searchfield',
            //                store: Ext.getStore('customer.IndividualRoomClassificationStore'),
            //                iconCls: 'filter',
            //                paramName: 'searchString'
            //            }]
        };

        me.items = [{
            xtype: 'form',
            id: 'Sales_I',
            border: false,
            bodyStyle: 'padding:5px 5px 0',
            //width: 350,
            fieldDefaults: {
                msgTarget: 'side',
                labelWidth: 110
            },
            defaults: {
                anchor: '100%'
            },

            fileUpload: true,
            items: [{
                xtype: 'panel',
                border: false,
                style: 'background:none; border:0px;',
                layout: 'hbox',
                width: '100%',
                padding: '0 0 5 0',
                items: [{
                    xtype: 'panel',
                    width: '30%',
                    border: false,
                    layout: 'vbox',
                    padding: '0 0 5 0',
                    style: 'background:none; border:0px;',
                    items: [{
                        xtype: 'fieldset',
                        title: 'Sales Information'.l('SC61300'),
                        width: '100%',
                        height: parseInt(Ext.getBody().getViewSize().height * (0.77)),
                        //collapsible: true,
                        defaultType: 'textfield',
                        layout: 'anchor',
                        defaults: {
                            //anchor: '100%'
                        },
                        items: [{
                            xtype: 'container',
                            layout: 'hbox',
                            padding: '0 0 5px 0',
                            flex: 1,
                            items: [{
                                xtype: 'displayfield',
                                fieldLabel: 'Contact owner'.l('SC61300'),
                                name: 'SalesManagerName',
                                flex: 1
                            }, {
                                xtype: 'button',
                                action: 'searchSalesUsers',
                                iconCls: 'searchIcon',
                                margin: '0',
                                tooltip: 'Click here for Select User'.l('SC61140')
                            }]
                        }, /*{
                            xtype: 'combo',
                            fieldLabel: 'Business type'.l('SC61300'),
                            name: 'BusinessTypeId',
                            emptyText: "Select bussiness type".l('SC61300'),
                            store: 'common.BusinessTypeStore',
                            queryMode: 'local',
                            displayField: 'BusinessTypeName',
                            valueField: 'BusinessTypeId',
                            anchor: '100%',
                            value: "1"
                        }, */{
                        xtype: 'combo',
                        name: 'BehaviouralTypeId',
                        fieldLabel: 'Behavioural type'.l('SC61300'),
                        forceSelection: true,
                        queryMode: 'local',
                        displayField: 'TypeName',
                        valueField: 'BehaviouralTypeId',
                        emptyText: "Select behavioural type".l('SC61300'),
                        store: 'common.BehaviouralTypeStore',
                        anchor: '100%'
                    }, {
                        xtype: 'datefield',
                        name: 'WeddingAnniversary',
                        fieldLabel: 'Wedding date'.l('SC61300'),
                        format: usr_dateformat,
                        submitFormat: 'Y-m-d',
                        minDate: new Date(),
                        anchor: '100%'
                    }, {
                        xtype: 'textareafield',
                        grow: true,
                        name: 'Interests',
                        height: parseInt(Ext.getBody().getViewSize().height * (0.77)) / 3 - 20,
                        fieldLabel: 'Interests'.l('SC61300'),
                        maxLength: 500,
                        anchor: '100%'
                    }, {
                        xtype: 'textareafield',
                        name: 'RegardzGimmickReceived',
                        height: parseInt(Ext.getBody().getViewSize().height * (0.77)) / 3 - 20,
                        grow: true,
                        fieldLabel: 'Gimmicks'.l('SC61300'),
                        maxLength: 1000,
                        anchor: '100%'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Delphi ID'.l('SC61300'),
                        vtype: 'numeric',
                        name: 'DelphiID'
                    }]
                }]
            }, {
                xtype: 'tbspacer',
                width: 25
            }, {
                xtype: 'panel',
                width: '30%',
                border: false,
                style: 'background:none; border:0px;',
                layout: 'vbox',
                padding: '0 0 5 0',
                items: [{
                    xtype: 'fieldset',
                    width: '100%',
                    height: parseInt(Ext.getBody().getViewSize().height * (0.77)),
                    title: 'Background Information'.l('SC61300'),
                    //collapsible: true,
                    defaultType: 'textfield',
                    layout: 'anchor',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [{
                        xtype: 'textareafield',
                        grow: true,
                        name: 'ChildrenName',
                        fieldLabel: 'Children names'.l('SC61300'),
                        maxLength: 500,
                        height: parseInt(Ext.getBody().getViewSize().height * (0.77)) / 3 - 20,
                        anchor: '100%'
                    }, {
                        xtype: 'textareafield',
                        name: 'Hobbies',
                        grow: true,
                        fieldLabel: 'Hobbies'.l('SC61300'),
                        maxLength: 500,
                        height: parseInt(Ext.getBody().getViewSize().height * (0.77)) / 3 - 20,
                        anchor: '100%'
                    }, {
                        xtype: 'textareafield',
                        grow: true,
                        name: 'FavoriteHoliday',
                        fieldLabel: 'Favorite holiday'.l('SC61300'),
                        maxLength: 500,
                        height: parseInt(Ext.getBody().getViewSize().height * (0.77)) / 3 - 20,
                        anchor: '100%'
                    }]
                }]
            }, {
                xtype: 'tbspacer',
                width: 25
            }, {
                xtype: 'panel',
                //frame: true,
                width: '30%',
                height: parseInt(Ext.getBody().getViewSize().height * (0.77)),
                border: false,
                style: 'background:none; border:0px;',
                //layout: 'fit',
                height: '100%',
                padding: '0 0 5 0',
                items: [/*{
                    xtype: "container",
                    width: '99%',
                    items: [me.IndividualContactRole],
                    padding: '10px 0 0 0'
                },*/{
                xtype: "container",
                layout: 'fit',
                width: '99%',
                height: '49%',
                items: [me.IndividualMailingCode],
                padding: '10px 0 0 0'
            }, {
                xtype: "container",
                width: '99%',
                layout: 'fit',
                height: '49%',
                items: [me.IndividualRoomClassification],
                padding: '10px 0 0 0'
            }]
        }]
    }]
}];
me.callParent(arguments);
}
});