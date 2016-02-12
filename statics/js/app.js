'use strict';

var app = angular.module('hangouts',[])
                 .controller('moviesController',function ($scope,$sce,$http) {
                      console.info("Teste");
                      
                      $scope.destaque = {
                          link : $sce.trustAsResourceUrl("https://www.youtube.com/embed/F-qAk8Uz-8A")
                        , "titulo" : "Grunts VS Gulp [AUTOMATIZAÇÃO]"
                        , "tema" : "Automatização"
                        , "professor" : {
                            "nome" : "Adejair Júnior - Adejair"
                          , "github": "https://github.com/Adejair"
                        }
                      }
                      
                      $http({
                        url:'statics/data.json'
                      }).then(function (data) {
                        console.info(data);
                        $scope.hangouts = data.data;
                      },function (err) {
                        console.warn(err);
                      })

                      

                      
                 })