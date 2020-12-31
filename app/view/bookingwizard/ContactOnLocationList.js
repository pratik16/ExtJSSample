Ext.define('Regardz.view.bookingwizard.ContactOnLocationList', {
    extend: 'Ext.window.Window',
    alias: 'widget.contactonlocationlist',
    store: 'bookingwizard.AttendeesPagingStore',
    modal: true,

    initComponent: function () {
        var me = this;

        me.height = parseInt(Ext.getBody().getViewSize().height * (0.5));
        me.width = parseInt(Ext.getBody().getViewSize().width * (0.4));

        //me.autoShow = true;

        //me.itemGroupId = (me.itemGroupId > 0) ? me.itemGroupId : 0;

        me.roleCombo = new Ext.form.ComboBox({
            store: 'bookingwizard.AllAttendeesRoleStore',
            displayField: 'AttendeesRole',
            valueField: 'AttendeeRoleId',
            forceSelection: true,
            allowBlank: false,
            itemid: 'attemdeeRoleId',
            emptyText: "Select Attendee's Role".l('SC55200')
        });




        me.ContactList = {
            xtype: 'grid',
            store: me.store,
            itemid: 'conatactlist',
            title: 'Attendees'.l('SC55200'),
            height: parseInt(me.height * (0.8)),
            frame: true,
            autoScroll: true,
            layout: 'fit',
            loadMask: true,
            columnLines: false,
            cls: 'gridwhitebackground',
            selType: 'rowmodel',
            viewConfig: {
                forceFit: true,
                markDirty: false
            },
            plugins: [
            		Ext.create('Ext.grid.plugin.RowEditing', { clicksToEdit: 2 })
            ],
            columns: [{
                header: 'Name'.l("SC55200"),
                dataIndex: 'Name',
                width: '15%',
                flex: 1,
                editor: {
                    allowBlank: false,
                    maxLength: 200
                },
                align: 'left'
            }, {
                header: 'Salutation'.l("SC55200"),
                dataIndex: 'Salutation',
                editor: {
                    allowBlank: false,
                    maxLength: 200
                },
                width: '15%',
                align: 'left'
            }, {
                header: 'E-mail address'.l("SC55200"),
                dataIndex: 'Email',
                width: '40%',
                editor: {
                    allowBlank: false,
                    //vtype: 'validDomain',
                    maxLength: 200
                },
                align: 'left'
            }, {
                header: 'Role'.l("SC55200"),
                dataIndex: 'AttendeesRole',
                editor: me.roleCombo,
                width: '25%',
                align: 'left'
            }, {
                dataIndex: 'AttendeeID',
                renderer: this.selectAttendee,
                name: 'selectAttendee',
                align: 'center',
                width: 25
            }],
            tbar: [{
                xtype: 'button',
                iconCls: 'new',
                action: 'saveContactOnLocation',
                tooltip: 'Add Attendee'.l('SC55200'),
                text: 'Add new'.l('SC33000')
            }, '->', {
                xtype: 'button',
                iconCls: 'filter',
                disabled: true
            }, {
                xtype: 'textfield',
                name: 'searchParam',
                itemid: 'searchParam',
                enableKeyEvents: true
            }, {
                xtype: 'button',
                iconCls: Ext.baseCSSPrefix + 'form-clear-trigger',
                action: 'clearAttendeeFilter',
                hidden: true
            }, {
                xtype: 'button',
                action: 'searchAttendee',
                iconCls: Ext.baseCSSPrefix + 'form-search-trigger'
            }],
            bbar: [{
                xtype: 'pagingtoolbar',
                store: this.store,
                displayInfo: true,
                emptyMsg: "No data to display".l("g")
            }]
        };
        Ext.apply(me, {
            title: 'Contact On Site_Title_SCCODE'.l("SC55200"),
            layout: 'fit',
            items: {
                xtype: 'form',
                border: false,
                margin: 5,
                //buttonAlign: 'center',
                items: [{
                    xtype: 'container',
                    width: '100%',
                    items: [{
                        xtype: "container",
                        items: [me.ContactList],
                        width: '100%'
                    }]
                }],
                buttons: [{
                    text: 'Close'.l('g'),
                    handler: function () {
                        me.close();
                    }
                }]
            }
        });
        me.callParent();
    },
    selectAttendee: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = 'Click here for Select Attendee'.l("SC55200");
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'selectUser';
    }
});