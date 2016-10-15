module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: ['client/app.module.js', 'client/app/*.js', 'client/app/**/*.js', 'client/app.routes.js'],
        dest: 'client/main.js'
      }
    },
    ts: {
      app: {
        files: [{
          src: ["**/*.ts", "!node_modules/**"]
        }],
        options: {
          module: "commonjs",
          noLib: true,
          target: "es6",
          sourceMap: false
        }
      }
    },
    tslint: {
      options: {
        configuration: "tslint.json"
      },
      files: {
        src: ["server/**/*.ts", "app.ts", "client/**/*.ts"]
      }
    },
    watch: {
      ts: {
        files: ["server/**/*.ts", "app.ts", "client/**/*.ts"],
        tasks: ["ts", "tslint", "concat"]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks("grunt-tslint");

  grunt.registerTask('default', ['ts', 'tslint', 'concat']);
};