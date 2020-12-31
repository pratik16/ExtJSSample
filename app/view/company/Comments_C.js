Ext.define('Regardz.view.company.Comments_C', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.comments_c',
    modal: true,
    border: false,
    autoShow: true,
    width: '100%',
    //height: parseInt(Ext.getBody().getViewSize().height * (0.95)),
    autoScroll: true,
    requires: ['Regardz.view.common.CheckboxRow', 'Ext.ux.form.SearchField'],

    initComponent: function () {

        if (Ext.getCmp('Comments_C'))
            Ext.getCmp('Comments_C').destroy();
        var me = this;

        me.items = [{
            xtype: 'form',
            id: 'Comments_C',
            border: false,
            bodyStyle: 'padding:5px 5px 0',
            fieldDefaults: {
                msgTarget: 'side',
                labelWidth: 110
            },
            defaults: { anchor: '100%' },
            layout: 'hbox',
            fileUpload: true,
            items: [{
                        xtype: 'fieldset',
                        title: 'Comments'.l('SC61300'),
                        width: '50%',
                        height: 350,
                        defaultType: 'textfield',
                        layout: 'anchor',
                        defaults: {
                            anchor: '100%'
                        },
                        items: [{
                            itemid: 'commentItem',
                            xtype: 'textarea',
                            height: 320,
                            name: 'Notes'
                        }]
                    }, {
                        xtype: 'fieldset',
                        title: 'Location notes'.l('SC61300'),
                        width: '50%',
                        margin: '0 0 0 10',
                        height: 350,
                        defaultType: 'textfield',
                        layout: 'anchor',
                        defaults: {
                            anchor: '100%'
                        },
                        items: [{
                            itemid: 'locationCommentItem',
                            xtype: 'textarea',
                            height: 320,
                            name: 'LocationNotes'
                        }]
                    }]
        }];
        me.callParent(arguments);
    }
});