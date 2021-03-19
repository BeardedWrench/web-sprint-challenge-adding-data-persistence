module.exports = {
    intToBool,
    boolToint,
    projectToBody,
    taskToBody,
  };
  
  function intToBool(int) {
    return int === 1 ? true : false;
  }
  
  function boolToint(bool) {
    return bool === true ? 1 : 0;
  }
  
  function projectToBody(project) {
    return {
      ...project,
      project_completed: intToBool(project.project_completed),
    };
  }
  
  function taskToBody(task) {
    return {
      ...task,
      task_completed: intToBool(task.task_completed),
    };
  }