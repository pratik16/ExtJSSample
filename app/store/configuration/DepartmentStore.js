Ext.define('Regardz.store.configuration.DepartmentStore', {
	extend : 'Ext.data.Store',
	model : 'Regardz.model.configuration.Department',
	autoLoad : false,
	proxy : {
		type : 'jsonp',
		autoLoad: false,
		url : webAPI_path + 'api/Department/GetDepartmentsAll',
		reader : {
			type : 'json',
			root : 'data'
		}
	},
	listeners : {
		load : {
			fn : function (s, r) {
				
			}
		}
	}
});