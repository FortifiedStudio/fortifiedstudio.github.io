module.exports = function(grunt) {

	pkg: grunt.file.readJSON('package.json');

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

		clean: {
			build: {
				src: [ 'build' ]
			},
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

		replace: {
			dist: {
				options: {
					variables: {
						'baseurl': 'http://github.fortifiedstudio.com'
					},
					patterns: [
						{ match: 'year', replacement: '<%= grunt.template.today("yyyy") %>' }
					]
					},
				files: [ { src: 'index.src.html', dest: 'index.html' } ]
			}
		},

		watch: {
			options: {
				forever: false,
				livereload: true
			},
			css: {
				files: 'sass/*.scss',
				tasks: ['compass:dev'],
			},
			scripts: {
				files: 'js/*.js',
				tasks: ['concat'],
			},
			html: {
				files: 'index.src.html',
				tasks: ['replace']
			}
		},

		connect: {
			server: {
				options: {
					protocol: 'http',
					hostname: '*',
					port: 4000,
					base: '.',
					keepalive: false,
					open: true,
					livereload: true
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-compass');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-replace');
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.registerTask('server',[
		'connect',
		'watch'
	]);

	grunt.registerTask('default', [
		'clean',
		'compass:prod',
		'jshint',
		'concat',
		'uglify',
		'replace',
		'copy'
	]);

};
