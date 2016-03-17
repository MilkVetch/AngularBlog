angular.module('blog',['ngAnimate', 'ui.router'])
	.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('home', {
				url:'/',
				templateUrl: 'static/home.html',
				data : { pageTitle: '芪聞異事' }
			})
			.state('note', {
				url: '/note',
				templateUrl:'static/note.html',
				data : { pageTitle: '芪聞異事 - 隨筆' }
			})
			.state('front-end', {
				url: '/front-end',
				templateUrl:'static/front-end.html',
				data : { pageTitle: '芪聞異事 - 前端' }
			})
			.state('design', {
				url: '/design',
				templateUrl:'static/design.html',
				data : { pageTitle: '芪聞異事 - 設計' }
			})
			.state('novel', {
				url: '/novel',
				templateUrl:'static/novel.html',
				data : { pageTitle: '芪聞異事 - 小說' }
			})
			.state('music', {
				url: '/music',
				templateUrl:'static/music.html',
				data : { pageTitle: '芪聞異事 - 音樂' }
			})
			.state('about', {
				url: '/about',
				templateUrl:'static/about.html',
				data : { pageTitle: '芪聞異事 - 關於' }
			});
	})

	.directive('headerNav', function(){
		return {
			templateUrl: 'module/headerNav.html',
			controller: 'headerNav as menuList'
		}
	})

	.directive('mainStructure', function(){
		return {
			templateUrl: 'module/mainStructure.html',
			controller: 'headerNav as menuList'
		}
	})

	.directive('updateTitle', ['$rootScope', '$timeout',
	  function($rootScope, $timeout) {
	    return {
	      link: function(scope, element) {

	        var listener = function(event, toState) {

	          var title = 'Default Title';
	          if (toState.data && toState.data.pageTitle) title = toState.data.pageTitle;

	          $timeout(function() {
	            element.text(title);
	          }, 0, false);
	        };

	        $rootScope.$on('$stateChangeSuccess', listener);
	      }
	    };
	  }
	])

	.controller('headerNav', function() {
		var menuList = this;
		menuList.list = [
			// {page:'首页', url:'home'},
			{page:'随笔', url:'note'},
			{page:'前端', url:'front-end'},
			{page:'设计', url:'design'},
			{page:'音乐', url:'music'},
			{page:'小说', url:'novel'},
			{page:'关于', url:'about'},
		];
		menuList.toggle = false;
		window.onresize = function(){
			if (window.innerWidth > 768) {
				angular.element(document.getElementById('menu')).scope().menuList.toggle = true;
				angular.element(document.getElementById('menu')).scope().$digest();
			}
		}
	});

