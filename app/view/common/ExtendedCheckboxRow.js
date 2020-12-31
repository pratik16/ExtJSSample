/**
 * @class Ext.ux.CheckColumn
 * @extends Ext.grid.column.Column
 * A Header subclass which renders a checkbox in each column cell which toggles the truthiness of the associated data field on click.
 *
 * Example usage:
 * 
 *    // create the grid
 *    var grid = Ext.create('Ext.grid.Panel', {
 *        ...
 *        columns: [{
 *           text: 'Foo',
 *           ...
 *        },{
 *           xtype: 'checkcolumn',
 *           text: 'Indoor?',
 *           dataIndex: 'indoor',
 *           width: 55
 *        }]
 *        ...
 *    });
 *
 * In addition to toggling a Boolean value within the record data, this
 * class adds or removes a css class <tt>'x-grid-checked'</tt> on the td
 * based on whether or not it is checked to alter the background image used
 * for a column.
 */
Ext.define('Regardz.view.common.ExtendedCheckboxRow', {
    extend: 'Regardz.view.common.CheckboxRow',
    alias: 'widget.extendedcheckboxrow',


    constructor: function () {      
        this.callParent(arguments);
    },

 /**
    * @private
    * Process and refire events routed from the GridView's processEvent method.
    */
    processEvent: function (type, view, cell, recordIndex, cellIndex, e, record, row) {
        var me = this,
            key = type === 'keydown' && e.getKey(),
            mousedown = type == 'mousedown';

        if (mousedown || (key == e.ENTER || key == e.SPACE)) {
            var dataIndex = me.dataIndex,
                checked = !record.get(dataIndex);
				
				/*Externally no effect for checkbox for specific condition*/
				if (record.data.BreakDown == 1) {					
					return false;
				}
				/*End of code*/
			
            // Allow apps to hook beforecheckchange
            if (me.fireEvent('beforecheckchange', me, recordIndex, checked) !== false) {

				record.set(dataIndex, checked);
                //disabled: true             
                me.fireEvent('checkchange', me, recordIndex, checked);

                // Mousedown on the now nonexistent cell causes the view to blur, so stop it continuing.
                if (mousedown) {
                    e.stopEvent();
                }

                // Selection will not proceed after this because of the DOM update caused by the record modification
                // Invoke the SelectionModel unless configured not to do so
                if (!me.stopSelection) {
                    view.selModel.selectByPosition({
                        row: recordIndex,
                        column: cellIndex
                    });
                }

                // Prevent the view from propagating the event to the selection model - we have done that job.
                return false;
            } else {

                // Prevent the view from propagating the event to the selection model if configured to do so.
                return !me.stopSelection;
            }
        } else {
            return me.callParent(arguments);
        }
    },

    // Note: class names are not placed on the prototype bc renderer scope
    // is not in the header.
    renderer: function (value, metadata, r, rowIndex, colIndex, store) {
        var cssPrefix = Ext.baseCSSPrefix,
            cls = [cssPrefix + 'grid-checkheader'];

        if (r.data.Checked == 1)
            r.data.Checked = true;
        else {
            r.data.Checked = false;
        }
		
        if (value && value != "0") {
            cls.push(cssPrefix + 'grid-checkheader-checked');
        }
		
		if (r.data.BreakDown > 0) {
			cls.push(cssPrefix + 'grid-checkheader-checked-disable');
			var tooltipText = "RoomType is associated with breakdown".l('g');
			metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		}
		

        return '<div class="' + cls.join(' ') + '">&#160;</div>';
    }
});
