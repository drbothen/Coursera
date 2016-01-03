'use strict';

module.exports = function (grunt) {



    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Automatically load required Grunt tasks
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });

    // Define the configuration for all the tasks
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                    'Gruntfile.js',
                    'app/scripts/{,*/}*.js'
                ]
            }
        },

        useminPrepare: {
            html: 'app/index.html',
            options: {
                dest: 'dist'
            }
        },
        // Concat
        concat: {
            options: {
                separator: ';'
            },
            // dist configuration is provided by useminPrepare
            dist: {}
        },
        // Uglify
        uglify: {
            // dist configuration is provided by useminPrepare
            dist: {}
        },
        cssmin: {
            dist: {}
        },
        // Filerev
        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 20
            },
            release: {
                // filerev:release hashes(md5) all assets (images, js and css )
                // in dist directory
                files: [{
                    src: [
                        'dist/scripts/*.js',
                        'dist/styles/*.css'
                    ]
                }]
            }
        },
        // Usemin
        // Replaces all assets with their revved version in html and css files.
        // options.assetDirs contains the directories for finding the assets
        // according to their relative paths
        usemin: {
            html: ['dist/*.html'],
            css: ['dist/styles/*.css'],
            options: {
                assetsDirs: ['dist', 'dist/styles']
            }
        },

        copy: {
            dist: {
                cwd: 'app',
                src: [ '**','!styles/**/*.css','!scripts/**/*.js' ],
                dest: 'dist',
                expand: true
            },
            fonts: {
                files:[
                    {
                        //for bootstrap fonts
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/bootstrap/dist',
                        src: ['fonts/*.*'],
                        dest: 'dist'
                    }, {
                        //for font-awesome
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/font-awesome',
                        src: ['fonts/*.*'],
                        dest: 'dist'
                    }
                ]
            }
        },

        watch: {
            copy: {
                files: [ 'app/**', '!app/**/*.css', '!app/**/*.js'],
                tasks: [ 'build' ]
            },
            scripts: {
                files: ['app/scripts/**/*.js', 'test/**/*.js'],
                tasks:[ 'build']
            },
            styles: {
                files: ['app/styles/mystyles.css'],
                tasks:['build']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    'app/{,*/}*.html',
                    '.tmp/styles/{,*/}*.css',
                    'app/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729
            },
            dist: {
                options: {
                    open: true,
                    base:{
                        path: 'dist',
                        options: {
                            index: 'index.html',
                            maxAge: 300000
                        }
                    }
                }
            }
        },
        // ngAnnotate add, removes, add rebuilds angularjs dependency injection annotations
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            app: {
                files: [
                    {
                        expand: true,
                        src: ['.tmp/concat/scripts/*.js']
                    }
                ]
            }
        },
        clean: {
            build:{
                src: [ 'dist/']
            }
        },
        // Grunt Protractor End to End testing automation
        protractor: {
            options: {
                // Location of your protractor config file
                configFile: "test/protractor.conf.js",

                // Do you want the output to use fun colors?
                noColor: false,

                // Set to true if you would like to use the Protractor command line debugging tool
                // debug: true,

                // Additional arguments that are passed to the webdriver command
                args: { }
            },
            e2e: {
                options: {
                    // Stops Grunt process if a test fails
                    keepAlive: false
                }
            },
            continuous: {
                options: {
                    keepAlive: true
                }
            }
        },
        // Grunt Karma Unit Testing Automation
        karma: {
            options: {
                configFile: "test/karma.conf.js"
            },
            task: {
                autoWatch: false,
                background: false,
                singleRun: true
            },
            dev: {
                autoWatch: true,
                background: false,
                singleRun: false
            }
        },
        // run cmd
        run: {
            options: {
                wait: true
            },
            json: {
                exec: "json-server --watch test/db/db.json"
            }
        },
        // concurrent tasks
        concurrent: {
            servers: {
                tasks:['run:json','watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        }

    });

    grunt.registerTask('build', [
        'clean',
        'jshint',
        'karma:task',
        'useminPrepare',
        'concat',
        'ngAnnotate',
        'cssmin',
        'uglify',
        'copy',
        'filerev',
        'usemin'
    ]);

    // load NPM Tasks
    // Grunt protractor runner
    grunt.loadNpmTasks('grunt-protractor-runner');
    // Grunt Karma runner
    grunt.loadNpmTasks('grunt-karma');
    // Grunt Run
    grunt.loadNpmTasks('grunt-run');

    // Grunt registered tasks
    grunt.registerTask('serve',['build', 'connect:dist', 'concurrent:servers']);

    grunt.registerTask('default',['build']);

    grunt.registerTask('e2e', ['protractor:e2e']);

    grunt.registerTask('test', ['karma:dev', 'protractor:e2e']);

    grunt.registerTask('contest', ['karma:dev', 'protractor:e2e', 'watch']);

    grunt.registerTask('utest', ['karma:dev']);

    grunt.registerTask('json', ['run:json']);
};