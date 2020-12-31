Ext.define('Regardz.view.configuration.ReportMainCategoryManage', {
    extend: 'Ext.window.Window',
    alias: 'widget.reportmaincategorymanage',
    modal: true,
    border: false,
    title: 'Main Category Add_Title'.l('SC20130'),
    categoryName: null,
    categoryId: null,
    editMode: null,
    initComponent: function () {

        var me = this;

        me.itemid = 'maincategoryaddid';
        me.langClass = 'languagebutton';
        me.width = 400;
        me.items = [{
            xtype: 'panel',
            frame: true,
            padding: 15,
            layout: 'hbox',
            items: [
                 {
                     xtype: 'label',
                     text: 'Name'.l('SC20130'),
                     margin: 10
                 },
                        {
                            xtype: 'textfield',
                            name: 'categoryname',
                            value: me.categoryName,
                            itemid: 'categoryTextFieldId',
                            width: 200,
                            margin: 10
                        },
                        {
                            xtype: 'hidden',
                            itemid: 'reportCategoryId',
                            value: me.categoryId
                        }
            ]
        }];

        me.dockedItems = [{
            dock: 'bottom',
            buttonAlign: 'right',
            buttons: [
                {
                    text: 'Cancel'.l('w'),
                    handler: function () {
                        me.destroy();
                    }
                },
                {
                    text: 'Save'.l('w'),
                    action: 'saveReportMainCategory',
                    itemid: 'addReportMainCategory'
                }

            ]
        },
        {
            dock: 'top',
            buttonAlign: 'right',
            buttons: [
                '->', {
                    itemid: 'mainCategoryEditLanguageButtonId',
                    action: 'mainCategoryEditLanguageAction',
                    categoryId: me.categoryId,
                    iconCls: me.langClass,
                    hidden: !me.editMode,
                    tooltip: 'Update multilingual contents'.l('g')
                }
            ]
        }];
        me.callParent(arguments);
    }
});