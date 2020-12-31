Ext.define('Regardz.view.reports.GenerateReport', {
    extend: 'Ext.window.Window',
    alias: 'widget.generatereport',
    title: 'Generate Report_Title'.l('SC91100'),
    modal: true,
    initComponent: function () {
        var me = this;

        me.height = '50%';
        me.width = '65%';

        me.layout = 'hbox';
        me.items = [

            {
                xtype: 'fieldset',
                margin: 15,
                width: '60%',
                height: '80%',
                title: 'Parameters'.l('SC91100'),
                items: [{
                    xtype: 'form',
                    border: false,
                    itemid: 'dynamic_component',
                    layout: 'form'
                }]
            },
            {
                xtype: 'fieldset',
                title: 'Output format'.l('SC91100'),
                width: '35%',
                height: '80%',
                margin: 15,
                items: [
                    {
                        xtype: 'radiogroup',
                        fieldLabel: 'Output'.l('SC91100'),
                        itemid: 'output_format',
                        columns: 1,
                        vertical: true,
                        items: [
                            { boxLabel: 'HTML'.l('SC91100'), name: 'output', inputValue: 'HTML', itemid: 'HTML' },
                            { boxLabel: 'Excel'.l('SC91100'), name: 'output', inputValue: 'Excel', itemid: 'Excel', checked: true },
                            { boxLabel: 'Word'.l('SC91100'), name: 'output', inputValue: 'Word', itemid: 'Word' },
                            { boxLabel: 'CSV'.l('SC91100'), name: 'output', inputValue: 'CSV', itemid: 'CSV' },
                            { boxLabel: 'PDF'.l('SC91100'), name: 'output', inputValue: 'PDF', itemid: 'PDF' }
                        ]
                    }
                ]

            },
            {
                xtype: 'hiddenfield',
                name: 'ReprotName',
                itemid: 'ReprotName',
                value: ''
            }
        ];

        me.buttons = [{
            text: 'Cancel'.l('g'),
            action: 'cancel',
            handler: function () {
                me.destroy();
            }
        }, {
            text: 'Save'.l('g'),
            action: 'create_report'
        }
		]

        me.callParent();
    }
});