/*
var competencies = facets.map((facet, index) => {
  return { label: facet, description: descriptions[index] };
});
console.log(JSON.stringify(competencies));
*/

var minVal = 0;
var maxVal = 10;

let careerPaths = [];
let templist = {};
let curCareerPath = false;

groups.forEach((group, index) => {
    let competencies = Object.keys(group.competencies);
    competencies.forEach((comp, index2) => {
      let paths = Object.keys(group.competencies[comp].idealScores);
      paths.forEach((path, index3) => {
        if(!templist[path]){
          templist[path] = true;
          careerPaths.push(path);
        }
      });
    });
});
