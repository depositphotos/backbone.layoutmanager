module.exports = ->
  @loadTasks "build/tasks"

  @registerTask "default", [
    "clean"
    "nodequnit"
  ]
