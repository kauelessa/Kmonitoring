const create = 
{
    user : 'CREATE TABLE IF NOT EXISTS  ' +
           ' User ( id   INTEGER PRIMARY KEY AUTOINCREMENT,  '+
           ' username   VARCHAR(30), '+
           ' email      VARCHAR(30), '+
           ' password   VARCHAR(30), '+
           ' stayLogged INT(1) ); ',

    municipio : ' CREATE TABLE IF NOT EXISTS  ' +
                ' Municipio ( id   INTEGER PRIMARY KEY AUTOINCREMENT,  '+
                ' nm_municipio VARCHAR(150) );',

    bairro : ' CREATE TABLE IF NOT EXISTS  ' +
             ' Bairro ( id   INTEGER PRIMARY KEY AUTOINCREMENT,  '+
             ' nm_bairro VARCHAR(150), ' +
             ' id_municipio INTEGER NOT NULL); ',


    rua : ' CREATE TABLE IF NOT EXISTS  ' +
          ' Rua ( id   INTEGER PRIMARY KEY AUTOINCREMENT,  '+
          ' nm_rua VARCHAR(150), '+
          ' id_bairro INTEGER NOT NULL, ' +
          ' CEP VARCHAR(20) ); ',

    tipoEquipamento : ' CREATE TABLE IF NOT EXISTS  ' +
                      ' TipoEquipamento ( id   INTEGER PRIMARY KEY AUTOINCREMENT,  '+
                      ' nm_tp_equipamento VARCHAR(150), '+
                      ' ds_tp_equipamento VARCHAR(150), '+
                      ' obs_tp_equipamento VARCHAR(200) ); ',

    tipoPoste : ' CREATE TABLE IF NOT EXISTS  ' +
                ' TipoPoste ( id   INTEGER PRIMARY KEY AUTOINCREMENT,  '+
                ' nm_tp_poste VARCHAR(150) ); ',

    tipoBraco : ' CREATE TABLE IF NOT EXISTS  ' +
                ' TipoBraco ( id   INTEGER PRIMARY KEY AUTOINCREMENT,  '+
                ' nm_tp_braco VARCHAR(150) ); ',

    tipoRede : ' CREATE TABLE IF NOT EXISTS  ' +
               ' TipoRede ( id   INTEGER PRIMARY KEY AUTOINCREMENT,  '+
               ' nm_tp_rede VARCHAR(150) ); ',
    
    equipamento : ' CREATE TABLE IF NOT EXISTS  ' +
                  ' Equipamento ( id   INTEGER PRIMARY KEY AUTOINCREMENT,  '+
                  ' id_tp_equipamento INTEGER NOT NULL, '+
                  ' id_tp_poste INTEGER NOT NULL, '+
                  ' id_tp_braco INTEGER NOT NULL, '+
                  ' id_tp_rede INTEGER NOT NULL, ' +
                  ' tag VARCHAR(50), '+
                  ' id_rua INTEGER NOT NULL,'+
                  ' latitude VARCHAR(50), '+
                  ' longitude VARCHAR(50), '+
                  ' prioridade INTEGER NOT NULL, ' +
                  ' potencia INTEGER NOT NULL, ' +
                  ' referencia VARCHAR(100), '+
                  ' observacoes VARCHAR(200) ); ',
    
}

export default create;