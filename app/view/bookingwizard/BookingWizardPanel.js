Ext.define('Regardz.view.bookingwizard.BookingWizardPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.bookingwizardpanel',
    //store: 'bookingwizard.ReservationDetails',
    requires: ['Regardz.view.bookingwizard.BookingWizardStep1', 'Regardz.view.bookingwizard.BookingWizardStep2',
            'Regardz.view.bookingwizard.BookingWizardStep3', 'Regardz.view.bookingwizard.BookingWizardStep4',
            'Regardz.view.bookingwizard.BookingWizardStep5', 'Regardz.view.bookingwizard.BookingWizardStep6'],

    loadMask: true,

    initComponent: function () {
        var me = this;

        //me.title = 'Booking Wizard'.l('SC50000');
        me.layout = 'card';
        me.itemid = 'wizardpanel';
        //me.bodyStyle = 'padding:15px';

        me.border = false;
        me.bodyStyle = 'background: none';
        me.height = '100%';

        me.defaults = {
            // applied to each contained panel
            border: false
        };

        me.BookingDetailsHiddenForm = {
        }

        me.bbar = ['->', {
            id: 'wizard-no-confirmation',
            action: 'noConfirmation',
            xtype: 'button',
            text: 'No confirmation'.l('w'),
            disabled: true,
            itemid: 'noConfBtn'
        }, {
            id: 'confirm-save',
            xtype: 'button',
            action: 'saveBWStep1',
            text: 'Save'.l('w')
        }, {
            id: 'skip-button',
            xtype: 'button',
            action: 'skipAction',
            text: 'Skip'.l('w'),
            hidden: true
        }, {
            id: 'wizard-close',
            action: 'closeBW',
            xtype: 'button',
            text: 'Close'.l('w'),
            handler: function () {

                display_alert("MGWiz", '', 'C', function (btn) {
                    var win = Ext.WindowManager.getActive();
                    if (btn === 'yes') {
                        if (win) {
                            //close the add window popup
                            win.close();
                        }
                    }
                });
            }
        }, '->', // greedy spacer so that the buttons are aligned to each side
        {
        xtype: 'button',
        id: 'move-prev',
        itemid: 'move-prev',
        text: 'Previous'.l('w'),
        action: 'doPreviousCardLayout',
        disabled: true
    }, {
        id: 'move-next',
        itemid: 'move-next',
        xtype: 'button',
        action: 'doNextCardLayout',
        text: 'Next'.l('w')
    }];

    me.items = [
             {
                 layout: 'fit',
                 itemid: 'stepone',
                 items: {
                     xtype: 'bookingwizardstep1'
                 }
             },
             {
                 layout: 'fit',
                 itemid: 'steptwo'
             },
             {
                 layout: 'fit',
                 itemid: 'stepthree'
             },
             {
                 layout: 'fit',
                 itemid: 'stepfour'
             },
             {
                 layout: 'fit',
                 itemid: 'stepfive'
             },
             {
                 layout: 'fit',
                 itemid: 'stepsix'
             }


    //,
    /*,
    {
    layout: 'fit',
    itemid: 'stepthree',
    items: {
    xtype: 'bookingwizardstep3'
    }
    }, {
    layout: 'fit',
    itemid: 'stepfour',
    items: {
    xtype: 'bookingwizardstep4'
    }
    },
    {
    layout: 'fit',
    itemid: 'stepfive',
    items: {
    xtype: 'bookingwizardstep5'
    }
    },
    {
    layout: 'fit',
    itemid: 'stepsix',
    items: {
    xtype: 'bookingwizardstep6'
    }
    }*/

        ];
    me.callParent();
}
});
