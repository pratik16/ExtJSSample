Ext.define('Regardz.view.dashboard.TraceView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.traceview',
    modal: true,
    width: 1120,
    border: false,
    autoShow: true,

    initComponent: function () {

        var me = this;
        me.items = [{
            xtype: 'form',
            itemid: 'traceviewid',
            border: false,
            bodyStyle: 'padding:5px 5px 0',
            //width: 350,
            //            fieldDefaults: {
            //                msgTarget: 'side'//,labelWidth: 100
            //            },
            defaults: {
                anchor: '100%'
            },
            autoScroll: true,
            items: [{
                xtype: 'displayfield',
                fieldLabel: '',
                name: 'TraceMessage',
                labelWidth: '100%'
            }, {
                xtype: 'panel',
                //frame: true,
                border: false,
                style: 'background:none; border:0px;',
                layout: 'vbox',
                padding: '0 0 5 0',
                items: [{ xtype: 'container',
                    //frame: true,
                    border: false,
                    style: 'background:none; border:0px;',
                    layout: 'hbox',
                    defaults: { width: 250 },
                    padding: '0 0 5 0',
                    items: [{
                        xtype: 'displayfield',
                        fieldLabel: 'Created by'.l('SC80000'),
                        name: 'CreatedByUserShortName'
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Handled by'.l('SC80000'),
                        name: 'FinishedByuserShortName'
                    }]
                }, { xtype: 'panel',
                    //frame: true,
                    border: false,
                    style: 'background:none; border:0px;',
                    layout: 'hbox',
                    defaults: { width: 250 },
                    padding: '0 0 5 0',
                    items: [{
                        xtype: 'displayfield',
                        fieldLabel: 'Due Date'.l('SC80000'),
                        name: 'TraceDate',
                        itemid: 'tracedate'
                    }, {
                        xtype: 'displayfield',
                        fieldLabel: 'Finished'.l("SC80000"),
                        name: 'FinishedDate',
                        itemid: 'FinishedDate'
                    }]
                }]
            }]
        }];
        me.callParent(arguments);
    }
});