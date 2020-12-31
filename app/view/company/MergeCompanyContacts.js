Ext.define('Regardz.view.company.MergeCompanyContacts', {
    extend: 'Ext.window.Window',
    alias: 'widget.mergeompanycontacts',
    modal: true,
    width: 930,
    border: false,
    //title: 'Company Overview', //.l('SC61100'),
    autoShow: true,
    initComponent: function () {

        if (Ext.getCmp('mergeCompanyContacts'))
            Ext.getCmp('mergeCompanyContacts').destroy();

        var me = this;
        me.items = [{
            xtype: 'form',
            id: 'mergeCompanyContacts',
            border: false,
            bodyStyle: 'padding:5px 5px 0',
            //width: 350,
            fieldDefaults: {
                msgTarget: 'side',
                labelWidth: 100
            },
            defaults: {
                anchor: '100%'
            },

            fileUpload: true,
            items: [{
                xtype: 'panel',
                //frame: true,
                width: 400,
                border: false,
                style: 'background:none; border:0px;',
                layout: 'hbox',
                // padding: '0 0 5 0',
                items: [
                {
                    xtype: 'panel',
                    //frame: true,
                    width: 200,
                    border: false,
                    style: 'background:none; border:0px;',
                    layout: 'vbox',
                    // padding: '0 0 5 0',
                    items: [{ xtype: 'contactslist',
                        width: 300,
                        height: 200,
                        autoScroll: true
                    }
                 ]
                }, { xtype: 'tbspacer', width: 10 }, {
                    xtype: 'panel',
                    //frame: true,
                    width: 200,
                    border: false,
                    style: 'background:none; border:0px;',
                    layout: 'vbox',
                    // padding: '0 0 5 0',
                    items: [{ xtype: 'label', style: 'padding-left:30px', text: 'Use:'}]
                },

                    {
                        xtype: 'panel',
                        //frame: true,
                        width: 200,
                        border: false,
                        style: 'background:none; border:0px;',
                        layout: 'vbox',
                        // padding: '0 0 5 0',
                        items: [{ xtype: 'contactslist',
                            width: 300,
                            height: 200,
                            autoScroll: true
                        }]
                    }


                 ]
            }]

        }];
        me.callParent(arguments);
    }
});