'use strict';

var app = angular.module('hangouts',[])
                 .controller('moviesController',function ($scope,$sce,$http) {
                      console.info("Teste");
                      
                      $scope.destaque = {
                          link : $sce.trustAsResourceUrl("https://www.youtube.com/embed/OCB7jMZBIas")
                        , titulo : "Webschool.io - Be MEAN - Node.js - Aula 09 - TDD parte 2"
                        , professor : {
                            nome : "Jean Suissa"
                          , github : "https://github.com/suissa"
                        }
                      }

                      $http({
                        url:'/statics/data.json'
                      }).then(function (data) {
                        console.info(data);
                        $scope.hangouts = data.data;
                      },function (err) {
                        console.warn(err);
                      })

                      

                      
                 })