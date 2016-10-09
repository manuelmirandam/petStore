// Karma configuration
// Generated on Fri Sep 09 2016 22:38:54 GMT-0700 (US Mountain Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        // Vendor files
        'assets/bower_components/angular/angular.min.js',
        'assets/bower_components/angular-mocks/angular-mocks.js',
        'assets/bower_components/angular-block-ui/dist/angular-block-ui.min.js',
        'assets/bower_components/angular-ui-router/release/angular-ui-router.min.js',
        'assets/bower_components/firebase/firebase.js',
        'assets/bower_components/angularfire/dist/angularfire.min.js',
        
        // Modules        
        'app/app.module.js',
        'app/components/**/*.module.js',
        
        // Config
        'app/components/**/*.config.js',
        
        // Shared
        'app/components/shared/constants.js',
        
        // Services
        'app/components/**/*.service.js',
              
        // Filters
        'app/components/productDetail/stock-filter.js',
        
        // Directives
        'app/components/shared/directives/custom-on-change.directive.js',
              
        // Controllers
        'app/components/**/*controller.js',
        
        // Tests
        'app/components/**/*spec.js'        
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}