module.exports = function(config) {
  config.set({
    basePath: './',
    browsers: ['Chrome'],
    frameworks: ['jasmine'],
    reporters: ['mocha'],
    autoWatch: true,
    colors: true,
    files : [
    //3rd Party Code
    'public/libs/angular/angular.js',
    'public/libs/angular-route/angular-route.js',
    'node_modules/angular-mocks/angular-mocks.js',
    //App-specific Code
    'public/scripts/**/*.js'
    ]
  });
};
