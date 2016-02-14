/*
@ touchRow
*/
function touchRow(event){
  var eventRow = (OS_IOS) ? event.rowData : event.row;

  eventRow.children[0].show();

  //
  $.nav.openWindow(Alloy.createController('tela2',{
    json: eventRow.json
  }).getView());

  setTimeout(function(){
    eventRow.children[0].hide();
  }, 300);
}

/*
@ populateTable
*/
function populateTable(){
  var arr = [
    {
      titulo: 'Título'
      , img: 'http://webschool.io/assets/images/logo-medium.png'
      , desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },

    {
      titulo: 'Título'
      , img: 'http://webschool.io/assets/images/logo-medium.png'
      , desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },

    {
      titulo: 'Título'
      , img: 'http://webschool.io/assets/images/logo-medium.png'
      , desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },

    {
      titulo: 'Título'
      , img: 'http://webschool.io/assets/images/logo-medium.png'
      , desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }
  ];

  arr.forEach(function(node, index){
    var row = $.UI.create('TableViewRow',{
      id: 'row'
      , json: node
    });

    // Toggle
    row.add($.UI.create('View',{
      backgroundColor: '#80FF0000'
      , zIndex: 1
      , visible: false
    }));

    // Img
    row.add($.UI.create('ImageView',{
      id: 'imgRow'
      , image: node.img
    }));

    // Titulo
    row.add($.UI.create('Label',{
      classes: ['exo-bold']
      , id: 'titleRow'
      , text: node.titulo + ' ' + index
    }));

    // Descrição
    row.add($.UI.create('Label',{
      classes: ['exo-light']
      , id: 'descRow'
      , text: node.desc
    }));

    // FA
    row.add($.UI.create('Label',{
      classes: ['fa-arrow-circle-o-right']
      , id: 'faIcon'
    }));

    // Separador
    row.add($.UI.create('View',{
      id: 'separatorRow'
    }));

    $.tableView.appendRow(row);
  });
}
populateTable();

/*
@ clickFunc
*/
function clickFunc(){
  alert('Olá');
}

$.nav.open();
