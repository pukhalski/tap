angular.module('ngTap', []).directive('ngTap', function() {
    return function(scope, element, attrs) {
        element.bind('tap', function() {
            scope.$apply(attrs.ngTap, element);
        });
    };
});
