var urlBase = '/view/';

var myApp = angular.module('TestApp',['ngRoute']);


//-- Root scope

myApp.run(function($rootScope) {
    $rootScope.test = "";
})

//------ New page configuration 

myApp.config(function($controllerProvider, $provide) {
    //Used to handle loading controllers dynamically
    myApp.controller = $controllerProvider.register;
    myApp.factory = $provide.factory;
});

 myApp.controller('sidebarController', function ($scope, $templateCache, $http, $location) {
    $scope.template = '';
    $scope.html = '';
    $scope.pages = [
        { title: 'Release Setup', url: urlBase + 'ReleaseSetup.html', req: '/getRelease?reqData='},
        { title: 'Requirements', url: urlBase + 'Requirements.html', req: '/getRequirement?reqData=' },
        { title: 'Repository Setup', url: urlBase + 'RepositorySetup.html', req: '/getRepository?reqData=' },
        { title: 'testcases EAS', url: urlBase + 'testcasesEAS.html', req: '/getEas?reqData=' },
        { title: 'Project Dashboard', url: urlBase + 'ProjectDashboard.html', req: '/getProjectDashboard?reqData=' },
        { title: 'Metrics & Reports', url: urlBase + 'Metrics.html', req: '/getMetrics?reqData='},
        { title: 'Documnt', url: urlBase + 'Documnt.html', req: '/getDocuments?reqData=' },
        { title: 'Testcase Creation', url: urlBase + 'TestcaseCreation.html', req: '/getTestcases?reqData=' },
        { title: 'Testcase Execution', url: urlBase + 'TestcaseExecution.html', req: '/getExecutions?reqData=' },
        { title: 'Defect Tracking', url: urlBase + 'DefectTracking.html', req: '/getDefects?reqData=' },
    ];    
});


//-------------------

//-- This is my custom directive.
myApp.controller('Controller', ['$scope', function($scope) {
  $scope.customer = {
    name: 'Test.Lead',
    testcaseCount: '1600'
  };
}]).controller('Controller1', ['$scope', function($scope) {
  $scope.customer = {
    name: 'Test.Manager',
    testcaseCount: '1000'
  };
}])
.directive('myCustomer', function() {
  return {
    template: 'User: {{customer.name}} has {{customer.testcaseCount}} testcases'
  };
});


//Define an angular module for our app
myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/GridView', {
      controller: 'DataController',
      templateUrl: 'view/GridView.html'
    })
    .when('/UserView', {
      controller: 'DataController',
      templateUrl: 'view/UserView.html'
    })
    .when('/PanelView', {
      controller: 'DataController',
      templateUrl: 'view/PanelView.html'
    })
    .when('/TemplateView', {
      controller: 'DataController',
      templateUrl: 'view/DirectiveTemplate.html'
    })
    .otherwise({
      redirectTo: 'view/GridView'
    });
}]);


myApp.controller('ProjectController', ['$scope', function($scope) {
 
   $scope.projects =
    [
        { id: 1, type: "Admin", name: "Department" },
        { id: 2, type: "User", name: "Sample Project" },
        { id: 3, type: "User", name: "Sample Project 1" },
        { id: 4, type: "User", name: "Sample Project 2" }
    ];        
}]);

myApp.controller('DataController', function($scope, $http) {
  var userCridential = [];

  $scope.projects =
  [
      { id: 1, type: "Admin", name: "Department" },
      { id: 2, type: "User", name: "Sample Project" },
      { id: 3, type: "User", name: "Sample Project 1" },
      { id: 4, type: "User", name: "Sample Project 2" }
  ];  

  $scope.selectedOption = $scope.projects[0]; 

  $scope.loadPage = function (page) {
      if (page.req) {
        getViewDetails(page.req);
      }

      $scope.template = page.url;      

      $http({ method: 'GET', url: page.url})
        .success(function (html) {
            $scope.html = html;
            $('textarea').text(html); //Had to go with this due to IE
            window.location.href = '#TemplateView';
        })
        .error(function (html, status) {
            $scope.html = 'Unable to load code: ' + status;
        });
  }

  function getViewDetails(requestUrl){
    $http({method: 'GET', url: requestUrl}).success(
      function(response) {
        $scope.items = response;
        if (!response.length) {
          $('#errMsg').html('Wrong credential, please check your user name or password !');
        };
      }). error(
        function(data, status, headers, config) {
          $('#msg').html("Error");
      });
  }

  /*function getRelease() {
    $http({method: 'GET', url: '/getRelease?reqData='}).success(
      function(response) {
        $scope.items = response;
        if (!response.length) {
          $('#errMsg').html('Wrong credential, please check your user name or password !');
        };
      }). error(
        function(data, status, headers, config) {
          $('#msg').html("Error");
      });
  }

//$scope.testcases = 
  function testcases() {
   // console.log("$$$ current project : ");
    $http({method: 'GET', url: '/getData?reqData='}).success(
      function(response) {
        $scope.items = response;
        if (!response.length) {
          $('#errMsg').html('Wrong credential, please check your user name or password !');
        };
        //window.location.href = '#GridView';

      }). error(
        function(data, status, headers, config) {
          $('#msg').html("Error");
      });
  }

  //$scope.users = function() {
  function users(){
    $http({method: 'GET', url: '/getUsers?reqData='}).success(
      function(response) {
        $scope.items = response;
        if (!response.length) {
          $('#errMsg').html('Wrong credential, please check your user name or password !');
        };
        window.location.href = '#UserView';

      }). error(
        function(data, status, headers, config) {
          $('#msg').html("Error");
      });
  }
  */

  $scope.showPanel = function() {
    window.location.href = '#PanelView';
  }
  
});