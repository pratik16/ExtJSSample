Ext.define('Regardz.view.bookingwizard.RightSide.CommunicationNotes', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.rightcommunicationnotes',
    localObject: {},
    initComponent: function () {
        var me = this;


        me.radioButtons = {
            xtype: 'fieldcontainer',
            defaultType: 'radiofield',
            allowBlank: false,
            layout: 'hbox',
            width: '100%',
            style: 'border-bottom:1px solid Black;',
            items: [{
                xtype: 'radiogroup',
                width: '100%',
                itemid: "itemRadioGroupFilter",
                columns: 3,
                //columnWidth: 100,
                vertical: true,
                items: [{ boxLabel: 'All', margin: '5 0 5 10', width: 30, checked: true, name: 'FilterFlag', inputValue: '0' },
                         { boxLabel: 'Reservation', margin: '5', name: 'FilterFlag', inputValue: '1' },
                         { boxLabel: 'Booking', margin: '5', name: 'FilterFlag', inputValue: '2'}]
            }]
        };

        me.notesPanel = Ext.create('Ext.grid.Panel', {
            store: 'bookingwizard.RightSide.CommunicationNoteListStore',
            itemid: "preferencesGridPanel",
            //title: "Preferences",
            height: 200,
            //padding: '5',
            margin: '5',
            width: '95%',
            noResize: true,
            hideHeaders: true,
            autoScroll: false,
            columns: [{
                dataIndex: 'CommunicationNoteId',
                width: '97%',
                renderer: this.renderTopic,
                sortable: false
            }]
        });
        me.buttonAdd = Ext.create('Ext.Button', {
            id: 'button_add_communication_notes',
            scale: 'small',
            action: 'addCommunicationNote',
            text: 'Add',
            align: 'right',
            margin: '5'
        });

        me.radioButtonsBottom = {
            xtype: 'fieldcontainer',
            allowBlank: false,
            layout: 'hbox',
            labelWidth: 150,
            width: '100%',
            items: [{
                xtype: 'radiogroup',
                width: '80%',
                itemid: "itemRadioGroupBottom",
                columns: 2,
                vertical: true,
                items: [{ boxLabel: 'Reservation', margin: '5', labelWidth: 100, checked: true, name: 'IsReservationNote', inputValue: 1 },
                         { boxLabel: 'Booking', margin: '5', name: 'IsReservationNote', inputValue: 0}]
            },
            me.buttonAdd
            ]
        };

        me.addNewPanel = {
            xtype: 'fieldset',
            title: 'Add note',
            width: '95%',
            margin: '5',
            items: [{
                xtype: 'form',
                itemid: 'formCommuNote',
                layout: 'vbox',
                items: [{
                    xtype: 'textareafield',
                    name: 'Note',
                    height: 200,
                    maxLength: 500,
                    width: '100%'
                }, me.radioButtonsBottom,
                {
                    xtype: 'hidden',
                    name: 'CommunicationNoteId',
                    value: 0
                }, {
                    xtype: 'hidden',
                    name: 'NoteDate'

                }, {
                    xtype: 'hidden',
                    name: 'ReservationId'

                }, {
                    xtype: 'hidden',
                    name: 'BookingId'

                }, {
                    xtype: 'hidden',
                    name: 'BookingTrackingId'

                }, {
                    xtype: 'hidden',
                    name: 'CreatedBy'
                }]
            }]

        };


        me.items = [{
            layout: 'vbox',
            xtype: 'fieldcontainer',
            width: '95%',
            items: [
                me.radioButtons,
                me.notesPanel,
                me.addNewPanel
            ]
        }];
        me.callParent();
    },
    renderTopic: function (value, p, record) {
        var IsFlag = '(R)';

        if (record.data.IsReservationNote == false)
            IsFlag = '(B)';

        return Ext.String.format(
                    '<div style="text-decoration:underline;margin-top:20px; width:99%;">{0}&nbsp;{1}&nbsp;:&nbsp;{2}</div><div style="white-space: pre-wrap !important;word-wrap:break-word;">{3}</div>',
                    Ext.Date.format(new Date(record.data.NoteDate), 'Y-m-d'),
                    IsFlag,
                    record.data.CreatedName,
                    columnWrap(record.data.Note.replace(/\r\n|\r|\n/g, "<br />"))
                );
    }
});
