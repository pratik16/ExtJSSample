Ext.define('Regardz.store.configuration.ProgramDefinitionStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.configuration.ProgramDefinition',
    autoLoad: true,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/ConfigProgramDefinition/ProgramDefinitionPaging',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
           languageId: user_language
        }
   },
   baseParams: {
       limit: page_size, start: 0
   },
   pageSize: page_size
});	