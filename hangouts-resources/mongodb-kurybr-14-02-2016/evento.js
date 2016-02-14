var arr = []
for (var i = 0; i < 10; i++) {
 arr.push({ 
      descricao : "Evento "+i,
      data      : new Date(),
      resumo    : "Resumo "+i,
      imagem    : null,
      categoria : "Categoria "+i,
      integrantes : [
        { 
          funcao : "Faxineiro"
          ,nome   : "Integrante " +i 
        },
        { 
          funcao : "Organizadora"
          ,nome   : "Organizadora " +i 
        },
        { 
          funcao : "Organizadoro"
          ,nome   : "Organizadoro " +i 
        }
      ],
      ambiente : { 
        descricao     : "Salão de Festas",
        setor         : null,
        local         : "Rua dos Hangouts, Nº 666",
        referencia    : "Bar do Tadeu",
        tipo_ambiente : "Divertido"
      }
    })
}




> db.eventos.insert(evento)
WriteResult({ "nInserted" : 1 })
>

 db.eventos.find().skip(2).limit(2).pretty()


> var query = { descricao : "Evento 6" }
> query
{ "descricao" : "Evento 6" }
> db.eventos.remove(query)
WriteResult({ "nRemoved" : 1 })
>