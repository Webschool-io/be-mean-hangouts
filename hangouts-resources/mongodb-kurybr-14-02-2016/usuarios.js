'use strict';


usuarios = [
{
  nome : "Jorge", email : "jorge@hangout.com", cpf: "12312313213"
},
{
  nome : "Paulo", email : "paulo@hangout.com", cpf: "12312313213"
},
{
  nome : "Victor", email : "victor@hangout.com", cpf: "12312313213"
},
{
  nome : "Larissa", email : "nudes@xxxx.com.br", cpf: "12312313213"
},
{
  nome : "Adejair", email : "adejair@hangout.com", cpf: "12312313213"
},
{
  nome : "Jeferson", email : "jeferson@hangout.com", cpf: "12312313213"
}]

db.usuario.insert(usuarios)

> db.usuarios.insert(usuario)
BulkWriteResult({
        "writeErrors" : [ ],
        "writeConcernErrors" : [ ],
        "nInserted" : 6,
        "nUpserted" : 0,
        "nMatched" : 0,
        "nModified" : 0,
        "nRemoved" : 0,
        "upserted" : [ ]
})