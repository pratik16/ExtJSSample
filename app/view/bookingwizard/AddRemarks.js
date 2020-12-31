Ext.define('Regardz.view.bookingwizard.AddRemarks', {
    extend: 'Ext.window.Window',
    alias: 'widget.addremarks',
    modal: true,
    border: false,
    title: 'Add Remark_Title'.l('SC54400'),
    //internalRemarkId: null,
    //internalRemarkText: null,
    //externalRemarkId: null,
    //externalRemarkText: null,
    initComponent: function () {

        var me = this;

        me.itemid = 'addnewitems';
        me.width = 450;
        me.width = 400;
        me.items = [{
            xtype: 'panel',
            frame: true,
            padding: 15,
            items: [
                 {
                     xtype: 'label',
                     text: 'External'.l('SC54400')
                 },
                        {
                            xtype: 'textareafield',
                            grow: true,
                            name: 'externalRemark',
                            itemid: 'externalRemarkTextField',
                            //labelSeparator: '<br />',                            
                            height: 100,
                            anchor: '100%',
                            width: '100%'
                            //value: me.externalRemarkText

                        },
                         {
                             xtype: 'label',
                             text: 'Internal'.l('SC54400')
                         },
                        {
                            xtype: 'textareafield',
                            grow: true,
                            name: 'internalRemark',
                            fieldLabel: '',
                            anchor: '100%',
                            height: 100,
                            width: '100%',
                            itemid: 'internalRemarkTextField'
                            //value: me.internalRemarkText
                        },
                        {
                            xtype: 'hidden',
                            itemid: 'internalRemarkId'
                        },
                        {
                            xtype: 'hidden',
                            itemid: 'externalRemarkId'
                        },
                        {
                            xtype: 'hidden',
                            itemid: 'itemId'
                        },
                        {
                            xtype: 'hidden',
                            itemid: 'typeId'
                        }
            ]
        }];

        me.dockedItems = [{
            dock: 'bottom',
            buttonAlign: 'right',
            buttons: [
                {
                    text: 'Close'.l('g'),
                    handler: function () {
                        me.destroy();
                    }
                },
				{
				    text: 'Save'.l('g'),
				    action: 'saveRemarkButtonAction',
				    itemid: 'addeditremarkid'
				}

            ]
        }];
        me.callParent(arguments);
    }
});