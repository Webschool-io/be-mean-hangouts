angular.module("hangouts.controllers").controller("HangoutListController",["$scope","$sce","Hangout",function(t,e,n){n.query({},function(e){t.hangouts=e;var n=e[e.length-1];t.setDestaque(n)}),t.setDestaque=function(e){e.link=o(e.link),t.destaque=e};var o=function(t){if("object"==typeof t)return t;var n=t.split("watch?v=");return e.trustAsResourceUrl("https://www.youtube.com/embed/"+n[1])}}]);