/// Collection Compra



const compra = {
  usuario : ObjectId("56c0e2bf74bbee958e1ea2ed")
, data : Date.now()
, ingresso : [
     { 
        evento : ObjectId("56c0e48974bbee958e1ea2f3")
      , valor : 80.00
      , tipo : "I"
     },
     { 
        evento : ObjectId("56c0e48974bbee958e1ea2f3")
      , valor : 40.00
      , tipo : "M"
     },
     { 
        evento : ObjectId("56c0e48974bbee958e1ea2f3")
      , valor : 40.00
      , tipo : "M"
     }
  ]
, total : 160.00
, quantidade : 3
}


/*
  
  Inserindo um ingresso em uma compra.

*/
const valor = {
    evento : ObjectId("56c0e64d74bbee958e1ea2fc")
  , valor : 1000.00
  , tipo : "I"
}

var query = { _id : ObjectId("56c0e57d74bbee958e1ea2f4") }
var update = { $push : { ingresso : valor } } 



/*
 Criando várias compras 
*/

var arr = []
for (var i = 0; i < 30; i++) {
  var preco = Math.floor((Math.random() * (100 * (i == 0 ? 1 : i))) + 1)

  arr.push({
        usuario : ObjectId("56c0e2bf74bbee958e1ea2ed")
      , data : Date.now()
      , ingresso : [
           { 
              evento : ObjectId("56c0e48974bbee958e1ea2f3")
            , valor : preco
            , tipo : preco % 2  == 0 ? "I" : "M"
           },
           { 
              evento : ObjectId("56c0e48974bbee958e1ea2f3")
            , valor : preco
            , tipo : preco % 2  == 0 ? "I" : "M"
           },
           { 
              evento : ObjectId("56c0e48974bbee958e1ea2f3")
            , valor : preco
            , tipo : preco % 2  == 0 ? "I" : "M"
           }
        ]
      , total : preco * 3
      , quantidade : 3
      })
}




/*
 Buscando todas as compras que possuem ingressos com valor de 1280 ou maior.
*/ 

// 1280 - ObjectId("56c0ec8074bbee958e1ea311") 

> var query = { "ingresso.valor" : { $gte : 1280 } }
> query
{ "ingresso.valor" : { "$gte" : 1280 } }
> db.compras.find(query)

/*
Inserindo Ingresso e Incrementando o campo quantidades.
*/

function atualizar() {
    var options  = { multi : true }; 
    var qtdCompras = db.compras.find({}).count(); //10
    for (var i = 0; i < qtdCompras; i++) { // para passar por todas as compras.
      /* Pegando um evento randomico */
      var count = db.eventos.find({},{_id : 1}).count(); // pega a quantidade de eventos que existe
      var arr   = db.eventos.find({},{_id : 1}); // Pega todos os eventos, em forma de Array, retornando apenas os ObjectID
      var pos   = Math.floor((Math.random() * count)); // Pega uma posição randomica do array de eventos  
      var preco = Math.floor((Math.random() * 915161) + 1); // Gerando o valor novo.
      var update = { 
        $push : { 
          ingresso :  { 
            evento : arr[pos]._id
            , valor : preco
            , tipo : preco % 2  == 0 ? "I" : "M"
          }
        }
        , $inc : {
          quantidade : 1
        }
      };
      // Query
      var arrCompras = db.compras.find({},{_id:1}) // array de todos as compras
      var query = arrCompras[i];
      /*Pegando compras uma após a outra*/
      db.compras.update(query,update,options)
    }
}


// 



