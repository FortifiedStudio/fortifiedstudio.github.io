module.exports = function(grunt) {

	grunt.initConfig({

		meta: {},

		compass: {
			files: ['sass/*.scss'],
			dev: {
				src: 'sass',
				dest: 'css',
				outputstyle: 'expanded',
				linecomments: true
			},
			prod: {
				src: 'sass',
				dest: 'css',
				outputstyle: 'compressed',
				linecomments: false,
				forcecompile: true
			}
		},

		concat: {
			dist: {
				src: [
					'js/lib/jquery.js',
					'js/lib/jquery.easing.js',
					'js/lib/jquery.flexslider.js',
					'js/lib/jquery.scrollTo.js',
					'js/lib/jquery.localScroll.js',
					'js/lib/jquery.colorbox.js',
					'js/lib/swfobject.js',
					'js/lib/underscore.js',
					'js/lib/backbone.js',
					'js/script.js',
					'js/app.js'
				],
				dest: 'js/dist/built.js'
			}
		},

		watch: {
			css: {
				files: 'sass/*.scss',
				tasks: ['compass:dev'],
				options: {
					interrupt: true
				}
			},
			scripts: {
				files: 'js/*.js',
				tasks: ['concat'],
				options: {
					interrupt: true
				}
			}
		},

		jshint: {
			options: {
				evil: true,
				regexdash: true,
				browser: true,
				wsh: true,
				trailing: true,
				sub: true,
				multistr: true,
				globals: {}
			},
			all: [
				'js/script.js',
				'js/app.js'
			]
		},

		uglify: {
			options: {
				mangle: false
			},
			my_target: {
				files: {
					'js/dist/built.js': ['js/dist/built.js']
				}
			}
		},

		copy: {
			main: {
				files: [
					{
						expand: true,
						cwd: './',
						src: [
							'assets/**',
							'css/**',
							'font/**',
							'img/**',
							'js/lib/modernizr.js',
							'js/dist/built.js',
							'json/**',
							'favicon.ico',
							'index.html',
							'robots.txt',
							'CNAME',
							'.nojekyll'
						],
						dest: 'build/'
					}
				]
			}
		},

		clean: {
			build: {
				src: [ 'build' ]
			},
		}

	});

	grunt.loadNpmTasks('grunt-compass');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask('default', [
		'clean',
		'compass:prod',
		'jshint',
		'concat',
		'uglify',
		'copy'
	]);

};
