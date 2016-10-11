module.exports = function(grunt) {

    grunt.initConfig({
      connect: {
        site1: {
          options: {
            port: 9000,
            base: 'dist',
            livereload: true,
            open: true
          }
        }
      }
    });
    // loadNpmTasks
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Run Default task(s).
    grunt.registerTask('default', ['connect']);

};
