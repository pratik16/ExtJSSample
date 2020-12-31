//Ext.Loader.setPath('Ext.ux', '../ux');

Ext.namespace("Ext.ux");

Ext.require([
    'Ext.ux.RowExpander',
    'Ext.selection.CheckboxModel'
]);

Ext.define('Regardz.view.bookingwizard.BookingWizardStep3', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.bookingwizardstep3',
    loadMask: true,
    autoScroll: true,
    itemid: 'bookingwizardstep3',
    //store: 'bookingwizard.PackageListStore',
    stepThreeObject: null,

    title: 'Select Package_Title'.l('SC53000'),

    initComponent: function () {
        var me = this;
        me.topPanel = {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            frame: false,
            border: 'none',
            width: '100%',
            items: [{
                xtype: 'radiogroup',
                fieldLabel: 'Packages'.l('SC53000'),
                id: 'AdvicedPackagesID',
                action: 'AllAdvicedPackage',
                margins: '0 0 0 5',
                labelWidth: 75,
                columns: 2,
                vertical: true,
                layout: 'hbox',
                items: [{ boxLabel: 'Advised'.l('SC53000'), name: 'package', inputValue: '1', checked: true, width: 125 }, { boxLabel: 'All'.l('SC53000'), name: 'package', inputValue: '2', width: 75 }
                ]
            }, {
                xtype: 'combo',
                width: 185,
                name: 'duaration',
                action: 'comboDuration',
                id: 'DuarationID',
                queryMode: 'local',
                displayField: 'Package',
                valueField: 'Duration',
                emptyText: "Select package duration".l('SC53000'),
                store: 'common.PackageDurationStore',
                disabled: true
            }, {
                xtype: 'combo',
                name: 'PropertyFeatureId',
                action: 'comboPropertyFeature',
                id: 'PropertyFeatureID',
                //fieldLabel: 'Meeting Type'.l('SC50000'),
                //forceSelection: true,
                width: 160,
                displayField: 'PropertyFeatureName',
                emptyText: "Select meeting type".l('SC53000'),
                valueField: 'PropertyFeatureId',
                store: 'common.MeetingTypeNewStore',
                disabled: true
            }, {
                xtype: 'radiogroup',
                fieldLabel: 'Price'.l('SC53000'),
                id: 'PriceID',
                action: 'NetGrossPrice',
                margins: '0 0 0 5',
                columns: 2,
                labelWidth: 50,
                vertical: true,
                layout: 'hbox',
                items: [{ boxLabel: 'Gross prices'.l('SC53000'), name: 'price', inputValue: '1', width: 125 },
                { boxLabel: 'Net prices'.l('SC53000'), name: 'price', inputValue: '2', width: 100}]

            }]
        };

        me.gridPanel = Ext.create('Ext.grid.Panel', {
            store: 'bookingwizard.PackageListStore',
            margin: '10',
            columnLines: false,
            itemid: 'PackageListGrid',
            noResize: true,
            viewConfig: {
                forceFit: true,
                getRowClass: function (record) {
                    if (record.data.IsContracted == true) {
                        return " IsContractedCls ";
                    }
                    else
                        return record.get('Class');
                }
            },
            autoHeight: true,
            plugins: [{
                ptype: 'rowexpander',
                rowBodyTpl: [
                // '<p><b>Name:</b> {Name}</p><br>',
                        '<p><b>' + 'Description'.l('SC53000') + ':</b><br /> {Description}</p>'
                //'<p><b>Price:</b> {Price}</p>'
                ]
            }],

            columns: [
            { header: 'Package Name'.l('SC53000'), dataIndex: 'Name', flex: 1 },
            {
                header: 'Room'.l('SC53000'), dataIndex: 'Price', align: 'right',
                style: 'text-align:center', renderer: this.RoomAdviced
            },
            {
                text: 'Price per person'.l('SC53000'),
                columns: [{
                    text: 'A'.l('SC53000'),
                    width: 75,
                    sortable: false,
                    hideable: false,
                    dataIndex: 'A',
                    align: 'right',
                    style: 'text-align:center',
                    renderer: this.Adviced
                }, {
                    text: 'B'.l('SC53000'),
                    width: 75,
                    sortable: false,
                    hideable: false,
                    dataIndex: 'B',
                    align: 'right',
                    style: 'text-align:center',
                    renderer: this.Adviced
                }, {
                    text: 'C'.l('SC53000'),
                    width: 75,
                    sortable: false,
                    hideable: false,
                    dataIndex: 'C',
                    align: 'right',
                    style: 'text-align:center',
                    renderer: this.Adviced
                }, {
                    text: 'D'.l('SC53000'),
                    width: 75,
                    sortable: false,
                    hideable: false,
                    dataIndex: 'D',
                    align: 'right',
                    style: 'text-align:center',
                    renderer: this.Adviced
                }]
            },
            {
                text: 'Price as per numbers of persons entered'.l('SC53000'),
                columns: [{
                    text: 'A'.l('SC53000'),
                    width: 75,
                    sortable: false,
                    hideable: false,
                    dataIndex: 'TotalA',
                    align: 'right',
                    style: 'text-align:center',
                    renderer: me.radioRender
                }, {
                    text: 'B'.l('SC53000'),
                    width: 75,
                    sortable: false,
                    hideable: false,
                    dataIndex: 'TotalB',
                    align: 'right',
                    style: 'text-align:center',
                    renderer: me.radioRender
                }, {
                    text: 'C'.l('SC53000'),
                    width: 75,
                    sortable: false,
                    hideable: false,
                    dataIndex: 'TotalC',
                    align: 'right',
                    style: 'text-align:center',
                    renderer: me.radioRender
                }, {
                    text: 'D'.l('SC53000'),
                    width: 75,
                    sortable: false,
                    hideable: false,
                    dataIndex: 'TotalD',
                    align: 'right',
                    style: 'text-align:center',
                    renderer: me.radioRender
                }]
            },
                  { hidden: true, dataIndex: 'FixedPriceId', hideable: false },
                  { hidden: true, dataIndex: 'TurnOver', hideable: false },
                  { hidden: true, dataIndex: 'TypeId', hideable: false },

            //            { header: 'Duration', dataIndex: 'Duration', flex: 1 },
            //            { header: 'Price', dataIndex: 'Price', flex: 1 },
            //            { header: 'GrossPrice', dataIndex: 'GrossPrice', flex: 1 },

            ],
            tbar: [{
                iconCls: 'icon-package',
                text: 'Packages'.l('SC53000')
            }]
        });

        //if (Ext.getCmp('DuarationID'))
        //    Ext.getCmp('DuarationID').destroy();

        //if (Ext.getCmp('PropertyFeatureID'))
        //    Ext.getCmp('PropertyFeatureID').destroy();

        //if (Ext.getCmp('AdvicedPackagesID'))
        //    Ext.getCmp('AdvicedPackagesID').destroy();

        //if (Ext.getCmp('PriceID'))
        //    Ext.getCmp('PriceID').destroy();



        me.items = [
            me.topPanel,
            me.gridPanel
        ];

        //        me.bbar = {
        //            xtype: 'pagingtoolbar',
        //            store: me.store,
        //            displayInfo: true,
        //            emptyMsg: "No data to display".l('g')
        //        };

        me.callParent();
    },

    radioRender: function (value, metadata, record, rowIdx, colIndex, store) {

        if ((record.data.Selected == "A" || record.data.Selected == "1") && colIndex == 7) {
            metadata.tdCls = 'adviced-packages';
        }
        else if ((record.data.Selected == "B" || record.data.Selected == "2") && colIndex == 8) {
            metadata.tdCls = 'adviced-packages';
        }
        else if ((record.data.Selected == "C" || record.data.Selected == "3") && colIndex == 9) {
            metadata.tdCls = 'adviced-packages';
        }
        else if ((record.data.Selected == "D" || record.data.Selected == "4") && colIndex == 10) {
            metadata.tdCls = 'adviced-packages';
        }

        var bar;
        if (colIndex == 7) {
            bar = "A";
        }
        else if (colIndex == 8) {
            bar = "B";
        }
        else if (colIndex == 9) {
            bar = "C";
        }
        else if (colIndex == 10) {
            bar = "D";
        }

        var formattedPrice = Ext.util.Format.number(value, '0,000.00');

        //return '<input ' + (record.data.Checked == true ? 'checked=checked' : '') + ' value="' + value + '"  type=radio name="rgrp' + this.body.id + '"> ' + value + ''//myEl //
        return '<input id="rd_' + record.data.FixedPriceId + '_' + bar + '" ' + (record.data.Checked == true ? 'checked=checked' : '') + ' onclick="Utils.SelectedFixedPriceId=' + record.data.FixedPriceId + ';setDefaultIds(' + rowIdx + ',\'' + bar + '\',\'' + store.storeId + '\')" type=radio name="rgrp' + this.body.id + '">' + formattedPrice + ''//myEl //
    },
    Adviced: function (value, metadata, record, rowIdx, colIndex, store) {

        if ((record.data.Selected == "A" || record.data.Selected == "1") && colIndex == 3) {
            metadata.tdCls = 'adviced-packages';
        }
        else if ((record.data.Selected == "B" || record.data.Selected == "2") && colIndex == 4) {
            metadata.tdCls = 'adviced-packages';
        }
        else if ((record.data.Selected == "C" || record.data.Selected == "3") && colIndex == 5) {
            metadata.tdCls = 'adviced-packages';
        }
        else if ((record.data.Selected == "D" || record.data.Selected == "4") && colIndex == 6) {
            metadata.tdCls = 'adviced-packages';
        }
        var formattedPrice = Ext.util.Format.number(value, '0,000.00');
        return formattedPrice;
    },
    RoomAdviced: function (value, metadata, record, rowIdx, colIndex, store) {
        metadata.tdCls = 'adviced-packages';
        var formattedPrice = Ext.util.Format.number(value, '0,000.00');
        return formattedPrice;
    }
});