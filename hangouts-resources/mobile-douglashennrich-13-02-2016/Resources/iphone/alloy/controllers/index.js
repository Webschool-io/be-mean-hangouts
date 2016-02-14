function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function touchRow(event) {
        var eventRow = event.rowData;
        eventRow.children[0].show();
        $.nav.openWindow(Alloy.createController("tela2", {
            json: eventRow.json
        }).getView());
        setTimeout(function() {
            eventRow.children[0].hide();
        }, 300);
    }
    function populateTable() {
        var arr = [ {
            titulo: "Título",
            img: "http://webschool.io/assets/images/logo-medium.png",
            desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }, {
            titulo: "Título",
            img: "http://webschool.io/assets/images/logo-medium.png",
            desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }, {
            titulo: "Título",
            img: "http://webschool.io/assets/images/logo-medium.png",
            desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }, {
            titulo: "Título",
            img: "http://webschool.io/assets/images/logo-medium.png",
            desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        } ];
        arr.forEach(function(node, index) {
            var row = $.UI.create("TableViewRow", {
                id: "row",
                json: node
            });
            row.add($.UI.create("View", {
                backgroundColor: "#80FF0000",
                zIndex: 1,
                visible: false
            }));
            row.add($.UI.create("ImageView", {
                id: "imgRow",
                image: node.img
            }));
            row.add($.UI.create("Label", {
                classes: [ "exo-bold" ],
                id: "titleRow",
                text: node.titulo + " " + index
            }));
            row.add($.UI.create("Label", {
                classes: [ "exo-light" ],
                id: "descRow",
                text: node.desc
            }));
            row.add($.UI.create("Label", {
                classes: [ "fa-arrow-circle-o-right" ],
                id: "faIcon"
            }));
            row.add($.UI.create("View", {
                id: "separatorRow"
            }));
            $.tableView.appendRow(row);
        });
    }
    function clickFunc() {
        alert("Olá");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    this.args = arguments[0] || {};
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win = Ti.UI.createWindow({
        backgroundColor: "#fff",
        navBarHidden: true,
        id: "win"
    });
    $.__views.navTop = Ti.UI.createView({
        height: 64,
        backgroundColor: "#B41A1A",
        top: 0,
        id: "navTop"
    });
    $.__views.win.add($.__views.navTop);
    $.__views.fileteTop = Ti.UI.createView({
        backgroundColor: "#6E1010",
        height: 20,
        top: 0,
        id: "fileteTop"
    });
    $.__views.navTop.add($.__views.fileteTop);
    $.__views.tituloWindow = Ti.UI.createLabel({
        text: "Brincando #1",
        color: "#fff",
        font: {
            fontSize: 24
        },
        textAlign: "center",
        bottom: "15%",
        id: "tituloWindow"
    });
    $.__views.navTop.add($.__views.tituloWindow);
    $.__views.__alloyId0 = Ti.UI.createView({
        top: 64,
        id: "__alloyId0"
    });
    $.__views.win.add($.__views.__alloyId0);
    $.__views.texto = Ti.UI.createLabel({
        font: {
            fontFamily: "Exo-Bold",
            fontSize: 18
        },
        color: "#000",
        text: "Testando @",
        top: "5%",
        id: "texto"
    });
    $.__views.__alloyId0.add($.__views.texto);
    clickFunc ? $.addListener($.__views.texto, "click", clickFunc) : __defers["$.__views.texto!click!clickFunc"] = true;
    $.__views.tableView = Ti.UI.createTableView({
        top: "10%",
        backgroundColor: "transparent",
        separatorColor: "transparent",
        selectionStyle: "NONE",
        id: "tableView"
    });
    $.__views.__alloyId0.add($.__views.tableView);
    touchRow ? $.addListener($.__views.tableView, "click", touchRow) : __defers["$.__views.tableView!click!touchRow"] = true;
    $.__views.nav = Ti.UI.iOS.createNavigationWindow({
        tintColor: "red",
        window: $.__views.win,
        id: "nav"
    });
    $.__views.nav && $.addTopLevelView($.__views.nav);
    exports.destroy = function() {};
    _.extend($, $.__views);
    populateTable();
    $.nav.open();
    __defers["$.__views.texto!click!clickFunc"] && $.addListener($.__views.texto, "click", clickFunc);
    __defers["$.__views.tableView!click!touchRow"] && $.addListener($.__views.tableView, "click", touchRow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;