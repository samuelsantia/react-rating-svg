export default {
  mapTimes: _mapTimes
};

function _mapTimes(times, execute) {
  const result = [];

  while(result.length < times){
    result[result.length] = execute(result.length);
  }

  return result;
}
