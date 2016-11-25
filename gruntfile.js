module.exports=function(grunt){
    
    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),
        uglify:{
            build:{
                src:['js_setup/Angular.js',
                    'js_setup/Angular-Route.js'
                ],
                dest:'js/script.min.js'
            },
            dev:{
                options:{
                    beautify:true,
                    mangle:false,
                    compress:false,
                    preserveComments:'all'
                },
                src:['js_setup/Angular.js',
                    'js_setup/Angular-Route.js'
                ],
                dest:'js/script.min.js'
            }
        },
        sass:{
            build:{
                options:{
                    outputStyle:'compressed'
                },
                files:{
                    'css/main.css':'css/scss/common.scss'
                }
            },
            dev:{
                options:{
                    outputStyle:'expanded'
                },
                files:{
                    'css/main.css':'css/scss/common.scss'
                }
            }
        },
        watch:{
            js:{
                files:['js_setup/Angular.js','js_setup/Angular-Route.js'],
                tasks:['uglify:dev']
            },
            css:{
                files:['css/scss/*.scss'],
                tasks:['sass:dev']
            }
        }

    });
    
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');

    grunt.registerTask('default',['uglify:dev','sass:dev']);
    grunt.registerTask('build',['uglify:build','sass:build']);

};

